const { cmd } = require('../lib/command');
const fs = require('fs');
const bannedPath = './data/banned.json';

// ─────────────── BAN COMMAND ───────────────

cmd({
  pattern: "ban",
  category: "owner",
  desc: "Ban a user from using the bot",
  filename: __filename,
}, async (conn, mek, m, { sender, isOwner, args, mentionByTag, reply }) => {
  try {
    if (!isOwner) return reply("❌ Only the bot owner can use this command.");

    let target;
    if (mentionByTag?.length > 0) {
      target = mentionByTag[0];
    } else if (args[0]) {
      target = args[0].replace(/\D/g, "") + "@s.whatsapp.net";
    } else if (m.quoted?.sender) {
      target = m.quoted.sender;
    } else {
      return reply("⚠️ Tag, reply or give a number to ban.");
    }

    let banned = [];
    if (fs.existsSync(bannedPath)) {
      banned = JSON.parse(fs.readFileSync(bannedPath));
    }

    if (banned.includes(target)) {
      return reply("✅ User is already banned.");
    }

    banned.push(target);
    fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));

    reply(`✅ Successfully banned: @${target.split("@")[0]}`, { mentions: [target] });

  } catch (err) {
    return reply(`❌ Error: ${err.message}`);
  }
});

// ─────────────── UNBAN COMMAND ───────────────

cmd({
  pattern: "unban",
  category: "owner",
  desc: "Unban a user",
  filename: __filename,
}, async (conn, mek, m, { sender, isOwner, args, mentionByTag, reply }) => {
  try {
    if (!isOwner) return reply("❌ Only the bot owner can use this command.");

    let target;
    if (mentionByTag?.length > 0) {
      target = mentionByTag[0];
    } else if (args[0]) {
      target = args[0].replace(/\D/g, "") + "@s.whatsapp.net";
    } else if (m.quoted?.sender) {
      target = m.quoted.sender;
    } else {
      return reply("⚠️ Tag, reply or give a number to unban.");
    }

    let banned = [];
    if (fs.existsSync(bannedPath)) {
      banned = JSON.parse(fs.readFileSync(bannedPath));
    }

    if (!banned.includes(target)) {
      return reply("⚠️ User is not banned.");
    }

    banned = banned.filter(u => u !== target);
    fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));

    reply(`✅ Unbanned: @${target.split("@")[0]}`, { mentions: [target] });

  } catch (err) {
    return reply(`❌ Error: ${err.message}`);
  }
});

// ─────────────── BANLIST COMMAND ───────────────

cmd({
  pattern: "banlist",
  category: "owner",
  desc: "View all banned numbers",
  filename: __filename,
}, async (conn, mek, m, { sender, isOwner, reply }) => {
  try {
    if (!isOwner) return reply("❌ Only the bot owner can use this command.");

    if (!fs.existsSync(bannedPath)) {
      return reply("📂 No banned users found.");
    }

    const banned = JSON.parse(fs.readFileSync(bannedPath));

    if (banned.length === 0) {
      return reply("✅ No users are currently banned.");
    }

    let text = `🚫 *Banned Users List:*\n\n`;

    banned.forEach((jid, i) => {
      const number = jid.split("@")[0];
      text += `${i + 1}. wa.me/${number} (@${number})\n`;
    });

    return reply(text);

  } catch (err) {
    return reply(`❌ Error: ${err.message}`);
  }
});
