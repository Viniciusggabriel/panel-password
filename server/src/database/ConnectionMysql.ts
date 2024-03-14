import {
  generateRandomGuiche,
  generateRandomPass,
} from "./data-select/InsertMysql";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Variáveis de ambiente

type PassType = {
  PASS_TYPE: string;
};

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

  async insertPassClient(passClient: PassType) {
    const connection = await this.connected!.getConnection();
    try {
      // Geração aleatória de senha e guichê com base no tipo de senha
      const generatedPass = await generateRandomPass(10); // Por exemplo, gerar uma senha de 8 caracteres
      const generatedGuiche = await generateRandomGuiche("GUICHE");
      const passClientObjectInsert = [
        generatedPass,
        passClient.PASS_TYPE,
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
