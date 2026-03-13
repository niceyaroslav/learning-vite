
export async function fetchTodos() {
  const res = await fetch("http://localhost:3000/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos...");
  }

  return res.json();
}


export async function sendTodo(data: string, method: string,) {
  let id = method === 'PUT' ? JSON.parse(data)['id'] : null
  let url =  id !== null ? `http://localhost:3000/todos/${id}` : "http://localhost:3000/todos"
  const res = await fetch(
    url, {
      method: method,
      body: data
    }
  );
  if (!res.ok) {
    throw new Error("Failed to send todo to server...");
  }

  return res.json();
}


export async function deleteTodo( id: number) {
  const res = await fetch(
    `http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete todo...");
  }
  return res.json();
}