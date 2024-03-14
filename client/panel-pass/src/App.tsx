import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// ShadcnUI
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PassType = {
  ID_PASS: number;
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
};

export default function App() {
  const [data, setData] = useState<PassType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACK}`);
        const jsonData = response.data;
        setData(JSON.parse(jsonData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table>
      <TableCaption>Painel de senhas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-xl text-white bg-neutral-700">
            Tipo
          </TableHead>
          <TableHead className="text-center text-xl text-white bg-neutral-700">
            Senha
          </TableHead>
          <TableHead className="text-center text-xl text-white bg-neutral-700">
            Guiche
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item.ID_PASS}>
              <TableCell className="text-center">{item.PASS_TYPE}</TableCell>
              <TableCell
                className="text-center text-xl text-white rounded-md bg-red-700"
                id={`item-table-${index}`}
              >
                {item.PASS}
              </TableCell>
              <TableCell className="text-center">{item.PASS_GUICHE}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Carregando dados...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
