declare namespace Register {
  interface ApiPayload {
    email: string;
    password: string;
    name: string;
    role?: string;
  }

  interface ApiSocialPayload {
    email: string;
    name: string;
    socialId: number;
    provider: string;
  }

  interface ApiEditUserPayload {
    id: number;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
  }

  interface ApiCreateArtistPayload {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    bio?: string;
    seeking_guest_spot?: boolean;
    guest_artist?: boolean;
    licensed?: boolean;
    cpr_certified?: boolean;
    years_of_experience?: number;
    minimum_spend?: number;
    price_per_hour?: number;
    currency_code?: string;
    website?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    street_address?: string;
    street_address_2?: string;
    zip_code?: string;
    state?: string;
    city?: string;
    country?: string;
    styles?: number[];
    phone_number?: string;
    specialty?: string[];
  }

  interface ApiEditArtistPayload {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    bio?: string;
    seeking_guest_spot?: boolean;
    guest_artist?: boolean;
    licensed?: boolean;
    cpr_certified?: boolean;
    years_of_experience?: number;
    minimum_spend?: number;
    price_per_hour?: number;
    currency_code?: string;
    website?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    street_address?: string;
    street_address_2?: string;
    zip_code?: string;
    city?: string;
    country?: string;
    state?: string;
    styles?: number[];
    phone_number?: string;
    specialty?: string[];
  }

  interface ApiUpdateAvatarPayload {
    id: number;
    file: any;
  }

  interface ApiCreateStudioPayload {
    user_id: number;
    name: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    bio?: string;
    street_address?: string;
    street_address_2?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
    city: string;
    state: string;
    phone_number: string;
    website_url?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
  }

  interface ApiEditStudioPayload {
    id: number;
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    bio?: string;
    street_address?: string;
    street_address_2?: string;
    zip_code?: string;
    city?: string;
    state?: string;
    country?: string;
    phone_number?: string;
    website_url?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    styles?: number[];
    minimum_spend?: number;
    price_per_hour?: number;
    currency_code?: string;
    accepted_payment_methods?: string;
    appointment_only?: boolean;
    accepting_guest_artist?: boolean;
    piercings?: boolean;
    cosmetic_tattoos?: boolean;
    vegan_ink?: boolean;
    wifi?: boolean;
    privacy_dividers?: boolean;
    wheelchair_access?: boolean;
    parking?: boolean;
    lgbt_friendly?: boolean;
    specialty?: string[];
    languages?: string[];
    services?: string[];
  }

  interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
}

declare namespace Login {
  interface FormData {
    email: string;
    password: string;
  }
}
