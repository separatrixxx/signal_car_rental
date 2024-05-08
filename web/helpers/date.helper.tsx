export function getDate(): string {
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

    return year + '-' + month + '-' + day;
}

export function getDateInput(type: 'time' | 'date'): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    if (type === 'time') {
        return `${hours}:${minutes}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}

export function getDaysNum(startDate: string, finishDate: string): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(finishDate);

    const daysNum = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));

    return daysNum;

}
