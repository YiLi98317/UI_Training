## data types
Dynamic typing
### primitive value

#### boolean
1. for loop
2. if statement
3. flag

#### Null
1. absence of any object value (defined but miss value)
2. falsy

#### undefined
1. A variable that has not been assigned
2. wrong when type convert - variable that is being evaluated does not have an assigned value
3. A function returns undefined if a value was not returned.

#### number
1. 2^-1074 (Number.MIN_VALUE) and 2^1024 (Number.MAX_VALUE) as well as negative floating-point numbers between -(2^-1074) and -(2^1024), but it can only safely store integers in the range -(2^53 − 1) (Number.MIN_SAFE_INTEGER) to 2^53 − 1 (Number.MAX_SAFE_INTEGER).
2. auto convert outside of range
3. bitwise operator

#### bigint
1. operate with numbers beyond the Number.MAX_SAFE_INTEGER.
2. BigInts cannot be operated on interchangeably with Numbers.

#### NaN
1. NaN ("Not a Number") is typically encountered when the result of an arithmetic operation cannot be expressed as a number.
2. It is also the only value in JavaScript that is not equal to itself.

#### string
1. immutable
2. use methods to operate eg. String.substr().

#### symbol
1.  unique and immutable 
2.  add unique property keys 

### Objects
1.  a collection of properties

#### array
1. resize
2. can contain a mix of different data types
JavaScript array-copy operations create shallow copies
3. single dimensional
4. add element