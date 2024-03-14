import {
  generateRandomGuiche,
  generateRandomPass,
} from "./data-select/InsertMysql";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config(); // Variáveis de ambiente

const passSchema = z.object({
  // O guiche que a senha está atribuído
  passGuiche: z.string().max(10, {
    message: "O guiche selecionado é inexistente",
  }),
});

type passType = z.infer<typeof passSchema>; // Infere o tipo

export default class DataBase {
  private connected: mysql.Pool | null = null; // Tipo da conexão
  // Cria uma constructor que faz um pool no mysql
  constructor() {
    if (!this.connected) {
      this.connected = mysql.createPool({
        host: `${process.env.HOST_DB}`,
        user: `${process.env.USER_DB}`,
        password: `${process.env.PASS_DB}`,
        database: `${process.env.DATABASE_DB}`,
      });
      this.connected = this.connected;
    }
  }

  async findPassClient() {
    const connection = await this.connected!.getConnection();
    try {
      const [rows] = await connection.query("SELECT * FROM PANEL_PASS");
      return rows;
    } catch (error) {
      console.error("Erro ao executar a conexão e fazer select", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async insertPassClient(passClient: passType) {
    const { passGuiche } = passSchema.parse(passClient);

    const connection = await this.connected!.getConnection();
    try {
      // Geração aleatória de senha e guichê com base no tipo de senha
      const generatedPass = generateRandomPass(9); // Por exemplo, gerar uma senha de 8 caracteres
      const generatedGuiche = generateRandomGuiche(passGuiche);
      const passClientObjectInsert = [
        generatedPass,
        passClient,
        generatedGuiche,
      ];
      const sqlInsert = "CALL CAD_PASS_CLIENT(?,?,?);";
      await connection.query(sqlInsert, passClientObjectInsert);
    } catch (error) {
      console.error(
        "Ouve um erro ao inserir a senha dentro do banco de dados: ",
        error
      );
      throw error;
    } finally {
      connection.release();
    }
  }
}
