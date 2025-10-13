import 'dotenv/config';

export default {
  name: 'rate-repository-app-rn',
  slug: 'rate-repository-app-rn',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: './assets/images/favicon.png',
  },

  extra: {
    apolloUriWeb: process.env.APOLLO_URI_WEB,
    apolloUriMob: process.env.APOLLO_URI_MOB,
  },
};
