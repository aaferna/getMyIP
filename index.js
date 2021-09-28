require('dotenv').config();
const path = require('path');
const process = require('process'); 
const { Telegraf } = require('telegraf')

let args

if(process.argv.slice(1)[1] === "dev"){
    args = "./config.json"
} else {
    args = process.argv.slice(1)[0]
}

bot = new Telegraf(require(args).TELEGRAMBOT)

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.command('chatIDclog', (ctx) => {
    console.log(ctx.message.chat.id)
})

bot.command('buscarip', (ctx) => {
    
    try {
        const axios = require('axios');
        axios({
            method: 'get',
            url: 'http://ipinfo.io/ip'
        })
        .then((response) => { 
                bot.telegram.sendMessage(require(args).TELEGRAMCHATID, response.data)
        })
        .catch((error) => { console.log(error); });
    } catch (error) {
        console.log(error);
    }

})



bot.launch()