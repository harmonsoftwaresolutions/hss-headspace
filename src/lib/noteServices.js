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
