"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import numeral from "numeral";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, RefreshCcw, RefreshCw, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Next from "@/components/svg/next";
import Prev from "@/components/svg/prev";

interface Coin {
  id: string;
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  change: string;
  rank: number;
}

const formSchema = z.object({
  keyword: z.string().nonempty(),
  selected: z.string().nonempty(),
});

const KoinPertukaran = () => {
  const { data: session, status } = useSession();

  // koin | pertukaran
  const [selected, setSelected] = useState("koin");
  const [coins, setCoins] = useState<Coin[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCoinRanking = async () => {
      const response = await fetch("/api/coin-ranking?page=1", {
        method: "GET",
        next: {
          revalidate: 3600,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCoins(data.coins);
      }
    };

    fetchCoinRanking();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      selected: "idr",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    //
  };

  const refreshCoinRanking = async () => {
    try {
      const response = await fetch("/api/admin/coin-ranking", {
        method: "PUT",
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (event: any) => {
    const { selected } = event;
    const response = await fetch(`/api/coin-ranking?page=${selected + 1}`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      setCoins(data.coins);
    }
  };

  return (
    <section className="bg-brand-white">
      <div className="h-[60px] border-b border-brand-gray px-3 flex items-center justify-between">
        <div className="flex items-center">
          <h2
            onClick={() => setSelected("koin")}
            className={cn(
              "text-base text-brand-subgray font-semibold hover:text-brand-dark transition-colors px-3 cursor-pointer",
              selected === "koin" && "text-brand-dark"
            )}
          >
            Koin
          </h2>
          <span className="text-base text-brand-subgray">|</span>
          <h2
            onClick={() => setSelected("pertukaran")}
            className={cn(
              "text-base text-brand-subgray font-semibold hover:text-brand-dark transition-colors px-3 cursor-pointer",
              selected === "pertukaran" && "text-brand-dark"
            )}
          >
            Pertukaran
          </h2>
        </div>
        {status === "authenticated" && session.user.role.includes("ADMIN") && (
          <div>
            <Button
              size="icon"
              className="bg-transparent hover:bg-main-grey hover:rotate-180 duration-500 transition-all"
              onClick={refreshCoinRanking}
            >
              <RefreshCw size={18} color="#FF6975" />
            </Button>
          </div>
        )}
      </div>

      <div className="px-6 h-[120px] flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2.5"
          >
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center bg-brand-gray px-[14px]">
                      <SearchIcon size={14} />
                      <Input
                        placeholder="Cari koin..."
                        className="border-none bg-transparent text-xs font-medium text-brand-dark placeholder:text-brand-inactive"
                        autoComplete="off"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selected"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none text-sm text-brand-inactive font-medium">
                        <SelectValue placeholder="IDR" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idr">IDR</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div>
        <Table>
          <TableHeader className="bg-brand-gray">
            <TableRow className="flex items-center">
              <TableHead className="text-xs text-brand-inactive font-medium flex items-center gap-x-2 w-[40%]">
                <span className="w-[77px]">Koin/Volume Perdagangan</span>
                <ArrowUpDown size={12} className="cursor-pointer" />
              </TableHead>
              <TableHead className="text-xs text-brand-inactive font-medium flex items-center gap-x-2 w-[30%]">
                <span className="w-[72px]">Harga (USD)</span>
                <ArrowUpDown size={12} className="cursor-pointer" />
              </TableHead>
              <TableHead className="text-xs text-brand-inactive font-medium flex items-center justify-end gap-x-2 text-right w-[30%]">
                <span className="w-[62px]">Perubahan 24jam</span>
                <ArrowUpDown size={12} className="cursor-pointer" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-brand-white">
            {coins.map((coin: Coin, index: number) => (
              <TableRow
                key={`koin-pertukaran-${coin.uuid}`}
                className="flex items-center"
              >
                <TableCell className="w-[40%] space-y-2 px-5">
                  <div className="flex items-center gap-1">
                    <Image
                      src={coin.iconUrl}
                      alt={coin.name}
                      width={16}
                      height={16}
                    />
                    <span className="text-sm text-brand-dark font-medium max-w-[100px] truncate">
                      {coin.name}
                    </span>
                  </div>
                  <span className="text-xs text-brand-inactive font-medium">
                    {numeral(coin.marketCap).format("0.00 a")}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "w-[30%] text-right text-brand-red text-xs font-medium",
                    Number(coin.change) < 0 && "text-brand-blue"
                  )}
                >
                  {numeral(coin.price).format("0,0.00")} $
                </TableCell>
                <TableCell className="w-[30%] text-right flex justify-end">
                  <div
                    className={cn(
                      "w-[78px] h-[28px] bg-brand-red text-brand-white text-xs font-semibold flex items-center justify-center rounded-sm",
                      Number(coin.change) < 0 && "bg-brand-blue"
                    )}
                  >
                    {Number(coin.change) < 0
                      ? `${coin.change} %`
                      : `${coin.change} %`}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={Next()}
        previousLabel={Prev()}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={5}
        renderOnZeroPageCount={null}
        className="pagination h-12 w-full flex items-center justify-center gap-x-2.5 border-t border-main-grey"
      />
    </section>
  );
};

export default KoinPertukaran;
