import http from "node:http";
import { processData } from "./database/data-select/SelectMysql";

const server = http.createServer(async (request, results) => {
  try {
    switch (request.url) {
      case "/panel/view":
        results.writeHead(200, {
          "Content-Type": "application/json",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        });
        const resultsSelect = await processData();
        results.write(JSON.stringify(resultsSelect));

        console.log("🤔 requisição feita");

        results.end();
    }
  } catch (error) {
    console.error("Ouve um erro ao acessar o servidor HTTP: ", error);
    throw error;
  }
});

server.listen(8080, () => {
  console.log("🔥 Server HTTP rodando na porta 8080");
});
