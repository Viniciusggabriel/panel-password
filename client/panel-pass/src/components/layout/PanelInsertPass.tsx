import axios from "axios";
import { Button } from "../ui/button";

type PassType = {
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
};

export const PanelInsertPass = () => {
  const enviarDados = async ({ PASS, PASS_TYPE, PASS_GUICHE }: PassType) => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_URL_BACK_POST}`,
        { PASS, PASS_TYPE, PASS_GUICHE }
      );
      console.log(resposta.data);
    } catch (erro) {
      console.error("Erro ao enviar dados:", erro);
    }
  };

  function randomPass(initial: string) {
    const characters = "0123456789";
    let pass = initial; // Inicialize com a letra inicial

    // Adicione characters aleatórios até que a senha tenha 10 characters
    while (pass.length < 10) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters.charAt(randomIndex);
    }

    return pass;
  }

  const tiposMedicos = [
    "Otorrinolaringologista",
    "Pediatra",
    "Oftalmologista",
    "Cardiologista",
    "Ortopedista",
    "Ginecologista",
  ];

  return (
    <section className="grid w-8/12 h-screen m-auto">
      <div className="grid grid-rows3 grid-cols-3 gap-10 justify-center align-middle items-center">
        {tiposMedicos.map((item, index) => (
          <Button
            key={index}
            id={`${index}`}
            variant={"default"}
            onClick={() => {
              const inicial = item.charAt(0).toUpperCase(); // Primeira letra maiúscula do tipo de médico
              const PASS = randomPass(inicial);
              enviarDados({
                PASS: PASS,
                PASS_TYPE: item,
                PASS_GUICHE: "GUICHE001",
              });
            }}
            className="p-16 text-white text-2xl"
          >
            {item}
          </Button>
        ))}
      </div>
    </section>
  );
};
