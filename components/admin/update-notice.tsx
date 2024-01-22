"use client";

import { useRouter } from "next/navigation";
import { useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";

interface Props {
  perhatian: any;
}

const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const UpdateNotice = ({ perhatian }: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const quillRef = useRef<ReactQuill>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: perhatian.title,
      body: perhatian.body,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isAuthenticated = status === "authenticated";
    const isAdmin = data?.user.role === "ADMIN";

    if (isAuthenticated && isAdmin) {
      try {
        const response = await fetch(`/api/admin/perhatian/${perhatian.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: perhatian.id,
            ...values,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          form.reset();
          return router.push(`/perhatian/${data.perhatian.id}`);
        } else {
          console.log(data);
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
    <div className="md:max-w-7xl w-full h-full mx-auto py-3 md:py-5 md:px-10">
      <section className="bg-white">
        <h2 className="h-[60px] px-6 text-base text-main-dark font-semibold leading-none flex items-center border-b border-main-grey">
          Perhatian
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-5 md:px-6 py-[22px]"
          >
            <div className="space-y-[14px] mb-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl className="rounded-none border-status-inactive">
                      <Input
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
                    <FormLabel>Description</FormLabel>
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
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-[180px] bg-main-red hover:bg-main-red text-sm font-semibold"
              >
                Unggahan
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default UpdateNotice;
