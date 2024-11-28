"use client";

import { usePathname } from "next/navigation";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="flex items-center gap-2 mb-8">
            <Rocket className="h-6 w-6" />
            <span className="text-xl font-semibold">Company Name</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">
              {pathname === "/login" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground">
              {pathname === "/login"
                ? "Enter your credentials to access your account"
                : "Enter your information to get started"}
            </p>
          </div>

          {children}

          <p className="text-center text-sm text-muted-foreground mt-6">
            {pathname === "/login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
