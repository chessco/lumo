interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '' 
}: AnimatedButtonProps) {
  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-200',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-green-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-200',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        font-bold
        transition-all
        duration-200
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}
