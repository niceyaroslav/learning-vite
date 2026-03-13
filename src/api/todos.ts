
export async function fetchTodos() {
  const res = await fetch("http://localhost:3000/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}