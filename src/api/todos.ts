
export async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}