const { cmd } = require("../lib/command");

cmd({
    pattern: "sendnb",
    desc: "Send message to any WhatsApp number",
    category: "tools",
    use: ".sendnb <number> <message>"
}, async (conn, message, { args }) => {

    if (args.length < 2) {
        return message.reply("❌ Usage: .sendnb <number> <message>");
    }

    // Number get
    const number = args[0].replace(/[^0-9]/g, "");

    if (!number) {
        return message.reply("❌ Invalid number!");
    }

    // Join message text
    const msgText = args.slice(1).join(" ");

    try {
        // Convert number to JID
        const jid = number + "@s.whatsapp.net";

        // Send message
        await conn.sendMessage(jid, { text: msgText });

        // Reply success to user
        return message.reply(`✅ Message sent to +${number}\n\n📨 Text: ${msgText}`);

    } catch (err) {
        console.error(err);
        return message.reply("❌ Error sending message!");
    }
});
