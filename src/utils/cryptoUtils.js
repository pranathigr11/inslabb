const crypto = require("crypto");

// AES Key Derivation using PBKDF2
function deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256"); // 32 bytes key for AES-256
}

// Encrypt message using AES-GCM
function encryptAES(plaintext, password) {
    const salt = crypto.randomBytes(16); // Random salt
    const key = deriveKey(password, salt); // Derive key
    const iv = crypto.randomBytes(12); // IV for AES-GCM

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag(); // Get authentication tag

    return {
        ciphertext: encrypted.toString("base64"),
        salt: salt.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
    };
}

 function decryptAES(encryptedText, password, salt, iv, authTag) {
    try {
        // Convert Base64-encoded values back to Buffers
        const key = crypto.pbkdf2Sync(password, Buffer.from(salt, "base64"), 100000, 32, "sha256");
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64"));

        // Attach AuthTag for GCM mode
        decipher.setAuthTag(Buffer.from(authTag, "base64"));

        // Decrypt the message
        let decrypted = decipher.update(Buffer.from(encryptedText, "base64"));
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();  // Convert back to string
    } catch (error) {
        console.error("❌ Decryption failed:", error.message);
        throw error;
    }
}

// Export functions
module.exports = { encryptAES, decryptAES };
