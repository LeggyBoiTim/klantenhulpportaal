export const formatDate = (date: Date) => {
    const newDate = new Date(date);
    
    return newDate.toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }) + ' ' + newDate.toLocaleTimeString("nl-NL");
}