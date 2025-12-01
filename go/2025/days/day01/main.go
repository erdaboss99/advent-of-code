package main

import (
	"fmt"
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
	dial := 50
	count := 0

	for _, motion := range getMotions(fileName) {
		dial = math.Mod(dial+motion, 100)

		if dial == 0 {
			count++
		}
	}

	return count
}

func part2(fileName string) int {
	dial := 50
	count := 0

	for _, motion := range getMotions(fileName) {
		if motion < 0 {
			quotient, remainder := math.DivMod(motion, -100)
			count += quotient

			if dial != 0 && dial+remainder <= 0 {
				count += 1
			}
		} else {
			quotient, remainder := math.DivMod(motion, 100)
			count += quotient

			if dial+remainder >= 100 {
				count += 1
			}
		}

		dial = math.Mod(dial+motion, 100)

	}

	return count
}

func getMotions(rawMotions string) (motions []int) {
	lines := files.ReadLines(rawMotions)

	for _, line := range lines {

		dir := (line[:1])
		motion := conversion.IntFromString(line[1:])
		if dir == "L" {
			motions = append(motions, -1*motion)
		} else {
			motions = append(motions, motion)
		}
	}
	return
}
