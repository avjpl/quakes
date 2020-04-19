const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */

  async getUsers() {
    const users = await this.store.users;
    return users;
  }

  async getUser({ email: emailArg }) {
    const email = this.context && this.context.user
      ? this.context.user.email
      : emailArg;

    const user = this.store.users.filter(user => email === user.email);

    return _.head(user);
  }

  async saveRecord({ recordId }) {
    const id = this.context.user.id;

    if (!id) {
      throw new Error('Unable to save record');
    }

    const user = _.head(this.store.users.filter(user => id == user.id));
    user.records.push({ id: recordId });

    return _.get(user, ['records'], []);
  }
}

module.exports = UserAPI;
