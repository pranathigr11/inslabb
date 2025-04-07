const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Function to generate RSA key pair
const generateKeyPair = (name) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Secure key length
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  // Save keys to files
  fs.writeFileSync(path.join(__dirname, `../keys/${name}_private.pem`), privateKey);
  fs.writeFileSync(path.join(__dirname, `../keys/${name}_public.pem`), publicKey);

  console.log(`✅ RSA Key Pair Generated for ${name}`);
};

// Generate Alice's keys
generateKeyPair("alice");
