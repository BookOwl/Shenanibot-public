# Shenanibot-public
Shenanibot is going to be a free twitch chat bot developed for streamers playing LevelHead. Its purpose is to help streamers manage their level queues.

_Sooo... what does it do?_

It adds levels directly to your bookmarks so you don't type them. Then you just control the level queue by using the commands.

_Do you want to change the commands or add some of your own?_

Well JavaScript is easy to learn and here you have the source code. So... you now have it all. Although forking the git and then helping us make the bot even better would be nice, you can just keep your changes to yourself. Just have fun!

The bot has the following commands;

**FOR THE STREAMER:**

_QUEUE MANAGEMENT_
    
!prev : Sets the index queue to the previous level. Now the current level would be the previous one.    
!next : Sets the index queue to the next level    
!current : Shows information about the current level being played    
!clear : Mark a level as beaten    
!skip : Mark a level as skipped or not beaten    
!add [level code] : Adds a level to the viewer level queue    
!q or !queue : Shows up to 5 next levels in the queue    
!totalq : Shows the total number of levels in the queue as well as the quantity of levels beaten and unbeaten.    
    
_MISC_    
    
!cmd : Shows some quick commands for viewers    
!about : Shows customized message    
!bot : Shows bot description    
    
_VIEWERS INTERACTION_    
Viewers can only use the following commands:    
    
!add    
!current    
!q or !queue    
!totalq    
    
    
DB integration TBD.    



**References:
Cprice1771 RumpusAPI.js
https://github.com/Cprice1771/Rumpus-CE/blob/master/js-client/RumpusAPI.js

======================================================
 _____ _                            _ _           _   
/  ___| |                          (_) |         | |  
\ `--.| |__   ___ _ __   __ _ _ __  _| |__   ___ | |_ 
 `--. \ '_ \ / _ \ '_ \ / _` | '_ \| | '_ \ / _ \| __|
/\__/ / | | |  __/ | | | (_| | | | | | |_) | (_) | |_ 
\____/|_| |_|\___|_| |_|\__,_|_| |_|_|_.__/ \___/ \__|
                                                      
======================================================

GREETINGS!
Hello fellow LevelHead streamer. I see you are interested on using this chatbot. Here's a quick guide for you 
to start setting up this Shenanibot. Have fun! If you have any question regarding this project in specific 
just ask FantasmicGalaxy directly on Discord.

GETTING STARTED
Materials:

+Node.js
+Twitch account for streaming
+Twitch account for the bot
+Internet [duh..?]


If you don't know how to run a JS script, that's fine. This quick guide will teach you how to run it in the most simple way. 
You will need to install node.js in order to run the file index.js which contains all the chatbot's logic.

So now, go to https://nodejs.org and download the latest version of the software and install it like any other regular program.

After you have installed it, download the GitHub project as a zip and extract its files on any location on your PC.

Now you need to locate the file "properties.json" (It's under src/twitch/properties.json). Once you have located it, edited it like any .txt file.
You will need to fill those fields with the following information:

-------------PARAMETERS FOR SHENANIBOT--------------

LEVEL HEAD DELEGATION KEY
You will need a delegation key from your own LEVELHEAD account with the following permissions:
    -View own and others' Levelhead data (levels, profiles, aliases, etc).
    -View, add, and delete own Levelhead level bookmarks.
After you have generated it, copy it, and paste it in the 'delegationKeyStreamer' parameter of the json file. eg.
"delegationKeyStreamer": "yourDelegationKeyHere";

TWITCH STREAMER CHANNEL NAME
On your own channel https://www.twitch.tv/channelName
get the last part that says "channelName" and paste it into the "twitchChannel" parameter eg.
"twitchChannel": "channelName"

TWITCH STREAMER DISPLAYED USERNAME
On your own channel write something in the chat and copy your Twitch username displayed like this:

TwitchDisplayUserName: hey what's up?

"TwitchDisplayUserName" would be your display UserName then paste it into the "twitchStreamer" parameter eg.
"twitchStreamer": "TwitchDisplayUserName"

TWITCH BOT USERNAME AND PASSWORD
Here's the part where we will need the second twitch account we specified in the MATERIALS section. 
This account will be the account of the bot.
The chatbot will take full control of this twitch account, so you are better just creating a new twitch account just for your bot. 
Please do not use your own streaming account, you've been warned.
Once you have the second twitch account ready. You will need its username (username you use to log in) and OAuth password. 
You can get the OAuth password by going to this link:
https://twitchapps.com/tmi/ and letting the website get permissions for the account you are planning to use as a chatbot.
Once you have this information, just copy and paste it into the "properties.json" file like below:

"username": "KommSusserBot"
"password": "oauth:bslowihcqdhgb2a62cjm5xfp1424we"

Next, you'll need to open your computer's terminal, and navigate to where the package.json file is located.
You can ask someone on the Discord how to do that, (or just look up an online guide for your OS)

Locate the file index.js inside the Shenanibot project and copy the route to where that file is located.
(Example: C:\My_User\Documents\Shenanibot-public\Shenanibot main\Twitch early access version)

Then open a cmd window (TERMINAL if you are in Linux or Mac). We need the cmd window to point to the location where our file index.js is. For that we will use the command 'cd [route]'
(You can open the terminal on Windows by pressing 'Window Key + R')
(Example: cd C:\My_User\Documents\Shenanibot-public\"Shenanibot main"\"Twitch early access version")
Notice that if your route has a name with an space between words, you will need to encapsule the whole folder name between quotes like it's shown in the example on the folder name "Twitch early access version" (Windows only)

After you are in that route, just execute the following command to install the dependencies of the program:

npm install

Then you can run the bot by typing:

node .

And the cmd window will start showing how does the bot connects to your Twitch channel and greets you with the words "Adun Toridas!"

If you are curious about what you are installing, just google "tmi.js library".
The node command is for running the index.js file.

LASTLY!
Feel free to study JavaScript and understand the code behind the shenanibot. Make sure to edit and modify it as much as you need or want. Cheers!

and Shout outs to CPRICE for the RumpusAPI script... and the BS brothers for such a fantastic game!