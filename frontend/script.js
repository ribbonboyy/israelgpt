async function send() {
  const input = document.getElementById("input").value;
  
  const res = await fetch("REPLACE_WITH_RENDER_BACKEND_URL/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.reply;
}
