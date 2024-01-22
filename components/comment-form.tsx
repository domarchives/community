"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  mainType: string;
  category: string;
  postId: string;
  session: any;
}

const formSchema = z.object({
  body: z.string().min(1),
});

const CommentForm = ({ mainType, category, postId, session }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (session) {
      try {
        const response = await fetch(
          `/api/${mainType}/${category}/${postId}/comments`,
          {
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (response.ok) {
          form.reset();
          router.refresh();
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-5 px-5 md:px-6 flex justify-between gap-x-6"
      >
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-x-1.5">
            <span className="h-[14px] w-[17px] flex items-center justify-center border border-main-red rounded-sm text-[10px] text-main-red font-semibold">
              1
            </span>
            <p className="text-xs text-main-dark font-semibold">
              {session?.user.name}
            </p>
          </div>
          <FormField
            name="body"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tulis Komentar"
                    className="text-sm text-main-dark font-normal placeholder:text-status-inactive placeholder:font-medium resize-none border-none p-0"
                    {...field}
                  ></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            className="h-[38px] bg-brand-red hover:bg-brand-red text-sm font-semibold"
          >
            Komentari
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
