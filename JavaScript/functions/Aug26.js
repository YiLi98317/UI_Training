/**
 * return the size of the input length bu byte
 * @param {object} obj 
 */
function sizeOf(obj) {
    var objectList = [];
    var stack = [obj];
    var bytes = 0;

    while (stack.length) {
        var value = stack.pop();

        if (typeof value === 'boolean') {
            bytes += 4;
        } else if (typeof value === 'string') {
            bytes += value.length * 2;
        } else if (typeof value === 'number') {
            bytes += 8;
        } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
            objectList.push(value);

            for (var i in value) {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}

//sizeOf test case
function Man() {
    this.name = "YI LI";
    this.credit = 100;
}
var func = new Man();
console.log(sizeOf("string"));
console.log(sizeOf(true));
console.log(sizeOf(12.5));
console.log(sizeOf(func));
console.log("------------");

/**
 * return all capital of the string
 * @param {string} string 
 */
function toCap(string) {
    return string.toUpperCase();
}

//toCap test case
console.log(toCap("hello worlD"));
console.log("------------");

/**
 * return the gap between two date object
 * @param {string} s1 
 * @param {string} s2 
 */
function daysCount(s1, s2) {
    return Math.ceil(Math.abs(Date.parse(s2) - Date.parse(s1)) / (1000 * 60 * 60 * 24));
}

//daysCount test case
console.log(daysCount("sep-05-2022", "sep-09-2022"));
console.log("------------");

/**
 * return arg1 === arg2 ?
 * @param {object} object1 
 * @param {object} object2 
 */
function equals(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !equals(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}

//equals test case
const obj1 = {
    name: 'Batman',
    address: {
        city: 'Gotham'
    }
};
const obj2 = {
    name: 'Batman',
    address: {
        city: 'Gotham'
    }
};
console.log(equals(obj1, obj2));