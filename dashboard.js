const token = localStorage.getItem('token');
if(!token){ location.href = '/login.html'; }

function authFetch(url, opts={}){
  opts.headers = Object.assign({'Authorization': 'Bearer '+token,'Content-Type':'application/json'}, opts.headers||{});
  return fetch(url, opts);
}

async function loadProjects(){
  const res = await authFetch('/api/projects');
  const projects = await res.json();
  const list = document.getElementById('projectsList'); list.innerHTML='';
  for(const id in projects){
    const p = projects[id];
    const row = document.createElement('div'); row.className='project';
    const left = document.createElement('div'); left.innerHTML = `<strong>${p.name}</strong><div class="muted">${p.id}</div>`;
    const right = document.createElement('div');
    const edit = document.createElement('button'); edit.textContent='Editar'; edit.onclick=()=>{ document.getElementById('projId').value = p.id; document.getElementById('projName').value = p.name; document.getElementById('projCode').value = p.code || '' };
    const openBtn = document.createElement('button'); openBtn.textContent='Abrir'; openBtn.style.marginLeft='8px'; openBtn.onclick = ()=>{ localStorage.setItem('projectId', p.id); window.location.href = '/editor'; };
    const start = document.createElement('button'); start.textContent='Run'; start.style.marginLeft='8px'; start.onclick = async ()=>{ await authFetch(`/api/bots/${p.id}/start`, {method:'POST'}); refreshBots(); };
    const stop = document.createElement('button'); stop.textContent='Stop'; stop.style.marginLeft='8px'; stop.onclick = async ()=>{ await authFetch(`/api/bots/${p.id}/stop`, {method:'POST'}); refreshBots(); };
    right.appendChild(edit); right.appendChild(openBtn); right.appendChild(start); right.appendChild(stop);
    row.appendChild(left); row.appendChild(right); list.appendChild(row);
  }
}

async function saveProject(){
  const id = document.getElementById('projId').value.trim();
  const name = document.getElementById('projName').value.trim();
  const code = document.getElementById('projCode').value;
  const body = { id: id||undefined, name, code };
  const res = await authFetch('/api/projects', { method:'POST', body: JSON.stringify(body) });
  await loadProjects();
  alert('Guardado');
}

document.getElementById('saveProj').addEventListener('click', saveProject);
document.getElementById('logoutBtn').addEventListener('click', ()=>{ localStorage.removeItem('token'); location.href = '/login.html'; });

async function refreshBots(){
  const res = await authFetch('/api/bots');
  const d = await res.json();
  document.getElementById('botsStatus').textContent = JSON.stringify(d, null, 2);
}

loadProjects(); refreshBots();
setInterval(refreshBots, 5000);
