export type ClubStatus = 'ON' | 'OFF';

export interface Club {
  id: string;
  image: string;
  target: string;
  status: ClubStatus;
}

export interface ClubStatusMap {
  [key: string]: {
    status: ClubStatus;
    lastUpdated: string;
  };
}

export interface ClubSlideProps {
  club: Club;
  loading: boolean;
  onClick?: (target: string) => void;
}

export interface ClubStatusBadgeProps {
  status: ClubStatus;
  className?: string;
}

export interface ClubSlideListProps {
  clubs: Club[];
  loading: boolean;
  animate: boolean;
  onStop: () => void;
  onStart: () => void;
}