"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  address: z.string().min(1),
  network: z.string().min(1),
});

const MyWallet = () => {
  const router = useRouter();
  const { update } = useSession();

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (window && typeof window.ethereum !== "undefined") {
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      network: "",
    },
  });

  useEffect(() => {
    const fetchMyWallet = async () => {
      try {
        const response = await fetch("/api/profile/my-wallet", {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          form.setValue("address", data.user.address || "");
          form.setValue("network", data.user.network || "");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyWallet();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/profile/my-wallet", {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        await update();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full bg-white">
      <h2 className="h-10 md:h-[60px] px-5 md:px-6 flex items-center text-base text-main-dark font-semibold border-b border-main-grey">
        Ubah Informasi Wallet
      </h2>
      <div className="py-6 md:py-10 px-5 md:px-6">
        <span className="text-sm font-semibold inline-block mb-2">
          Alamat Wallet
        </span>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-6 md:py-10 px-5 md:px-6 space-y-3 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base text-main-dark font-semibold mb-2.5">
                  Alamat Wallet
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base text-main-dark font-semibold mb-2.5">
                  Network
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ERC20">ERC20</SelectItem>
                        <SelectItem value="BEP20">BEP20</SelectItem>
                        <SelectItem value="TRC20">TRC20</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-main-red hover:bg-main-red h-10 w-full text-sm font-semibold"
          >
            Simpan
          </Button>
        </form>
      </Form> */}
    </section>
  );
};

export default MyWallet;
