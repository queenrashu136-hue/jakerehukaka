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
const {cmd , commands} = require('../lib/command')


const commandvv = {
  pattern: 'vv',
  alias: ["decvv"],
  desc: 'vv',
  category: "owner",
  use: ".vv",
  filename: __filename
};

cmd(commandvv, async (client, message, args, { from: chatId,l: language,quoted: quotedMessage,body: messageBody,isCmd: isCommand,command: commandName,args: commandArgs,q: query,isGroup: isGroupChat,sender: senderInfo,senderNumber: senderPhoneNumber,botNumber2: botSecondaryNumber,botNumber: botPrimaryNumber,pushname: senderName,isMe: isBot,isOwner: isOwner,groupMetadata: groupInfo,groupName: groupName,participants: groupParticipants,groupAdmins: groupAdmins,isBotAdmins: isBotAdmin,isAdmins: isAdmin,
  reply: replyFunction
}) => {
  //await typing(client, readConfig, chatId);

  try {
    if (quotedMessage && quotedMessage.videoMessage && quotedMessage.videoMessage.viewOnce) {
      const decryptingMessage = {
        text: "🔓 *Decrypting the ViewOnce Video Message...*"
      };
      const messageOptions = {
        quoted: message
      };
      const sentMessage = await client.sendMessage(chatId, decryptingMessage, messageOptions);
      //await sleep(1000);
      const caption = quotedMessage.videoMessage.caption || "> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟";
      await client.sendMessage(chatId, {
        video: await quotedMessage.download(),
        caption: caption
      }, messageOptions);
      const deleteMessage = {
        delete: sentMessage
      };
      return await client.sendMessage(chatId, deleteMessage);
    } else if (quotedMessage && quotedMessage.imageMessage && quotedMessage.imageMessage.viewOnce) {
      const decryptingMessage = {
        text: "🔓 *Decrypting the ViewOnce Image Message...*"
      };
      const messageOptions = {
        quoted: message
      };
      const sentMessage = await client.sendMessage(chatId, decryptingMessage, messageOptions);
      //await sleep(1000);
      const caption = quotedMessage.imageMessage.caption || "> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟";
      await client.sendMessage(chatId, {
        image: await quotedMessage.download(),
        caption: caption
      }, messageOptions);
      const deleteMessage = {
        delete: sentMessage
      };
      return await client.sendMessage(chatId, deleteMessage);
    } else if (quotedMessage && quotedMessage.audioMessage && quotedMessage.audioMessage.viewOnce) {
      const decryptingMessage = {
        text: "🔓 *Decrypting the ViewOnce Audio Message...*"
      };
      const messageOptions = {
        quoted: message
      };
      const sentMessage = await client.sendMessage(chatId, decryptingMessage, messageOptions);
      //await sleep(1000);
      const caption = quotedMessage.audioMessage.caption || "> 𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳";
      await client.sendMessage(chatId, {
        audio: await quotedMessage.download(),
        caption: caption
      }, messageOptions);
      const deleteMessage = {
        delete: sentMessage
      };
      return await client.sendMessage(chatId, deleteMessage);
    } else {
      replyFunction("*❌ Please give me a ViewOnce Message*");
    }
    } catch (error) {
    console.log(error);
    reply('' + error);
  }
});

const commandrvo = {
  pattern: "vv2",
  react: "🌠",
  alias: ["rvo2"],
  desc: "Check bot's ping",
  category: "owner",
  use: ".vv2",
  filename: __filename
};

cmd(commandrvo, async (sock, message, msgData, { from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,
  reply
}) => {
  try {
    const quotedMsg = msgData?.msg?.contextInfo?.quotedMessage;

    if (quotedMsg) {
      if (quotedMsg.imageMessage?.viewOnce) {
        console.log("Detected a View Once image");
        let caption = quotedMsg.imageMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.imageMessage);

        const mediaObject = { url: mediaPath };
        const response = { image: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else if (quotedMsg.videoMessage?.viewOnce) {
        console.log("Detected a View Once video");
        let caption = quotedMsg.videoMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.videoMessage);

        const mediaObject = { url: mediaPath };
        const response = { video: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else if (quotedMsg.audioMessage?.viewOnce) {
        console.log("Detected a View Once audio");
        let caption = quotedMsg.audioMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.audioMessage);

        const mediaObject = { url: mediaPath };
        const response = { audio: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else {
        return reply("```මෙය ViewOnce පණිවිඩයක් නොවේ!```"); // "This is not a View Once message!"
      }
    } 
    
    else {
      return reply("```කරුණාකර ViewOnce පණිවිඩයකට reply කරන්න!```"); // "Please reply to a View Once message!"
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
