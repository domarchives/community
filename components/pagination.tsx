"use client";

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

import Next from "@/components/svg/next";
import Prev from "@/components/svg/prev";

interface Props {
  pageCount: number;
}

const Pagination = ({ pageCount }: Props) => {
  const router = useRouter();

  const handlePageClick = (event: any) => {
    const search = window.location.search;
    const searchArr = search.split("page=");
    const href = window.location.href;
    if (searchArr[1]) {
      router.push(`${href.substring(0, href.length - 1)}${event.selected + 1}`);
    } else {
      if (href.includes("t=")) {
        router.push(`${href}&page=${event.selected + 1}`);
      } else {
        router.push(`${href}?page=${event.selected + 1}`);
      }
    }
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={Next()}
      previousLabel={Prev()}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="pagination h-12 w-full flex items-center justify-center gap-x-2.5 border-t border-main-grey"
    />
  );
};

export default Pagination;
