export const getNotes = async () => {
  const res = await fetch('http://localhost:8080/notes');

  return res.json();
};

export const createNote = async title => {
  const res = await fetch('http://localhost:8080/notes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, text: '' }),
  });

  return res.json();
};
