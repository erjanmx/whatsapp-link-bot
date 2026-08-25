const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const setupBot = require('./bot-setup');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
console.log('WhatsApp Link Bot is now running and polling for messages (Local Mode)...');

// Setup bot logic
setupBot(bot);
