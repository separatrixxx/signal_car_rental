export function getDate(isTime?: boolean): string {
    let dateNow = new Date();

    const year = dateNow.getFullYear();
    let month = '' + (dateNow.getMonth() + 1);
    let day = '' + dateNow.getDate();

    if (month.length === 1) {
        month = '0' + month;
    }

    if (day.length === 1) {
        day = '0' + day;
    }

    if (isTime) {
        return year + '-' + month + '-' + day + 'T00:00';
    } else {
        return year + '-' + month + '-' + day;
    }
}

export function getDateInput(type: 'time' | 'date' | 'datetime-local'): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    if (type === 'time') {
        return `${hours}:${minutes}`;
    } else if (type === 'date') {
        return `${year}-${month}-${day}`;
    } else {
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}
