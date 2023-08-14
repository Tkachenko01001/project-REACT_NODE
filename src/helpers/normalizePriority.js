export const normalizePriority = priority => {
    if (priority === 'show all') return priority;
    const values = [
        {
            full: 'Without priority',
            short: "without",
        },
        {
            full: 'Low',
            short: "low",
        },
        {
            full: 'Medium',
            short: "medium",
        },
        {
            full: 'High',
            short: "high"
        },
    ];

    const selected = values.find(value => value.full === priority);
    return selected.short;



}