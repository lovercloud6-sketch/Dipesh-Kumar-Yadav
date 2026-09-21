import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  max?: number;
  size?: number;
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
  onClick?: () => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  max = 5,
  size = 15,
  showScore = false,
  reviewCount,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`inline-flex items-center gap-1.5 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: max }).map((_, idx) => {
          const filled = idx + 1 <= Math.floor(rating);
          const half = !filled && idx < rating;
          return (
            <Star
              key={idx}
              size={size}
              className={`${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-stone-200 text-stone-300'
              }`}
            />
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-stone-800">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-stone-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
