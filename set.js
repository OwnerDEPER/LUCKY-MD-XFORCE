const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0UxOUhhelBTQ1FxMWFWN1A0OXVTVXlkNXU0RlV3b1paM25kdTc4bWNYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKytsOW9NS2JSeEdzTnlUOUtRR0Fnd3dwUXQyY2ROUmlvSWR0L0NZV05sbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5UEpWeHI1S1A5Q2lMWU0yM1EwTE8yWlJzRGRaNU5SYWEzUFN6NGVmRjBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNdjhFWnVsbmZ1WGZPKzFJem9qMW5TWVRoUGVoOXUydEt2d0VQYXppL1Y0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9DTDZuVjYwdFB6UlVUNmlLSFBZSkRnNnpKU2VTZlBqcWRNU1Z0K1U2bWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im90U1NCK3pHM3dHaVRsRUkxRytqYVYwVFhiajN6cjRvT0NWVTBTNVA3SFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0cvUE51QXF3ZXhvSVk1eWc1a0o4aklQZkxPSERpQ2lqTkhQcFNDOVluMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHJJWnA1U1pyd28yQW9GRFUxWVRFaUNuOGR5TVVMOW45cERpS1lyUEtGYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitETGJnams0VEQ1WUpINUFLSll6OVlrZVF1MDByeE95VUtReTNkWDN6Z0hVVXFDc05Xb09iUHYrQlZaZ1NvUXRibEJLS1kxT0pyZ0w1Yk1KdTNtaUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiIwcTZXbXVZRmFSNWh0dWJ3R09VelNIaWNJZ0ZMc0JFR0ZVSXNpYys0Q1g4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBFMEZEMTZCQ0M5MTEzREFBRjM0MEM1MEUwMjczOTJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4NDh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMzQjI2MkE2MzVEQkY1NDc1MkFCQjI4OURFRTU1MEIwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4NDl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjUzQTAxMTBBOEJERTlCODBBNjcwNTEyRTAyN0VFRTlBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4Nzh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZGNzdGOTVDMjYxOTMwREFCNkFEQzQxREFBQzcwMDREIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4ODR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRFNDUxNEFBOEMwMkREQzc5MkEyQTA2NkY5QkZBNjExIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4ODl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjczOEY3N0JFQjUzMDk3RDQwMDIxQkJFRDU3RjMzMUI4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1ODQ4OTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkoxRUgxQU4xIiwibWUiOnsiaWQiOiI1MTk0MTg0NzQ2NTo1OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTeXNzb2x1dGlvbnMiLCJsaWQiOiI1NTczNjQyODE4Nzc0NDo1OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xmazJQMERFTU9wbHNRR0dCMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpnWE9XYmpSM09mTWplWDgyeWJEYXdqTVFuQmxEZjZTdEIvbDkrWjBzRHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdGUzFPLzBjSHpoR0hoTW01TnJ2UmFsYzFmYnhXYkUxaTFyTkdYQXVBZ25CMVhHY1ZkTmM1WWVZbitrZ3VyV0VmSGdEMlpxTUlhd1owU05uMnRwT0NnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1aXJpeUNuU1VMWWNmY2dNeFBDY0diODhhaTROYzhBeElLM2VLZ1J6ZkJUVzVtdUp4WmhnYmNPMlNzMGFIS1o2NjJtMFppNC8rUjRqbHB5QXdLeFRBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUxOTQxODQ3NDY1OjU5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmM0RnpsbTQwZHpuekkzbC9Oc213MnNJekVKd1pRMytrclFmNWZmbWRMQTcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzU4NDg0NywibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJFSiJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "FrediEzra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51941847465",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT_HOME: process.env.AUTO_REACT_HOME_MESSAGE || "non",
    AUTO_REACT_AWAY : process.env.AUTO_REACT_AWAY_MESSAGE || "no", 
    AUTO_REACT_GROUP : process.env.AUTO_REACT_GROUP_MESSAGE || "no", 
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET_MESSAGE : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "America/Lima", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
