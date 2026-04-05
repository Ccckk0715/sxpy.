/* eslint-disable no-use-before-define */

const LS_SPOTS_KEY = "ck_web_spots_remaining_v1";
const DEFAULT_SPOTS = 12;

// -----------------------------
// Data (占位示例：后续你只需要改这里)
// -----------------------------
const courses = [
  {
    id: "thinking-1",
    badge: "最受欢迎",
    name: "小学奥数班",
    ageGrade: "适合 1-6 年级 · 趣味导向",
    meta: ["小组课", "锻炼思维能力", "培养思考习惯"],
    priceOld: "¥ 3980",
    priceNew: "¥ 1680",
    teacher: "李老师 · 奥数竞赛背景",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=60",
    focus: "数感/推理/巧算与建模",
  },
  {
    id: "focus-1",
    badge: "体系进阶",
    name: "初中数学培优",
    ageGrade: "适合 7-9 年级 ",
    meta: ["专题突破", "过程反馈", "家校共育"],
    priceOld: "¥ 2980",
    priceNew: "¥ 1280",
    teacher: "王老师 · 8年教学经验",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60",
    focus: "计数几何/应用题/思维拓展",
  },
  {
    id: "expression-1",
    badge: "初中科学培优",
    name: "初中科学综合提升",
    ageGrade: "适合 7-9 年级",
    meta: ["科学思维", "科学知识", "科学表达"],
    priceOld: "¥ 3580",
    priceNew: "¥ 1480",
    teacher: "陈老师 · 中考教研经验",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=60",
    focus: "代数推理/几何证明/应试习惯",
  },
];

const testimonials = [
  {
    id: "q1",
    name: "家长A",
    child: "孩子：5年级",
    text: "最明显的是孩子上课更愿意参与了。老师反馈很清晰，家里也知道接下来怎么陪。",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=60",
  },
  {
    id: "q2",
    name: "家长B",
    child: "孩子：3年级",
    text: "从“不会用”到“能迁移”，我们花的时间少了很多。孩子每天打卡也能坚持下来。",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=60",
  },
  {
    id: "q3",
    name: "家长C",
    child: "孩子：6年级",
    text: "氛围很好，作业量不大但很有效。班主任跟进让我们心里踏实。",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=60",
  },
];

const gallery = [
  {
    id: "g1",
    img:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60",
    caption: "课堂花絮：互动环节更容易进入状态。",
  },
  {
    id: "g2",
    img:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=60",
    caption: "孩子作品：结构清晰，表达更自信。",
  },
  {
    id: "g3",
    img:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60",
    caption: "过程反馈：把进步看得见。",
  },
  {
    id: "g4",
    img:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=60",
    caption: "小组练习：每个孩子都有参与机会。",
  },
  {
    id: "g5",
    img:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=60",
    caption: "实物教具：让抽象能力更好理解。",
  },
  {
    id: "g6",
    img:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=60",
    caption: "打卡与复盘：坚持变成习惯。",
  },
];

// -----------------------------
// Utilities
// -----------------------------
function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clampInt(v, min, max) {
  const n = parseInt(String(v), 10);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function getSpots() {
  const raw = localStorage.getItem(LS_SPOTS_KEY);
  if (raw === null) return DEFAULT_SPOTS;
  return clampInt(raw, 0, 999);
}

function setSpots(n) {
  localStorage.setItem(LS_SPOTS_KEY, String(clampInt(n, 0, 999)));
}

function updateSpotsUI() {
  const spots = getSpots();
  // 顶部/首屏
  $all('[data-stat="spots"]').forEach((el) => (el.textContent = String(spots)));
  // 详情页
  $all('[data-stat="spots-detail"]').forEach((el) => (el.textContent = String(spots)));
  // 弹窗
  $all('[data-stat="spots-mini"]').forEach((el) => (el.textContent = String(spots)));

  // 如果名额耗尽，可以给出轻微提示（这里仅轻提示）
  const exhausted = spots <= 0;
  $all('[data-open-modal]').forEach((btn) => {
    btn.disabled = exhausted;
    btn.style.opacity = exhausted ? "0.7" : "1";
  });
}

function showToast(msg) {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "88px";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "rgba(26,43,76,.92)";
    toast.style.color = "#fff";
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "16px";
    toast.style.boxShadow = "0 18px 45px rgba(13,28,54,.25)";
    toast.style.fontWeight = "900";
    toast.style.zIndex = "120";
    toast.style.opacity = "0";
    toast.style.transition = "opacity .2s ease";
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.style.opacity = "0";
  }, 1800);
}

