const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Import encryption & signing functions
const { encryptAES, decryptAES } = require("./utils/cryptoUtils");
const { signMessage, verifySignature } = require("./utils/rsaUtils");

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static(path.join(__dirname, "../public"))); // Ensure static files are served correctly

const MESSAGE_FILE = "data/message_capsule.json";

// ✅ Serve Encrypt & Decrypt Pages
app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "../public/index.html")));
app.get("/encrypt", (req, res) => res.sendFile(path.resolve(__dirname, "../public/encrypt.html")));
app.get("/decrypt", (req, res) => res.sendFile(path.resolve(__dirname, "../public/decrypt.html")));

// ✅ Encrypt & Store Message
app.post("/send", (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader !== "Bearer ALICE_SECRET") {
        return res.status(403).json({ error: "❌ Unauthorized: Only Alice can send messages." });
    }
    const { message, password } = req.body;

    if (!message || !password) {
        return res.status(400).json({ error: "Message and password are required!" });
    }

    try {
        const encryptedData = encryptAES(message, password);
        const signature = signMessage(message, "keys/alice_private.pem");

        if (!fs.existsSync("data")) fs.mkdirSync("data", { recursive: true });

        const messageData = {
            encryptedMessage: encryptedData.ciphertext,
            salt: encryptedData.salt,
            iv: encryptedData.iv,
            authTag: encryptedData.authTag,
            signature: signature,
        };

        fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messageData, null, 4), "utf8");

        console.log("✅ Message stored successfully!");
        res.json({ success: true, message: "Message securely stored!" });

    } catch (error) {
        console.error("❌ Error in /send:", error.message);
        res.status(500).json({ error: "Failed to send message: " + error.message });
    }
});

// ✅ Retrieve Message Metadata (Check If a Message Exists)
app.get("/receive-metadata", (req, res) => {
    try {
        if (!fs.existsSync(MESSAGE_FILE)) {
            return res.status(404).json({ error: "No message found! Encrypt a message first." });
        }

        const storedData = JSON.parse(fs.readFileSync(MESSAGE_FILE, "utf8"));
        res.json({ success: true, storedData });

    } catch (error) {
        console.error("❌ Error in /receive-metadata:", error.message);
        res.status(500).json({ error: "Failed to retrieve message metadata: " + error.message });
    }
});

// ✅ Retrieve & Decrypt Message
app.post("/receive", (req, res) => {
    try {
        if (!fs.existsSync(MESSAGE_FILE)) {
            return res.status(404).json({ error: "No message found! Encrypt a message first." });
        }

        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: "Password is required!" });
        }

        const storedData = JSON.parse(fs.readFileSync(MESSAGE_FILE, "utf8"));
        const { encryptedMessage, salt, iv, authTag, signature } = storedData;

        const decryptedMessage = decryptAES(encryptedMessage, password, salt, iv, authTag);
        const isSignatureValid = verifySignature(decryptedMessage, signature, "keys/alice_public.pem");

        if (!isSignatureValid) {
            return res.status(400).json({ error: "Signature verification failed! Message may be tampered with." });
        }

        // ❌ Delete message after successful retrieval
        fs.unlinkSync(MESSAGE_FILE);

        res.json({ success: true, message: decryptedMessage, signatureVerified: isSignatureValid });

    } catch (error) {
        console.error("❌ Error in /receive:", error.message);
        res.status(500).json({ error: "Failed to retrieve message: " + error.message });
    }
});

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
