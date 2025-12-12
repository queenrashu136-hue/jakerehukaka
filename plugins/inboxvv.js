const {
    default: makeWASocket,
    getAggregateVotesInPollMessage,
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    delay,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const FileType = require('file-type')
const config = require('../settings')
const { cmd, commands } = require('../lib/command')


//=====================================================
//     COMBINED VIEW-ONCE DECRYPT COMMAND
//     Sends the decrypted media to botNumber only
//=====================================================

const commandvv = {
  pattern: 'vv0',
  alias: ["decvv", "vv2", "rvo2"],
  desc: 'ViewOnce Media Downloader',
  category: "owner",
  use: ".vv",
  filename: __filename
};


cmd(commandvv, async (sock, message, msgData, {
  from,
  quoted,
  isOwner,
  botNumber,
  botNumber2,
  reply
}) => {

  try {
    const qMsg = msgData?.msg?.contextInfo?.quotedMessage;

    // No quoted message
    if (!qMsg) {
      return reply("```කරුණාකර ViewOnce පණිවිඩයකට reply කරන්න!```");
    }

    // Bot deploy number auto-select
    const targetSend = botNumber || botNumber2;

    //============================
    //     VIEW-ONCE IMAGE
    //============================
    if (qMsg.imageMessage?.viewOnce) {
      let caption = qMsg.imageMessage.caption || "> POWERED BY QUEEN RASHU MD 🫟";
      let mediaPath = await sock.downloadAndSaveMediaMessage(qMsg.imageMessage);

      return sock.sendMessage(
        targetSend,
        {
          image: { url: mediaPath },
          caption
        }
      );
    }

    //============================
    //     VIEW-ONCE VIDEO
    //============================
    if (qMsg.videoMessage?.viewOnce) {
      let caption = qMsg.videoMessage.caption || "> POWERED BY QUEEN RASHU MD 🫟";
      let mediaPath = await sock.downloadAndSaveMediaMessage(qMsg.videoMessage);

      return sock.sendMessage(
        targetSend,
        {
          video: { url: mediaPath },
          caption
        }
      );
    }

    //============================
    //     VIEW-ONCE AUDIO
    //============================
    if (qMsg.audioMessage?.viewOnce) {
      let caption = qMsg.audioMessage.caption || "> POWERED BY QUEEN RASHU MD 🫟";
      let mediaPath = await sock.downloadAndSaveMediaMessage(qMsg.audioMessage);

      return sock.sendMessage(
        targetSend,
        {
          audio: { url: mediaPath },
          caption
        }
      );
    }

    //============================
    //     NOT VIEW-ONCE
    //============================
    return reply("```මෙය ViewOnce message එකක් නෙවෙයි!```");

  } catch (err) {
    console.log("Error in VV command:", err);
    return reply("❌ Error: " + err);
  }

});
