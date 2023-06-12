module.exports = {
  publicRuntimeConfig: {
    GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
    INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
    PUBLIC_PAGE_BASE_URL: process.env.PUBLIC_PAGE_BASE_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_REGION: process.env.AWS_REGION,
    NEXT_PUBLIC_CDN_HOST: process.env.NEXT_PUBLIC_CDN_HOST,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    ROLLBAR_CLIENT_TOKEN: process.env.ROLLBAR_CLIENT_TOKEN,
  },
  compress: false,
  poweredByHeader: false,
  // Make auto redirect to artist page when use open the first page temporarily because we dont have design yet
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/artists",
        destination: `${process.env.PUBLIC_PAGE_BASE_URL}/artists`,
        permanent: true,
      },
      {
        source: "/studios",
        destination: `${process.env.PUBLIC_PAGE_BASE_URL}/studios`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["localhost", "qa_account.trueartists.com", "account.trueartists.com"],
  },
};
