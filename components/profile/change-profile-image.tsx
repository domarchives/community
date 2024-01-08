"use client";

import { useSession } from "next-auth/react";
import axios from "axios";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChangeProfileImage = () => {
  const { data: session, update, status } = useSession();

  const handleChangeProfileImage = async (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split("/")[1];
      try {
        const response = await fetch(`/api/uploads`, {
          method: "POST",
          body: JSON.stringify({ type: fileType }),
        });
        const data = await response.json();
        if (response.ok) {
          const { uploadUrl, key } = data;
          await axios.put(uploadUrl, file);

          const response = await fetch(`/api/profile/picture`, {
            method: "PATCH",
            body: JSON.stringify({
              image: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${key}`,
            }),
          });
          const d = await response.json();
          if (response.ok) {
            await update();
            window.location.reload();
          } else {
            console.log(d);
          }
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative">
      <Avatar className="w-[150px] h-[150px]">
        {status === "authenticated" && session.user.image ? (
          <AvatarImage
            src={session.user.image}
            alt={session.user.name || "profile"}
            className="object-cover"
          />
        ) : (
          <AvatarImage
            src="/images/default-profile.png"
            alt="profile"
            className="object-cover"
          />
        )}
        <AvatarFallback className="text-brand-dark font-semibold capitalize">
          {session?.user.name?.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 w-[150px] h-[150px] rounded-full opacity-0 hover:opacity-70 bg-black transition-all flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0311 21.6873C14.0311 18.5137 16.7035 15.9411 20 15.9411C23.2965 15.9411 25.9689 18.5137 25.9689 21.6873C25.9689 24.8608 23.2965 27.4334 20 27.4334C16.7035 27.4334 14.0311 24.8608 14.0311 21.6873ZM20 18.2396C18.0221 18.2396 16.4187 19.7831 16.4187 21.6873C16.4187 23.5914 18.0221 25.135 20 25.135C21.9779 25.135 23.5813 23.5914 23.5813 21.6873C23.5813 19.7831 21.9779 18.2396 20 18.2396Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.7973 10.578C16.1337 10.578 14.7851 11.8763 14.7851 13.4778C14.7851 14.4983 13.9714 15.3478 12.9148 15.4304L9.36596 15.7079C8.66916 15.7624 8.0961 16.2584 7.96604 16.9197C7.25178 20.5513 7.19852 24.2747 7.80864 27.9239L7.96344 28.8497C8.10963 29.724 8.85714 30.3892 9.77405 30.4609L12.8657 30.7026C17.6141 31.0739 22.3859 31.0739 27.1343 30.7026L30.2259 30.4609C31.1429 30.3892 31.8904 29.724 32.0366 28.8497L32.1914 27.9239C32.8015 24.2747 32.7482 20.5513 32.034 16.9197C31.9039 16.2584 31.3308 15.7624 30.634 15.7079L27.0852 15.4304C26.0286 15.3478 25.2149 14.4983 25.2149 13.4778C25.2149 11.8763 23.8663 10.578 22.2027 10.578H17.7973ZM12.4072 13.1641C12.5757 10.4392 14.9245 8.27954 17.7973 8.27954H22.2027C25.0755 8.27954 27.4243 10.4392 27.5928 13.1641L30.8273 13.417C32.5956 13.5552 34.0498 14.814 34.3798 16.4921C35.1456 20.3853 35.2027 24.3771 34.5486 28.2891L34.3938 29.2149C34.0729 31.1343 32.432 32.5945 30.4192 32.7519L27.3276 32.9936C22.4506 33.3749 17.5494 33.3749 12.6724 32.9936L9.58079 32.7519C7.56804 32.5945 5.92713 31.1343 5.60622 29.2149L5.45143 28.2891C4.79734 24.3771 4.85444 20.3853 5.62017 16.4921C5.95021 14.814 7.40445 13.5552 9.1727 13.417L12.4072 13.1641Z"
            fill="white"
          />
        </svg>
        <input
          type="file"
          name="profileImage"
          onChange={handleChangeProfileImage}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ChangeProfileImage;
