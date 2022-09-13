import { useFormik } from "formik";
import * as Yup from "yup";

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
  gender: Yup.string().required("Select Gender")
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    validateOnMount: true,
  });

  // console.log(formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            className="input"
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            className="input"
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>PhoneNumber</label>
          <input
            className="input"
            type="text"
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password Confirmation</label>
          <input
            className="input"
            type="password"
            name="passwordConfirm"
            {...formik.getFieldProps("passwordConfirm")}
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div className="formControl">
          <input
            type="radio"
            id="0"
            name="gender"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            id="1"
            name="gender"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Female</label>
        </div>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
