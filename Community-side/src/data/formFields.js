/*
  "name":"Manufacturer",
    "email":"manufacturer@gmail.com",
    "password":"123",
    "confirmPassword":"123",
    "phoneNumber":"9900768979",
    "warehouseLocation" : ["13","77"],
    "countryofOrigin" : "California, USA",
    "companyName" : "Apple Inc"
  */

export const signUpFormFields = [
  {
    htmlFor: "name",
    type: "text",
    name: "Name",
    placeholder: "Enter Your Name",
  },
  {
    htmlFor: "email",
    type: "email",
    name: "Email",
    placeholder: "Enter Your Email",
  },
  {
    htmlFor: "signuppassword",
    type: "password",
    name: "Password",
    placeholder: "Enter Your Password",
  },
  {
    htmlFor: "confirmPassword",
    type: "password",
    name: "Confirm Password",
    placeholder: "Confirm your password",
  },
  {
    htmlFor: "phoneNumber",
    type: "text",
    name: "Phone Number",
    placeholder: "Enter your number",
  },
  {
    htmlFor: "companyName",
    type: "text",
    name: "Company Name",
    placeholder: "Enter Company Name",
  },
  {
    htmlFor: "countryofOrigin",
    type: "text",
    name: "Country Of Origin",
    placeholder: "Enter the origin country of company",
  },
];
