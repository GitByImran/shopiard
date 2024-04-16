"use client";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [suggestions, setSuggestions] = useState({
    capitalLetter: false,
    number: false,
    specialSymbol: false,
    minLength: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response?.status === 200 && response.ok) {
        toast({
          title: "Account created successfully.",
        });
        router.push("/signin");
      } else {
        toast({
          title:
            "This email is already registered. Please try again with another email.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Unable to create user.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setIsSubmitting(false);
  };

  const isPasswordValid = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (event: any) => {
    handleChange(event);
    const password = event.target.value;
    setSuggestions({
      capitalLetter: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialSymbol: /[!@#$%^&*]/.test(password),
      minLength: password.length >= 6,
    });
    setIsFormValid(isFormFilled() && isPasswordValid(event.target.value));
  };

  const isFormFilled = (): boolean => {
    return Object.values(formData).every((value) => value !== "");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="max-w-[400px] mx-auto my-20">
      <div className="border p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-600 text-center mb-8">
          Create an account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border p-2 block w-full rounded-md focus-visible:outline-cyan-600"
              required
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border p-2 block w-full rounded-md focus-visible:outline-cyan-600"
              required
              onChange={handleChange}
            />
            <div className="relative">
              <input
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="border p-2 block w-full rounded-md focus-visible:outline-cyan-600"
                required
                onChange={handlePasswordChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <div className="text-sm flex flex-col">
              <p className="flex items-center gap-1">
                <Check
                  stroke={`${suggestions.capitalLetter ? "green" : "#E5E7EB"}`}
                  size={16}
                />
                Contains capital letter
              </p>
              <p className="flex items-center gap-1">
                <Check
                  stroke={`${suggestions.number ? "green" : "#E5E7EB"}`}
                  size={16}
                />
                Contains number
              </p>
              <p className="flex items-center gap-1">
                <Check
                  stroke={`${suggestions.specialSymbol ? "green" : "#E5E7EB"}`}
                  size={16}
                />
                Contains special symbol
              </p>
              <p className="flex items-center gap-1">
                <Check
                  stroke={`${suggestions.minLength ? "green" : "#E5E7EB"}`}
                  size={16}
                />
                Minimum length of 6 characters
              </p>
            </div>
            <button
              type="submit"
              className={`border rounded-md p-2 block w-full bg-cyan-600 text-white hover:bg-cyan-700 ${
                !isFormValid && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              <span className="select-none">
                {isSubmitting ? "Creating New Account..." : "Sign Up"}
              </span>
            </button>
            <div className="text-md text-center">
              <p className="select-none">
                Have an account?{" "}
                <Link
                  href={"/signin"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
