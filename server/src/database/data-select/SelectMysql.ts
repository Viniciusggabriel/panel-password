import DataBase from "../ConnectionMysql";

const database = new DataBase(); // Estancia a class

type PassType = {
  ID_PASS: number;
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
};

// Função do tipo Promise com a tipagem acima
async function runDatabase(): Promise<PassType[]> {
  try {
    const dataBaseResult = await database.FindPassClient(); // Chama o metodo de procurar as senhas

    if (Array.isArray(dataBaseResult)) {
      // Se for array ele mapeia e retorna um novo array tipado
      return dataBaseResult.map((row) => ({
        ...row,
      })) as PassType[];
      /*   Retorna como exemplo
      [
        {
          ID_PASS: 1,
          ...
        },
      ]
    */
    } else {
      throw new Error("A query do banco de dados foi retornada com erro");
    }
  } catch (error) {
    console.error("Erro ao realizar select", error);
    throw error;
  }
}

export async function processData(): Promise<string> {
  try {
    const passes = await runDatabase();
    const jsonInfoPassPanel = JSON.stringify(passes);
    return jsonInfoPassPanel;
  } catch (error) {
    console.error("Erro ao transformar em JSON o resultado da consulta", error);
    throw error;
  }
}
