const { Client } = require('discord.js-selfbot-v13');
const axios = require("axios")

const client = new Client({
    checkUpdate: false,
});
const config = require("./config.json")

const pushover_api_token = config.apitoken;
const pushover_user_key = config.userkey;

client.on("message", message => {
  if(config.userLimit !== "disabled"){
    if(config.userLimit !== message.author.id){
      return
    }
  }
    if(config.serverLimit !== "disabled"){
    if(config.serverLimit !== message.guild.id){
      return
    }
  }
    if(config.channelLimit !== "disabled"){
    if(config.channelLimit !== message.channel.id){
      return
    }
  }

const userMentioned = message.mentions.users.has(client.user.id)
const rolesMentioned = message.mentions.roles.some(role => message.member.roles.cache.has(role.id))
const everyoneOrHerePing = message.mentions.everyone

if (userMentioned || rolesMentioned || everyoneOrHerePing) {
  const username = message.author.username;
  const message_content = message.content;
  sendPushoverNotification(username, message_content);
}

  

  

  });


client.once(`ready`, () => {
    console.log(`Logged in ${client.user.tag}`)
})



function sendPushoverNotification(username, message_content) {
    const url = "https://api.pushover.net/1/messages.json";
    const data = {
      token: pushover_api_token,
      user: pushover_user_key,
      title: "Discord Message",
	  sound: "tugboat",
      message: `User: ${username}\nContent: ${message_content}`,
    };
  
    axios
      .post(url, data)
      .then(response => {
        console.log("Notification sent successfully!");
      })
      .catch(error => {
        console.error("Error sending notification:", error);
      });
  }


console.log("Logging in...")
client.login(config.token)