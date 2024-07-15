"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const HeaderConnectWallet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const connect = async () => {
      if (window && typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      }
    };
    connect();
  }, []);

  useEffect(() => {
    if (window && typeof window.ethereum !== "undefined") {
      setAddress(window.ethereum?.selectedAddress);
    }
  }, []);

  const onOpenChange = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const connectToMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      return console.log("Please install metamask wallet.");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts && Array.isArray(accounts)) {
      window.localStorage.setItem("kc_w", accounts[0]);
      setAddress(accounts[0]);
      setOpen(false);
    }
  };

  const handleCopyClipBoard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {address ? (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-x-2"
          onClick={() => handleCopyClipBoard(address)}
        >
          <Image
            src="/images/ic-metamask.svg"
            alt="MetaMask"
            width={14}
            height={14}
          />
          <p className="text-xs text-muted-foreground">
            {`${address.substring(0, 5)}...${address.substring(
              address.length - 5
            )}`}
          </p>
        </Button>
      ) : (
        <Dialog onOpenChange={onOpenChange} open={open}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-brand-red hover:bg-brand-red/80 active:bg-brand-red/80 transition text-sm font-medium"
            >
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Connect to{" "}
                <span className="text-brand-red">Kita Community</span>
              </DialogTitle>
              <DialogDescription>Choose your wallet</DialogDescription>
            </DialogHeader>
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center gap-x-2 h-12"
                onClick={connectToMetaMask}
              >
                <Image
                  src="/images/ic-metamask.svg"
                  alt="MetaMask"
                  width={20}
                  height={20}
                />
                <p className="text-sm font-semibold">MetaMask Wallet</p>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default HeaderConnectWallet;
