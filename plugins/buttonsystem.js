const { cmd } = require('../lib/command');
const config = require('../settings');

cmd({
  pattern: "system",
  desc: "System command with mention, image & buttons",
  category: "owner",
  filename: __filename
}, async (sock, message, msgData, { reply, sender }) => {
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

    // Caption
    const systemText = `
🖥️ *𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 System Panel...*

📌 Bot Name: Queen Rashu MD
📌 Status: Online ✅
📌 Prefix: ${config.PREFIX}

Use the buttons below 👇
> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟
`;

    // Image URL
    const imageUrl = "https://files.catbox.moe/l74kdf.jpg";

    // Send message with mention
    await sock.sendMessage(message.from, {
      image: { url: imageUrl },
      caption: systemText,
      footer: "© Queen Rashu MD",
      buttons: buttons,
      headerType: 4,
      contextInfo: { mentionedJid: [sender] } // << mention sender
      }
    );

  } catch (err) {
    console.log(err);
    reply("❌ Error in system cmd: " + err);
  }
});
