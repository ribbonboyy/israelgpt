let canSend = true; 

async function send() {
    if (!canSend) {
        alert("Please wait before sending another message!");
        return;
    }

    const input = document.getElementById("input").value;
    if (!input.trim()) return; 

    canSend = false;
    setTimeout(() => canSend = true, 3000);

    try {
        const res = await fetch("https://israel-gpt-w64l.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });

        const data = await res.json();
        document.getElementById("output").textContent = data.reply;
    } catch (err) {
        console.error(err);
        alert("Failed to send message.");
    }
}
