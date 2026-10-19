const REPO = 'kalaiarasidhanasekaran-creator/field-notes-blog';
const WRITE_URL = `https://github.com/${REPO}/issues/new?template=journal-post.yml`;
const CATEGORY_IMAGES = {
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
  Life: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
  Ideas: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85'
};
const grid = document.querySelector('#post-grid');
const search = document.querySelector('#search');
const empty = document.querySelector('#empty-state');
let posts = [], activeFilter = 'All';
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const section = (body, name) => {
  const heading = new RegExp('^###\\s+' + name + '\\s*\\r?\\n', 'mi');
  const match = heading.exec(body); if (!match) return '';
  const start = match.index + match[0].length; const next = body.indexOf('\n### ', start);
  return body.slice(start, next < 0 ? body.length : next).trim();
};
const dateLabel = value => new Intl.DateTimeFormat('en',{year:'numeric',month:'short',day:'numeric'}).format(new Date(value));
function render() {
  const term = search.value.trim().toLowerCase();
  const shown = posts.filter(p => (activeFilter === 'All' || p.category === activeFilter) && (!term || `${p.title} ${p.excerpt} ${p.category} ${p.story}`.toLowerCase().includes(term)));
  grid.innerHTML = shown.map(p => `<article class="post-card" tabindex="0" role="button" aria-label="Read ${esc(p.title)}" data-id="${p.id}"><div class="post-cover" style="background-image:url('${CATEGORY_IMAGES[p.category] || CATEGORY_IMAGES.Life}')"><span>${esc(p.category)}</span><span class="cover-glyph">✳</span></div><div class="post-card-copy"><div class="card-top"><span class="category">A NOTE FROM KALAI</span><span class="card-icon">↗</span></div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p><div class="card-bottom"><span>${dateLabel(p.date).toUpperCase()}</span><span class="card-arrow">READ ↗</span></div></div></article>`).join('');
  empty.hidden = shown.length > 0;
  if (!shown.length) empty.innerHTML = posts.length ? 'No notes found. <a href="' + WRITE_URL + '">Write a new one ↗</a>' : `Your journal starts here. <a href="${WRITE_URL}">Write your first story ↗</a>`;
  document.querySelector('#all-count').textContent = String(posts.length).padStart(2,'0');
  document.querySelector('#post-total').textContent = `${String(posts.length).padStart(2,'0')} NOTES IN THE JOURNAL`;
}
const dialog = document.querySelector('#reader');
function openPost(id) {
  const post = posts.find(p => String(p.id) === String(id)); if (!post) return;
  document.querySelector('#reader-category').textContent = post.category.toUpperCase();
  document.querySelector('#reader-date').textContent = dateLabel(post.date).toUpperCase();
  document.querySelector('#reader-title').textContent = post.title;
  document.querySelector('#reader-subtitle').textContent = post.excerpt;
  document.querySelector('#reader-body').innerHTML = post.story.split(/\n\s*\n/).map(p => `<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
  dialog.showModal();
}
grid.addEventListener('click', e => { const card=e.target.closest('.post-card'); if(card) openPost(card.dataset.id); });
grid.addEventListener('keydown', e => { if((e.key==='Enter'||e.key===' ')&&e.target.matches('.post-card')){e.preventDefault();openPost(e.target.dataset.id);} });
search.addEventListener('input', render);
document.querySelectorAll('.filter-chip').forEach(btn => btn.addEventListener('click',()=>{document.querySelector('.filter-chip.selected').classList.remove('selected');btn.classList.add('selected');activeFilter=btn.dataset.filter;render();}));
document.querySelector('#reader-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
async function loadPosts() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues?state=all&sort=created&direction=desc&per_page=100`, {headers:{Accept:'application/vnd.github+json'}});
    if (!res.ok) throw new Error('Could not reach the journal.');
    posts = (await res.json()).filter(i => !i.pull_request && i.title.startsWith('JOURNAL · ')).map(i => {
      const cat = section(i.body || '', 'Category');
      const category = ['Technology','Life','Ideas'].includes(cat) ? cat : 'Life';
      return {id:i.number,title:i.title.replace('JOURNAL · ','').trim(),category,date:i.created_at,excerpt:section(i.body||'','Short introduction')||section(i.body||'','Subtitle'),story:section(i.body||'','Your story')||section(i.body||'','Story')};
    }).filter(p=>p.title && p.story);
  } catch (err) {
    empty.hidden=false; empty.textContent='Journal posts could not load just now. Refresh the page to try again.';
  }
  render();
}
const themeButton=document.querySelector('#theme-toggle');
function setTheme(dark){document.body.classList.toggle('dark',dark);themeButton.querySelector('.toggle-label').textContent=dark?'Dark':'Light';themeButton.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');localStorage.setItem('field-notes-theme',dark?'dark':'light');}
setTheme(localStorage.getItem('field-notes-theme')==='dark');themeButton.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));
loadPosts();

