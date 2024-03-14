import axios from "axios";
import { useEffect, useState } from "react";

export const PanelInsertPass = () => {
  const [data, setData] = useState("Pediatra");

  useEffect(() => {
    const fetchData = async () => {
      console.log(data);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL_BACK_POST}`,
          {
            PASS_TYPE: data,
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <section>
      <button
        onClick={() => {
          setData("Pediatra");
        }}
      >
        Oftalmologista
      </button>
    </section>
  );
};
