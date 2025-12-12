const { cmd } = require('../lib/command');
const fs = require('fs');

cmd(
{
  pattern: "vv00",
  alias: ["vv00", "rvo00"],
  desc: "ViewOnce Decrypter",
  category: "owner",
  filename: __filename
},
async (sock, message, msgData, { reply }) => {

  try {
    // get quoted message safely
    const qMsg =
      message?.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
      message?.message?.imageMessage?.contextInfo?.quotedMessage ||
      message?.message?.videoMessage?.contextInfo?.quotedMessage ||
      message?.message?.audioMessage?.contextInfo?.quotedMessage;

    if (!qMsg) {
      return reply("```කරුණාකර ViewOnce message එකකට reply කරන්න```");
    }

    // bot number
    const botNumber = sock.user.id;

    // ===== IMAGE =====
    if (qMsg.imageMessage?.viewOnce) {

      const tempFile = await sock.downloadAndSaveMediaMessage({
        message: { imageMessage: qMsg.imageMessage }
      });

      const caption = qMsg.imageMessage.caption || "VIEWONCE IMAGE 🔓";

      return sock.sendMessage(botNumber, {
        image: { url: tempFile },
        caption
      });
    }

    // ===== VIDEO =====
    if (qMsg.videoMessage?.viewOnce) {

      const tempFile = await sock.downloadAndSaveMediaMessage({
        message: { videoMessage: qMsg.videoMessage }
      });

      const caption = qMsg.videoMessage.caption || "VIEWONCE VIDEO 🔓";

      return sock.sendMessage(botNumber, {
        video: { url: tempFile },
        caption
      });
    }

    // ===== AUDIO =====
    if (qMsg.audioMessage?.viewOnce) {

      const tempFile = await sock.downloadAndSaveMediaMessage({
        message: { audioMessage: qMsg.audioMessage }
      });

      const caption = qMsg.audioMessage.caption || "VIEWONCE AUDIO 🔓";

      return sock.sendMessage(botNumber, {
        audio: { url: tempFile },
        caption,
        mimetype: "audio/mp4"
      });
    }

    return reply("```මෙය ViewOnce message එකක් නොවේ!```");

  } catch (e) {
    console.log(e);
    reply("❌ Error: " + e);
  }

});
