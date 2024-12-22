export function extractYear(date: string) {
  if (!date) {
    return "";
  }
  return new Date(date).getFullYear();
}

export function formatRuntime(runtime: number) {
  let hours = Math.floor(runtime / 60);
  let minutes = runtime % 60;
  return `${hours}h ${minutes} min`;
}
