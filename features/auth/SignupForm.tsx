"use client";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideMail, LucideUser2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthCard } from "./AuthForm";
import PasswordField from "./PasswordField";
import { signupSchema, SignupFormSchema } from "./utils/validation";
import { loginPath } from "@/paths";
import AuthButton from "./AuthButton";
import { toast } from "sonner";
import { safeAsync } from "@/lib/safeAsync";
import { LoginResponse } from "@/types/auth.type";

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupForm() {
  const form = useForm<SignupFormSchema>({
    mode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmit = async () => {
    await safeAsync(async () => {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      console.log(response);
      const loginResponse: LoginResponse = await response.json();
      toast.success(loginResponse.message);
    });
  };

  return (
    <AuthCard>
      <AuthCard.Header>
        <h2 className="text-xl font-semibold text-center text-gray-200">
          Sign Up
        </h2>
        <p className="text-xs text-gray-300">
          Enter your details to create your account
        </p>
      </AuthCard.Header>
      <AuthCard.Content>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="overflow-hidden"
          >
            <fieldset className="space-y-6">
              <TextField
                label="Full Name"
                name="fullName"
                placeholder="Enter your name"
              >
                <LucideUser2 className="size-9 p-2.5 absolute right-0 bottom-0 text-gray-400" />
              </TextField>
              <TextField
                label="Email"
                name="email"
                placeholder="Enter your email"
              >
                <LucideMail className="size-9 p-2.5 absolute right-0 bottom-0 text-gray-400" />
              </TextField>

              <PasswordField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter new password"
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter retype password"
              />
            </fieldset>
            <AuthButton
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
              className="w-full mt-4"
              type="submit"
            >
              Create an account
            </AuthButton>
          </form>
        </Form>
      </AuthCard.Content>
      <AuthCard.Footer>
        <AuthCard.Text>Already have an account?</AuthCard.Text>
        <AuthCard.Link href={loginPath()}>Login</AuthCard.Link>
      </AuthCard.Footer>
    </AuthCard>
  );
}
