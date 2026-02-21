let todos = JSON.parse(localStorage.getItem('todos')) || [];
const save = () => localStorage.setItem('todos', JSON.stringify(todos));
const priorityOrder = { high: 0, medium: 1, low: 2 };
const sortTodos = () => todos.sort((a, b) => priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);

function render() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center gap-2 py-2';
    if (t.done) li.classList.add('done');
    const p = t.priority || 'medium';
    li.classList.add(p);

    const select = document.createElement('select');
    select.className = `priority-select ${p}`;
    ['high', 'medium', 'low'].forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v === 'medium' ? 'Med' : v.charAt(0).toUpperCase() + v.slice(1);
      if (v === p) opt.selected = true;
      select.appendChild(opt);
    });
    select.onchange = () => {
      todos[i].priority = select.value;
      sortTodos();
      save();
      render();
    };

    li.innerHTML = '';
    li.appendChild(select);

    const checkbox = document.createElement('input');
    checkbox.className = 'form-check-input mt-0';
    checkbox.type = 'checkbox';
    checkbox.checked = t.done;
    checkbox.onchange = () => { todos[i].done = !todos[i].done; save(); render(); };
    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.className = 'task-text flex-grow-1';
    span.textContent = t.text;
    span.ondblclick = () => {
      span.classList.add('editing');
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'edit-input';
      input.value = t.text;
      li.insertBefore(input, span.nextSibling);
      input.focus();
      const finish = () => {
        const val = input.value.trim();
        if (val) { todos[i].text = val; save(); }
        render();
      };
      input.onkeydown = (e) => { if (e.key === 'Enter') finish(); if (e.key === 'Escape') render(); };
      input.onblur = finish;
    };
    li.appendChild(span);

    const del = document.createElement('button');
    del.className = 'btn-close btn-close-sm';
    del.onclick = () => { todos.splice(i, 1); save(); render(); };
    li.appendChild(del);

    list.appendChild(li);
  });
  const left = todos.filter(t => !t.done).length;
  document.getElementById('count').textContent = `${left} item${left !== 1 ? 's' : ''} left`;
  document.getElementById('footer').classList.toggle('hidden', todos.length === 0);
}

document.getElementById('form').onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false, priority: 'medium' });
  input.value = '';
  sortTodos();
  save();
  render();
};

document.getElementById('clear').onclick = () => { todos = todos.filter(t => !t.done); save(); render(); };
render();
