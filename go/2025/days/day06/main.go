package main

import (
	"fmt"
	"slices"
	"strings"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/conversion"
	"github.com/erdaboss99/advent-of-code-utils/files"
	"github.com/erdaboss99/advent-of-code-utils/math"
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
	lines := files.ReadLines(fileName)
	data := [][]string{}
	lastIdx := len(lines) - 1

	for _, line := range lines[:lastIdx] {
		data = append(data, strings.Fields(line))
	}

	expressions := make([][]int, len(data[0]))

	for _, expression := range data {
		for colIdx, char := range expression {
			expressions[colIdx] = append(expressions[colIdx], conversion.IntFromString(char))
		}
	}

	grandTotal := 0

	for idx, operation := range strings.Fields(lines[lastIdx]) {
		grandTotal += evaluateExpression(expressions[idx], operation)
	}

	return grandTotal
}

func part2(fileName string) int {
	lines := files.ReadLines(fileName)
	transposedData := [][]string{}

	for rowIdx := range len(lines[0]) {
		newCol := []string{}

		for _, line := range lines {
			newCol = append(newCol, string(line[rowIdx]))
		}

		transposedData = append(transposedData, newCol)
	}

	slices.Reverse(transposedData)
	operands := []int{}

	grandTotal := 0

	for _, col := range transposedData {
		lastIdx := len(col) - 1
		rawOperand := strings.TrimSpace(strings.Join(col[:lastIdx], ""))

		if rawOperand == "" {
			continue
		}

		operand := conversion.IntFromString(rawOperand)
		operands = append(operands, operand)
		operation := col[lastIdx]

		if strings.ContainsAny(operation, "+*") == true {
			grandTotal += evaluateExpression(operands, operation)
			operands = []int{}
		}

	}

	return grandTotal
}

func evaluateExpression(operands []int, operation string) int {
	if operation == "+" {
		return math.Sum(operands)
	}
	return math.Prod(operands)
}
