// Commun pour panel et admin

// Fonction fetch apps
async function fetchApps() {
  const res = await fetch('/api/apps');
  return await res.json();
}

// --- PANEL USER ---

async function renderAppsPanel() {
  const apps = await fetchApps();
  const container = document.getElementById('apps-container');
  container.innerHTML = '';
  
  apps.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    
    const img = document.createElement('img');
    img.src = app.logo;
    img.alt = app.name + ' logo';
    img.className = 'app-logo';
    
    const info = document.createElement('div');
    info.className = 'app-info';
    
    const name = document.createElement('h3');
    name.className = 'app-name';
    name.textContent = app.name;
    
    const btn = document.createElement('button');
    btn.className = 'btn-launch';
    btn.textContent = 'Lancer';
    btn.onclick = () => launchApp(app.command);
    
    info.appendChild(name);
    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(btn);
    
    container.appendChild(card);
  });
}

async function launchApp(command) {
  try {
    const res = await fetch('/api/launch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Application lancée');
  } catch (e) {
    alert('Erreur: ' + e.message);
  }
}

// --- ADMIN PANEL ---

async function renderAppsAdmin() {
  const apps = await fetchApps();
  const list = document.getElementById('admin-apps-list');
  list.innerHTML = '';
  
  apps.forEach(app => {
    const li = document.createElement('li');
    li.textContent = `${app.name} — ${app.command}`;
    
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Modifier';
    btnEdit.onclick = () => showEditForm(app);
    
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Supprimer';
    btnDel.onclick = () => deleteApp(app.id);
    
    li.appendChild(btnEdit);
    li.appendChild(btnDel);
    list.appendChild(li);
  });
}

function showEditForm(app) {
  document.getElementById('admin-add-form').classList.add('hidden');
  const form = document.getElementById('admin-edit-form');
  form.classList.remove('hidden');
  form['edit-id'].value = app.id;
  form['edit-name'].value = app.name;
  form['edit-logo'].value = app.logo;
  form['edit-command'].value = app.command;
}

async function addApp(e) {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const logo = e.target.logo.value.trim();
  const command = e.target.command.value.trim();
  if (!name || !logo || !command) {
    alert('Remplis tous les champs');
    return;
  }
  
  const res = await fetch('/api/apps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, logo, command })
  });
  if (!res.ok) {
    alert('Erreur ajout');
    return;
  }
  e.target.reset();
  renderAppsAdmin();
}

async function editApp(e) {
  e.preventDefault();
  const id = e.target['edit-id'].value;
  const name = e.target['edit-name'].value.trim();
  const logo = e.target['edit-logo'].value.trim();
  const command = e.target['edit-command'].value.trim();
  if (!name || !logo || !command) {
    alert('Remplis tous les champs');
    return;
  }
  
  const res = await fetch('/api/apps/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, logo, command })
  });
  if (!res.ok) {
    alert('Erreur modification');
    return;
  }
  e.target.classList.add('hidden');
  document.getElementById('admin-add-form').classList.remove('hidden');
  renderAppsAdmin();
}

async function deleteApp(id) {
  if (!confirm('Supprimer cette application ?')) return;
  const res = await fetch('/api/apps/' + id, { method: 'DELETE' });
  if (!res.ok) {
    alert('Erreur suppression');
    return;
  }
  renderAppsAdmin();
}

// Appels init
if (document.getElementById('apps-container')) renderAppsPanel();
if (document.getElementById('admin-apps-list')) renderAppsAdmin();

// Liaison formulaires admin
const formAdd = document.getElementById('admin-add-form');
if (formAdd) formAdd.addEventListener('submit', addApp);
const formEdit = document.getElementById('admin-edit-form');
if (formEdit) formEdit.addEventListener('submit', editApp);
