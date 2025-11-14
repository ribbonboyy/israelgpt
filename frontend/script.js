async function send() {
  const input = document.getElementById("input").value;
  
  const res = await fetch("https://israel-gpt-w64l.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.reply;
}
