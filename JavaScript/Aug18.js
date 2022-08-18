//fibonacci array
//input: the length [num] of the fibo array you want
//output: array of fibo lenth == [num]
function reducerFibo(pv, cv, i) {
    if(i <= 1) pv.push(1);
    else pv.push(pv[i-1] + pv[i-2]);
    return pv;
}

function fibo(num) {
    const temp = new Array(num);
    temp.fill(0);
    const result = temp.reduce(reducerFibo, []);
    return result;
}

//fibo test case
console.log(fibo(5));

// factor numbers
//input: [num] you want to get the factors
//output: factors of the [num]
function factor(num) {
    const numList = [...Array(num).keys()].map(x => ++x);
    const result = numList.filter(x => num % x === 0);
    return result;
}

//factor numbers test case
console.log(factor(12));

// check identity
//input: [array] you want to check
//output: boolean, true if elements are equal, false if not
function checkIdentity(array) {
    return array.every((e, i, a) => e === a[0]);
}

//check identity test case
console.log(checkIdentity([1,1,1,1,1]));