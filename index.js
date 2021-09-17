require('dotenv').config();
const path = require('path');

let tetok = process.env.TELEGTOK
const { Telegraf } = require('telegraf')
bot = new Telegraf(tetok)


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
                bot.telegram.sendMessage(process.env.TELEGchat, response.data)
        })
        .catch((error) => { console.log(error); });
    } catch (error) {
        console.log(error);
    }

})



bot.launch()