"use client";
import Alarm from "@/assets/svg/Alarm";
import Apple from "@/assets/svg/Apple";
import Google from "@/assets/svg/Google";
import Meta from "@/assets/svg/Meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/utils";

import Link from "next/link";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleEventHandler = () => {
    toast("Developer working on it...", {
      className: "my-classname",
      description: "keep patient!",
      duration: 5000,
      icon: <Alarm />,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Join our 100% creative network
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Tanvir"
                  required
                />
              </div>{" "}
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Hossain"
                  required
                />
              </div>{" "}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="*****"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={handleEventHandler}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <Apple />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button
                  onClick={handleEventHandler}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <Google />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button
                  onClick={handleEventHandler}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <Meta />
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth-wall/sign-in"
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/download.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </div>
    </div>
  );
}
