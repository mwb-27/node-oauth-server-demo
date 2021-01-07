import 'egg';

declare module 'egg' {
  interface Application {
    oAuth2Server: any;
  }
}