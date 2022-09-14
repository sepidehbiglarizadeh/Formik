const BooleanCheckBox = ({formik,name}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={true}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        checked={formik.values.terms}
      />
      <label htmlFor={name}>Terms and Conditions</label>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default BooleanCheckBox;
