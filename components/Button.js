export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
  }) {
    const base =
      "px-4 py-2 rounded-lg font-medium transition shadow-sm";
  
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700",
      danger:
        "bg-red-500 text-white hover:bg-red-600",
      secondary:
        "bg-slate-200 text-slate-900 hover:bg-slate-300",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }