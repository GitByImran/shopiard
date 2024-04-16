"use client";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignInForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    setIsSubmitting(true);
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (response?.status === 200 && response.ok) {
        toast({
          title: "Authentication successful.",
        });
        router.push("/");
      } else {
        toast({
          title:
            "Wrong credentials. Please try again with correct credentials!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      throw new Error("user does not exist");
    }
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="max-w-[400px] mx-auto my-20">
      <div className="border p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-600 text-center mb-8">
          Sign in
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border p-2 block w-full rounded-md focus-visible:outline-cyan-600"
              required={true}
            />
            <div className="relative">
              <input
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="border p-2 pr-10 block w-full rounded-md focus-visible:outline-cyan-600"
                required={true}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="border rounded-md p-2 block w-full bg-cyan-600 text-white hover:bg-cyan-700"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
            <div className="text-md text-center">
              <p>
                Don't have an account?{" "}
                <Link
                  href={"/signup"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