// -----------------------------
// Renderers
// -----------------------------
function renderCourses() {
  const track = $('[data-carousel-track]');
  if (!track) return;

  track.innerHTML = courses
    .map((c) => {
      const meta = c.meta
        .slice(0, 3)
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("");
      return `
        <article class="course-card" data-course-card="${c.id}">
          <div class="course-card-media">
            <img src="${escapeAttr(c.image)}" alt="${escapeAttr(c.name)}" loading="lazy" />
            <div class="course-card-badge">${escapeHtml(c.badge)}</div>
          </div>
          <div class="course-card-body">
            <h3 class="course-card-title">${escapeHtml(c.name)}</h3>
            <div class="course-card-meta">${meta}</div>
            <div class="course-card-age">${escapeHtml(c.ageGrade)}</div>
            <div class="course-card-actions">
              <a
                class="btn btn-primary w100 course-card-contact"
                href="#contact"
                data-course-id="${escapeAttr(c.id)}"
              >预约咨询</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTestimonials() {
  const wrap = $(".testimonials");
  if (!wrap) return;
  wrap.innerHTML = testimonials
    .map(
      (q) => `
        <article class="quote-card">
          <div class="quote-top">
            <div class="quote-avatar" aria-hidden="true"><img src="${escapeAttr(q.avatar)}" alt="" loading="lazy" /></div>
            <div class="quote-name">
              <b>${escapeHtml(q.name)}</b>
              <span>${escapeHtml(q.child)}</span>
            </div>
          </div>
          <div class="quote-mark" aria-hidden="true">“</div>
          <p class="quote-text">${escapeHtml(q.text)}</p>
          <div class="quote-badge">
            <span class="tag">真实评价</span>
            <span class="tag tag-strong">家长反馈</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery() {
  const wrap = $(".masonry");
  if (!wrap) return;
  wrap.innerHTML = gallery
    .map(
      (g) => `
      <div class="masonry-item">
        <img src="${escapeAttr(g.img)}" alt="${escapeAttr(g.caption)}" loading="lazy" />
        <div class="masonry-caption">${escapeHtml(g.caption)}</div>
      </div>
    `
    )
    .join("");
}

// -----------------------------
// Course selection / detail update
// -----------------------------
let selectedCourseId = courses[0]?.id || "";

function getCourseById(id) {
  return courses.find((c) => c.id === id) || courses[0];
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function escapeAttr(str) {
  // attributes: keep safe for quotes already handled in escapeHtml
  return escapeHtml(str);
}

// -----------------------------
// Modal
// -----------------------------
const modal = $('[data-modal]');
const modalBackdrop = $('[data-modal-backdrop]');
const modalCloseBtn = $('[data-modal-close]');
const modalCloseBtn2 = $('[data-modal-close-2]');
const modalForm = $('[data-modal-form]');
const modalSuccess = $('[data-modal-success]');
const modalCourseLabel = $('[data-modal-course]');

let modalLastFocus = null;

function openModal(context) {
  if (!modal) return;
  updateSpotsUI();

  modalLastFocus = document.activeElement;
  modal.setAttribute("aria-hidden", "false");
  modal.dataset.open = "true";

  if (modalCourseLabel) {
    const c = getCourseById(selectedCourseId);
    modalCourseLabel.textContent = c ? `已选：${c.name}` : "选择课程后更快完成匹配";
  }

  // 根据场景给个轻提示（不必太长）
  const hints = {
    "top-cta": "我们将优先安排您附近的试听时间。",
    "mobile-cta": "欢迎预约，3分钟完成报名。",
    "hero-primary": "今天就可以确认试听名额。",
    "hero-side": "先占座，再匹配最合适的班型。",
    "system-cta": "快速预约后，我们会给出匹配建议。",
    "course-cta": "您正在预约所选课程的试听名额。",
    "course-side-cta": "提交后将展示成功态（本地演示）。",
    "contact-cta": "方便的话请填写信息，我们将回电确认。",
    "float": "点击预约即可进入试听匹配流程。",
  };
  const hint = hints[context] || "填写信息即可完成报名，我们会联系您确认试听时间。";
  const oldHint = modal.querySelector("[data-form-hint]");
  if (oldHint) oldHint.textContent = hint;

  // 清空成功态
  if (modalSuccess) {
    modalSuccess.hidden = true;
  }
  if (modalForm) {
    modalForm.reset();
    modalForm.querySelectorAll("input,select,textarea").forEach((i) => {
      i.classList.remove("error");
    });
  }

  // focus
  const first = modal.querySelector('input[name="childName"]') || modal.querySelector("input,select,textarea");
  if (first) first.focus();
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.dataset.open = "false";
  if (modalSuccess) modalSuccess.hidden = true;
  if (modalLastFocus && typeof modalLastFocus.focus === "function") modalLastFocus.focus();
}

function decSpots() {
  const current = getSpots();
  if (current <= 0) return 0;
  setSpots(current - 1);
  updateSpotsUI();
  return current - 1;
}

function onModalSubmit(e) {
  e.preventDefault();
  if (!modalSuccess) return;

  const after = decSpots();
  modalSuccess.hidden = false;

  // 冻结表单（本地演示态）
  const btn = modalForm.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = "0.75";
  }

  // 如果名额归零，提示一下
  if (after <= 0) {
    showToast("名额已满：可稍后再试（本地演示）。");
  } else {
    showToast("已提交预约（本地演示）。");
  }
}

// -----------------------------
// Header / navigation / animations
// -----------------------------
function setHeaderScrolled(scrolled) {
  const h = document.querySelector("[data-header]");
  if (!h) return;
  h.setAttribute("data-scrolled", scrolled ? "true" : "false");
}

function initHeader() {
  setHeaderScrolled(window.scrollY > 10);
  window.addEventListener("scroll", () => {
    setHeaderScrolled(window.scrollY > 10);
  }, { passive: true });
}

function initBurger() {
  const burger = $('[data-burger]');
  const drawer = $('[data-drawer]');
  const closeBtn = $('[data-burger-close]');

  function openDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "true");
    // aria
    if (burger) burger.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "false");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  if (burger) {
    burger.addEventListener("click", openDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      // 点击背景关闭
      if (e.target === drawer) closeDrawer();
    });
  }

  $all("[data-close-drawer]").forEach((a) => {
    a.addEventListener("click", closeDrawer);
  });
}

