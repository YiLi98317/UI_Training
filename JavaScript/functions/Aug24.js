/**
 * return the sum of the array
 * e.g. [1, 2, 3, 4] ==> [1, 3, 6, 10]
 * @param {array} array 
 */
function sum(array) {
    array.reduce((pv, cv, i, a) => a[i] += pv);
    return array;
}

console.log(sum([1, 2, 3, 4]));