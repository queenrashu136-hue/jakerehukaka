const fs = require('fs');
const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

// Make sure downloads folder exists
if (!fs.existsSync('./downloads')) fs.mkdirSync('./downloads', { recursive: true });

cmd({
  pattern: "vv00",
  alias: ["අම්මෝ","super","wow","🤭","😁","💗","👍","❤️","නියමයි"],
  desc: "Decrypts ViewOnce messages and sends to bot inbox",
  category: "owner",
  filename: __filename
}, async (sock, message, msgData, { reply }) => {

  try {
    // Get the quoted message safely
    const quoted =
      message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
      message.message?.imageMessage?.contextInfo?.quotedMessage ||
      message.message?.videoMessage?.contextInfo?.quotedMessage ||
      message.message?.audioMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      return reply("```කරුණාකර ViewOnce message එකකට reply කරන්න```");
    }

    const botJid = sock.user.id; // Bot deploy number

    // Helper to download and save media
    async function downloadMedia(msg, type, ext) {
      const stream = await downloadContentFromMessage(msg, type);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const filePath = `./downloads/viewonce_${Date.now()}.${ext}`;
      fs.writeFileSync(filePath, buffer);
      return filePath;
    }

    // ===== IMAGE =====
    if (quoted.imageMessage?.viewOnce) {
      const file = await downloadMedia(quoted.imageMessage, 'image', 'jpg');
      await sock.sendMessage(botJid, {
        image: { url: file },
        caption: quoted.imageMessage.caption || 'ViewOnce Image 🔓'
      });
      return;
    }

    // ===== VIDEO =====
    if (quoted.videoMessage?.viewOnce) {
      const file = await downloadMedia(quoted.videoMessage, 'video', 'mp4');
      await sock.sendMessage(botJid, {
        video: { url: file },
        caption: quoted.videoMessage.caption || 'ViewOnce Video 🔓'
      });
      return;
    }

    // ===== AUDIO =====
    if (quoted.audioMessage?.viewOnce) {
      const file = await downloadMedia(quoted.audioMessage, 'audio', 'mp4');
      await sock.sendMessage(botJid, {
        audio: { url: file },
        caption: quoted.audioMessage.caption || 'ViewOnce Audio 🔓',
        mimetype: 'audio/mp4'
      });
      return;
    }

    return reply("```මෙය ViewOnce message එකක් නොවේ!```");

  } catch (err) {
    console.log(err);
    return reply("❌ Error: " + err);
  }

});
