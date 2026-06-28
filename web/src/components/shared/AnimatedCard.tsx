interface AnimatedCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
  className?: string;
}

export default function AnimatedCard({ children, onClick, hover = true, className = '' }: AnimatedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl
        border-2
        border-gray-100
        shadow-sm
        transition-all
        duration-300
        ${hover ? 'hover:shadow-md hover:border-purple-200 hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
