package math

import (
	"cmp"
	"math"

	"github.com/erdaboss99/advent-of-code-utils/types"
)

func Max[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func Min[T cmp.Ordered](a, b T) T {
	if a < b {
		return a
	}
	return b
}

func Abs(n int) int {
	if n < 0 {
		return n * -1
	}

	return n
}

func Mod(dividend, divisor int) int {
	return (dividend%divisor + divisor) % divisor
}

func DivMod(dividend, divisor int) (quotient, remainder int) {
	quotient = dividend / divisor
	remainder = Mod(dividend, divisor)

	return
}

func Sum[T types.Numeric](arr []T) T {
	sum := T(0)

	for _, val := range arr {
		sum += val
	}
	return sum
}

func Prod[T types.Numeric](arr []T) T {
	product := T(1)

	for _, val := range arr {
		product = product * val
	}

	return product
}

func SqrtInt(n int) int {
	return int(math.Sqrt(float64(n)))
}
