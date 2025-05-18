import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const Alert = ({ 
  title, 
  children,
  variant = 'info',
  className,
}: AlertProps) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      content: 'text-green-700',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-500',
      title: 'text-amber-800',
      content: 'text-amber-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      content: 'text-red-700',
    },
  };

  const icons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
  };

  return (
    <div
      className={cn(
        'rounded-md border p-4',
        variantStyles[variant].container,
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className={variantStyles[variant].icon}>
            {icons[variant]}
          </span>
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={cn('text-sm font-medium', variantStyles[variant].title)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm mt-1', variantStyles[variant].content)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;