/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Label, Input, Checkbox, Form } from "../../../components/form";
import { Button } from "../../../components/ui";

export async function loader() {
  return {
    pageTitle: "Sign In",
    description: "Enter your email and password to sign in!",
    isLogin: true, // optional لتمييز الصفحة
  };
}
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Form>
      <div className="space-y-6">
        <div>
          <Label>
            Email <span className="text-error-500">*</span>{" "}
          </Label>
          <Input placeholder="info@gmail.com" />
        </div>
        <div>
          <Label>
            Password <span className="text-error-500">*</span>{" "}
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
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
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
              Keep me logged in
            </span>
          </div>
          <Link
            to="/reset-password"
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>
        <div>
          <Button
            size="sm"
            content={"Sign in"}
            className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium dark:bg-mist-500 bg-basic-green hover:bg-brand-600 text-white transition rounded-lg shadow-theme-xs`}
          />
        </div>
      </div>
    </Form>
  );
}
