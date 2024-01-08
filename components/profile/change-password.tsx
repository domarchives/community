"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
  password: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
});

const ChangePassword = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.newPassword !== values.confirmPassword) {
      return alert("Unprocessable");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile/password`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (response.ok) {
        form.reset();
        router.refresh();
        return alert("Password changed successfully!");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-brand-white">
      <div className="h-[60px] w-full px-6 border-b border-brand-gray flex items-center gap-x-[14px] pb-2.5">
        <h2
          onClick={() => router.push("/profil-saya")}
          className="text-base text-brand-inactive font-semibold hover:text-brand-dark transition-colors cursor-pointer"
        >
          Ubah Profil
        </h2>
        <div className="w-[1px] h-5 bg-brand-subgray" />
        <h2
          onClick={() => router.push("/profil-saya/ubah-sandi")}
          className="text-base text-brand-dark font-semibold hover:text-brand-dark transition-colors cursor-pointer"
        >
          Ubah Sandi
        </h2>
      </div>

      <div className="py-8 px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                    Sandi Lama
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan sandi"
                      className="text-sm text-brand-dark font-medium placeholder:text-brand-inactive"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                    Sandi Baru
                  </FormLabel>
                  <div>
                    <FormControl className="mb-2">
                      <Input
                        type="password"
                        placeholder="Masukkan sandi baru"
                        className="text-sm text-brand-dark font-medium placeholder:text-brand-inactive"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="p-3 bg-brand-gray">
                      <ul className="list-disc px-6 text-sm text-brand-dark font-medium leading-[140%] space-y-3">
                        <li>Paling sedikit 8 karakter</li>
                        <li>
                          Harus menyertakan setidaknya 2 hal berikut: huruf
                          kapital, huruf kecil, angka, dan karakter khusus
                        </li>
                      </ul>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                    Konfirmasi Sandi Baru
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Konfirmasi sandi baru"
                      className="text-sm text-brand-dark font-medium placeholder:text-brand-inactive"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={
                !form.getValues("password") ||
                !form.getValues("newPassword") ||
                !form.getValues("confirmPassword")
              }
              className="w-full bg-brand-red hover:bg-brand-red/80 transition-colors disabled:bg-brand-inactive"
            >
              Komfirmasi
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
