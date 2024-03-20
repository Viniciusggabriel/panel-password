import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Variáveis de ambiente

type PassType = {
  ID_PASS: number;
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
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
    
      const passClientObjectInsert = [
        passClient.PASS,
        passClient.PASS_TYPE,
        passClient.PASS_GUICHE,
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
