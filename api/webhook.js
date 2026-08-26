const TelegramBot = require('node-telegram-bot-api');
const setupBot = require('../bot-setup');

// Create the bot without polling (only if token exists to prevent cold-boot crashes)
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = token ? new TelegramBot(token) : null;

if (bot) {
  // Setup bot logic
  setupBot(bot);
}

module.exports = async (request, response) => {
  try {
    if (!bot) {
      return response.status(500).send('ERROR: TELEGRAM_BOT_TOKEN environment variable is missing in Vercel!');
    }

    if (request.method === 'GET') {
      return response.status(200).send('WhatsApp Link Bot is running!');
    }

    const { body } = request;
    
    if (request.method === 'POST' && body) {
      // Intercept bot.sendMessage to wait for it to finish before ending the Vercel function
      const promises = [];
      const originalSendMessage = bot.sendMessage.bind(bot);
      
      bot.sendMessage = (...args) => {
        const p = originalSendMessage(...args);
        promises.push(p);
        return p;
      };

      // Process the update
      bot.processUpdate(body);

      // Wait for all messages to be sent
      await Promise.all(promises);
      
      // Restore the original method
      bot.sendMessage = originalSendMessage;
    }
    
    response.status(200).send('OK');
  } catch (error) {
    console.error('Error processing update:', error);
    response.status(500).send('Internal Server Error');
  }
};
