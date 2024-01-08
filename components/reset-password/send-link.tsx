"use client";

import Link from "next/link";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Silakan masukkan email" })
    .email({ message: "Silakan masukkan format email yang benar" }),
});

const FirstStep = () => {
  const [sentLink, setSentLink] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/auth/reset-password/send-link`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`/lupa-sandi/${data.token}`);
        setSentLink(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("max-w-[420px] mx-auto", sentLink ? "py-10" : "py-[120px]")}
    >
      {sentLink ? (
        <section className="p-6 flex flex-col items-center justify-center">
          <h2 className="text-[32px] text-main-dark font-semibold mb-5">
            Tautan Terkirim!
          </h2>
          <p className="text-center text-sm text-main-dark font-medium leading-[140%] mb-10">
            Kami telah mengirim tautan ke email Anda. Silakan cek kotak masuk
            untuk mengatur ulang Sandi Anda.
          </p>
          <Link
            href="/"
            className="h-10 w-full flex items-center justify-center rounded-sm bg-main-red text-white text-sm font-semibold"
          >
            Konfirmasi
          </Link>
        </section>
      ) : (
        <section className="p-6 flex flex-col items-center justify-center">
          <h2 className="text-[32px] text-main-dark font-normal mb-5">
            Atur ulang Sandi
          </h2>
          <p className="text-center text-sm text-main-dark font-bold leading-[140%] mb-5">
            Kami akan membantu anda mengatur ulang sandi anda dengan menggunakan
            alamat email yang terhubung dengan akun Kripto Klub anda.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-main-dark font-normal">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan email"
                        className="text-sm text-main-dark font-medium placeholder:text-brand-subgray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-main-red font-medium" />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full bg-main-red hover:bg-main-red/80 transition-colors"
              >
                Atur ulang Sandi
              </Button>
            </form>
          </Form>
        </section>
      )}
    </div>
  );
};

export default FirstStep;
