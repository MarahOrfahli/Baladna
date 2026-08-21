/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Form, Input, Label } from "../../../components/form";
import { Button } from "../../../components/ui";

export async function loader() {
  return {
    pageTitle: "Sign Up",
    description: "Create your account to get started!",
    isLogin: false
  };
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Form>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* <!-- First Name --> */}
          <div className="sm:col-span-1">
            <Label>
              First Name<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter your first name"
            />
          </div>
          {/* <!-- Last Name --> */}
          <div className="sm:col-span-1">
            <Label>
              Last Name<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        {/* <!-- Email --> */}
        <div>
          <Label>
            Email<span className="text-error-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        {/* <!-- Password --> */}
        <div>
          <Label>
            Password<span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
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
        {/* <!-- Checkbox --> */}
        <div className="flex items-center gap-3">
          <Checkbox
            className="w-5 h-5"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
            By creating an account means you agree to the{" "}
            <span className="text-gray-800 dark:text-white/90">
              Terms and Conditions,
            </span>{" "}
            and our{" "}
            <span className="text-gray-800 dark:text-white">
              Privacy Policy
            </span>
          </p>
        </div>
        {/* <!-- Button --> */}
        <div>
          <Button
            content={"Sign Up"}
            className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium dark:bg-mist-500 bg-basic-green hover:bg-emerald-600 text-white transition rounded-lg shadow-theme-xs`}
          />
        </div>
      </div>
    </Form>
  );
}
