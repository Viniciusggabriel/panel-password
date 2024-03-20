import { useState, useEffect } from "react";
import axios from "axios";
// ShadcnUI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PassType = {
  ID_PASS: number;
  PASS: string;
  PASS_TYPE: string;
  PASS_GUICHE: string;
};

export const PanelViewSelect = () => {
  const [data, setData] = useState<PassType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACK_GET}`
        );
        const jsonData = response.data;
        setData(JSON.parse(jsonData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Faz uma nova requisição em intervalo de 5s
    return () => clearInterval(interval);
  }, []);

  const firstPass = data.length > 0 ? data[0] : null;

  return (
    <section className="flex">
      <Card className="w-3/5 border-none rounded-none flex flex-col align-middle items-center text-white bg-neutral-700">
        {firstPass && (
          <>
            <CardHeader>
              <CardTitle className="text-center text-[50px]">
                <span>Senha:</span> {firstPass.PASS}
              </CardTitle>
              <CardDescription className="text-center text-[30px] pb-5 text-white">
                <span>Tipo:</span> {firstPass.PASS_TYPE}
              </CardDescription>
              <hr />
            </CardHeader>

            <CardContent>
              <p className="text-center text-[30px]">{firstPass.PASS_GUICHE}</p>
            </CardContent>
          </>
        )}
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-xl text-white bg-neutral-700">
              Tipo
            </TableHead>
            <TableHead className="text-center text-xl text-white bg-neutral-700">
              Senha
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b-4 border-neutral-700">
          {data.length > 0 ? (
            data.slice(1, 9).map((item, index) => (
              <TableRow key={item.ID_PASS}>
                <TableCell className="text-center py-6 text-[35px]">
                  {item.PASS_TYPE}
                </TableCell>
                <TableCell
                  className="text-center py-6 text-[35px]"
                  id={`item-table-${index}`}
                >
                  {item.PASS}
                </TableCell>
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
    </section>
  );
};
