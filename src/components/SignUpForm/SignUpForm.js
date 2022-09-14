import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Input from "../Common/input";
import RadioInput from "../Common/RadioInput";
import Select from "../Common/Select";

// const validate = (values) => {
//   let errors = {};
//   if (!values.name) {
//     errors.name = "Name is Required";
//   }
//   if (!values.email) {
//     errors.email = "Email is Required";
//   }
//   if (!values.password) {
//     errors.password = "Password is Required";
//   }
//   return errors;
// };

const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOptions=[
  {label:"Select Nationality...",value:""},
  {label:"Iran",value:"IR"},
  {label:"Germany",value:"GER"},
  {label:"United States",value:"US"},
]

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality:"",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  gender: Yup.string().required("Select Gender"),
  nationality: Yup.string().required("Select Nationality")
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <Select formik={formik} selectOptions={selectOptions} name="nationality"/>

        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
