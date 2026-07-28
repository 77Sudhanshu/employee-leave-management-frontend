function Button({
    text,
    type = "button",
    className = "",
    onClick,
    disabled = false,
  }) {
    return (
      <button
        type={type}
        className={`btn btn-primary w-100 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
  
  export default Button;