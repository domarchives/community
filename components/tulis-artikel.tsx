"use client";

import { useRouter } from "next/navigation";
import { useRef, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor";
import KonsepSaya from "./konsep-saya";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const formSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, { message: "* Pilih kategory" }),
  title: z.string().min(1, { message: "* Masukkan judul" }),
  body: z.string().min(1, { message: "* Masukkan sesuatu" }),
});

const categories = [
  {
    label: "Umum",
    value: "umum",
    isAdmin: false,
  },
  {
    label: "Komunitas Koin",
    value: "komunitas-koin",
    isAdmin: false,
  },
  {
    label: "Informasi Koin",
    value: "informasi-koin",
    isAdmin: false,
  },
  {
    label: "NFT / Metaverse",
    value: "nft-metaverse",
    isAdmin: false,
  },
  {
    label: "Galeri Meme",
    value: "galeri-meme",
    isAdmin: false,
  },
  {
    label: "Galeri",
    value: "galeri",
    isAdmin: false,
  },
  {
    label: "Berita Utama",
    value: "berita-utama",
    isAdmin: true,
  },
  {
    label: "Berita Terbaru",
    value: "berita-terbaru",
    isAdmin: true,
  },
];

export default function NewArticle() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [pushURL, setPushURL] = useState<string>("");

  const router = useRouter();

  const quillRef = useRef<ReactQuill>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      category: "",
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (status === "authenticated") {
      try {
        const response = await fetch(`/api/posts`, {
          method: "POST",
          body: JSON.stringify({
            ...values,
            userId: session.user.id,
          }),
        });
        const { post, point } = await response.json();
        if (response.ok) {
          form.reset();
          if (point > 0) {
            setOpen(true);
            setPushURL(`/komunitas/${post.category}/${post.id}`);
          } else {
            router.push(`/komunitas/${post.category}/${post.id}`);
          }
        } else {
          return alert("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createDraft = async () => {
    if (status === "authenticated") {
      const values = form.getValues();

      try {
        const response = await fetch(`/api/drafts`, {
          method: "POST",
          body: JSON.stringify({
            ...values,
            userId: session.user.id,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          form.reset();
          router.refresh();
          return alert(data.message);
        } else {
          return alert("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileType = file.type.split("/")[1];

        try {
          const response = await fetch(`/api/uploads`, {
            method: "POST",
            body: JSON.stringify({ type: fileType }),
          });

          const data = await response.json();
          const { uploadUrl, key } = data;

          await axios.put(uploadUrl, file);

          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(
            range?.index || 0,
            "image",
            `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${key}`
          );
          editor?.setSelection(
            (range?.index || 0) + 1 || 0,
            range?.length || 0
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
  };

  const fetchKonsepSaya = async () => {
    try {
      const response = await fetch(`/api/drafts`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <main className="md:max-w-7xl w-full h-full mx-auto py-3 md:py-5 md:px-10">
      <section className="bg-white">
        <h2 className="h-[60px] px-6 text-base text-main-dark font-semibold leading-none flex items-center border-b border-main-grey">
          Tulis Artikel
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-3 md:px-6 py-[22px]"
          >
            <div className="space-y-[14px] mb-10">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="max-w-full md:max-w-[210px]">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="rounded-none border-status-inactive">
                        <SelectTrigger className="text-sm text-main-dark font-medium">
                          <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => {
                          const role = session?.user.role;
                          if (role === "USER") {
                            if (category.isAdmin) {
                              return null;
                            } else {
                              return (
                                <SelectItem
                                  key={`tulis-artikel-${category.value}`}
                                  value={category.value}
                                >
                                  {category.label}
                                </SelectItem>
                              );
                            }
                          } else {
                            return (
                              <SelectItem
                                key={`tulis-artikel-${category.value}`}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            );
                          }
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-none border-status-inactive">
                      <Input
                        placeholder="Masukkan judul"
                        className="text-sm text-main-dark font-medium placeholder:text-main-dark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        forwardedRef={quillRef}
                        modules={modules}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between">
              <KonsepSaya
                form={form}
                router={router}
                fetchKonsepSaya={fetchKonsepSaya}
              />
              <div className="w-full md:w-fit md:space-x-[14px] space-y-2 md:space-y-0 mt-2 md:mt-0">
                <Button
                  type="button"
                  onClick={createDraft}
                  className="w-full md:w-[220px] bg-white hover:bg-white border border-main-dark text-main-dark text-sm font-semibold"
                >
                  Simpan sebagai Konsep
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-[180px] bg-main-red hover:bg-main-red text-sm font-semibold"
                >
                  Unggahan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </section>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-lg text-main-dark font-semibold mb-4">
              Article posted! +2 KITA point
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push(pushURL);
                }}
                className="w-full bg-main-red hover:bg-main-red/90"
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
