const TelegramBot = require('node-telegram-bot-api');
const TOKEN = "1615771583:AAHK2vNDZchTzQxvmf7bpN0ggfUd7X2Fnv4";
const chatID = '459598934';

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

function sendDataToTelegram(data){
    bot.sendMessage(chatID, data)
}

module.exports = {
    sendDataToTelegram
}