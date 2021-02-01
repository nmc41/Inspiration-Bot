// const { token } = require('./config.json');
const Discord = require('discord.js');
const prefix = '!';
const client = new Discord.Client();
const fetch = require('node-fetch');
const url = 'https://type.fit/api/quotes';

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(command);

    if(command === 'inspire') {
        fetch(url)
        .then(response => response.json())
        .then(data => {
           const quoteBankLength = data.length;
           const chosenQuoteIndex = Math.floor(Math.random() * quoteBankLength) + 1;
           const chosenQuoteText = data[chosenQuoteIndex].text;

           if(!message.mentions.users.size) {
                return message.channel.send(chosenQuoteText);
           }

           const taggedUser = message.mentions.users.first();

           message.channel.send(`${taggedUser}, ${chosenQuoteText}`);

        });
    }
});


client.login(process.env.DJS_TOKEN);

