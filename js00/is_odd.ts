// function is_odd(x: number | bigint): boolean {
//     if (typeof x === "bigint") {
//         return x % 2n !== 0n;
//     }
//
//     if (!Number.isInteger(x)) {
//         throw new TypeError(`${x} is not an integer`);
//     }
//
//     if (!Number.isSafeInteger(x)) {
//         throw new TypeError(`${x} is not a safe integer`);
//     }
//
//     return x % 2 !== 0;
// }

type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}

type IsOddError =
    | { type: "not_integer"; input: number }
    | { type: "unsafe_integer"; input: number };

function is_odd(x: number | bigint): Result<boolean, IsOddError> {
    if (typeof x === "bigint") {
        return Ok(x % 2n !== 0n);
    }

    if (!Number.isInteger(x)) {
        return Err({ type: "not_integer", input: x});
    }

    if (!Number.isSafeInteger(x)) {
        return Err({ type: "unsafe_integer", input: x});
    }

    return Ok(x % 2 !== 0);
}

console.log(is_odd(1));
console.log(is_odd(2));

console.log(is_odd(-3));
console.log(is_odd(NaN));
console.log(is_odd(1.1));

console.log(is_odd(2 ** 64));
console.log(is_odd(2 ** 64 - 1));

console.log(is_odd(2n ** 64n));
console.log(is_odd(2n ** 64n - 1n));
