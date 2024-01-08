"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
import ChangeProfileImage from "@/components/profile/change-profile-image";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  referralCode: z.string().optional(),
});

const EditProfile = () => {
  const [nameAvailable, setNameAvailable] = useState<boolean>(false);

  const { data: session, status, update } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      referralCode: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      form.setValue("name", session.user.name as string);
      form.setValue("email", session.user.email as string);
      form.setValue("referralCode", session.user.referralCode || "");
    }
  }, [status, session, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await update();
        router.refresh();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmNameAvailable = async (name: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/name/available`,
        {
          method: "POST",
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNameAvailable(true);
      } else {
        console.log(data);
        setNameAvailable(false);
      }
    } catch (error) {
      console.log(error);
      setNameAvailable(false);
    }
  };

  return (
    <div className="w-full bg-brand-white">
      <div className="h-[60px] w-full px-6 border-b border-brand-gray flex items-center gap-x-[14px] pb-2.5">
        <h2
          onClick={() => router.push("/profil-saya")}
          className="text-base text-brand-dark font-semibold hover:text-brand-dark transition-colors cursor-pointer"
        >
          Ubah Profil
        </h2>
        <div className="w-[1px] h-5 bg-brand-subgray" />
        <h2
          onClick={() => router.push("/profil-saya/ubah-sandi")}
          className="text-base text-brand-inactive font-semibold hover:text-brand-dark transition-colors cursor-pointer"
        >
          Ubah Sandi
        </h2>
      </div>

      <div className="py-8 px-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-x-5 mb-[60px]">
                <ChangeProfileImage />
                <div className="p-3 bg-brand-gray rounded-sm overflow-hidden">
                  <ul className="list-disc space-y-3 pl-6 text-sm text-brand-dark font-medium">
                    <li>Up to 100mb</li>
                    <li>File types: .png, .jpg, .jpeg, .svg, .gif</li>
                    <li>Recommended size: 200x200 px</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 mb-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                        Nama Pengguna
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-x-2.5">
                          <Input
                            className="text-sm text-brand-dark font-medium"
                            {...field}
                          />
                          <Button
                            variant="outline"
                            onClick={() => confirmNameAvailable(field.value)}
                            className="w-[70px] text-xs text-brand-inactive font-semibold hover:text-brand-dark"
                          >
                            Verify
                          </Button>
                        </div>
                      </FormControl>
                      <div className="p-3 bg-brand-gray">
                        <ul className="list-disc px-6 text-sm text-brand-dark font-medium leading-[140%] space-y-3">
                          <li>Harus disertai paling sedikit 6 karakter</li>
                          <li>Only alphabet letters and numbers</li>
                        </ul>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          className="text-sm text-status-inactive font-medium"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-brand-dark font-semibold leading-none">
                        Periksa Kode
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-x-2.5">
                          <Input
                            className="text-sm text-brand-dark font-medium"
                            {...field}
                          />
                          {/* <Button
                            variant="outline"
                            className="w-[70px] text-xs text-brand-inactive font-semibold hover:text-brand-dark"
                          >
                            Confirm
                          </Button> */}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={
                  (!form.getValues("name") &&
                    !form.getValues("referralCode")) ||
                  !nameAvailable
                }
                className="w-full bg-brand-red hover:bg-brand-red/80 transition-colors disabled:bg-brand-inactive"
              >
                Simpan
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full flex items-center justify-end">
          <Link
            href="/profil-saya/hapus-akun"
            className="text-[10px] text-brand-inactive font-medium hover:text-brand-dark transition-colors leading-none mt-1.5"
          >
            Hapus Akun
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
