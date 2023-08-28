export const normalizePriority = priority => {
    if (!priority) return 'show all';
    if (priority === 'show all') return priority;
    const values = [
        {
            full: 'Without priority',
            short: "without",
        },
        {
            full: 'Low priority',
            short: "low",
        },
        {
            full: 'Medium priority',
            short: "medium",
        },
        {
            full: 'High priority',
            short: "high"
        },
    ];
    const selected = values.find(value => value.full === priority);
    return selected.short;



}