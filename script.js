(function () {
  "use strict";

  const state = {
    lang: "kz",
    family: null,
    club: null,
    day: null,
    search: "",
    classFilter: ""
  };

  const els = {
    langSwitch: document.getElementById("langSwitch"),
    siteTitle: document.getElementById("siteTitle"),
    heroLead: document.getElementById("heroLead"),
    footerTagline: document.getElementById("footerTagline"),
    sectionsRoot: document.getElementById("sectionsRoot"),

    viewHome: document.getElementById("view-home"),
    viewGrades: document.getElementById("view-grades"),
    viewClub: document.getElementById("view-club"),
    viewStudents: document.getElementById("view-students"),

    gradesHeadingLogoWrap: document.getElementById("gradesHeadingLogoWrap"),
    gradesHeadingLogo: document.getElementById("gradesHeadingLogo"),
    gradesHeadingIcon: document.getElementById("gradesHeadingIcon"),
    gradesHeadingName: document.getElementById("gradesHeadingName"),
    gradesGrid: document.getElementById("gradesGrid"),

    brandHome: document.getElementById("brandHome"),
    backToHome: document.getElementById("backToHome"),
    backToHomeFromGrades: document.getElementById("backToHomeFromGrades"),
    backToClub: document.getElementById("backToClub"),
    backLabel1: document.getElementById("backLabel1"),
    backLabel2: document.getElementById("backLabel2"),
    backLabel3: document.getElementById("backLabel3"),

    clubHeadingLogoWrap: document.getElementById("clubHeadingLogoWrap"),
    clubHeadingLogo: document.getElementById("clubHeadingLogo"),
    clubHeadingIcon: document.getElementById("clubHeadingIcon"),
    clubHeadingName: document.getElementById("clubHeadingName"),
    clubHeadingSub: document.getElementById("clubHeadingSub"),
    clubHeadingTime: document.getElementById("clubHeadingTime"),
    dayGrid: document.getElementById("dayGrid"),

    studentsClubLabel: document.getElementById("studentsClubLabel"),
    dayHeading: document.getElementById("dayHeading"),
    studentsCount: document.getElementById("studentsCount"),
    searchInput: document.getElementById("searchInput"),
    classFilter: document.getElementById("classFilter"),
    studentsBody: document.getElementById("studentsBody")
  };

  /* ---------------- club icon SVGs (no logo image supplied) ---------------- */
  const CLUB_ICONS = {
    togyz: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="40" height="20" rx="10" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="14" cy="24" r="3.4" fill="currentColor"/>
      <circle cx="24" cy="24" r="3.4" fill="currentColor"/>
      <circle cx="34" cy="24" r="3.4" fill="currentColor"/>
    </svg>`,
    asyq: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="24" cy="24" r="6" fill="currentColor"/>
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`,
    chess: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 40h10M17 40l1.4-9h11.2L31 40" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 31l-2-8h12l-2 8" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="13" r="6" stroke="currentColor" stroke-width="2.6"/>
      <path d="M18 23h12" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`,
    football: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.6"/>
      <path d="M24 15l7 5-2.6 8h-8.8L17 20z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M24 6v9M9 19l6.5 1M39 19l-6.5 1M14 39l4.6-8M34 39l-4.6-8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    judo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="11" r="5" stroke="currentColor" stroke-width="2.6"/>
      <path d="M24 16v10M24 26l-9 12M24 26l9 12M15 22l9-6 9 6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 44h22" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`,
    karate: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="11" r="5" stroke="currentColor" stroke-width="2.6"/>
      <path d="M24 16v9M24 25l-11 6M24 25l14-3M13 31l3 12M38 22l-4 12" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    horeo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="9" r="4.4" stroke="currentColor" stroke-width="2.4"/>
      <path d="M24 14v10M24 24l-10 16M24 24l10 16M24 20l-9-4M24 20l9-4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    dombyra: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="33" rx="10" ry="9" stroke="currentColor" stroke-width="2.4"/>
      <path d="M24 24V6M20 6h8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M24 26v14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`,
    debate: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12h22a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H20l-7 6v-6h-5a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M18 20h8M18 26h5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    vocal: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="6" width="12" height="20" rx="6" stroke="currentColor" stroke-width="2.4"/>
      <path d="M12 22a12 12 0 0 0 24 0M24 34v8M18 42h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`,
    kolenner: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="12" r="4.5" stroke="currentColor" stroke-width="2.2"/>
      <circle cx="15" cy="36" r="4.5" stroke="currentColor" stroke-width="2.2"/>
      <path d="M40 9L18 30M18 18l22 21M19 24l-4 3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    ceramics: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 10h20l-2 6c3 3 4 7 4 11 0 8-6 13-12 13s-12-5-12-13c0-4 1-8 4-11z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M14 10c0-2.2 4.5-4 10-4s10 1.8 10 4-4.5 4-10 4-10-1.8-10-4z" stroke="currentColor" stroke-width="2.4"/>
    </svg>`
  };

  function t() {
    return TRANSLATIONS[state.lang];
  }

  function getList(clubId, dayId) {
    return (ROLAB_DATA.clubs[clubId] && ROLAB_DATA.clubs[clubId][dayId]) || [];
  }

  /* ---------------- language ---------------- */
  function setLang(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "kz" ? "kk" : lang;
    els.langSwitch.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    renderStaticText();
    renderCurrentView();
  }

  function renderStaticText() {
    const tr = t();
    els.siteTitle.textContent = tr.siteTitle;
    document.title = tr.siteTitle;
    els.heroLead.textContent = tr.heroLead;
    els.footerTagline.textContent = tr.footerTagline;
    els.backLabel1.textContent = tr.back;
    els.backLabel2.textContent = tr.back;
    els.backLabel3.textContent = tr.back;
    els.searchInput.placeholder = tr.searchPlaceholder;
  }

  /* ---------------- routing ---------------- */
  function showView(name) {
    els.viewHome.hidden = name !== "home";
    els.viewGrades.hidden = name !== "grades";
    els.viewClub.hidden = name !== "club";
    els.viewStudents.hidden = name !== "students";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function findFamily(familyId) {
    return FAMILIES.find((f) => f.id === familyId);
  }

  function goHome() {
    state.family = null;
    state.club = null;
    state.day = null;
    renderHome();
    showView("home");
  }

  // Clicking a club-name button: single-grade families go straight to the
  // schedule, multi-grade families show the grade picker first.
  function openFamily(familyId) {
    const family = findFamily(familyId);
    if (family.members.length === 1) {
      goClub(family.members[0]);
    } else {
      goFamily(familyId);
    }
  }

  function goFamily(familyId) {
    state.family = familyId;
    state.club = null;
    state.day = null;
    renderGrades();
    showView("grades");
  }

  function goClub(clubId) {
    state.club = clubId;
    state.day = null;
    renderClub();
    showView("club");
  }

  function goDay(dayId) {
    state.day = dayId;
    state.search = "";
    state.classFilter = "";
    els.searchInput.value = "";
    renderStudents();
    showView("students");
  }

  function renderCurrentView() {
    if (state.club && state.day) {
      renderStudents();
      showView("students");
    } else if (state.club) {
      renderClub();
      showView("club");
    } else if (state.family) {
      renderGrades();
      showView("grades");
    } else {
      renderHome();
      showView("home");
    }
  }

  function cardMediaHtml(meta, cssClass) {
    return meta.logo
      ? `<img class="${cssClass}" src="${meta.logo}" alt="">`
      : `<span class="club-card-icon">${CLUB_ICONS[meta.icon] || ""}</span>`;
  }

  /* ---------------- render: home (club-name buttons, grouped by section) ---------------- */
  function renderHome() {
    const tr = t();
    const names = tr.clubNames;
    els.sectionsRoot.innerHTML = "";

    SECTIONS.forEach((section) => {
      const wrap = document.createElement("div");
      wrap.className = "club-section";

      const head = document.createElement("div");
      head.className = "club-section-head";
      head.innerHTML = `
        <span class="club-section-title">${tr[section.labelKey]}</span>
        <span class="club-section-rule"></span>
      `;
      wrap.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "club-grid";

      section.families.forEach((family) => {
        const firstMember = family.members[0];
        const meta = CLUB_META[firstMember];
        const card = document.createElement("button");
        card.type = "button";
        card.className = "club-card";
        card.style.setProperty("--card-accent", `var(${meta.accent})`);

        const familyName = names[firstMember];
        // Single-grade family: show its own sub-label (e.g. "It startup and game dev").
        // Multi-grade family: show the combined grade range as the sub-label.
        const familySub =
          family.members.length === 1
            ? names[firstMember + "sub"]
            : family.members.map((m) => names[m + "sub"]).join(" · ");

        const mediaHtml = cardMediaHtml(meta, "club-card-logo");

        card.innerHTML = `
          <div class="club-card-top">
            <div class="club-card-logo-wrap">${mediaHtml}</div>
            <div class="club-card-titles">
              <div class="club-card-name">${familyName}</div>
              <p class="club-card-sub">${familySub}</p>
            </div>
          </div>
          <span class="club-card-cta">${tr.viewSchedule}</span>
        `;
        card.addEventListener("click", () => openFamily(family.id));
        grid.appendChild(card);
      });

      wrap.appendChild(grid);
      els.sectionsRoot.appendChild(wrap);
    });
  }

  /* ---------------- render: grade picker (e.g. LEGO 2–4 / LEGO 0–1) ---------------- */
  function renderGrades() {
    const tr = t();
    const names = tr.clubNames;
    const family = findFamily(state.family);
    const firstMember = family.members[0];
    const meta = CLUB_META[firstMember];

    els.viewGrades.style.setProperty("--club-accent", `var(${meta.accent})`);
    els.gradesHeadingLogoWrap.style.background = `color-mix(in srgb, var(${meta.accent}) 10%, white)`;

    if (meta.logo) {
      els.gradesHeadingLogo.src = meta.logo;
      els.gradesHeadingLogo.alt = names[firstMember];
      els.gradesHeadingLogo.hidden = false;
      els.gradesHeadingIcon.innerHTML = "";
    } else {
      els.gradesHeadingLogo.hidden = true;
      els.gradesHeadingIcon.innerHTML = CLUB_ICONS[meta.icon] || "";
    }
    els.gradesHeadingName.textContent = names[firstMember];

    els.gradesGrid.innerHTML = "";
    family.members.forEach((clubId) => {
      const clubMeta = CLUB_META[clubId];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "club-card";
      card.style.setProperty("--card-accent", `var(${clubMeta.accent})`);

      const mediaHtml = cardMediaHtml(clubMeta, "club-card-logo");

      card.innerHTML = `
        <div class="club-card-top">
          <div class="club-card-logo-wrap">${mediaHtml}</div>
          <div class="club-card-titles">
            <div class="club-card-name">${names[clubId]}</div>
            <p class="club-card-sub">${names[clubId + "sub"]}</p>
          </div>
        </div>
        <span class="club-card-cta">${tr.viewSchedule}</span>
      `;
      card.addEventListener("click", () => goClub(clubId));
      els.gradesGrid.appendChild(card);
    });
  }

  /* ---------------- render: club / day picker ---------------- */
  function renderClub() {
    const tr = t();
    const clubId = state.club;
    const meta = CLUB_META[clubId];
    const names = tr.clubNames;

    els.viewClub.style.setProperty("--club-accent", `var(${meta.accent})`);
    els.clubHeadingLogoWrap.style.background = `color-mix(in srgb, var(${meta.accent}) 10%, white)`;

    if (meta.logo) {
      els.clubHeadingLogo.src = meta.logo;
      els.clubHeadingLogo.alt = names[clubId];
      els.clubHeadingLogo.hidden = false;
      els.clubHeadingIcon.innerHTML = "";
    } else {
      els.clubHeadingLogo.hidden = true;
      els.clubHeadingIcon.innerHTML = CLUB_ICONS[meta.icon] || "";
    }

    els.clubHeadingName.textContent = names[clubId];
    els.clubHeadingSub.textContent = names[clubId + "sub"];
    const clubTime = ROLAB_DATA.clubs[clubId].time;
    els.clubHeadingTime.textContent = clubTime ? `${tr.time}: ${clubTime}` : "";

    els.dayGrid.innerHTML = "";
    DAY_ORDER.forEach((dayId) => {
      const list = getList(clubId, dayId);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "day-card";
      card.innerHTML = `
        <span class="day-card-badge">${tr.daysShort[dayId]}</span>
        <span class="day-card-name">${tr.days[dayId]}</span>
        <span class="day-card-count">${list.length}</span>
      `;
      card.addEventListener("click", () => goDay(dayId));
      els.dayGrid.appendChild(card);
    });
  }

  /* ---------------- render: students ---------------- */
  function renderStudents() {
    const tr = t();
    const clubId = state.club;
    const dayId = state.day;
    const meta = CLUB_META[clubId];
    const names = tr.clubNames;

    els.viewStudents.style.setProperty("--club-accent", `var(${meta.accent})`);
    els.studentsClubLabel.textContent = `${names[clubId]} · ${names[clubId + "sub"]}`;
    els.dayHeading.textContent = tr.days[dayId];

    const fullList = getList(clubId, dayId);

    // build class filter options from data that actually exists for this club/day
    const classesPresent = Array.from(new Set(fullList.map((s) => s.cls))).sort((a, b) =>
      a.localeCompare(b, "kk")
    );
    const prevFilter = state.classFilter;
    els.classFilter.innerHTML = `<option value="">${tr.allClasses}</option>` +
      classesPresent.map((c) => `<option value="${c}">${c}</option>`).join("");
    if (classesPresent.includes(prevFilter)) {
      els.classFilter.value = prevFilter;
    } else {
      state.classFilter = "";
      els.classFilter.value = "";
    }

    applyFilters(fullList);
  }

  function studentCountLabel(n, lang) {
    if (lang === "ru") {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return `${n} ученик`;
      if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${n} ученика`;
      return `${n} учеников`;
    }
    if (lang === "en") {
      return n === 1 ? `${n} student` : `${n} students`;
    }
    return `${n} оқушы`;
  }

  function applyFilters(fullList) {
    const tr = t();
    const q = state.search.trim().toLowerCase();
    const cls = state.classFilter;

    let filtered = fullList;
    if (cls) filtered = filtered.filter((s) => s.cls === cls);
    if (q) {
      filtered = filtered.filter(
        (s) => s.name.toLowerCase().includes(q) || s.cls.toLowerCase().includes(q)
      );
    }

    els.studentsCount.textContent = `${tr.studentCount}: ${fullList.length}`;

    if (fullList.length === 0) {
      els.studentsBody.innerHTML = emptyStateHtml(tr.noStudents);
      return;
    }
    if (filtered.length === 0) {
      els.studentsBody.innerHTML = emptyStateHtml(tr.noResults);
      return;
    }

    // group filtered students by class, preserving natural class order
    const groups = new Map();
    filtered.forEach((s) => {
      if (!groups.has(s.cls)) groups.set(s.cls, []);
      groups.get(s.cls).push(s);
    });
    const orderedClasses = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b, "kk"));

    const groupsHtml = orderedClasses
      .map((cls) => {
        const students = groups.get(cls);
        const rows = students
          .map(
            (s, i) => `
            <li class="class-row">
              <span class="class-row-num">${i + 1}</span>
              <span class="class-row-name">${escapeHtml(s.name)}</span>
            </li>`
          )
          .join("");
        return `
          <div class="class-group">
            <div class="class-group-head">
              <span class="class-group-name">${escapeHtml(cls)}</span>
              <span class="class-group-count">${studentCountLabel(students.length, state.lang)}</span>
            </div>
            <ul class="class-group-list">${rows}</ul>
          </div>
        `;
      })
      .join("");

    els.studentsBody.innerHTML = `<div class="class-groups">${groupsHtml}</div>`;
  }

  function emptyStateHtml(message) {
    return `
      <div class="empty-state">
        <div class="empty-state-dot"></div>
        <p class="empty-state-text">${escapeHtml(message)}</p>
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------- events ---------------- */
  els.langSwitch.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    setLang(btn.dataset.lang);
  });

  els.brandHome.addEventListener("click", (e) => {
    e.preventDefault();
    goHome();
  });
  els.backToHome.addEventListener("click", () => {
    // If this club belongs to a multi-grade family, go back to the grade
    // picker; otherwise (single-grade family) go straight to the home screen.
    const family = FAMILIES.find((f) => f.members.includes(state.club));
    if (family && family.members.length > 1) {
      state.family = family.id;
      state.club = null;
      state.day = null;
      renderGrades();
      showView("grades");
    } else {
      goHome();
    }
  });
  els.backToHomeFromGrades.addEventListener("click", goHome);
  els.backToClub.addEventListener("click", () => {
    state.day = null;
    renderClub();
    showView("club");
  });

  els.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    applyFilters(getList(state.club, state.day));
  });
  els.classFilter.addEventListener("change", (e) => {
    state.classFilter = e.target.value;
    applyFilters(getList(state.club, state.day));
  });

  /* ---------------- init ---------------- */
  setLang("kz");
  goHome();
})();
