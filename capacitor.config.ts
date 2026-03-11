import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.app',
  appName: 'YourApp',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'android/app/your-keystore.jks',
      keystorePassword: 'your-password',
      keystoreAlias: 'your-alias',
      keystoreAliasPassword: 'your-password',
    },
  },
};

export default config;
