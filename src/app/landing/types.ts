export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
};

export type Review = {
  name: string;
  role: string;
  text: string;
};

export type FormState = {
  name: string;
  email: string;
  address: string;
  frequency: string;
  phone: string;
  details: string;
};

export type SavedBooking = FormState & {
  createdAt: string;
};
