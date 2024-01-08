import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import SendLink from "@/components/reset-password/send-link";

export default async function LupaSandi() {
  return (await isAuthenticated()) ? redirect("/") : <SendLink />;
}
