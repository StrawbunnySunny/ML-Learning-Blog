(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Navigation ──────────────────────────────────────

  const navBtns = $$('.nav-btn');
  const sections = $$('.section');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  const navBrand = $('.nav-brand');

  function showSection(id) {
    sections.forEach((s) => s.classList.remove('active'));
    navBtns.forEach((b) => b.classList.remove('active'));

    const target = $(`#section-${id}`);
    if (target) target.classList.add('active');

    navBtns.forEach((b) => {
      if (b.dataset.section === id) b.classList.add('active');
    });

    // Close mobile menu
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');

    // Reset post detail view when navigating to posts
    if (id === 'posts') {
      $('#posts-list').classList.remove('hidden');
      $('#post-detail').classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  navBrand.addEventListener('click', () => showSection('home'));

  // Hamburger toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // ── Content Loading ─────────────────────────────────

  let contentData = null;

  async function loadContent() {
    try {
      const res = await fetch('content.json');
      contentData = await res.json();
      renderAbout();
      renderContact();
      renderObjectives();
      renderResources();
    } catch (e) {
      console.error('Failed to load content.json:', e);
    }
  }

  function renderAbout() {
    const el = $('#about-content');
    if (!contentData.about) {
      el.innerHTML = '<p class="empty-state">Nothing here yet!</p>';
      return;
    }
    el.innerHTML = `<div class="about-text">${contentData.about.split('\n').map((p) => `<p>${p}</p>`).join('')}</div>`;
  }

  function renderContact() {
    const el = $('#contact-content');
    const links = contentData.contact || [];
    if (links.length === 0) {
      el.innerHTML = '<p class="empty-state">Nothing here yet!</p>';
      return;
    }
    el.innerHTML = `<div class="contact-links">${links.map((c) => `
      <a class="contact-link" href="${c.url}" target="_blank" rel="noopener">
        ${getContactIcon(c.type)}
        ${c.label}
      </a>
    `).join('')}</div>`;
  }

  function getContactIcon(type) {
    const icons = {
      email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
      github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
      linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
      twitter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
      website: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
    };
    return icons[type] || icons.website;
  }

  function renderObjectives() {
    const el = $('#objectives-content');
    const items = contentData.objectives || [];
    if (items.length === 0) {
      el.innerHTML = '<p class="empty-state">No objectives yet. Time to set some goals!</p>';
      return;
    }
    el.innerHTML = items.map((item) => `
      <div class="objective-item">
        <span class="badge ${item.type}">${item.type}</span>
        <p>${item.text}</p>
      </div>
    `).join('');
  }

  function renderResources() {
    const el = $('#resources-content');
    const groups = contentData.resources || [];
    if (groups.length === 0) {
      el.innerHTML = '<p class="empty-state">No resources added yet.</p>';
      return;
    }
    el.innerHTML = groups.map((group) => `
      <div class="resource-group">
        <h3>${group.category}</h3>
        ${group.items.map((item) => `
          <a class="resource-item" href="${item.url}" target="_blank" rel="noopener">
            <div class="resource-name">${item.name}</div>
            ${item.description ? `<div class="resource-desc">${item.description}</div>` : ''}
          </a>
        `).join('')}
      </div>
    `).join('');
  }

  // ── Posts ────────────────────────────────────────────

  let postsData = [];

  async function loadPosts() {
    try {
      const res = await fetch('posts/posts.json');
      postsData = await res.json();
      postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderPostsList();
    } catch (e) {
      console.error('Failed to load posts.json:', e);
      $('#posts-list').innerHTML = '<p class="empty-state">No posts yet. Start writing!</p>';
    }
  }

  function renderPostsList() {
    const el = $('#posts-list');
    if (postsData.length === 0) {
      el.innerHTML = '<p class="empty-state">No posts yet. Start writing!</p>';
      return;
    }
    el.innerHTML = postsData.map((post, i) => `
      <div class="post-card" data-index="${i}">
        <div class="post-card-title">${post.title}</div>
        <div class="post-card-date">${formatDate(post.date)}</div>
        <div class="post-card-summary">${post.summary}</div>
      </div>
    `).join('');

    $$('.post-card').forEach((card) => {
      card.addEventListener('click', () => openPost(parseInt(card.dataset.index)));
    });
  }

  async function openPost(index) {
    const post = postsData[index];
    if (!post) return;

    const body = $('#post-body');
    body.innerHTML = '<p class="loading">Loading post...</p>';

    $('#posts-list').classList.add('hidden');
    $('#post-detail').classList.remove('hidden');

    try {
      const res = await fetch(`posts/${post.file}`);
      const md = await res.text();
      body.innerHTML = `
        <div class="post-date-header">${formatDate(post.date)}</div>
        ${marked.parse(md)}
      `;
    } catch (e) {
      body.innerHTML = '<p class="empty-state">Failed to load post.</p>';
    }
  }

  $('#backToPosts').addEventListener('click', () => {
    $('#posts-list').classList.remove('hidden');
    $('#post-detail').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // ── Init ────────────────────────────────────────────

  loadContent();
  loadPosts();
})();
