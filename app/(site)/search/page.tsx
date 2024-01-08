import { redirect } from "next/navigation";

import { fetchSearchQueries } from "@/actions/search-actions";
import Search from "@/components/search";

interface Props {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: Props) {
  if (!searchParams.q || typeof searchParams.q !== "string") {
    return redirect("/");
  }

  const { posts, news, comments } = await fetchSearchQueries(searchParams.q);

  return (
    <div className="py-5 px-10 max-w-7xl mx-auto">
      <div className="h-[72px] px-6 flex items-center bg-white mb-5">
        <h2 className="text-base text-main-dark font-semibold leading-[140%]">
          Menampilkan hasil untuk
          <span className="pl-1.5 text-main-red">{`"${searchParams.q}"`}</span>
        </h2>
      </div>
      <Search
        query={searchParams.q}
        posts={posts}
        news={news}
        comments={comments}
      />
    </div>
  );
}
