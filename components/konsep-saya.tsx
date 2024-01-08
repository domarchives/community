"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import moment from "moment";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  form: any;
  router: any;
  fetchKonsepSaya: () => any;
}

const KonsepSaya = ({ form, router, fetchKonsepSaya }: Props) => {
  const [drafts, setDrafts] = useState([]);

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchKonsepSaya().then((response: any) => setDrafts(response?.drafts));
    }
  }, [status, fetchKonsepSaya]);

  const setPostToDraft = (draft: any) => {
    form.setValue("id", draft.id);
    form.setValue("category", draft.category);
    form.setValue("title", draft.title);
    form.setValue("body", draft.body);
  };

  const deleteDraft = async (id: string) => {
    try {
      const response = await fetch(`/api/drafts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        router.refresh();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="w-[180px] bg-white hover:bg-white border border-main-dark text-main-dark text-sm font-semibold space-x-1"
          disabled={drafts?.length < 1}
        >
          <span>Konsep Saya</span>
          <span className="text-brand-blue">({drafts.length || 0})</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 max-w-[420px] border border-main-grey">
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="h-[56px] px-5 flex items-center justify-between border-b border-main-grey">
              <h2 className="text-base text-brand-dark font-semibold">
                Konsep Saya
              </h2>
              <div className="flex items-center gap-x-5">
                <span className="text-xs text-status-inactive font-medium">
                  {drafts.length || 0} in total
                </span>
                <AlertDialogCancel className="p-0 outline-none border-0 hover:bg-transparent">
                  <X size={18} />
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <ul className="max-h-[380px] overflow-y-auto">
              {drafts.map((draft: any) => (
                <li
                  key={`draft-${draft.id}`}
                  className="h-10 px-5 flex items-center justify-between hover:bg-main-grey transition-colors"
                >
                  <AlertDialogAction
                    onClick={() => setPostToDraft(draft)}
                    className="bg-transparent p-0 text-main-dark hover:bg-transparent"
                  >
                    {draft.title}
                  </AlertDialogAction>
                  <div className="flex items-center gap-x-1.5">
                    <span className="text-xs text-status-inactive font-medium">
                      {moment(draft?.createdAt).format("YYYY-MM-DD")}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button type="button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M7.16927 2.0979C6.89313 2.0979 6.66927 2.32176 6.66927 2.5979V3.0979H3.83594C3.5598 3.0979 3.33594 3.32176 3.33594 3.5979C3.33594 3.87404 3.5598 4.0979 3.83594 4.0979H13.1693C13.4454 4.0979 13.6693 3.87404 13.6693 3.5979C13.6693 3.32176 13.4454 3.0979 13.1693 3.0979H10.3359V2.5979C10.3359 2.32176 10.1121 2.0979 9.83594 2.0979H7.16927Z"
                              fill="#525252"
                            />
                            <path
                              d="M7.16927 7.6979C7.44541 7.6979 7.66927 7.92175 7.66927 8.1979L7.66927 12.8646C7.66927 13.1407 7.44541 13.3646 7.16927 13.3646C6.89313 13.3646 6.66927 13.1407 6.66927 12.8646L6.66927 8.1979C6.66927 7.92175 6.89313 7.6979 7.16927 7.6979Z"
                              fill="#525252"
                            />
                            <path
                              d="M10.3359 8.1979C10.3359 7.92175 10.1121 7.6979 9.83594 7.6979C9.5598 7.6979 9.33594 7.92175 9.33594 8.1979V12.8646C9.33594 13.1407 9.55979 13.3646 9.83594 13.3646C10.1121 13.3646 10.3359 13.1407 10.3359 12.8646V8.1979Z"
                              fill="#525252"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.49689 5.87602C4.52502 5.6228 4.73905 5.43123 4.99383 5.43123H12.0114C12.2661 5.43123 12.4802 5.6228 12.5083 5.87602L12.6417 7.07692C12.8836 9.2538 12.8836 11.4508 12.6417 13.6277L12.6286 13.7459C12.5326 14.61 11.8629 15.299 11.0019 15.4195C9.34378 15.6517 7.66142 15.6517 6.00332 15.4195C5.1423 15.299 4.4726 14.61 4.37659 13.7459L4.36345 13.6277C4.12158 11.4508 4.12158 9.2538 4.36345 7.07691L4.49689 5.87602ZM5.44135 6.43123L5.35734 7.18735C5.12362 9.29083 5.12362 11.4137 5.35734 13.5172L5.37047 13.6354C5.41601 14.0453 5.73362 14.372 6.14197 14.4292C7.70809 14.6485 9.29711 14.6485 10.8632 14.4292C11.2716 14.372 11.5892 14.0453 11.6347 13.6354L11.6479 13.5172C11.8816 11.4137 11.8816 9.29083 11.6479 7.18735L11.5639 6.43123H5.44135Z"
                              fill="#525252"
                            />
                          </svg>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[440px] h-[320px] py-10 px-20">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center justify-center">
                            <Image
                              src="/images/warning.png"
                              alt="Warning"
                              height={50}
                              width={50}
                              className="w-[50px] h-[50px] object-contain"
                            />
                          </AlertDialogTitle>
                          <AlertDialogDescription asChild className="mt-5">
                            <div className="text-center space-y-3">
                              <h3 className="text-lg text-brand-dark font-semibold">
                                Batalkan Penyimpanan Artikel
                              </h3>
                              <p className="text-sm text-brand-subgray2 font-medium leading-[140%]">
                                Apakah anda yakin untuk membatalkan penyimpanan
                                artikel ini? Anda selalu dapat menandai artikel
                                ini lagi
                              </p>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-end">
                          <AlertDialogAction
                            onClick={() => deleteDraft(draft.id)}
                            className="h-10 w-full bg-brand-red hover:bg-brand-red"
                          >
                            Konfirmasi
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KonsepSaya;
