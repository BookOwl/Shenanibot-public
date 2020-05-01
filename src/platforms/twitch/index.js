const TMI = require('tmi.js');
const ShenaniBot = require('../../bot/index');
const env = require('../../config/config');

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: env.auth.botUsername,
    password: env.auth.oauthToken
  },
  channels: [env.auth.channel]
};

const client = TMI.Client(options);
const shenanibot = new ShenaniBot(env);

(async function main() {
  // Connect bot to server
  client.connect();
  console.log('Don\'t worry if it says \'Error: No response from twitch\', it should still work!');
  
  client.on('connected', (address, port) => {
    client.action(env.auth.channel, 'Bot Connected!');
  });

  client.on('chat', async (channel, user, message, self) => {
    if (self) return;

    (async function command() {
      let response = await shenanibot.command(message, user.username);
      client.say(env.auth.channel, response);
    })();
  });
})();
