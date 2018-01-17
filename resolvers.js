import fetch from 'node-fetch';

const resolvers = {
  Query: {
    async notes() {
      const res = await fetch('http://localhost:8080/notes');

      return res.json();
    },
  },
};

export default resolvers;
