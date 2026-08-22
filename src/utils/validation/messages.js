export const MESSAGES = {
  name: {
     required: "Name is required",
    minLength: (min) => `Name must have at least ${min} characters`,
  },
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
    invalid: "Invalid phone number. Must be 9 digits starting with 9 (e.g., 994123456)",
    unsupported: "Unsupported prefix. Allowed prefixes: 93, 94, 95, 96, 98, 99"
  },
  terms: {
    required: "You must agree to the terms and conditions"
  },
  confirmPassword: {
    required: "Please confirm your password",
    mismatch: "Passwords do not match"
  },
  
};
