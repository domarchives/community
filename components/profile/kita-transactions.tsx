"use client";

import ReactPaginate from "react-paginate";
import dayjs from "dayjs";

import Next from "@/components/svg/next";
import Prev from "@/components/svg/prev";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const KitaTransactions = () => {
  const [points, setPoints] = useState<any>([]);
  const [count, setCount] = useState<number>(0);

  const fetchPoints = async (page: number) => {
    try {
      const response = await fetch(
        `/api/profile/transaction-history/points?page=${page}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPoints(data.points);
        setCount(data.count);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoints(1);
  }, []);

  const handlePageClick = async (event: any) => {
    await fetchPoints(event.selected + 1);
  };

  const handlePointCategory = (category: string) => {
    if (category === "DAILY_LOGIN") {
      return "Login Harian";
    } else if (category === "ARTICLE_POST") {
      return "Postingan Artikel";
    } else if (category === "LIKED_POST") {
      return "Postingan Disukai";
    } else {
      return "";
    }
  };

  return (
    <>
      <Table>
        <TableHeader className="h-[60px]">
          <TableRow>
            <TableHead className="md:w-[150px]">Tanggal</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Jumlah KITA</TableHead>
            <TableHead className="md:w-[350px]">TXID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {points.map((point: any) => (
            <TableRow key={point.id}>
              <TableCell className="text-sm text-main-dark font-medium">
                {dayjs(point.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="text-sm text-main-dark font-medium">
                {handlePointCategory(point.category)}
              </TableCell>
              <TableCell className="text-sm text-brand-blue font-medium">{`+${point.amount}`}</TableCell>
              <TableCell className="text-sm text-main-dark font-medium">
                Transfer Internal
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel={Next()}
        previousLabel={Prev()}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(count / 10)}
        renderOnZeroPageCount={null}
        className="pagination h-12 w-full flex items-center justify-center gap-x-2.5 pt-6"
      />
    </>
  );
};

export default KitaTransactions;
