"use client";

import { useContext, useEffect, useState } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { fetchUserData } from "~~/services/funny/backendConnector";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";
import { useAccount } from "wagmi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { Badge } from "~~/components/ui/badge";
import { Separator } from "~~/components/ui/separator";

const CheckOutTable = () => {
  const userAddress = useAccount().address;
  const context = useContext(FunnyContext);
  const [userData, setUserData] = useState<any[]>([]);

  const fetchPendingTxs = async () => {
    try {
      const data = await fetchUserData(`${userAddress}`, "pending");
      setUserData(data);
      console.log("All pending Tx", data);
    } catch (error) {
      console.error("Error fetching pending transactions:", error);
    }
  };

  useEffect(() => {
    fetchPendingTxs();
  }, []);

  if (!context) {
    console.error("Context is null");
    return null;
  }

  // Create a local array and sort transactions by module
  const sortedTransactionsByModule = userData.reduce((acc: any[], tx: any) => {
    const moduleGroup = acc.find(group => group.module === tx.module);
    if (moduleGroup) {
      moduleGroup.transactions.push(tx);
    } else {
      acc.push({ module: tx.module, transactions: [tx] });
    }
    return acc;
  }, []);

  // Sort transactions within each module by nonce
  sortedTransactionsByModule.forEach(moduleGroup => {
    moduleGroup.transactions.sort((a: any, b: any) => a.nonce - b.nonce);
  });

  return (
    <div className="w-full flex flex-col items-start justify-start h-full gap-5">
      {sortedTransactionsByModule.map((moduleGroup: any, moduleGroupIndex: number) => (
        <div key={moduleGroupIndex} className="w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`module-${moduleGroupIndex}`}>
                <AccordionTrigger className="flex justify-between items-center w-full">
                    <h1 className="w-1/2 text-left text-2xl">{moduleGroup.module}</h1>
                    <p className="w-1/2 text-right text-slate-500 pr-5 text-sm justify-end">total transactions: {moduleGroup.transactions.length}</p>
                </AccordionTrigger>
                <Separator className="z-1000" />
              <AccordionContent>
                <Table className="w-full table-auto">
                  <TableHeader className="sticky top-0">
                    <TableRow>
                      <TableHead># nonce</TableHead>
                      <TableHead>status</TableHead>
                      <TableHead>action</TableHead>
                      <TableHead>time of execution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moduleGroup.transactions.map((tx: any, index: number) => (
                      <TableRow className='z-[-10]' key={index}>
                        <TableCell className="z-[100]">{tx.nonce}</TableCell>
                        <TableCell>
                          <Badge className={`capitalize ${tx.status === "pending" ? "bg-yellow-600" : tx.status === "executed" ? "bg-blue-600" : "bg-green-600"}`} variant="default">
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.action}</TableCell>
                        <TableCell>{new Date(tx.timestamp * 1000).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default CheckOutTable;
