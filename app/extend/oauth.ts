import * as path from 'path';
import * as nconf from 'nconf';
import { Application } from 'egg';

module.exports = (app: Application) => {
  // Mock Data
  nconf.use('file', {
    file: path.join(app.config.baseDir, 'app/mock/db.json'),
  });

  class Model {
    async getClient(clientId, clientSecret) {
      const client = nconf.get('client');
      if (
        clientId !== client.clientId ||
        clientSecret !== client.clientSecret
      ) {
        return;
      }
      return client;
    }

    async getUser(username, password) {
      const user = nconf.get('user');
      if (username !== user.username || password !== user.password) {
        return;
      }
      return { userId: user.id };
    }

    async getAccessToken() {
      const token = nconf.get('token');
      token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
      token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
      const user = nconf.get('user');
      const client = nconf.get('client');
      token.user = user;
      token.client = client;
      return token;
    }

    async saveToken(token, client, user) {
      const _token = Object.assign({}, token, { user }, { client });
      nconf.set('token', _token);
      nconf.save();
      return _token;
    }
  }

  return Model;
};
