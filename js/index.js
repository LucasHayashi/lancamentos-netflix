
import getNextReleases from './functions/getNextReleases.js';

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: 'pt-br',
        nowIndicator: true,
        navLinks: true,
        selectMirror: true,
        headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            right: 'prev,next'
        },
        initialView: 'dayGridMonth'
    });
    calendar.render();
    getNextReleases(calendar);
});