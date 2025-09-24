import Logo from "@/public/preload.png";
import bgImage from "@/public/office-intranet.jpg";

import { LoginForm } from "./components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start font-ecotrans">
          <div className="text-primary-foreground flex items-center justify-center">
            <Image src={Logo} className="size-6" alt="Ecotrans Logo" />
          </div>
          <span className="text-verde">Eco</span>trans
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={bgImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
