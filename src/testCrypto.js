const { encryptAES, decryptAES } = require("./utils/cryptoUtils");

const password = "securepassword"; // Example shared secret
const message = "Hello Bob, this is Alice!";

// Encrypt the message
const encryptedData = encryptAES(message, password);
console.log("🔒 Encrypted Data:", encryptedData);

// Decrypt the message
const decryptedMessage = decryptAES(encryptedData, password);
console.log("🔓 Decrypted Message:", decryptedMessage);
