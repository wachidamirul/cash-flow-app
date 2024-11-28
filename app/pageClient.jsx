"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const PageClient = () => {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto relative">
      <div className="min-h-screen flex items-center justify-center"></div>

      <div className="absolute top-4 right-4">
        <Button
          onClick={() => signOut()}
          variant="destructive"
          size="icon"
          className="rounded-full"
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default PageClient;
