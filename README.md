# 🔐 Secure Message Capsule

The **Secure Message Capsule** is a cryptography-based secure message handling system built using Node.js and Express.js. It ensures safe communication by encrypting messages, digitally signing them for integrity, and securely transmitting them via HTTPS.

This project was developed as part of the **Information and Network Security** mini-project under the curriculum of NMAM Institute of Technology.

---

## 📌 Problem Statement

Insecure data storage and transmission expose systems to unauthorized access, tampering, and data breaches. Existing solutions often lack combined encryption, authentication, and secure transmission. This system aims to secure both storage and transmission using strong encryption (AES), digital signatures (RSA), and HTTPS.

---

## 🎯 Objectives

- 🔐 Implement **AES-256** encryption for secure data storage.
- 🧾 Ensure data integrity using **RSA Digital Signatures**.
- 🌐 Secure data transmission using **TLS (HTTPS)** protocol.
- 🚫 Prevent unauthorized access and tampering.
- ✅ Validate message authenticity before decryption.

---

## ⚙️ Technologies Used

| Component        | Technology            |
|------------------|------------------------|
| Backend API      | Node.js, Express.js    |
| Cryptography     | Node.js `crypto` module (AES, RSA) |
| Frontend         | HTML, CSS              |
| Security Layer   | HTTPS (TLS 1.2)        |
| Testing Tool     | Postman                |

---

## 🔐 Cryptographic Approach

### 🔸 AES-256-GCM Encryption
- Used for encrypting the message.
- Key derived from password using **PBKDF2**.
- Secures the data with **confidentiality** and **integrity** (GCM mode includes authentication tag).

### 🔸 RSA Digital Signature
- Message is signed using a **RSA-2048 private key**.
- Receiver verifies it using the **corresponding public key**.
- Ensures **authenticity** and **integrity** of the message.

### 🔸 TLS (HTTPS)
- Ensures secure transmission between client and server.
- Prevents **MITM (Man-In-The-Middle)** attacks.

---

## 🧪 System Workflow

### 👩‍💼 Sender:
1. Enters message and password via frontend.
2. AES key derived using PBKDF2.
3. Message encrypted using AES-256-GCM.
4. Message signed with RSA private key.
5. Encrypted content + metadata stored temporarily on the server.

### 👨‍💻 Receiver:
1. Enters the same password to derive the key.
2. Decrypts the message.
3. Verifies the digital signature using RSA public key.
4. Message is displayed once, and then deleted from the server.

---

## 📂 Folder Structure

```
secure-msg-capsule/
│
├── public/                 # Frontend HTML and CSS
├── crypto/                 # AES & RSA logic
├── keys/                   # RSA keypair (private.pem, public.pem)
├── message.json            # Temporarily stores encrypted payload
├── index.js                # Express server logic
└── README.md               # Project documentation
```

---

## 🖥️ Running the Project

### 🔧 Prerequisites
- Node.js (v16+)
- Git
- HTTPS certificate (for TLS – you can use self-signed certs for testing)

### 🚀 Steps

```bash
# 1. Clone the repo
git clone https://github.com/pranathigr11/inslab.git
cd inslab

# 2. Install dependencies
npm install

# 3. Run the HTTPS server
node index.js
```

Access at: `https://localhost:3000`

> Make sure your `cert.pem` and `key.pem` are correctly placed in the project root for HTTPS to work.

---


## 🛡️ Security Highlights

- AES-256-GCM with 128-bit authentication tag
- Password-based key derivation (PBKDF2 with random salt)
- RSA 2048-bit asymmetric digital signatures
- One-time retrieval logic to avoid replay attacks
- HTTPS for secure API interactions

---

## 🧠 Future Improvements

- Store messages in a secure backend database (MongoDB or PostgreSQL)
- Implement full key lifecycle management
- Enable secure file transfer (not just messages)
- Add user authentication system (OAuth/JWT)

---

## 📜 License

This project is created for educational purposes as part of the **Information and Network Security** course. Feel free to use, fork, and contribute with attribution.

---

## 👩‍💻 Developed by

**Pranathi G R**  
Department of Information Science & Engineering  
NMAM Institute of Technology  
GitHub: [@pranathigr11](https://github.com/pranathigr11)