function initScrollSpy() {
  const links = $all(".nav-link[data-route]");
  const targets = $all("[data-view]");
  if (!links.length || !targets.length) return;

  function clearActive() {
    links.forEach((l) => l.classList.remove("active"));
  }

  const map = new Map();
  links.forEach((l) => map.set(l.dataset.route, l));

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
      if (!visible.length) return;
      const v = visible[0].target;
      const route = v.dataset.view;
      if (!route) return;
      clearActive();
      const link = map.get(route);
      if (link) link.classList.add("active");
    },
    { root: null, threshold: [0.15, 0.25, 0.35], rootMargin: "-20% 0px -65% 0px" }
  );

  targets.forEach((t) => io.observe(t));
}

function initAnimations() {
  const els = $all("[data-animate]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("in-view");
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

function initPlayLab() {
  const tabs = $all("[data-play-tab]");
  if (!tabs.length) return;

  function activate(id) {
    tabs.forEach((btn) => {
      const on = btn.dataset.playTab === id;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
    });
    $all("[data-play-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.playPanel !== id;
    });
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn.dataset.playTab));
  });
}

function initCarousel() {
  const leftBtn = $('[data-carousel-left]');
  const rightBtn = $('[data-carousel-right]');
  const track = $('[data-carousel-track]');
  if (!track) return;

  const step = 360;
  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      track.scrollBy({ left: -step, behavior: "smooth" });
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      track.scrollBy({ left: step, behavior: "smooth" });
    });
  }
}

function initCourseActions() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.course-card-contact[href='#contact']");
    if (!link) return;
    const courseId = link.dataset.courseId;
    if (courseId) selectedCourseId = courseId;
  });
}

// -----------------------------
// Clipboard
// -----------------------------
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制到剪贴板");
  } catch (err) {
    showToast("复制失败，请手动复制");
  }
}

function initCopyButtons() {
  $all("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-copy") || "";
      if (!v) return;
      // phone/mailto 这种不要破坏链接语义：这里按纯文本复制
      copyText(v.replace(/^tel:/, ""));
    });
  });
}

// -----------------------------
// Modal wiring
// -----------------------------
function initModal() {
  if (!modal) return;

  $all("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalContext));
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCloseBtn2) modalCloseBtn2.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  if (modalForm) modalForm.addEventListener("submit", onModalSubmit);
}

// -----------------------------
// Misc: float button, year
// -----------------------------
function initYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function initFloating() {
  const btn = $('[data-float-contact]');
  if (!btn) return;
  btn.addEventListener("click", () => {
    openModal("float");
  });
}

// -----------------------------
// Init
// -----------------------------
function init() {
  renderCourses();
  renderTestimonials();
  renderGallery();

  updateSpotsUI();

  initHeader();
  initBurger();
  initScrollSpy();
  initAnimations();
  initPlayLab();
  initCarousel();
  initCourseActions();
  initCopyButtons();

  initModal();
  initFloating();
  initYear();
}

// DOM ready (defer 已保证）
init();

