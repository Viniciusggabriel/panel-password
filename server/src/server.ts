import http from "node:http";
import { processDataSelect } from "./database/data-select/SelectMysql";
import DataBase from "./database/ConnectionMysql";

type PassType = {
  PASS_TYPE: string;
};

const PORT = 8080;

const server = http.createServer(async (request, response) => {
  try {
    switch (request.url) {
      case "/panel/view":
        await handleViewRequest(response);
        break;
      case "/panel/view":
        await handleSubmitRequest(request, response);
        break;
      case "/panel/submit":
        if (request.method === "POST") {
          // Código para lidar com a solicitação de envio...
        } else if (request.method === "OPTIONS") {
          // Responder à solicitação OPTIONS com os cabeçalhos CORS adequados
          response.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type",
          });
          response.end();
          return; // Encerra o processamento da requisição OPTIONS aqui
        }
        break;
      default:
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Not Found");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao acessar o servidor HTTP: ", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Internal Server Error");
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
  if (request.method !== "POST") {
    response.writeHead(405, { "Content-Type": "text/plain" });
    response.end("Method Not Allowed");
    return;
  }

  let body: PassType = { PASS_TYPE: "" };

  request.on("data", (chunk) => {
    body = JSON.parse(chunk);
  });

  request.on("end", async () => {
    try {
      console.log("🤓 Dados recebidos ", body);

      const dataBase = new DataBase();
      await dataBase.insertPassClient(body);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Dados recebidos com sucesso!" }));
    } catch (error) {
      console.error("Erro ao processar solicitação de envio: ", error);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    }
  });
}

server.listen(PORT, () => {
  console.log(`🔥 Server HTTP rodando na porta ${PORT}`);
});
