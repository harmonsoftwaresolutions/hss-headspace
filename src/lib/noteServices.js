export default async () => {
  const res = await fetch('http://localhost:8080/notes');
  return res.json();
};
