const TelegramBot = require('node-telegram-bot-api');
const setupBot = require('../bot-setup');

// Create the bot without polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Setup bot logic
setupBot(bot);

module.exports = async (request, response) => {
  try {
    // Vercel parses the JSON body automatically
    const { body } = request;
    
    // Process the update via the bot
    if (body) {
      bot.processUpdate(body);
    }
    
    // Respond with a 200 OK so Telegram knows we received the message
    response.status(200).send('OK');
  } catch (error) {
    console.error('Error processing update:', error);
    response.status(500).send('Internal Server Error');
  }
};
