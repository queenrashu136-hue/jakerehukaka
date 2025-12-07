const os = require("os");
const axios = require("axios");
const { cmd, commands } = require("../lib/command");
const { runtime, sleep } = require("../lib/functions");

// ===========================================
//  TEST1 COMMAND – FIRST INSTANCE
// ===========================================
cmd({
  pattern: "help",
  alias: ["help1", "help2", "helplist", "helppanel"],
  desc: "Command list with menu button.",
  category: "main",
  use: ".menu",
  react: "📂",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {
    await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");

    const des = "*📖 𝐒𝐄𝐋𝐄𝐂𝐓 𝐘𝐎𝐔𝐑 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃....*\n\n*කරුණාකර පහත Select Language Button එක ස්පර්ශ කරන්න.*\n\n*Please touch the Select Language Button below.*\n\n*कृपया नीचे भाषा चुनें बटन स्पर्श करें।*\n\n*கீழே உள்ள மொழியைத் தேர்ந்தெடு பொத்தானைத் தொடவும்.*\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 🫟";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'SELECT LANGUAGE',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  rows: [
                    { title: 'සිංහල', description: 'සියල්ල සින්හල භාශාවෙන්', id: `${prefix}sinhalarashu` },
                    { title: 'ENGLISH', description: 'All In English', id: `${prefix}englishrashu` },
                    { title: 'हिंदी', description: 'सब हिंदी में', id: `${prefix}hindirashu` },
                    { title: 'தமிழ்', description: 'அனைத்தும் தமிழில்', id: `${prefix}thamilrashu` },
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


// ===========================================
//  TEST1 COMMAND – Sinhala 
// ===========================================
cmd({
  pattern: "sinhalarashu",
  desc: "Duplicate of Test1 command with menu button.",
  category: "main",
  use: ".menu",
  react: "🇱🇰",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {
    await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");

    const des = "*💗 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐎𝐓 යනු Nipun Harshana ( Rashu ) වන අයිති කරු විසින් නිර්මාණය කරන ලද ඔබට සහ මටද Social Media කාර් යයන් පහසුවෙන් නිම කර ගැනීම සදහා නිර්මාණය කර ඇති WhatsApp Bot කෙනෙකි.*\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 🫟";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'SELECT LANGUAGE',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  rows: [
                    { title: 'මුල් පිටුවට', description: 'නැවත මුල සිට', id: `${prefix}help` },
                    { title: 'සියලුම විදාන', description: 'විදාන පිටුව', id: `${prefix}menu` },
                    { title: 'අප සමග සම්බන්ද වීමට', description: 'Owner Contact', id: `${prefix}alive` },
                    { title: 'බොට් වේගය', description: 'බොට්ගේ වේගය', id: `${prefix}ping` },
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


// ===========================================
//  TEST1 COMMAND – THIRD INSTANCE
// ===========================================
cmd({
  pattern: "test1",
  alias: ["test2", "commands", "list", "panel"],
  desc: "Third duplicate of Test1 command with menu button.",
  category: "main",
  use: ".menu",
  react: "📂",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {
    await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");

    const des = "*📖 𝐒𝐄𝐋𝐄𝐂𝐓 𝐘𝐎𝐔𝐑 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃....*\n\n*කරුණාකර පහත Select Language Button එක ස්පර්ශ කරන්න.*\n\n*Please touch the Select Language Button below.*\n\n*कृपया नीचे भाषा चुनें बटन स्पर्श करें।*\n\n*கீழே உள்ள மொழியைத் தேர்ந்தெடு பொத்தானைத் தொடவும்.*\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 🫟";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'SELECT LANGUAGE',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  rows: [
                    { title: 'සිංහල', description: 'සියල්ල සින්හල භාශාවෙන්', id: `${prefix}sinhalarashu` },
                    { title: 'ENGLISH', description: 'All In English', id: `${prefix}englishrashu` },
                    { title: 'हिंदी', description: 'सब हिंदी में', id: `${prefix}hindirashu` },
                    { title: 'தமிழ்', description: 'அனைத்தும் தமிழில்', id: `${prefix}thamilrashu` },
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
