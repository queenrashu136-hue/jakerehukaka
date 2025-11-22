const { cmd } = require("../lib/command");
const fs = require("fs");
const { exec } = require("child_process");

cmd({
    pattern: "totext",
    desc: "Convert audio or voice to text without API",
    react: "🎧"
}, async (sock, message) => {
    try {
        const q = message?.message?.extendedTextMessage?.contextInfo;
        const audioMsg = q?.quotedMessage?.audioMessage;

        if (!audioMsg) {
            return await sock.sendMessage(message.key.remoteJid, { text: "🎤 *Reply to a voice/mp3 file!*" });
        }

        // Download audio
        const buffer = await sock.downloadMediaMessage({
            key: {
                remoteJid: message.key.remoteJid,
                id: q.stanzaId,
                participant: q.participant
            },
            message: q.quotedMessage
        });

        // Save MP3
        fs.writeFileSync("./voice.mp3", buffer);

        // Convert to WAV
        await new Promise((resolve, reject) => {
            exec("ffmpeg -y -i voice.mp3 voice.wav", (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Convert WAV → TEXT using Whisper.cpp
        await new Promise((resolve, reject) => {
            exec("./whisper.cpp/main -m ./whisper.cpp/models/ggml-base.bin -f voice.wav -otxt", (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Read transcription.txt
        let text = fs.readFileSync("voice.wav.txt", "utf8");

        await sock.sendMessage(message.key.remoteJid, { text: "📝 *Transcription:*\n\n" + text });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(message.key.remoteJid, { text: "❌ Error converting audio." });
    }
});
