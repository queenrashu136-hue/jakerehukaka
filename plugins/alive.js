const os = require("os");
const axios = require("axios");
const { cmd, commands } = require("../lib/command");
const { runtime, sleep } = require("../lib/functions");

// ===========================================
//  TEST1 COMMAND – FIRST INSTANCE
// ===========================================
cmd({
  pattern: "alive",
  alias: ["help1", "status"],
  desc: "Command list withalive button.",
  category: "main",
  use: ".alive",
  react: "👋",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {
    await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");

    const des = "*🪄 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Alive Now...*\n\n*👋 Hye Mage Manika .....❤️‍🩹🫂🪄*\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '𝐂𝐋𝐈𝐂𝐊 𝐇𝐄𝐑𝐄 🪄',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  rows: [
                    { title: 'MENU 📖', description: 'ꜱʜᴏᴡ ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ', id: `${prefix}menu` },
                    { title: 'PING 🔮', description: 'ꜱʜᴏᴡ ᴛᴇꜱᴛ ʙᴏᴛ ꜱᴘᴇᴇᴅ', id: `${prefix}ping2` },
                    { title: 'OWNER 👑', description: 'ᴄᴏɴᴛᴀᴄᴛ ʙᴏᴛ ᴏᴡɴᴇʀ', id: `${prefix}owner` },
                    { title: 'SYSTEM 🕹️', description: 'ꜱʜᴏᴡ ʙᴏᴛ ꜱʏꜱᴛᴇᴍ ᴘᴀɴᴇʟ', id: `${prefix}system` },
                  ]
                }
              ]
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      image: { url: "https://files.catbox.moe/l74kdf.jpg" },
      caption: des
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred while generating menu.");
  }
});


