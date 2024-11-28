"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">
            {pathname === "/login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {pathname === "/login"
              ? "Enter your credentials to access your account"
              : "Enter your information to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm w-full">
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
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
