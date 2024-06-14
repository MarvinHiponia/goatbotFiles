const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userId, messageID) {
 const services = [
 { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
 { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
 { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = "";
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'tanjiro',
 author: 'Marvin Hiponia',//wag mo palitan yung cridits
 role: 0,
 category: 'tanjiro',
 shortDescription: 'tanjiro to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage(`𝗠𝗔𝗥𝗩𝗜𝗡 𝗕𝗢𝗧\n
━━━━━━━━━━━━━\n𝗛𝗶 𝗜'𝗺 𝗧𝗔𝗡𝗝𝗜𝗥𝗢 𝗞𝗔𝗠𝗔𝗗𝗢 𝗶𝘁𝘀 𝗻𝗶𝗰𝗲 𝘁𝗼 𝗰𝗵𝗮𝘁 𝘄𝗶𝘁𝗵 𝘆𝗼𝘂 𝘁𝗼𝗱𝗮𝘆😘!\n━━━━━━━━━━━━━\n`, event.threadID, event.messageID);
 return;
 }

 const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
 api.sendMessage(`𝗧𝗔𝗡𝗝𝗜𝗥𝗢 𝗞𝗔𝗠𝗔𝗗𝗢\n
━━━━━━━━━━━━━\nhi im tanjiro bot\n━━━━━━━━━━━━━\n`, event.threadID, messageID);
 },
 onChat: async function ({ event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("tanjiro")) {
 const input = messageContent.replace(/^tanjiro\s*/, "").trim();
 const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
 message.reply(`
 

𝗧𝗔𝗡𝗝𝗜𝗥𝗢 𝗞𝗔𝗠𝗔𝗗𝗢\n
━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━\n\n🗓 | ⏳ 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘 :\n${formattedDateTime}`, messageID);
 }
 }
};
