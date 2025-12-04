package main

import (
	"fmt"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/files"
	"github.com/erdaboss99/advent-of-code-utils/grid"
	"github.com/erdaboss99/advent-of-code-utils/points"
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
	store := grid.FromSlice(lines)

	return len(findAccessiblePoints(store))
}

func part2(fileName string) int {
	lines := files.ReadLines(fileName)
	store := grid.FromSlice(lines)

	removedRolls := 0

	for {
		if accessiblePoints := findAccessiblePoints(store); len(accessiblePoints) == 0 {
			break
		} else {
			for _, p := range accessiblePoints {
				store.SetValue(p, '.')
			}

			removedRolls += len(accessiblePoints)
		}
	}

	return removedRolls
}

func findAccessiblePoints(store grid.Grid) (accessiblePoints []points.Point2) {
	width, height := store.GetDimensions()
	for y := range width {
		for x := range height {
			adjacentRolls := 0
			currentPoint := points.Point2{X: x, Y: y}

			if !store.IsValueAt(currentPoint, '@') {
				continue
			}

			for _, direction := range points.DIRECTIONS {
				pointToCheck := currentPoint.Add(direction)

				if !store.IsInside(pointToCheck) {
					continue
				}

				if store.IsValueAt(pointToCheck, '@') {
					adjacentRolls += 1
				}
			}

			if adjacentRolls < 4 {
				accessiblePoints = append(accessiblePoints, currentPoint)
			}
		}
	}

	return
}
