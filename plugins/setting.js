const { cmd, commands } = require("../lib/command");
const config = require("../settings");
var { get_set, input_set } = require("../lib/set_db");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require("../lib/functions");
const axios = require("axios");
const botPrefix = config.PREFIX;

const commandSettings = {
  pattern: "setting",
  react: "⚙️",
  alias: ["settings", "st", "botsetting"],
  desc: "Configure bot settings",
  category: "owner",
  use: ".settings",
  filename: __filename
};

cmd(commandSettings, async (bot, message, args, context) => {
  const {
    from, prefix, isMe, isOwner, reply
  } = context;

  try {
    if (!isMe && !isOwner) {
      return await reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Bot Owner Only 👤...*\n> ඔයා ඉතිම් Owner කෙනෙක් නෙවේනෙ මෝඩයෝ 🤭");
    }
    
    const settingsMenu = [
      {
      'title': "`❬❬ [01] ᴡᴏʀᴋ ᴛʏᴘᴇ ❭❭`",
      'rows': [{
        'title': "   1.1",
        'description': "*ᴘᴜʙʟɪᴄ 🌎*",
        'rowId': botPrefix + "mode public"
      }, {
        'title': "   1.2",
        'description': "*ᴘʀɪᴠᴀᴛᴇ 🔕*",
        'rowId': botPrefix + "mode private"
      }, {
        'title': "   1.3",
        'description': "*ɢʀᴏᴜᴘ 📭*",
        'rowId': botPrefix + "mode groups"
      }, {
        'title': "   1.4",
        'description': "*ɪɴʙᴏx ✉️*",
        'rowId': botPrefix + "mode inbox"
      }]
    }, {
      'title': "`❬❬ [02] ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ ❭❭`",
      'rows': [{
        'title': "   2.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autovoice true"
      }, {
        'title': "   2.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autovoice false"
      }]
    }, {
      'title': "`❬❬ [03] ᴀᴜᴛᴏ ꜱᴛɪᴄᴋᴇʀ ❭❭`",
      'rows': [{
        'title': "   3.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autosticker true"
      }, {
        'title': "   3.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autosticker false"
      }]
    }, {
      'title': "`❬❬ [04] ᴀᴜᴛᴏ ʀᴇᴘʟʏ ❭❭`",
      'rows': [{
        'title': "   4.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autoreply true"
      }, {
        'title': "   4.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autoreply false"
      }]
    }, {
      'title': "`❬❬ [05] ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ꜱᴇᴇɴ ❭❭`",
      'rows': [{
        'title': "   5.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autoreadsratus true"
      }, {
        'title': "   5.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autoreadsratus false"
      }]
    }, {
      'title': "`❬❬ [06] ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ʀᴇᴀᴄᴛ ❭❭`",
      'rows': [{
        'title': "   6.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autoreactsratus true"
      }, {
        'title': "   6.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autoreactsratus false"
      }]
      }, {
      'title': "`❬❬ [07] ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴍꜱɢ ❭❭`",
      'rows': [{
        'title': "   7.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "sratusreply true"
      }, {
        'title': "   7.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "sratusreply false"
      }]
    }, {
      'title': "`❬❬ [08] ʙᴏᴛ ᴀʟᴡᴀʏꜱ ᴏɴʟɪɴᴇ ❭❭`",
      'rows': [{
        'title': "   8.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "alwaysoffline true"
      }, {
        'title': "   8.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "alwaysoffline false"
      }]
    }, {
      'title': "`❬❬ [09] ʙᴏᴛ ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ ❭❭`",
      'rows': [{
        'title': "   9.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "typing true"
      }, {
        'title': "   9.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "typing false"
      }]
    }, {
      'title': "`❬❬ [10] ʙᴏᴛ ᴀᴜᴛᴏ ʀᴇᴄᴏᴅɪɴɢ ❭❭`",
      'rows': [{
        'title': "   10.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "recording true"
      }, {
        'title': "   10.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "recording false"
      }]
    }, {
      'title': "`❬❬ [11] ᴍᴇꜱꜱᴀɢᴇ ʀᴇᴀᴅ ❭❭`",
      'rows': [{
        'title': "   11.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "readmsg true"
      }, {
        'title': "   11.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "readmsg false"
      }]
    }, {
      'title': "`❬❬ [12] ᴍᴇꜱꜱᴀɢᴇ ᴄᴍᴅ ❭❭`",
      'rows': [{
        'title': "   12.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "readcommand true"
      }, {
        'title': "   12.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "readcommand false"
      }]
    }, {
      'title': "`❬❬ [13] ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ ❭❭`",
      'rows': [{
        'title': "   13.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autoreact true"
      }, {
        'title': "   13.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autoreact false"
      }]
    }, {
      'title': "`❬❬ [14] ᴀɴᴛɪ ʟɪɴᴋ ❭❭`",
      'rows': [{
        'title': "   14.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "antilink true"
      }, {
        'title': "   14.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "antilink false"
      }]
    }, {
      'title': "`❬❬ [15] ᴀɴᴛɪ ᴅᴇʟᴇᴛᴇ ❭❭`",
      'rows': [{
        'title': "   15.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "antidelet true"
      }, {
        'title': "   15.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "antidelet false"
      }]
     }, {
      'title': "`❬❬ [16] ᴀɴᴛɪ ᴄᴀʟʟ ❭❭`",
      'rows': [{
        'title': "   16.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "anticall true"
      }, {
        'title': "   16.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "anticall false"
      }]
    }, {
      'title': "`❬❬ [17] ᴀɴᴛɪ ʙᴀᴅ ❭❭`",
      'rows': [{
        'title': "   17.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "antibad true"
      }, {
        'title': "   17.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "antibad false"
      }]
    }, {
      'title': "`❬❬ [18] ᴀɴᴛɪ ʙᴏᴛ ❭❭`",
      'rows': [{
        'title': "   18.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "antibot true"
      }, {
        'title': "   18.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "antibot false"
      }]
          }, {
      'title': "`❬❬ [19] ᴀᴜᴛᴏ ʙʟᴏᴄᴋ ❭❭`",
      'rows': [{
        'title': "   19.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "autoblock true"
      }, {
        'title': "   19.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "autoblock false"
      }]
          }, {
      'title': "`❬❬ [19] ᴀᴜᴛᴏ ʙʟᴏᴄᴋ 212 ❭❭`",
      'rows': [{
        'title': "   20.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "badno true"
      }, {
        'title': "   20.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "badno false"
      }]
          }, {
      'title': "`❬❬ [21] ᴀɪ ᴄʜᴀᴛ ʙᴏᴛ ❭❭`",
      'rows': [{
        'title': "   21.1",
        'description': "*True  🪄*",
        'rowId': botPrefix + "aichat true"
      }, {
        'title': "   21.2",
        'description': "*False 🔒*",
        'rowId': botPrefix + "aichat false"
      }]
    }];
    const settingsPanel = {
      image: { url: 'https://i.ibb.co/7N087ZHh/Queen-Rashu-Md.jpg' },
      caption: "*⚙️ 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Custome Settings ....*",
      footer: "> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟",
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: settingsMenu
    };

    const options = {
      quoted: message
    };

    return await bot.replyList(from, settingsPanel, options);

  } catch (error) {
    console.log(error);
    reply(`${e}`);
  }
});

