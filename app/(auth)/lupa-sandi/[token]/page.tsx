import { decodeResetPasswordLink } from "@/actions/reset-password-actions";
import ResetForm from "@/components/reset-password/reset-form";
import Expired from "@/components/reset-password/expired";

interface Props {
  params: {
    token: string;
  };
}

export default function ResetPasswordDecodeToken({ params: { token } }: Props) {
  return decodeResetPasswordLink(token) ? (
    <ResetForm token={token} />
  ) : (
    <Expired />
  );
}
