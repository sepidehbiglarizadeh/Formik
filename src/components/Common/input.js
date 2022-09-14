const Input = ({formik,name,label,type="text"}) => {
    return ( 
        <div className="formControl">
          <label>{label}</label>
          <input
            className="input"
            type={type}
            name={name}
            {...formik.getFieldProps(name)}
          />
          {formik.errors[name] && formik.touched[name] && (
            <div className="error">{formik.errors[name]}</div>
          )}
        </div>
     );
}
 
export default Input;