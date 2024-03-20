import http from "node:http";
import { processDataSelect } from "./database/controller/SelectMysql";
import DataBase from "./database/ConnectionMysql";

type PassType = {
  ID_PASS: number;
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
};

const PORT = 8080;

const server = http.createServer(async (request, response) => {
  try {
    switch (request.url) {
      case "/panel/view":
        await handleViewRequest(response);
        break;
      case "/panel/submit":
        if (request.method === "POST") {
          await handleSubmitRequest(request, response);
        } else if (request.method === "OPTIONS") {
          // O options é necessário para quando um outro domínio vai fazer uma requisição de qualquer outro tipo além do GET
          response.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          });
          response.end();
          return;
        } else {
          response.writeHead(405, { "Content-Type": "text/plain" });
          response.end("Método escolhido não é permitido");
          return;
        }
        break;

      default:
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Não existe");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao acessar o servidor HTTP: ", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erro interno no server");
  }
});

async function handleViewRequest(response: http.ServerResponse) {
  const resultsSelect = await processDataSelect();
  response.writeHead(200, {
    "Content-Type": "application/json",
    // Add CORS headers
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(resultsSelect));
}
async function handleSubmitRequest(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  let body: Uint8Array[] = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", async () => {
    try {
      const data = Buffer.concat(body).toString();
      const parsedBody: PassType = JSON.parse(data);
      console.log("🤓 Dados recebidos ", parsedBody);

      const dataBase = new DataBase();
      await dataBase.insertPassClient(parsedBody);

      response.end(JSON.stringify({ message: "Dados recebidos com sucesso!" }));
    } catch (error) {
      console.error("Erro ao processar solicitação de envio: ", error);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Erro interno do servidor");
    }
  });
}

server.listen(PORT, () => {
  console.log(`🔥 Server HTTP rodando na porta ${PORT}`);
});