//=================================================================

const mode = {
  pattern: "mode",
  dontAddCommandList: true,
  filename: __filename
};

cmd(mode, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.MODE === q) return reply("already on");
  await input_set("MODE", q);
  reply(`*MODE turned ${q}*`);
});

//=================================================================

const autoreadsratus = {
  pattern: "autoreadsratus",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autoreadsratus, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_READ_STATUS === q) return reply("already on");
  await input_set("AUTO_READ_STATUS", q);
  reply(`*AUTO_READ_STATUS turned ${q}*`);
});

//=================================================================

const autoreactsratus = {
  pattern: "autoreactsratus",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autoreactsratus, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_REACT_STATUS === q) return reply("already on");
  await input_set("AUTO_REACT_STATUS", q);
  reply(`*AUTO_REACT_STATUS turned ${q}*`);
});

//=================================================================

const sratusreply = {
  pattern: "sratusreply",
  dontAddCommandList: true,
  filename: __filename
};

cmd(sratusreply, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_STATUS_REPLY === q) return reply("already on");
  await input_set("AUTO_STATUS_REPLY", q);
  reply(`*AUTO_STATUS_REPLY turned ${q}*`);
});

//=================================================================

const autoreply = {
  pattern: "autoreply",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autoreply, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_REPLY === q) return reply("already on");
  await input_set("AUTO_REPLY", q);
  reply(`*AUTO_REPLY turned ${q}*`);
});

//=================================================================

const autovoice = {
  pattern: "autovoice",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autovoice, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_VOICE === q) return reply("already on");
  await input_set("AUTO_VOICE", q);
  reply(`*AUTO_VOICE turned ${q}*`);
});

//=================================================================

const autosticker = {
  pattern: "autosticker",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autosticker, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_STICKER === q) return reply("already on");
  await input_set("AUTO_STICKER", q);
  reply(`*AUTO_STICKER turned ${q}*`);
});

