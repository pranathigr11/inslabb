const fs = require("fs");
const path = require("path");
const { encryptAES } = require("./utils/cryptoUtils");
const { signMessage } = require("./utils/rsaUtils");

// File paths
const privateKeyPath = path.join(__dirname, "../keys/alice_private.pem");
const messageFilePath = path.join(__dirname, "../data/message_capsule.json");

// Shared secret password (In real-world, should be securely exchanged)
const password = "securepassword";

// Get message input
const message = "Hello Bob, this is Alice!";

// Encrypt the message
const encryptedData = encryptAES(message, password);

// Sign the original message
const signature = signMessage(message, privateKeyPath);

// Create package
const package = {
    encryptedMessage: encryptedData.ciphertext,
    salt: encryptedData.salt,
    iv: encryptedData.iv,
    authTag: encryptedData.authTag,
    signature: signature,
};

// Save to file
fs.writeFileSync(messageFilePath, JSON.stringify(package, null, 4));

console.log("📩 Secure Message Sent (Saved to data/message_capsule.json)");
