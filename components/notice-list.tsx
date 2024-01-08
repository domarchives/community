import Pagination from "@/components/pagination";
import Link from "next/link";

interface Props {
  perhatians: any;
  count: number;
}

const NoticeList = ({ perhatians, count }: Props) => {
  return (
    <div className="max-w-3xl w-full h-full mx-auto py-5 px-10 mb-10">
      <section className="bg-white">
        <div className="h-[60px] px-6 flex items-center border-b border-main-grey">
          <h2 className="text-base text-main-dark font-semibold">Perhatian</h2>
        </div>
        <div>
          <ul>
            {perhatians.map((perhatian: any) => (
              <li
                key={`perhatian-${perhatian.id}`}
                className="h-[60px] px-5 border-b border-main-grey group"
              >
                <Link
                  href={`/perhatian/${perhatian.id}`}
                  className="h-full flex items-center gap-x-6"
                >
                  <span className="text-base text-main-red font-semibold">
                    Perhatian
                  </span>
                  <p className="text-sm text-main-dark font-medium max-w-[600px] truncate group-hover:underline underline-offset-2">
                    {perhatian.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Pagination pageCount={Math.ceil(count / 10)} />
      </section>
    </div>
  );
};

export default NoticeList;
