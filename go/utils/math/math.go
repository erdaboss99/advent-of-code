package math

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
