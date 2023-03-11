export default async function getNextReleases(calendar, currentPage, data) {
    currentPage = typeof currentPage !== "undefined" ? currentPage : 1;
    data = typeof data !== "undefined" ? data : [];

    let request = await fetch(`https://about.netflix.com/api/data/releases?language=pt-br&page=${currentPage}&country=BR`, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
    let response = await request.json();
    let totalPages = response.totalPages;

    currentPage++;

    data = data.concat(response.data);

    if (currentPage > totalPages) {
        data.forEach((release) => {
            calendar.addEvent({
                title: release.title1,
                start: new Date(release.startTime).toISOString(),
                url: `https://www.netflix.com/br/title/${release.videoID}`
            });
        })
    } else {
        getNextReleases(calendar, currentPage, data);
    }
}