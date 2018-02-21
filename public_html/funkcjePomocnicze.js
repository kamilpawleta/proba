/**
 * Funkcja losuje liczby z podanego przedzialu
 * @param {Integer} min
 * @param {Integer} max
 * @returns {Integer} zwracana losowa liczba
 */
function wylosujLiczbe(min, max) {
    var liczba = Math.round(Math.random() * (max - min) + min);
    return liczba;
}