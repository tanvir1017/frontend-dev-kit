"use client";

import Alarm from "@/assets/svg/Alarm";
import Apple from "@/assets/svg/Apple";
import Google from "@/assets/svg/Google";
import Meta from "@/assets/svg/Meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({
    error: "Email must be valid.",
  }),
  password: z.string({
    error: "Password must be given!",
  }),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center w-full">
                    <Link
                      href="/"
                      className="justify-start flex items-center gap-1 text-sm border-b border-black"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Link>
                    <div className="ml-5">
                      <h1 className="text-2xl font-bold">Sign In</h1>{" "}
                    </div>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="m@example.com" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input {...field} placeholder="****" />
                      <Link
                        href="/auth-wall/forget-password"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
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
                    href="/auth-wall/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
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
