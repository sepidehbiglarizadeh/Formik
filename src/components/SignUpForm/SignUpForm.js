import { useFormik } from "formik";

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: validate,
  });

  // console.log(formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
