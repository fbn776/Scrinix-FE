export function formatDateToDDMMYYYY(isoDate: string): string {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateToDDMMYYYYHHMM(isoDate: string): string {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 instead of 0

    const formattedHours = String(hours).padStart(2, '0');

    return `${day}/${month}/${year} - ${formattedHours}:${minutes} ${ampm}`;
}


export function timeAgo(timestamp: string) {
    const now = Date.now();
    const diff = Math.floor((now - new Date(timestamp).getTime()) / 1000); // Difference in seconds

    if (diff < 60) return `${diff}s ago`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}

export default function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function getLargestTimeDifference(startDate: Date, endDate: Date): string {
    let delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000; // Total difference in seconds

    const years = Math.floor(delta / (365 * 24 * 3600));
    if (years > 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    delta -= years * 365 * 24 * 3600;

    const months = Math.floor(delta / (30 * 24 * 3600));
    if (months > 0) {
        return `${months} month${months !== 1 ? 's' : ''}`;
    }
    delta -= months * 30 * 24 * 3600;

    const weeks = Math.floor(delta / (7 * 24 * 3600));
    if (weeks > 0) {
        return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    }
    delta -= weeks * 7 * 24 * 3600;

    const days = Math.floor(delta / (24 * 3600));
    if (days > 0) {
        return `${days} day${days !== 1 ? 's' : ''}`;
    }
    delta -= days * 24 * 3600;

    const hours = Math.floor(delta / 3600);
    if (hours > 0) {
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60);
    if (minutes > 0) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    delta -= minutes * 60;

    const seconds = Math.floor(delta);
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}
