/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react-refresh/only-export-components */
// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  // faEyeSlash,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Form, Input, Label } from "../../../components/form";
import { Button } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/schema";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export async function loader() {
  return {
    pageTitle: "Sign Up",
    description: "Create your account to get started!",
    isLogin: false
  };
}

export default function SignUpForm() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const { loading, registering } = useAuthStore();
  const navigate = useNavigate();

  // Form Validation...
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeToTerms: false
    }
  });

  const agreeToTerms = watch("terms");

  async function onSubmit(data) {
    try {
      const success = await registering(
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          password: data.password,
          password_confirmation: data.password
        },
        data.agreeToTerms
      );
      if (success) {
        navigate("/");
      } else {
        console.log("Wrong Infos");
      }
    } catch (error) {
      console.error("Registring failed:", error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* <!-- Name --> */}
          <div className="sm:col-span-1">
            <Label>
              Name<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="fname"
              name="fname"
              error={errors.name}
              hint={errors.name ? `${errors.name.message}` : ``}
              validation={{ ...register("name") }}
              placeholder="Enter your name"
            />
            {/* {errors.name && <p className="text-sm">{errors.name.message}</p>} */}
          </div>
          {/* <!-- Phone Number --> */}
          <div className="sm:col-span-1">
            <Label>
              Phone Number<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              error={errors.phone}
              hint={errors.phone ? `${errors.phone.message}` : ``}
              validation={{ ...register("phone") }}
              placeholder="Enter your phone number"
            />
            {/* {errors.phone && <p className="text-sm">{errors.phone.message}</p>} */}
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
            error={errors.email}
            hint={errors.email ? `${errors.email.message}` : ``}
            validation={{ ...register("email") }}
            placeholder="Enter your email"
          />
          {/* {errors.email && <p className="text-sm">{errors.email.message}</p>} */}
        </div>
        {/* <!-- Password --> */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label>
              Password<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter your password"
                eye = {true}
                error={errors.password}
                hint={errors.password ? `${errors.password.message}` : ``}
                validation={{ ...register("password") }}
                type={"password"}
              />
              {/* {errors.password && <p className="text-sm">{errors.password.message}</p>} */}
              
            </div>
          </div>
          {/* <!-- Confirm Password --> */}
          <div>
            <Label>
              Confirm Password<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                error={errors.confirmPassword}
                hint={
                  errors.confirmPassword
                    ? `${errors.confirmPassword.message}`
                    : ``
                }
                placeholder="Enter your password"
                eye = {true}
                validation={{ ...register("confirmPassword") }}
                type={"password"}
              />
              {/* {errors.confirmPassword && <p className="text-sm">{errors.confirmPassword.message}</p>} */}
              {/* <span
                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showConfirmPassword ? (
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
              </span> */}
            </div>
          </div>
        </div>

        {/* <!-- Checkbox --> */}
        <div className="flex items-center gap-3">
          <Checkbox
            error={errors.terms}
            className="w-5 h-5"
            checked={agreeToTerms}
            validation={{ ...register("terms") }}
            // onChange={setIsChecked}
          />
          <p className="inline-block  text-sm font-normal text-gray-500 dark:text-gray-400">
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
            disabled={loading}
            content={
              !loading ? "Sign Up" : <FontAwesomeIcon icon={faSpinner} />
            }
            className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium dark:bg-mist-500 bg-basic-green hover:bg-emerald-600 text-white transition rounded-lg shadow-theme-xs`}
          />
        </div>
      </div>
    </Form>
  );
}
