/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Label, Input, Checkbox, Form } from "../../../components/form";
import { Button } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/schema";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export async function loader() {
  return {
    pageTitle: "Sign In",
    description: "Enter your email and password to sign in!",
    isLogin: true
  };
}
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useAuthStore();
  const navigate = useNavigate();

  // Form Validation...
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      keepLoggedIn: false
    }
  });

  const keepLoggedIn = watch("keepLoggedIn");

  async function onSubmit(data) {
    try {
      const success = await login(
        { email: data.email, password: data.password },
        data.keepLoggedIn
      );
      if (success) {
        navigate('/dashboard')
      } else {
        console.log("Wrong Infos");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Email <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="info@gmail.com"
            validation={{ ...register("email") }}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <Label>
            Password <span className="text-error-500">*</span>{" "}
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              validation={{ ...register("password") }}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEye}
                  size="5"
                  className="fill-gray-500 dark:fill-gray-400"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  size="5"
                  className="fill-gray-500 dark:fill-gray-400"
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={keepLoggedIn}
              validation={{ ...register("keepLoggedIn") }}
            />
            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
              Keep me logged in
            </span>
          </div>
        </div>
        <div>
          <Button
            disabled={loading}
            type={"submit"}
            size="sm"
            content={
              !loading ? "Sign in" : <FontAwesomeIcon icon={faSpinner} />
            }
            className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium dark:bg-mist-500 bg-basic-green hover:bg-emerald-600 text-white transition rounded-lg shadow-theme-xs`}
          />
        </div>
      </div>
    </Form>
  );
}
