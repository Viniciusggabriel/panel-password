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
          <TableHead className="text-center">Ordem</TableHead>
          <TableHead className="text-center">Tipo</TableHead>
          <TableHead className="text-center">Senha</TableHead>
          <TableHead className="text-center">Guiche</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.ID_PASS}>
              <TableCell className="text-center">{item.ID_PASS}</TableCell>
              <TableCell className="text-center">{item.PASS_TYPE}</TableCell>
              <TableCell className="text-center">{item.PASS}</TableCell>
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
