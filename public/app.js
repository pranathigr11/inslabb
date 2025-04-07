document.addEventListener("DOMContentLoaded", function () {
    const encryptSendBtn = document.getElementById("encryptSendBtn");
    const decryptRetrieveBtn = document.getElementById("decryptRetrieveBtn");

    // Base API URL (adjust if backend is hosted elsewhere)
    const apiBase = "http://localhost:3000";

    // 🔹 Encrypt & Send Message
    if (encryptSendBtn) {
        encryptSendBtn.addEventListener("click", async () => {
            const message = document.getElementById("messageInput").value.trim();
            const password = document.getElementById("passwordInput").value.trim();

            if (!message || !password) {
                alert("⚠️ Please enter both message and password!");
                return;
            }

            try {
                const response = await fetch(`${apiBase}/send`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" ,
                                 "Authorization": "Bearer ALICE_SECRET"
                    },
                    body: JSON.stringify({ message, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("✅ Message Encrypted & Sent Successfully!");
                    console.log("Response:", result);
                } else {
                    alert(`❌ Error: ${result.error}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("❌ Failed to send message. Check the server.");
            }
        });
    }

    // 🔹 Retrieve & Decrypt Message
//     // 🔹 Retrieve & Decrypt Message
// if (decryptRetrieveBtn) {
//     decryptRetrieveBtn.addEventListener("click", async () => {
//         const password = document.getElementById("retrievePassword").value.trim();
//         const statusMessage = document.getElementById("statusMessage");
//         const outputDiv = document.getElementById("output");

//         if (!password) {
//             statusMessage.textContent = "⚠️ Please enter the password!";
//             statusMessage.style.color = "red";
//             return;
//         }

//         try {
//             const response = await fetch(`${apiBase}/receive`, {  // Changed to POST request
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ password }), // Sending password in request body
//             });

//             const result = await response.json();

//             if (result.success) {
//                 statusMessage.textContent = "✅ Decryption successful!";
//                 statusMessage.style.color = "green";

//                 outputDiv.textContent = "📜 Decrypted Message: " + result.message;
//                 outputDiv.classList.remove("hidden");
//                 outputDiv.classList.add("bg-green-200");
//             } else {
//                 statusMessage.textContent = "❌ " + result.error;
//                 statusMessage.style.color = "red";
//             }
//         } catch (error) {
//             statusMessage.textContent = "❌ Network Error: " + error.message;
//             statusMessage.style.color = "red";
//         }
//     });
// }
// 🔹 Retrieve & Decrypt Message
if (decryptRetrieveBtn) {
    decryptRetrieveBtn.addEventListener("click", async () => {
        const password = document.getElementById("retrievePassword").value.trim();
        const statusMessage = document.getElementById("statusMessage");
        const outputDiv = document.getElementById("output");

        // Clear previous decrypted message before making a request
        outputDiv.textContent = "";
        outputDiv.classList.add("hidden");

        if (!password) {
            statusMessage.textContent = "⚠️ Please enter the password!";
            statusMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch(`${apiBase}/receive`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();

            if (result.success) {
                statusMessage.textContent = "✅ Decryption successful!";
                statusMessage.style.color = "green";

                outputDiv.textContent = "📜 Decrypted Message: " + result.message;
                outputDiv.classList.remove("hidden");
                outputDiv.classList.add("bg-green-200");
            } else {
                statusMessage.textContent = "❌ " + result.error;
                statusMessage.style.color = "red";

                // Clear any previous message if error occurs
                outputDiv.textContent = "";
                outputDiv.classList.add("hidden");
            }
        } catch (error) {
            statusMessage.textContent = "❌ Network Error: " + error.message;
            statusMessage.style.color = "red";

            // Clear previous message on network error
            outputDiv.textContent = "";
            outputDiv.classList.add("hidden");
        }
    });
}

});
