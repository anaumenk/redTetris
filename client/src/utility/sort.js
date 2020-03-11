export function sort(room) {
    return room && room.players ? Object.values(room.players).sort((a, b) => {
        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
    }) : [];
}