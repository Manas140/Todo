let data = load();

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const filters = document.querySelectorAll(".filter");

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem("todo"));
    return {
      todos: (parsed.todos || [])
        .filter((t) => t && typeof t.text === "string")
        .map((t) => ({ text: t.text, done: Boolean(t.done) })),

      // failsafe
      filter: ["all", "active", "done"].includes(parsed.filter)
        ? parsed.filter
        : "all",
    };
  } catch {
    return { todos: [], filter: "all" };
  }
}

function save() {
  localStorage.setItem("todo", JSON.stringify(data));
}

function render() {
  list.innerHTML = "";

  const shown = data.todos
    .map((todo, index) => ({ todo, index }))
    .filter(({ todo }) =>
      data.filter === "active" ? !todo.done :
      data.filter === "done" ? todo.done :
      true
    );

  if (shown.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent =
      data.todos.length === 0 ? "You haven't added any todos yet," : "No todo here.";
    list.appendChild(empty);
  }

  shown.forEach(({ todo, index }) => list.appendChild(renderItem(todo, index)));

  filters.forEach((btn) =>
    btn.classList.toggle("is-active", btn.dataset.filter === data.filter)
  );
}

function renderItem(todo, index) {
  const li = document.createElement("li");
  li.className = "item" + (todo.done ? " is-done" : "");

  const text = document.createElement("p");
  text.className = "itemText";
  text.textContent = todo.text;
  li.appendChild(text);

  const del = document.createElement("button");
  del.className = "deleteBtn";
  del.type = "button";
  del.textContent = "-";
  del.addEventListener("click", (e) => {
    e.preventDefault();
    data.todos.splice(index, 1);
    save();
    render();
  });
  li.appendChild(del);

  li.addEventListener("click", () => {
    todo.done = !todo.done;
    save();
    render();
  });

  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  data.todos.push({ text: value, done: false });
  save();
  render();
  input.value = "";
  input.focus();
});

filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    data.filter = btn.dataset.filter;
    save();
    render();
  })
);

render();
