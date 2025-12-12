const { cmd } = require('../lib/command');
const config = require('../settings');

cmd({
  pattern: "system",
  desc: "System command with image, mention, and buttons",
  category: "owner",
  filename: __filename
}, async (sock, message, msgData, { reply }) => {
  try {
    // Buttons
    const buttons = [
      {
        buttonId: `${config.PREFIX}alive`,
        buttonText: { displayText: '© ᴀʟɪᴠᴇ' },
        type: 1
      },
      {
        buttonId: `${config.PREFIX}menu`,
        buttonText: { displayText: '© ᴍᴇɴᴜ' },
        type: 1
      }
    ];

    // System message text
    const systemText = `
🖥️ *System Panel*

📌 Bot Name: Queen Rashu MD
📌 Status: Online ✅
📌 Prefix: ${config.PREFIX}

Click the buttons below to quickly access commands:
- Alive → Check if the bot is active
- Menu → See all available commands
`;

    // Image URL
    const imageUrl = "https://files.catbox.moe/l74kdf.jpg";

    // Safe sender JID for mention (fallbacks included)
    let mentionJid = '';
    if (message.key?.fromMe) {
      // If the message is sent by the bot itself
      mentionJid = (sock.user && sock.user.id) ? sock.user.id : '';
    } else {
      // If the message is from another user
      mentionJid = message.key?.participant || message.sender || '';
    }

    // Send message with image, caption, buttons, and mention
    await sock.sendMessage(message.from, {
      image: { url: imageUrl },
      caption: systemText,
      footer: "© Queen Rashu MD",
      buttons: buttons,
      headerType: 4, // media header
      contextInfo: mentionJid ? { mentionedJid: [mentionJid] } : {}
    });

  } catch (err) {
    console.log("❌ Error in system cmd:", err);
    reply("❌ Error in system cmd: " + err);
  }
});
