const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');
const QuakeAPI = require('./datasources/quake');
const UserAPI = require('./datasources/user');

const store = createStore();

const getToken = (auth) => {
  return auth.split(' ')[1];
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let users = [];
    let email = '';

    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';


    if (auth.length && getToken(auth)) {
      const userDetails = jwt.verify(
        getToken(auth),
        ')gpAAEpA[tsXjaskJ}vEn2qFC8CqRmE4Djm)WT}HNXy2P(akD[Qk%b'
      );
      email = userDetails.email;
    }

    // find a user by their email
    const usercheck = await store.users.map(user => {
      if (email === user.email) return user;
    });

    await usercheck.forEach(user => {
      if (user) users.push(user)
    });

    const user = users.length && users[0] || null;

    return { user };
  },
  dataSources: () => ({
    quakeAPI: new QuakeAPI(),
    userAPI: new UserAPI({store}),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
