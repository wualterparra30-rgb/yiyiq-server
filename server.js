import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔗 Nueva conexión WebSocket");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      console.log("📩 Mensaje recibido:", data);

      // Reenvía el mensaje a todos los clientes excepto el que lo envió
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error("❌ Error procesando mensaje:", error);
    }
  });

  ws.on("close", () => {
    console.log("❎ Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Ser
