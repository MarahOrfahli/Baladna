export const MESSAGES = {
  email: {
    required: "Email is required",
    invalid: "Email is not valid"
  },
  password: {
    required: "Password is required",
    minLength: (min) => `Password must have at least ${min} characters`,
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    number: "Password must contain at least one number"
  },
  phone: {
    invalid: "Phone format should be like +963985678881",
    unsupported: "Unsupported phone prefix"
  },
  terms: {
    required: "You must agree to the terms and conditions"
  },
  confirmPassword: {
    required: "Please confirm your password",
    mismatch: "Passwords do not match"
  },
  
};
