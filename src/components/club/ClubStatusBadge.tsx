import { ClubStatusBadgeProps } from '@/types/types';

const ClubStatusBadge = ({ status, className = '' }: ClubStatusBadgeProps) => {
  const statusClasses = {
    ON: 'bg-blue-500 text-white',
    OFF: 'bg-gray-500 text-white'
  };

  return (
    <div className="absolute top-2 right-2 z-20">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]} ${className}`}>
        {status}
      </span>
    </div>
  );
};

export default ClubStatusBadge;