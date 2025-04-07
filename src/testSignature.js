const { signMessage, verifySignature } = require("./utils/rsaUtils");
const path = require("path");

const message = "Hello Bob, this is Alice!";

// Define key paths
const privateKeyPath = path.join(__dirname, "../keys/alice_private.pem");
const publicKeyPath = path.join(__dirname, "../keys/alice_public.pem");

// Sign the message
const signature = signMessage(message, privateKeyPath);
console.log("✍️ Digital Signature:", signature);

// Verify the signature
const isValid = verifySignature(message, signature, publicKeyPath);
console.log("✅ Signature Valid:", isValid);
