package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"

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

func part1(fileName string) (invalidSum int) {
	for _, id := range getIdsFromIntervals(fileName) {
		idStr := strconv.Itoa(id)
		halfIdx := len(idStr) / 2

		if idStr[:halfIdx] == idStr[halfIdx:] {
			invalidSum += id
		}
	}

	return
}

func part2(fileName string) (invalidSum int) {
	invalIds := map[int]bool{}

	for _, id := range getIdsFromIntervals(fileName) {
		digits := strings.Split(strconv.Itoa(id), "")

		if _, ok := invalIds[id]; ok {
			continue
		}

		for digit := range len(digits) - 1 {
			sectionSize := digit + 1

			if len(digits)%sectionSize != 0 {
				continue
			}

			sections := sectionDigits(digits, sectionSize)

			if allSectionsEqual(sections) {
				invalIds[id] = true
				break
			}
		}
	}

	for id := range invalIds {
		invalidSum += id
	}

	return
}

func getIdsFromIntervals(fileName string) (ids []int) {
	input := strings.TrimSpace(files.Read(fileName))

	for interval := range strings.SplitSeq(input, ",") {
		rawStart, rawEnd, _ := strings.Cut(interval, "-")
		start := conversion.IntFromString(rawStart)
		end := conversion.IntFromString(rawEnd)

		for i := range end - start + 1 {
			ids = append(ids, start+i)
		}
	}

	return
}

func allSectionsEqual(sections [][]string) bool {
	if len(sections) == 0 {
		return true
	}

	firstSection := strings.Join(sections[0], "")

	for _, section := range sections[1:] {
		if strings.Join(section, "") != firstSection {
			return false
		}
	}

	return true
}

func sectionDigits(digits []string, sectionSize int) (sections [][]string) {
	for sectionSize < len(digits) {
		digits, sections = digits[sectionSize:], append(sections, digits[0:sectionSize:sectionSize])
	}

	return append(sections, digits)
}
