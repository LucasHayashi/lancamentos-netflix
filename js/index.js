
import getNextReleases from './functions/getNextReleases.js';

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        themeSystem: 'bootstrap5',
        locale: 'pt-br',
        navLinks: true,
        dayMaxEvents: 3,
        dayMinWidth: 100,
        headerToolbar: {
            start: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,prev,next'
        },
        initialView: 'dayGridMonth',
        eventDidMount: function (mouseEnterInfo) {
            return new bootstrap.Tooltip(mouseEnterInfo.el, {
                title: mouseEnterInfo.event.title,
                placement: "top",
            });
        },
        eventClick: function (event) {
            if (event.event.url) {
                event.jsEvent.preventDefault()
                window.open(event.event.url, "_blank");
            }
        }
    });
    
    getNextReleases(calendar);

    calendar.render();
});