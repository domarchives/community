"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Harus disertai paling sedikit 6 karakter" }),
  email: z
    .string()
    .min(1, { message: "Silakan masukkan email" })
    .email({ message: "Silakan masukkan format email yang benar" }),
  password: z.string().min(1),
  confirmPassword: z.string().min(1, { message: "Konfirmasi Sandi" }),
  referralCode: z.string().optional(),
});

const Register = () => {
  const router = useRouter();
  const termsRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const checked = termsRef.current?.checked;

    if (!checked) {
      return alert("terms checked is required");
    }

    if (values.password !== values.confirmPassword) {
      return alert("passwords not matches");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/masuk");
      } else {
        return alert(data.message);
      }
    } catch (error) {
      console.log("signup error: ", error);
    }
  };

  return (
    <section className="my-[120px]">
      <div className="max-w-[420px] mx-auto p-6 flex flex-col items-center justify-center">
        <Image
          src="/images/auth-logo.png"
          alt="Logo"
          width={420}
          height={50}
          priority
          className="object-contain mb-10"
        />
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-main-dark font-semibold leading-none">
                        Nama pengguna <span className="text-main-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama pengguna"
                          autoComplete="off"
                          className="!mt-2.5 rounded-sm border-status-inactive px-[14px] text-sm text-main-dark font-medium placeholder:text-status-inactive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="!mt-1.5 text-xs text-main-red font-semibold leading-none" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-main-dark font-semibold leading-none">
                        Email <span className="text-main-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan email"
                          autoComplete="off"
                          className="!mt-2.5 rounded-sm border-status-inactive px-[14px] text-sm text-main-dark font-medium placeholder:text-status-inactive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="!mt-1.5 text-xs text-main-red font-semibold leading-none" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-main-dark font-semibold leading-none">
                        Sandi <span className="text-main-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Masukkan sandi"
                          autoComplete="off"
                          className="!mt-2.5 rounded-sm border-status-inactive px-[14px] text-sm text-main-dark font-medium placeholder:text-status-inactive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="!mt-1.5 text-xs text-main-red font-semibold leading-none" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-main-dark font-semibold leading-none">
                        Konfirmasi Sandi{" "}
                        <span className="text-main-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Konfirmasi Sandi"
                          autoComplete="off"
                          className="!mt-2.5 rounded-sm border-status-inactive px-[14px] text-sm text-main-dark font-medium placeholder:text-status-inactive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="!mt-1.5 text-xs text-main-red font-semibold leading-none" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-main-dark font-semibold leading-none">
                        Kode Rujukan
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan kode"
                          autoComplete="off"
                          className="!mt-2.5 rounded-sm border-status-inactive px-[14px] text-sm text-main-dark font-medium placeholder:text-status-inactive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="!mt-1.5 text-xs text-main-red font-semibold leading-none" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="terms"
                  className="flex items-start justify-between"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 mt-1"
                    ref={termsRef}
                  />
                  <span className="max-w-[340px] text-sm text-main-dark font-medium leading-[140%]">
                    Saya setuju dengan Ketentuan Layanan dan Kebijakan Privasi
                    dari Kripto Klub <span className="text-main-red">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-main-red rounded-sm text-white text-sm font-semibold"
              >
                Konfirmasi
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
