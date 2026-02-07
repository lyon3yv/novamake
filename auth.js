async function postJSON(url, body){
  const res = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  return res.json();
}

document.getElementById('loginBtn').addEventListener('click', async ()=>{
  const id = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value;
  if(!id||!password){ alert('Rellena ambos campos'); return }
  const r = await postJSON('/api/auth/login', { id, password });
  if(r.token){ localStorage.setItem('token', r.token); location.href = '/dashboard.html'; }
  else alert(r.error || 'Error');
});

document.getElementById('registerBtn').addEventListener('click', async ()=>{
  const id = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value;
  if(!id||!password){ alert('Rellena ambos campos'); return }
  const r = await postJSON('/api/auth/register', { id, password });
  if(r.token){ localStorage.setItem('token', r.token); location.href = '/dashboard.html'; }
  else alert(r.error || 'Error');
});

function setAuthCookie(token){
  // set cookie for 7 days
  const maxAge = 7*24*60*60;
  document.cookie = `token=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

// Update: also set cookie when logging in/registering
const originalLogin = document.getElementById('loginBtn').onclick;
document.getElementById('loginBtn').addEventListener('click', async (e)=>{
  const id = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value;
  if(!id||!password){ alert('Rellena ambos campos'); return }
  const r = await postJSON('/api/auth/login', { id, password });
  if(r.token){ localStorage.setItem('token', r.token); setAuthCookie(r.token); location.href = '/dashboard.html'; }
  else alert(r.error || 'Error');
});

document.getElementById('registerBtn').addEventListener('click', async (e)=>{
  const id = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value;
  if(!id||!password){ alert('Rellena ambos campos'); return }
  const r = await postJSON('/api/auth/register', { id, password });
  if(r.token){ localStorage.setItem('token', r.token); setAuthCookie(r.token); location.href = '/dashboard.html'; }
  else alert(r.error || 'Error');
});
