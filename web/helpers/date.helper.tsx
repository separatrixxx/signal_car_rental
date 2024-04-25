export function getDate(): string {
    let dateNow = new Date();

    const year = dateNow.getFullYear();
    let month = '' + (dateNow.getMonth() + 1);
    let day = '' + dateNow.getDate();
    let hours = dateNow.getHours();
    let minutes = dateNow.getMinutes();

    if (month.length === 1) {
        month = '0' + month;
    }

    if (day.length === 1) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day + 'T00:00';
}