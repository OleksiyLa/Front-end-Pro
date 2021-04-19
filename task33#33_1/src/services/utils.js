export const DIRECTION = {
    DEC: -1,
    ASC: 1
}
export function sort(array, field, direction = DIRECTION.ASC) {
    // console.error(direction, field);
    field = field.split('.');
    return array.sort((item1, item2) => {
        return ((field.length === 1 ? item1[field[0]] : item1[field[0]][field[1]]) < (field.length === 1 ? item2[field[0]] : item2[field[0]][field[1]]) ? -1 : 1) * direction;
    });
}

export function filter(array, field, bool, value) {
    field = field.split('.');
    return array.filter((item) => {
        return (bool ? ((field.length === 1 ? item[field[0]] : item[field[0]][field[1]]) < value) : ((field.length === 1 ? item[field[0]] : item[field[0]][field[1]]) > value));
    });
}