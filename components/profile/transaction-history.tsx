"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import KitaTransactions from "./kita-transactions";

const TransactionHistory = () => {
  const { data: session } = useSession();

  const [history, setHistory] = useState<any>([]);
  const [dailyLogin, setDailyLogin] = useState<number>(0);
  const [articlePost, setArticlePost] = useState<number>(0);
  const [likedPost, setLikedPost] = useState<number>(0);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch("/api/profile/transaction-history", {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          setHistory(data.data);
          data.data.find(
            (o: { _sum: { amount: number }; category: string }) => {
              if (o.category.includes("DAILY_LOGIN")) {
                setDailyLogin(o._sum.amount);
              }
              if (o.category.includes("ARTICLE_POST")) {
                setArticlePost(o._sum.amount);
              }
              if (o.category.includes("LIKED_POST")) {
                setLikedPost(o._sum.amount);
              }
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <section className="w-full bg-white">
      <h2 className="h-10 md:h-[60px] px-5 md:px-6 flex items-center text-base text-main-dark font-semibold border-b border-main-grey">
        Histori Transaksi
      </h2>
      <div className="py-8 px-5 md:px-6">
        <div className="h-[150px] w-full md:max-w-[817px] flex items-center justify-between mb-10 md:mb-[60px]">
          <Image
            src={session?.user.image || "/images/default-profile.png"}
            alt={session?.user.name || "Profile"}
            height={150}
            width={150}
            className="hidden md:block object-cover w-[150px] h-[150px] rounded-full"
          />

          <div className="w-1/4 h-full flex flex-col items-center justify-between">
            <p className="h-11 px-3 flex items-center justify-center bg-main-grey text-sm text-main-dark font-medium text-center">
              Jumlah Poin
            </p>
            <span className="text-xl text-main-dark font-medium">
              {history.reduce((acc: any, cur: any) => acc + cur._sum.amount, 0)}
            </span>
            <span className="h-11 flex items-center text-sm text-main-dark font-medium">
              KITA
            </span>
          </div>

          <div className="w-1/4 h-full flex flex-col items-center justify-between">
            <p className="h-11 px-3 flex items-center justify-center bg-main-grey text-sm text-main-dark font-medium text-center">
              Login Harian
            </p>
            <span className="text-xl text-main-dark font-medium">
              {dailyLogin}
            </span>
            <span className="h-11 flex items-center text-sm text-main-dark font-medium">
              KITA
            </span>
          </div>

          <div className="w-1/4 h-full flex flex-col items-center justify-between">
            <p className="h-11 px-3 flex items-center justify-center bg-main-grey text-sm text-main-dark font-medium text-center">
              Postingan Artikel
            </p>
            <span className="text-xl text-main-dark font-medium">
              {articlePost}
            </span>
            <span className="h-11 flex items-center text-sm text-main-dark font-medium">
              KITA
            </span>
          </div>

          <div className="w-1/4 h-full flex flex-col items-center justify-between">
            <p className="h-11 px-3 flex items-center justify-center bg-main-grey text-sm text-main-dark font-medium text-center">
              Postingan Disukai
            </p>
            <span className="text-xl text-main-dark font-medium">
              {likedPost}
            </span>
            <span className="h-11 flex items-center text-sm text-main-dark font-medium">
              KITA
            </span>
          </div>
        </div>

        <div>
          <h3 className="h-10 text-base text-main-dark font-semibold leading-none border-b border-main-dark">
            Transaksi KITA
          </h3>
          <KitaTransactions />
        </div>
      </div>
    </section>
  );
};

export default TransactionHistory;
