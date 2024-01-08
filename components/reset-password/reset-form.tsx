"use client";

import Link from "next/link";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  token: string;
}

const formSchema = z.object({
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

const ResetForm = ({ token }: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      return alert("Passwords not match!");
    }
    try {
      const response = await fetch(`/api/auth/reset-password`, {
        method: "PATCH",
        body: JSON.stringify({ ...values, token }),
      });
      const data = await response.json();
      if (response.ok) {
        form.reset();
        setIsCompleted(true);
      } else {
        console.log(data);
        setIsCompleted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-[420px] mx-auto p-6 my-[120px] flex flex-col items-center justify-center">
      {!isCompleted ? (
        <div>
          <h2 className="text-[32px] text-main-dark font-semibold mb-5">
            Atur ulang Sandi
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-base text-main-dark font-semibold leading-none mb-2.5">
                      Sandi Baru
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan sandi"
                        className="h-10 text-sm text-main-dark font-medium placeholder:text-status-inactive"
                        {...field}
                      />
                    </FormControl>
                    <ul className="bg-main-grey p-3 list-disc pl-8 space-y-3">
                      <li className="text-sm text-main-dark font-medium leading-[140%]">
                        Paling sedikit 8 karakter
                      </li>
                      <li className="text-sm text-main-dark font-medium leading-[140%]">
                        Harus menyertakan setidaknya 2 hal berikut: huruf
                        kapital, huruf kecil, angka, dan karakter khusus
                      </li>
                    </ul>
                  </FormItem>
                )}
              />
              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-10">
                    <FormLabel className="text-base text-main-dark font-semibold leading-none mb-2.5">
                      Konfirmasi Sandi
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Konfirmasi sandi"
                        className="h-10 text-sm text-main-dark font-medium placeholder:text-status-inactive"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full bg-main-red hover:bg-main-red/80 transition-colors"
              >
                Atur ulang Sandi
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <h2 className="text-[32px] text-main-dark font-semibold mb-5 text-center">
            Atur ulang Sandi
          </h2>
          <p className="text-center text-sm text-main-dark font-medium leading-[140%] mb-10">
            Sandi Anda telah berubah. Coba masuk dengan Sandi baru Anda.
          </p>
          <Link
            href="/masuk"
            className="h-10 w-full flex items-center justify-center rounded-sm bg-main-red text-white text-sm font-semibold"
          >
            Masuk
          </Link>
        </div>
      )}
    </section>
  );
};

export default ResetForm;
