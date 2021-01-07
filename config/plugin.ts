import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
};

export default plugin;
