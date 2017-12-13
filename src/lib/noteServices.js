const baseUrl = process.env.REACT_APP_BASE_URL;
export const getNotes = async () => {
  const res = await fetch(baseUrl);

  return res.json();
};

export const createNote = async content => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
};

export const updateNote = async (id, content) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
};

export const destroyNote = async id => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};
