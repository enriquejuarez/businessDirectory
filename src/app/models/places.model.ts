export interface Places{
  id: number;
  plan: string;
  distance: number;
  closeness: number;
  active: number;
  name: string;
  description: string;
  street: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  email?: string;
  phone?: string;
  schedule?: string;
  celphone?: string;
  twitter?: string;
  facebook?: string;
  category: string;
}
