(function () {
  "use strict";

  const state = {
    lang: "kz",
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
    viewClub: document.getElementById("view-club"),
    viewStudents: document.getElementById("view-students"),

    brandHome: document.getElementById("brandHome"),
    backToHome: document.getElementById("backToHome"),
    backToClub: document.getElementById("backToClub"),
    backLabel1: document.getElementById("backLabel1"),
    backLabel2: document.getElementById("backLabel2"),

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
    els.searchInput.placeholder = tr.searchPlaceholder;
  }

  /* ---------------- routing ---------------- */
  function showView(name) {
    els.viewHome.hidden = name !== "home";
    els.viewClub.hidden = name !== "club";
    els.viewStudents.hidden = name !== "students";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    state.club = null;
    state.day = null;
    renderHome();
    showView("home");
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
    } else {
      renderHome();
      showView("home");
    }
  }

  /* ---------------- render: home ---------------- */
  function renderHome() {
    const tr = t();
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

      section.clubs.forEach((clubId) => {
        const meta = CLUB_META[clubId];
        const names = tr.clubNames;
        const card = document.createElement("button");
        card.type = "button";
        card.className = "club-card";
        card.style.setProperty("--card-accent", `var(${meta.accent})`);

        const nameKey = clubId;
        const subKey = clubId + "sub";

        const mediaHtml = meta.logo
          ? `<img class="club-card-logo" src="${meta.logo}" alt="">`
          : `<span class="club-card-icon">${CLUB_ICONS[meta.icon] || ""}</span>`;

        card.innerHTML = `
          <div class="club-card-top">
            <div class="club-card-logo-wrap">${mediaHtml}</div>
            <div class="club-card-titles">
              <div class="club-card-name">${names[nameKey]}</div>
              <p class="club-card-sub">${names[subKey]}</p>
            </div>
          </div>
          <span class="club-card-cta">${tr.viewSchedule}</span>
        `;
        card.addEventListener("click", () => goClub(clubId));
        grid.appendChild(card);
      });

      wrap.appendChild(grid);
      els.sectionsRoot.appendChild(wrap);
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

    const rows = filtered
      .map(
        (s, i) => `
        <tr>
          <td class="col-num">${i + 1}</td>
          <td class="col-name">${escapeHtml(s.name)}</td>
          <td><span class="class-chip">${escapeHtml(s.cls)}</span></td>
        </tr>`
      )
      .join("");

    els.studentsBody.innerHTML = `
      <table class="students-table">
        <thead>
          <tr>
            <th>${tr.colNum}</th>
            <th>${tr.colStudent}</th>
            <th>${tr.colClass}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
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
  els.backToHome.addEventListener("click", goHome);
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
