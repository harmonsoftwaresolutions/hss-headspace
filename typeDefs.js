const Note = `
  # Note object
  type Note {
    # ID key
    id: Int!
    content: String!
  }
  type Query {
    # Get all notes
    notes: [Note]
  }
`;

export default Note;
