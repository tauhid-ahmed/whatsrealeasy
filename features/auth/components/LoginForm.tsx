"use client";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideMail } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthCard } from "./AuthForm";
import PasswordField from "./PasswordField";
import { loginSchema, LoginFormSchema } from "../utils/validation";
import { forgotPasswordPath, signupPath } from "@/paths";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { toast } from "sonner";
import { LoginResponse } from "@/types/auth.type";
import { safeAsync } from "@/lib/safeAsync";
import { roleBasedPaths } from "@/paths";

export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    await safeAsync(async () => {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const loginResponse: LoginResponse = await response.json();
      if (!loginResponse.success) return toast.error(loginResponse.message);
      toast.success(loginResponse.message);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (
        loginResponse?.data?.role === "admin" ||
        loginResponse?.data?.role === "user"
      ) {
        return (window.location.href = "/coming-soon");
      }

      if (loginResponse?.data?.role === "super_admin") {
        return (window.location.href =
          roleBasedPaths[loginResponse?.data?.role]);
      }

      return null;
    });
  };

  return (
    <AuthCard>
      <AuthCard.Header>
        <h2 className="text-xl font-semibold text-center text-gray-200">
          Welcome back!
        </h2>
        <p className="text-xs text-gray-300">
          Enter your details to login to your account
        </p>
      </AuthCard.Header>
      <AuthCard.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextField type="hidden" name="callbackUrl" />
            <fieldset className="space-y-6">
              <TextField
                label="Email"
                name="email"
                placeholder="Enter your email"
              >
                <LucideMail className="size-9 p-2.5 absolute right-0 bottom-0 text-gray-500" />
              </TextField>
              <PasswordField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                redirectLink={
                  <Link
                    className="text-xs text-blue-500 hover:underline-offset-1 underline"
                    href={forgotPasswordPath()}
                  >
                    forgot password
                  </Link>
                }
              />
            </fieldset>
            <div className="mt-4">
              <AuthButton
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                isLoading={form.formState.isSubmitting}
                className="w-full"
                type="submit"
              >
                Submit
              </AuthButton>
            </div>
          </form>
        </Form>
      </AuthCard.Content>
      <AuthCard.Footer>
        <AuthCard.Text>Don&apos;t have an account yet?</AuthCard.Text>
        <AuthCard.Link href={`${signupPath()}`}>
          Create an account
        </AuthCard.Link>
      </AuthCard.Footer>
    </AuthCard>
  );
}
