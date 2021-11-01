export function extractYear(date) {
    if (!date) {
        return '';
    }
    return new Date(date).getFullYear();
}

export function formatRuntime(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return `${hours}h ${minutes} min`;
}