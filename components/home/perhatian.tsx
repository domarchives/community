import Link from "next/link";

import { fetchPerhatiansForHomeComponent } from "@/actions/perhatian-actions";

const Perhatian = async () => {
  const { perhatians } = await fetchPerhatiansForHomeComponent();

  return (
    <section className="bg-brand-white">
      {perhatians.map((perhatian: any) => (
        <Link
          href={`/perhatian/${perhatian.id}`}
          key={`perhatian-${perhatian.id}`}
          className="h-10 px-5 py-2.5 border-b border-brand-gray last:border-b-0 flex items-center gap-x-3 group"
        >
          <h3 className="text-brand-red text-sm font-semibold">Perhatian</h3>
          <p className="max-w-[304px] truncate text-xs text-brand-dark font-medium group-hover:underline underline-offset-2">
            {perhatian.title}
          </p>
        </Link>
      ))}
    </section>
  );
};

export default Perhatian;
