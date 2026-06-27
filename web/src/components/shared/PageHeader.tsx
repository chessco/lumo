import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  icon?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, backTo, icon, action }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {backTo && (
        <Link 
          to={backTo}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-600">arrow_back</span>
        </Link>
      )}
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-purple-600 text-2xl">{icon}</span>
        </div>
      )}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-black text-gray-800">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 font-medium text-sm md:text-base">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
