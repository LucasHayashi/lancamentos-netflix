document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
    themeSystem: "bootstrap5",
    locale: "pt-br",
    navLinks: true,
    dayMaxEvents: 3,
    dayMinWidth: 100,
    events: {
      url: "https://api.hayashi.dev.br/api/netflix/releases?country=BR&language=pt_br",
      method: "GET",
      failure: function (error) {
        console.error("Erro ao carregar eventos:", error);
        alert(
          "Não foi possível carregar os eventos. Tente novamente mais tarde."
        );
      },
    },
    headerToolbar: {
      start: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay prev,next",
    },
    initialView: "dayGridMonth",
    eventDidMount: function (info) {
      if (info.event.extendedProps.image) {
        let tooltipContent = `
              <div style="text-align: center;">
                <img src="${info.event.extendedProps.image}" alt="${info.event.title}" style="height: 250px; margin-bottom: 5px;">
                <div>${info.event.title}</div>
              </div>
            `;

        new bootstrap.Tooltip(info.el, {
          title: tooltipContent,
          html: true,
          placement: "top",
          trigger: "hover",
        });
      } else {
        new bootstrap.Tooltip(info.el, {
          title: info.event.title,
          placement: "top",
          trigger: "hover",
        });
      }
    },
    eventClick: function (info) {
      if (info.event.url) {
        info.jsEvent.preventDefault();
        window.open(info.event.url, "_blank");
      }
    },
  });

  try {
    calendar.render();
  } catch (error) {
    console.error("Erro ao renderizar o calendário:", error);
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    themeIcon.className =
      savedTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  }

  themeToggleButton.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.className =
      newTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
});
