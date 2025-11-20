const { cmd } = require("../lib/command");
const axios = require("axios");

let aiMode = false;  // <-- AI auto reply ON/OFF state

// Turn ON AI mode
cmd({
    pattern: "aion",
    desc: "Turn ON Auto AI Reply Mode",
    react: "🟢"
}, async (sock, message) => {
    aiMode = true;
    await sock.sendMessage(message.chat, { text: "🟢 *AI Mode Activated!*\nඔබ යවන හැම msg එකකටම AI reply දෙයි." });
});

// Turn OFF AI mode
cmd({
    pattern: "aioff",
    desc: "Turn OFF Auto AI Reply Mode",
    react: "🔴"
}, async (sock, message) => {
    aiMode = false;
    await sock.sendMessage(message.chat, { text: "🔴 *AI Mode Deactivated!*" });
});

// Auto message handler
cmd({
    on: "text"   // <-- This catches ALL text messages
}, async (sock, message) => {
    try {
        if (!aiMode) return;        // AI mode off -> ignore
        if (message.key.fromMe) return;   // Ignore bot's own messages

        const userText = message.body;

        // --- AI API Call (OpenAI / GPT API Alternative / Free AI) ---
        const res = await axios.post("https://api.guruapi.tech/v1/chat/completions", {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userText }]
        });

        const reply = res.data.choices[0].message.content;

        await sock.sendMessage(message.chat, {
            text: reply
        }, { quoted: message });

    } catch (err) {
        console.log("AI Error:", err);
    }
});
