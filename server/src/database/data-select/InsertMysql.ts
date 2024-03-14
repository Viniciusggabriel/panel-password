// utils.ts

export function generateRandomPass(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomGuiche(passGuiche: string): string {
  // Implemente sua lógica para atribuir um guichê com base no tipo de senha
  // Por enquanto, vou retornar um guichê aleatório entre 1 e 10
  const randomGuiche = Math.floor(Math.random() * 10) - 1;
  return `${passGuiche}${randomGuiche}`;
}
