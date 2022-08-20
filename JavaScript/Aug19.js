//1. factorical number
//input: [num]
//output: the factorical of [num], that is, [num]!
function factorical(num) {
    const numList = [...Array(num).keys()].map(x => ++x);
    const result = numList.reduce((pv, cv) => pv *= cv);

    console.log(`the factorical of ${num} is ${result}`);
    return result;
}

//test case for factorical
console.log("1. factorical number");
factorical(6);
console.log("--------------------");

//2. to lower case
//input: [object]
//output: [object] with all the keys to lower case
function reducer(obj, key) {
    if (key === key.toLowerCase()) return obj;
    if (!Object.keys(obj).includes(key.toLowerCase())) Object.defineProperty(obj, key.toLowerCase(), Object.getOwnPropertyDescriptor(obj, key));
    delete obj[key];
    return obj;
}

function toLowerCase(obj) {
    Object.keys(obj).reduce(reducer, obj);

    console.log(obj);
    return obj;
}

// to lower case test case
var object1 = {
    "lower-case-prop": 'lower case prop',
    "UPPER-CASE-PROP": 'upper case prop',
    "upper-case-prop": 'yet another uppercase prop',
    "UNIQUE-UPPER-CASE-PROP": 'unique upper case prop'
};
console.log("2. object key to lower case");
toLowerCase(object1);
console.log("--------------------");

//3. common keys
//input: [array] of objects to test
//output: common [key]s
function ckReducer(commonList, obj) {
    //method 1
    commonList = commonList.filter((key) => Object.keys(obj).includes(key));
    //method 2

    return commonList;
}

function commonKeys(array) {
    if(array.length === 0) return [];
    if(array.length === 1) return Object.keys(array[0]);

    var commonList = Object.keys(array[0]);
    commonList = array.reduce(ckReducer, commonList);

    console.log(commonList);
    return commonList;
}

//common keys test case
const object2 = {
    "lower-case-prop": 'lower case prop',
    "UPPER-CASE-PROP": 'upper case prop',
    "upper-case-prop": 'yet another uppercase prop',
    "UNIQUE-UPPER-CASE-PROP": 'unique upper case prop'
};
const object3 = {
    "lower-case-prop": 'lower case prop',
    "UPPER-CASE-PROP": 'upper case prop',
    "upper-case-prop": 'yet another uppercase prop',
    "UNIQUE-UPPER-CASE-PROP": 'unique upper case prop',
    "UNIQUE-UPPER-CASE-PROP1": 'unique upper case prop'
}
const object4 = {
    "lower-case-prop": 'lower case prop',
    "UPPER-CASE-PROP": 'upper case prop',
    "UNIQUE-UPPER-CASE-PROP": 'unique upper case prop',
    "UNIQUE-UPPER-CASE-PROP1": 'unique upper case prop'
}
console.log("3. common keys");
commonKeys([object2, object3, object4]);
console.log("--------------------");

//4. common key, value s
//input: [array] of objects to test
//output: common [key, value]s
function ckvReducer(commonList, obj) {
    //method 1
    commonList = commonList.filter(function(entry){
        if(Object.keys(obj).includes(entry[0])) {
            if(typeof entry[1] === "string" && obj[entry[0]] === entry[1]) return true;
            else if(typeof entry[1] === "object") {
                return Object.keys(obj[entry[0]]).every((e, i) => e === Object.keys(entry[1])[i]);
            }
        } else return false;
    });
    //method 2

    return commonList;
}

function commonEntries(array) {
    if(array.length === 0) return [];
    if(array.length === 1) return Object.entries(array[0]);

    var commonList = Object.entries(array[0]);
    commonList = array.reduce(ckvReducer, commonList);

    commonList = commonList.reduce(function(list, curr) {
        if(typeof curr[1] === 'string') list.push(curr);
        else if(typeof curr[1] === 'object') list.push([curr[0], Object.keys(curr[1])]);
        return list;
    }, []);

    console.log(commonList);
    return commonList;
}

//common k,v test case
const object5 = {
    "a": "a",
    "b": {
        "b-1": "b-1",
        "b-2": "b-2"
    },
    "c": {
        "c-1": "c-1",
        "c-2": "c-2",
        "c-3": "c-3"
    }
};
const object6 = {
    "a": "a",
    "b": {
        "b-1": "b-1",
        "b-2": "b-2",
        "b-3": "b-3"
    },
    "c": {
        "c-1": "b-1",
        "c-2": "b-2",
        "c-3": "c-3333"
    }
};
console.log("4. common [keys, value]");
commonEntries([object5, object6]);
console.log("--------------------");

//5. flattern array
//input: the [array] to be flatterned
//output: flatterned [array]
function flattern(array) {
    const result = array.flat(Infinity);

    console.log(result);
    return result;
}

//flattern array test case
const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log("5. flattern array");
flattern(arr);
console.log("--------------------");




















// function toLowerCase(obj) {
//     const keyList = Object.keys(obj);
//     for (const key of keyList) {
//         if (key === key.toLowerCase()) continue;
//         else {
//             if (!keyList.includes(key.toLowerCase())) {
//                 Object.defineProperty(obj, key.toLowerCase(), Object.getOwnPropertyDescriptor(obj, key));
//             }
//             delete obj[key];
//         }
//     }

//     console.log(obj);
//     return obj;
// }