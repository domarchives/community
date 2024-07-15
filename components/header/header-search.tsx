"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  q: z.string().min(1),
});

const HeaderSearch = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.reset();
    return router.push(`/search?q=${values.q}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 px-20">
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem className="relative bg-main-grey rounded-sm">
              <Image
                src="/images/form-search.svg"
                alt="Search"
                width={12}
                height={12}
                className="object-contain absolute inset-0 top-[50%] translate-y-[-50%] left-[14px]"
              />
              <FormControl>
                <Input
                  placeholder="Masukkan kata kunci..."
                  className="bg-transparent border-none w-[210px] text-main-dark text-xs font-medium placeholder:text-status-inactive pl-10 !m-0"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default HeaderSearch;
