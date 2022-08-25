/**
 * return the diff btw 2 arrays
 * @param {array} arr1 
 * @param {array} arr2 
 */
function diff(arr1, arr2) {
    var result = arr1.reduce(function(result, curr, idx) {
        if(typeof curr !== "number" || typeof arr2[idx] !== "number") {
            console.log(`${idx}th element not a number, skip`);
            return result;
        } else if(curr === arr2[idx]) return result;
        else {
            result.push(Math.abs(curr - arr2[idx]));
            return result;
        }
    }, []);

    return result;
}

console.log(diff([1, 3, 3.1, 5, 6], [1, 2, 5]));

/**
 * split the array into pieces, each length equals to num.
 * return empty if not applicable.
 * @param {Number} num 
 * @param {array} array 
 */
function split(num, array) {
    return array.slice(0, array.length - num + 1).map((e, i) => {return array.slice(i, i+num)});
}

console.log(split(2, [1, 2, 3, 4]));
console.log(split(3, [1, 2, 3, 4]));
console.log(split(5, [1, 2, 3, 4]));