//=================================================================

const antibad = {
  pattern: "antibad",
  dontAddCommandList: true,
  filename: __filename
};

cmd(antibad, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ANTI_BAD === q) return reply("already on");
  await input_set("ANTI_BAD", q);
  reply(`*ANTI_BAD turned ${q}*`);
});

//=================================================================

const antilink = {
  pattern: "antilink",
  dontAddCommandList: true,
  filename: __filename
};

cmd(antilink, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ANTI_LINK === q) return reply("already on");
  await input_set("ANTI_LINK", q);
  reply(`*ANTI_LINK turned ${q}*`);
});

//=================================================================

const autoblock = {
  pattern: "autoblock",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autoblock, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_BLOCK === q) return reply("already on");
  await input_set("AUTO_BLOCK", q);
  reply(`*AUTO_BLOCK turned ${q}*`);
});

//=================================================================

const antibot = {
  pattern: "antibot",
  dontAddCommandList: true,
  filename: __filename
};

cmd(antibot, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ANTI_BOT === q) return reply("already on");
  await input_set("ANTI_BOT", q);
  reply(`*ANTI_BOT turned ${q}*`);
});

//=================================================================

const alwaysoffline = {
  pattern: "alwaysoffline",
  dontAddCommandList: true,
  filename: __filename
};

cmd(alwaysoffline, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ALLWAYS_OFFLINE === q) return reply("already on");
  await input_set("ALLWAYS_OFFLINE", q);
  reply(`*ALLWAYS_OFFLINE turned ${q}*`);
});

//=================================================================

const readcommand = {
  pattern: "readcommand",
  dontAddCommandList: true,
  filename: __filename
};

cmd(readcommand, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.READ_CMD === q) return reply("already on");
  await input_set("READ_CMD", q);
  reply(`*READ_CMD turned ${q}*`);
});

//=================================================================

const readmsg = {
  pattern: "readmsg",
  dontAddCommandList: true,
  filename: __filename
};

cmd(readmsg, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.READ_MESSAGE === q) return reply("already on");
  await input_set("READ_MESSAGE", q);
  reply(`*READ_MESSAGE turned ${q}*`);
});

//=================================================================

const recording = {
  pattern: "recording",
  dontAddCommandList: true,
  filename: __filename
};

cmd(recording, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ALWAYS_RECORDING === q) return reply("already on");
  await input_set("ALWAYS_RECORDING", q);
  reply(`*ALWAYS_RECORDING turned ${q}*`);
});

//=================================================================

const autoreact = {
  pattern: "autoreact",
  dontAddCommandList: true,
  filename: __filename
};

cmd(autoreact, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AUTO_REACT === q) return reply("already on");
  await input_set("AUTO_REACT", q);
  reply(`*AUTO_REACT turned ${q}*`);
});

//=================================================================

const badno = {
  pattern: "badno",
  dontAddCommandList: true,
  filename: __filename
};

cmd(badno, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.BAD_NO_BLOCK === q) return reply("already on");
  await input_set("BAD_NO_BLOCK", q);
  reply(`*BAD_NO_BLOCK turned ${q}*`);
});

//=================================================================

const aichat = {
  pattern: "aichat",
  dontAddCommandList: true,
  filename: __filename
};

cmd(aichat, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.AI_CHAT === q) return reply("already on");
  await input_set("AI_CHAT", q);
  reply(`*AI_CHAT turned ${q}*`);
});

//=================================================================

const anticall = {
  pattern: "anticall",
  dontAddCommandList: true,
  filename: __filename
};

cmd(anticall, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ANTI_CALL === q) return reply("already on");
  await input_set("ANTI_CALL", q);
  reply(`*ANTI_CALL turned ${q}*`);
});

//=================================================================

const typing = {
  pattern: "typing",
  dontAddCommandList: true,
  filename: __filename
};

cmd(typing, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ALWAYS_TYPING === q) return reply("already on");
  await input_set("ALWAYS_TYPING", q);
  reply(`*ALWAYS_TYPING turned ${q}*`);
});

//=================================================================

const antidelet = {
  pattern: "antidelet",
  dontAddCommandList: true,
  filename: __filename
};

cmd(antidelet, async (context, options, parameters, { q, isMe, isOwner, reply }) => {
  if (!isMe && !isOwner) return reply("*👨‍💻 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Owner Only...*");
  if (config.ANTI_DELETE === q) return reply("already on");
  await input_set("ANTI_DELETE", q);
  reply(`*ANTI_DELETE turned ${q}*`);
});
