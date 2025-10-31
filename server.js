import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(`✅ YIYIQ Signaling Server corriendo en puerto ${PORT}`);

wss.on("connection", (ws) => {
  console.log("🟢 Cliente conectado");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      console.log("📩 Mensaje recibido:", data);

      // Reenvía a todos los clientes menos al emisor
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (err) {
      console.error("❌ Error al procesar mensaje:", err);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Cliente desconectado");
  });
});

  });

  ws.on("close", () => {
    console.log("❎ Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Ser
