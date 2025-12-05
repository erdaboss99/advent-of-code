package main

import (
	"fmt"
	"slices"
	"strings"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/conversion"
	"github.com/erdaboss99/advent-of-code-utils/files"
	"github.com/erdaboss99/advent-of-code-utils/interval"
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
	sections := files.ReadSections(fileName)
	intervals := mergeIntervals(sections[0])
	freshSum := 0

	for _, ingredient := range sections[1] {
		i := conversion.IntFromString(ingredient)

		for _, r := range intervals {
			if r.Includes(i) {
				freshSum += 1
				break
			}
		}
	}

	return freshSum
}

func part2(fileName string) int {
	sections := files.ReadSections(fileName)
	freshCount := 0

	for _, r := range mergeIntervals(sections[0]) {
		freshCount += r.End - r.Start + 1
	}

	return freshCount
}

func mergeIntervals(rawIntervals []string) []interval.Range {
	intervals := []interval.Range{}

	for _, currentRange := range rawIntervals {
		rawStart, rawEnd, _ := strings.Cut(currentRange, "-")
		start := conversion.IntFromString(rawStart)
		end := conversion.IntFromString(rawEnd)

		intervals = append(intervals, interval.Range{Start: start, End: end})
	}

	slices.SortFunc(intervals, func(r1, r2 interval.Range) int {
		return r1.Start - r2.Start
	})

	mergedIntervals := []interval.Range{intervals[0]}

	for _, curRange := range intervals[1:] {
		prevIdx := len(mergedIntervals) - 1
		prevInterval := mergedIntervals[prevIdx]

		if curRange.Start > prevInterval.End {
			mergedIntervals = append(mergedIntervals, curRange)
		} else {
			mergedIntervals[prevIdx].End = math.Max(prevInterval.End, curRange.End)
		}
	}

	return mergedIntervals
}
