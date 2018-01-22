import fetch from 'node-fetch';
import GraphQLJSON from 'graphql-type-json';

const baseUrl = 'http://localhost:8080';
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    async notes() {
      const res = await fetch(`${baseUrl}/notes`);

      return res.json();
    },
    async note(root, { id }) {
      const res = await fetch(`${baseUrl}/notes/${id}`);

      return res.json();
    },
  },
  Mutation: {
    async addNote(root, { content }) {
      const res = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      return res.json();
    },
    async updateNote(root, { id, content }) {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      return res.json();
    },
  },
};

export default resolvers;
