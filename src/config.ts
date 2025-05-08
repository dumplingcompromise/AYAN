// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ayan-ecru.vercel.app/';
// Add your API KEY from the Coinbase Developer Portal
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID!
// export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;


export const NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME!
export const NEXT_PUBLIC_ICON_URL                = process.env.NEXT_PUBLIC_ICON_URL!
export const NEXT_PUBLIC_IMAGE_URL               = process.env.NEXT_PUBLIC_IMAGE_URL!
export const NEXT_PUBLIC_BUTTON_TITLE            = process.env.NEXT_PUBLIC_BUTTON_TITLE!
export const NEXT_PUBLIC_SPLASH_IMAGE_URL        = process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL!
export const NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR = process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR!
export const NEXT_PUBLIC_MANIFEST_VERSION        = process.env.NEXT_PUBLIC_MANIFEST_VERSION!
