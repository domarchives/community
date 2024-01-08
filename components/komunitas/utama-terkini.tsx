import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { cn } from "@/lib/utils";
import { fetchBeritaListByCategory } from "@/actions/berita-actions";

dayjs.extend(relativeTime);

interface Props {
  category?: string;
  t?: string;
  page?: number;
}

const BERITA_UTAMA = "berita-utama";
const BERITA_TERBARU = "berita-terbaru";

const UtamaTerkini: React.FC<Props> = async ({ category, t, page }) => {
  const { posts } = t
    ? await fetchBeritaListByCategory(t)
    : await fetchBeritaListByCategory("berita-utama");

  let berita_utama_href;
  let berita_terbaru_href;

  if (category) {
    berita_utama_href = `/komunitas/${category}?t=${BERITA_UTAMA}`;
    berita_terbaru_href = `/komunitas/${category}?t=${BERITA_TERBARU}`;
  } else {
    berita_utama_href = `/komunitas?t=${BERITA_UTAMA}`;
    berita_terbaru_href = `/komunitas?t=${BERITA_TERBARU}`;
  }

  if (page) {
    berita_utama_href += `&page=${page}`;
    berita_terbaru_href += `&page=${page}`;
  }

  return (
    <section className="bg-white">
      <div className="h-[60px] px-3 border-b border-brand-gray flex items-center gap-x-3">
        <Link
          href={berita_utama_href}
          className={cn(
            "text-brand-inactive text-base font-semibold hover:text-brand-dark transition-colors cursor-pointer",
            (t === BERITA_UTAMA || !t) && "text-brand-dark"
          )}
        >
          Berita Utama
        </Link>
        <div className="h-5 w-[1px] bg-brand-subgray" />
        <Link
          href={berita_terbaru_href}
          className={cn(
            "text-brand-inactive text-base font-semibold hover:text-brand-dark transition-colors cursor-pointer",
            t === BERITA_TERBARU && "text-brand-dark"
          )}
        >
          Berita Terbaru
        </Link>
      </div>
      <ul>
        {posts.map((post: any) => (
          <li
            key={`utama-terbaru-${post.id}`}
            className="h-10 px-5 py-2.5 border-b border-brand-gray last:border-b-0 flex items-center"
          >
            <Link
              href={`/berita/${t ? t : "berita-utama"}/${post.id}`}
              className="flex items-center gap-x-1.5 group"
            >
              <p className="max-w-[310px] truncate text-xs text-brand-dark font-medium leading-none group-hover:text-brand-red transition-colors">
                {post.title}
              </p>
              <span className="text-[10px] text-brand-inactive font-medium leading-none">
                {dayjs().to(dayjs(`${post.createdAt}`))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UtamaTerkini;
