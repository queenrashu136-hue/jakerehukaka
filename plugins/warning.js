const fs = require('fs');
const path = require('path');
const { cmd } = require('../lib/command');

const dbPath = path.join(__dirname, '../data/warnings.json');

const loadDB = () => JSON.parse(fs.readFileSync(dbPath));
const saveDB = (db) => fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

/* ================= ADD BLOCKED COMMAND ================= */
cmd({
  pattern: "addblock",
  desc: "Add blocked command",
  react: "➕",
  filename: __filename
}, async (conn, mek, m, { from, args, isGroup, isAdmin, isOwner, reply }) => {

  if (!isGroup) return reply("❌ Group only!");
  if (!isAdmin && !isOwner) return reply("❌ Admin only!");

  if (!args[0]) return reply("Usage: .addblock <command>");

  const db = loadDB();
  const cmdName = args[0].toLowerCase();

  if (db.blockedCmds.includes(cmdName))
    return reply("⚠️ Already blocked!");

  db.blockedCmds.push(cmdName);
  saveDB(db);

  reply(`✅ Command blocked: *${cmdName}*`);
});

/* ================= REMOVE BLOCKED COMMAND ================= */
cmd({
  pattern: "rmblock",
  desc: "Remove blocked command",
  react: "➖",
  filename: __filename
}, async (conn, mek, m, { from, args, isGroup, isAdmin, isOwner, reply }) => {

  if (!isGroup) return reply("❌ Group only!");
  if (!isAdmin && !isOwner) return reply("❌ Admin only!");

  const db = loadDB();
  db.blockedCmds = db.blockedCmds.filter(c => c !== args[0]);
  saveDB(db);

  reply(`✅ Command unblocked: *${args[0]}*`);
});

/* ================= LIST BLOCKED COMMANDS ================= */
cmd({
  pattern: "blocklist",
  desc: "List blocked commands",
  react: "📄",
  filename: __filename
}, async (conn, mek, m, { reply }) => {

  const db = loadDB();
  if (db.blockedCmds.length === 0)
    return reply("✅ No blocked commands.");

  reply("🚫 *Blocked Commands:*\n\n" + db.blockedCmds.map(c => `• ${c}`).join("\n"));
});

/* ================= RESET WARNINGS ================= */
cmd({
  pattern: "resetwarn",
  desc: "Reset user warnings",
  react: "♻️",
  filename: __filename
}, async (conn, mek, m, { from, mentionedJid, isGroup, isAdmin, isOwner, reply }) => {

  if (!isGroup) return reply("❌ Group only!");
  if (!isAdmin && !isOwner) return reply("❌ Admin only!");

  const user = mentionedJid[0];
  if (!user) return reply("Tag a user!");

  const db = loadDB();
  delete db.users[user];
  saveDB(db);

  reply("✅ Warnings reset!");
});

/* ================= MAIN LISTENER ================= */
cmd({
  on: "body"
}, async (conn, mek, m, { from, body, isGroup, sender, isAdmin }) => {

  if (!isGroup || isAdmin) return;

  const db = loadDB();
  const usedCmd = body.split(" ")[0].replace(".", "").toLowerCase();

  if (!db.blockedCmds.includes(usedCmd)) return;

  if (!db.users[sender]) db.users[sender] = 0;
  db.users[sender] += 1;

  saveDB(db);

  if (db.users[sender] < 3) {
    await conn.sendMessage(from, {
      text: `⚠️ Warning ${db.users[sender]}/3\n🚫 Command *${usedCmd}* is blocked!`
    }, { quoted: m });
  } else {
    await conn.sendMessage(from, {
      text: `❌ 3 Warnings reached!\n👢 Removing user...`
    }, { quoted: m });

    await conn.groupParticipantsUpdate(from, [sender], "remove");
    delete db.users[sender];
    saveDB(db);
  }
});
