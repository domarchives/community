"use client";

import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

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
  email: z
    .string()
    .min(1, { message: "Silakan masukkan email" })
    .email({ message: "Silakan masukkan format email yang benar" }),
  password: z.string().min(1, { message: "Harap masukkan sandi anda" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
  };

  // const googleOAuthLogin = async () => {
  //   try {
  //     await signIn("google", { callbackUrl: "/" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <section className="my-[120px]">
      <div className="max-w-[420px] mx-auto p-6 flex flex-col items-center justify-center">
        <Image
          src="/images/auth-logo.png"
          alt="Logo"
          width={420}
          height={50}
          priority
          className="object-contain mb-11"
        />
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2.5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-main-dark font-semibold leading-none">
                      Email
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
                      Sandi
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
              <button
                type="submit"
                className="w-full h-10 bg-main-red rounded-sm text-white text-sm font-semibold"
              >
                Masuk
              </button>
            </form>
          </Form>

          <div className="flex items-center justify-between mt-2.5">
            <Link
              href="/lupa-sandi"
              className="text-sm text-status-inactive font-semibold"
            >
              Lupa sandi?
            </Link>
            <Link
              href="/daftar"
              className="text-sm text-status-inactive font-semibold"
            >
              Daftar
            </Link>
          </div>

          {/* <p className="text-sm text-status-inactive font-medium leading-none py-5 text-center">
            atau, lanjutkan dengan
          </p>

          <button
            type="button"
            onClick={googleOAuthLogin}
            className="w-full h-10 rounded-sm border border-[#D9D9D9] flex items-center justify-center gap-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.2253 10.4596C20.2253 9.75055 20.1617 9.06873 20.0434 8.41418H10.6172V12.2824H16.0036C15.7716 13.5324 15.0664 14.5915 14.0064 15.3005V17.8096H17.241C19.1335 16.0687 20.2253 13.5051 20.2253 10.4596Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6178 20.2322C13.3201 20.2322 15.5856 19.3367 17.2416 17.8095L14.007 15.3004C13.1108 15.9004 11.9644 16.2549 10.6178 16.2549C8.01103 16.2549 5.80461 14.4958 5.01758 12.1322H1.67383V14.7231C3.32068 17.9913 6.70538 20.2322 10.6178 20.2322Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.01767 12.1324C4.8175 11.5324 4.70376 10.8915 4.70376 10.2324C4.70376 9.57327 4.8175 8.93236 5.01767 8.33236V5.74146H1.67392C0.996067 7.09145 0.609375 8.61873 0.609375 10.2324C0.609375 11.846 0.996067 13.3733 1.67392 14.7233L5.01767 12.1324Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6178 4.20957C12.0872 4.20957 13.4065 4.71412 14.4438 5.70503L17.3144 2.83684C15.5811 1.22321 13.3155 0.2323 10.6178 0.2323C6.70538 0.2323 3.32068 2.47321 1.67383 5.74139L5.01758 8.3323C5.80461 5.96866 8.01103 4.20957 10.6178 4.20957Z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm text-main-dark font-medium">Google</span>
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
