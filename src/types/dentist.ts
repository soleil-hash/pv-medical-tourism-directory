export interface Dentist {
  id: number;
  name: string;
  practice: string;
  rating: number;
  reviews: number;
  specialty: string;
  price: string; // "$", "$$", or "$$$"
  location: string;
  image: string;
  services: string[];
  description: string;
  languages: string[];
  consultationFee: string;
}

export interface DentistCardProps {
  dentist: Dentist;
  onClick?: () => void;
}
