const Note = `
  # Support arbitrary JSON
  scalar JSON
  # Note object
  type Note {
    # ID key
    id: Int!
    # draft-js Editor content
    content: JSON
  }
  type Query {
    # Get all notes
    notes: [Note]
    # Get note by ID
    note(id: ID!): Note
  }
`;

export default Note;
