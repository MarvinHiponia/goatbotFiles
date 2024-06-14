module.exports = {
    config: {
        name: "hi",
        version: "1.0",
        author: "Marvin",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        const lowerCaseBody = event.body.toLowerCase();
        if (lowerCaseBody.includes("Helow") || lowerCaseBody.includes("loe") ||
lowerCaseBody.includes("Helow") ||
lowerCaseBody.includes("Helow guys")) {
            return message.reply(`hi how how are you today`);
        }
    }
};
