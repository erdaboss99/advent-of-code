package main

import (
	"fmt"
	"math"
	"slices"
	"strings"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/arrays"
	"github.com/erdaboss99/advent-of-code-utils/conversion"
	"github.com/erdaboss99/advent-of-code-utils/files"
)

func main() {
	start := time.Now()
	result1 := part1("input.txt")
	fmt.Printf("Part 1: %d (%v)\n", result1, time.Since(start))

	start = time.Now()
	result2 := part2("input.txt")
	fmt.Printf("Part 2: %d (%v)\n", result2, time.Since(start))
}

func part1(fileName string) int {
	banks := parseInput(fileName)
	sumOfJolts := 0

	for _, bank := range banks {
		sumOfJolts += joltBank(2, bank)
	}

	return sumOfJolts
}

func part2(fileName string) int {
	banks := parseInput(fileName)
	sumOfJolts := 0

	for _, bank := range banks {
		sumOfJolts += joltBank(12, bank)
	}

	return sumOfJolts
}

func parseInput(fileName string) (banks [][]int) {
	lines := files.ReadLines(fileName)
	banks = make([][]int, len(lines))

	for i, line := range lines {
		digits := make([]int, len(line))

		for j, digit := range strings.Split(line, "") {
			digits[j] = conversion.IntFromString(digit)
		}

		banks[i] = digits
	}

	return
}

func joltBank(maxDigit int, bank []int) int {
	if maxDigit == 1 {
		return slices.Max(bank)
	}

	maxDigit = maxDigit - 1
	currentMax, idx := arrays.FindMaxWithIndex(bank[:len(bank)-maxDigit])

	return currentMax*int(math.Pow10(maxDigit)) + joltBank(maxDigit, bank[idx+1:])
}
