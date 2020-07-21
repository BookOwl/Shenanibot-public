const Rumpus = require("@bscotch/rumpus-ce");
const ViewerLevel = require("./lib/level");

class ShenaniBot {
  constructor(botOptions) {
    this.rce = new Rumpus.RumpusCE(botOptions.auth.delegationToken);
    this.options = botOptions.config;
    this.streamer = botOptions.auth.streamer;
    this.queue = [];
    this.queueOpen = true;
    this.users = {};
  }

  async command(command, username) {
    if (!command.startsWith(this.options.prefix)) return "";
    command = command.substring(this.options.prefix.length).split(" ");

    if (username === this.streamer) {
      switch (command[0]) {
        case "open":
          return this.openQueue();
        case "close":
          return this.closeQueue();
        case "next":
          return this.nextLevel();
        case "random":
          return this.randomLevel();
      }
    }

    switch (command[0]) {
      case "add":
        return this.addLevelToQueue(command[1], username);
      case "remove":
        return this.removeLevelFromQueue(command[1], username);
      case "queue":
        return this.showQueue();
      case "commands":
      case "help":
        return this.showBotCommands();
      case "bot":
        return this.showBotInfo();
    }

    return "";
  }

  openQueue() {
    let response = "The queue has been opened, add some levels to it!";

    this.queueOpen = true;
    return response;
  }

  closeQueue() {
    let response = "The queue has been closed! No more levels :(";

    this.queueOpen = false;
    return response;
  }

  nextLevel() {
    let {empty, response} = this._dequeueLevel();
    if (!empty) {
      response = this._playLevel();
    }

    return response;
  }

  randomLevel() {
    let {empty, response} = this._dequeueLevel();
    if (!empty) {
      let index = Math.round(Math.random() * (this.queue.length - 1));
      let randomLevel = this.queue[index];
      this.queue.splice(index, 1)
      this.queue.unshift(randomLevel);

      response = `Random Level... ${this._playLevel()}`
    }
    return response;
  }

  async addLevelToQueue(levelId, username) {
    if (!this.queueOpen) {
      let response = "Sorry, queue is closed!";
      return response;
    }

    let {valid, response} = this._validateLevelId(levelId)
    if (!valid) {
      return response;
    }

    if (this.options.levelLimit > 0 && this.users[username] && this.users[username].levelsSubmitted >= this.options.levelLimit) {
      response = "Oops, you have submitted the maximum number of levels!";
      return response;
    }

    for (let i = 0; i < this.queue.length; i++) {
      const level = this.queue[i];

      if (level.levelId === levelId) {
        response = "That level is already in the queue!";
        return response;
      }
    }

    let levelInfo = await this.rce.levelhead.levels.search({ levelIds: levelId, includeAliases: true }, { doNotUseKey: true });

    try {
      let level = new ViewerLevel(
        levelInfo[0].levelId,
        levelInfo[0].title,
        username
      );
      this.queue.push(level);
      if (this.queue.length === 1) {
        this._playLevel();
      }

      this.users[username] ? this.users[username].levelsSubmitted++ : this.users[username] = { levelsSubmitted: 1 };

      response = `${level.levelName}@${level.levelId} was added! Your level is #${this.queue.length} in queue.`;
      response = this.options.levelLimit > 0 ? `${response} Submission ${this.options.levelLimit - this.users[username].levelsSubmitted}/${this.options.levelLimit}` : response;
      return response;
    } catch (error) {
      console.error(error);
      response = "Oops! That level does not exist!";
      return response;
    }
  }

  removeLevelFromQueue(levelId, username) {
    let {valid, response} = this._validateLevelId(levelId)
    if (!valid) {
      return response;
    }

    for (let i = 0; i < this.queue.length; i++) {
      const level = this.queue[i];

      if (level.levelId === levelId) {
        if (level.submittedBy === username) {
          if (i === 0) {
            response = "You can't remove the current level from the queue!";
            return response;
          }
          
          this._removeFromQueue(i);
          response = `${level.levelName}@${level.levelId} was removed from the queue!`;
          return response;
        } else {
          response = "You can't remove a level from the queue that you didn't submit!";
          return response;
        }
      }
    }
    response = "The level you tried to remove doesn't exist :(";
    return response;
  }

  showQueue() {
    if (this.queue.length === 0) {
      let response = "There aren't any levels in the queue!";
      return response;
    }

    let limit = Math.min(10, this.queue.length);
    let response = `Next ${limit} levels:`;
    for (let i = 0; i < limit; i++) {
      const level = this.queue[i];
      response = `${response} [${level.levelName}@${level.levelId}]`;
    }
    return response;
  }

  showBotCommands() {
    let response = `${this.options.prefix}add [levelcode], ${this.options.prefix}bot, ${this.options.prefix}queue`;
    return response;
  }

  showBotInfo() {
    let response = `This bot was created for the LevelHead Community by jajdp and FantasmicGalaxy.
    Want to use it in your own stream? You can get it here: https://github.com/jajdp/Shenanibot-public`;
    return response;
  }

  _dequeueLevel() {
    if (this.queue.length === 0) {
      return {
        empty: true,
        response: "There aren't any levels in the queue!"
      };
    }

    this.rce.levelhead.bookmarks.remove(this.queue[0].levelId);
    this._removeFromQueue(0);
    
    return {
      empty: !this.queue.length,
      response: (!this.queue.length) ? "The queue is now empty." : null
    };
  }

  _playLevel() {
    this.rce.levelhead.bookmarks.add(this.queue[0].levelId);
    return `Now playing ${this.queue[0].levelName}@${this.queue[0].levelId} submitted by ${this.queue[0].submittedBy}`;
  }

  _validateLevelId(id) {
    if (id.length !== 7) {
      return {
        valid: false,
        response: `${id} is not a valid level code, they're 7 characters long!`
      };
    }
    return {valid: true, response: null};
  }

  _removeFromQueue(index) {
    const username = this.queue[index].submittedBy;

    this.queue.splice(index, 1);
    if (this.options.levelLimitType === "active") {
      this.users[username].levelsSubmitted--;
    }
  }
}

module.exports = ShenaniBot;
