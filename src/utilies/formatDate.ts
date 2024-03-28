const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
};

export const getFormattedDate = (time: string) => {
    const date = new Date(time + "T08:00:00");
    const pstDateString = date.toLocaleDateString('en-US', options);
    return pstDateString; // Add this line to return the formatted date string
};

export const getFormattedLongDate = () => {
    const date = new Date(); // Current date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}