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
    const piece = array.length - num + 1;
    if(piece <= 0) return [];
    if(piece == 1) return array;

    var result = array.filter((e, i) => i < piece).reduce(function(result, curr, idx) {
        var temp = array.filter(function(e, i) {
            if(i < idx || i >= idx+num) return false;
            else return true;
        });
        result.push(temp);

        return result;
    }, []);

    return result;
}

console.log(split(2, [1, 2, 3, 4]));
console.log(split(3, [1, 2, 3, 4]));
console.log(split(5, [1, 2, 3, 4]));