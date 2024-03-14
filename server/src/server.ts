import http from "node:http";
import { processDataSelect } from "./database/data-select/SelectMysql";
import DataBase from "./database/ConnectionMysql";

const server = http.createServer(async (request, response) => {
  try {
    switch (request.url) {
      // Metodo GET que mostra os clientes
      case "/panel/view":
        response.writeHead(200, {
          "Content-Type": "application/json",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        });
        const resultsSelect = await processDataSelect();
        response.write(JSON.stringify(resultsSelect));

        console.log("🤔 requisição feita");

        response.end();

      // Metodo post que insere o cliente
      case "/panel/submit":
        const dataBase = new DataBase();
        if (request.method == "POST") {
          let body: { passGuiche: string } = "";

          /*  
          O uso de chunk em NodeJS serve para dados grandes, ele pega de pouco em pouco, nesse caso ele cria um callback para sempre que um dado novo chega,  todos os dados são armazenados dentro da variável body
          */
          request.on("data", (chunk) => {
            body = JSON.parse(chunk);
          });

          request.on("end", () => {
            console.log("🤓 Dados recebidos ", body);

            dataBase.insertPassClient(body);

            // Retorna uma mensagem de sucesso para o usuário
            response.end("Dados recebidos com sucesso!");
          });
        } else {
          response.end();
        }
    }
  } catch (error) {
    console.error("Ouve um erro ao acessar o servidor HTTP: ", error);
    throw error;
  }
});

server.listen(8080, () => {
  console.log("🔥 Server HTTP rodando na porta 8080");
});
