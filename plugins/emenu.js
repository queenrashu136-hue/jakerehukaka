const { cmd } = require("../lib/command");
const axios = require("axios");

let aiMode = false;

let aiStyle = `
🤖 *RASHU AI RESPONSE*  
━━━━━━━━━━
{reply}
━━━━━━━━━━
`; 

cmd({
    pattern: "aion",
    react: "🟢"
}, async (sock, message) => {
    aiMode = true;
    await sock.sendMessage(message.chat, { text: "🟢 *AI Mode Activated!*" });
});

cmd({
    pattern: "aioff",
    react: "🔴"
}, async (sock, message) => {
    aiMode = false;
    await sock.sendMessage(message.chat, { text: "🔴 *AI Mode Deactivated!*" });
});

cmd({
    pattern: "aistyle",
}, async (sock, message, args) => {
    if (!args) return sock.sendMessage(message.chat, { text: "Use: .aistyle your style {reply}" });
    aiStyle = args;
    await sock.sendMessage(message.chat, { text: "✨ *AI Style Updated!*" });
});

// -------------------------------
// AUTO AI LISTENER (FIXED)
// -------------------------------
cmd({
    on: "message"
}, 
async (sock, message) => {

    try {
        if (!aiMode) return;
        if (message.key.fromMe) return;
        
        let userText = message.body || message.message?.conversation;
        if (!userText) return;

        const res = await axios.post("https://api.guruapi.tech/v1/chat/completions", {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userText }]
        });

        const aiReply = res.data.choices[0].message.content;
        
        const final = aiStyle.replace("{reply}", aiReply);

        await sock.sendMessage(message.chat, { text: final }, { quoted: message });

    } catch (e) {
        console.log("AI ERROR", e);
    }

});
