package main

import (
	"fmt"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/bfs"
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
	board := grid.FromSlice(lines)
	startingPoint := board.FindValue('S')

	bfs := bfs.Init(startingPoint)

	splitCount := 0

	for bfs.Loop() {
		beam := bfs.Pop()

		if bfs.IsVisited(beam) || !board.IsInside(beam) {
			continue
		}

		bfs.VisitPoint(beam)

		if board.GetValue(beam) == '^' {
			splitCount += 1

			bfs.Push(beam.Add(points.LEFT))
			bfs.Push(beam.Add(points.RIGHT))
		} else {
			bfs.Push(beam.Add(points.DOWN))
		}
	}

	return splitCount
}

func part2(fileName string) int {
	lines := files.ReadLines(fileName)
	board := grid.FromSlice(lines)
	startingPoint := board.FindValue('S')

	memResults := map[points.Point2]int{}

	return computePath(board, startingPoint, memResults)
}

func computePath(board grid.Grid, startingPoint points.Point2, results map[points.Point2]int) int {
	if res, computed := results[startingPoint]; computed {
		return res
	}

	if !board.IsInside(startingPoint) {
		return 1
	}

	if board.GetValue(startingPoint) == '^' {
		leftSplit := startingPoint.Add(points.LEFT)
		rightSplit := startingPoint.Add(points.RIGHT)

		return computePath(
			board,
			leftSplit,
			results,
		) + computePath(
			board,
			rightSplit,
			results,
		)
	}

	nextPoint := startingPoint.Add(points.DOWN)
	result := computePath(board, nextPoint, results)
	results[nextPoint] = result

	return result
}
