import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  className?: string;
}

const StarRating = ({
  value = 0,
  onChange,
  size = 'md',
  readOnly = false,
  className,
}: StarRatingProps) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const containerClasses = readOnly ? '' : 'cursor-pointer';

  const handleMouseEnter = (index: number) => {
    if (!readOnly) setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(null);
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) onChange(index);
  };

  return (
    <div className={cn('flex', containerClasses, className)}>
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = (hoverValue !== null ? index <= hoverValue : index <= value);
        
        return (
          <Star
            key={index}
            className={cn(
              sizeStyles[size],
              'transition-colors duration-150',
              filled ? 'text-amber-500 fill-amber-500' : 'text-gray-300',
              !readOnly && 'hover:text-amber-500'
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;