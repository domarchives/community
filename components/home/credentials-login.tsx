"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const CredentialsLogin = () => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (response?.ok) {
      try {
        const res = await fetch("/api/auth/sign-in/point", {
          method: "POST",
        });
        const data = await res.json();
        const point = data.point;

        if (point > 0) {
          setOpen(true);
        } else {
          router.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const googleOAuthLogin = async () => {
  //   try {
  //     await signIn("google", { callbackUrl: "/" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <section className="p-6 bg-brand-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="bg-transparent text-xs font-medium text-brand-dark placeholder:text-brand-inactive rounded-none"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Sandi"
                    className="bg-transparent text-xs font-medium text-brand-dark placeholder:text-brand-inactive rounded-none"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full bg-brand-red hover:bg-brand-red">
            Masuk
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-between mt-2.5">
        <Link
          href="/lupa-sandi"
          className="text-sm font-medium text-brand-inactive hover:text-brand-red transition-colors"
        >
          Lupa sandi?
        </Link>
        <Link
          href="/daftar"
          className="text-sm font-medium text-brand-inactive hover:text-brand-red transition-colors"
        >
          Daftar
        </Link>
      </div>

      {/* <div className="h-[14px] border-b border-brand-subgray mt-5 relative">
        <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-25%] text-sm font-medium text-brand-inactive w-fit px-[14px] bg-brand-white">
          atau, lanjutkan dengan
        </p>
      </div>

      <Button
        onClick={googleOAuthLogin}
        className="mt-5 w-full bg-white flex items-center justify-center gap-x-2 border border-brand-subgray group"
      >
        <Image src="/images/google.png" alt="Google" width={20} height={20} />
        <span className="text-sm text-brand-dark font-medium group-hover:text-brand-white transition-colors">
          Google
        </span>
      </Button> */}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-lg text-main-dark font-semibold mb-4">
              Daily bonus! +10 KITA point
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.refresh();
                }}
                className="w-full bg-main-red hover:bg-main-red/90"
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default CredentialsLogin;
