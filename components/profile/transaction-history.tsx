import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import KitaTransactions from "./kita-transactions";
import { fetchTransactionHistory } from "@/actions/profil-actions";

let DAILY_LOGIN = 0;
let ARTICLE_POST = 0;
let LIKED_POST = 0;

const TransactionHistory = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/masuk");
  }

  const { data } = await fetchTransactionHistory();

  data.find((o: { _sum: { amount: number }; category: string }) => {
    if (o.category.includes("DAILY_LOGIN")) {
      DAILY_LOGIN += o._sum.amount;
    }
    if (o.category.includes("ARTICLE_POST")) {
      ARTICLE_POST += o._sum.amount;
    }
    if (o.category.includes("LIKED_POST")) {
      LIKED_POST += o._sum.amount;
    }
  });

  return (
    <section className="w-full bg-white">
      <h2 className="h-10 md:h-[60px] px-5 md:px-6 flex items-center text-base text-main-dark font-semibold border-b border-main-grey">
        Histori Transaksi
      </h2>
      <div className="py-8 px-5 md:px-6">
        <div className="h-[150px] w-full md:max-w-[817px] flex items-center justify-between mb-10 md:mb-[60px]">
          <Image
            src={session.user.image || "/images/default-profile.png"}
            alt={session.user.name || "Profile"}
            height={150}
            width={150}
            className="hidden md:block object-cover w-[150px] h-[150px] rounded-full"
          />

          <div className="w-1/4 h-full flex flex-col items-center justify-between">
            <p className="h-11 px-3 flex items-center justify-center bg-main-grey text-sm text-main-dark font-medium text-center">
              Jumlah Poin
            </p>
            <span className="text-xl text-main-dark font-medium">
              {data.reduce((acc: any, cur: any) => acc + cur._sum.amount, 0)}
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
              {DAILY_LOGIN}
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
              {ARTICLE_POST}
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
              {LIKED_POST}
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
