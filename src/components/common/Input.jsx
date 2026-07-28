function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
  }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
  
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default Input;