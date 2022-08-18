function calculate(x, y) {
    var num1, num2;
    num1 = Number(x);
    num2 = Number(y);
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        console.log("please put number");
        return;
    }
    console.log(num1 + num2);
    console.log(num1 - num2);
    console.log(num1 * num2);
    console.log(num1 / num2);
}

// calculate("a", "b");

function reverseString(s) {
    var result = "";
    var sList = s.split(" ");

    for (var j = 0; j < sList.length; j++) {
        for (var i = sList[j].length - 1; i >= 0; i--) {
            result += sList[j][i];
        }
        result += " ";
    }
    result = result.substring(0, result.length - 1);

    console.log(result);
}

// reverseString('hello world');

// sort the array: bubble sort
//input: array
//output: sorted array
function mySort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // var temp = array[j+1];
                // array[j+1] = array[j];
                // array[j] = temp;
            }
        }
    }

    console.log(array);
    return array;
}

// var arr = [234, 43, 55, 63, 5, 6, 235, 547, 1];
// mySort(arr);


// Recursive insertion sort
function insertionSortRecursive(arr, n) {
    if (n <= 1) return;

    insertionSortRecursive(arr, n - 1);

    let last = arr[n - 1];
    let j = n - 2;

    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}

function is(arr) {
    var n = arr.length;
    insertionSortRecursive(arr, n);
    console.log(arr);
}



// Driver Method
let arr = [12, 11, 13, 5, 6];
is(arr);