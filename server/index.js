const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');
const QuakeAPI = require('./datasources/quake');
const UserAPI = require('./datasources/user');

const store = createStore();

const getToken = (auth) => auth.split(' ')[1];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let email = '';
    const auth = req.headers && req.headers.authorization || '';

    if (!!getToken(auth)) {
      const user = jwt.verify(getToken(auth), process.env.SECRET);
      email = user.email;
    }

    // find a user by email
    const user = _.head(await store.users.filter(user => email === user.email)) || null;

    return { user };
  },
  dataSources: () => ({
    quakeAPI: new QuakeAPI(),
    userAPI: new UserAPI({store}),
  }),
});

server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
