package main

import (
	"fmt"
	"slices"
	"strings"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/conversion"
	"github.com/erdaboss99/advent-of-code-utils/files"
	"github.com/erdaboss99/advent-of-code-utils/math"
	"github.com/erdaboss99/advent-of-code-utils/points"
	"github.com/erdaboss99/advent-of-code-utils/shapes"
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
	coords := getCoords(fileName)

	maxArea := 0

	for i := range len(coords) {
		p1 := coords[i]

		for j := i + 1; j < len(coords); j++ {
			p2 := coords[j]

			dx := math.Abs(p2.X-p1.X) + 1
			dy := math.Abs(p2.Y-p1.Y) + 1

			currArea := dx * dy

			if currArea > maxArea {
				maxArea = currArea
			}
		}
	}

	return maxArea
}

func part2(fileName string) int {
	coords := getCoords(fileName)
	boundariesSlice, boundsMinY := points.CreateBoundariesSlice(coords)
	rectangles := getRectangles(coords)

	maxArea := 0

	slices.SortFunc(rectangles, func(r1, r2 shapes.Rectangle) int {
		return r2.Area - r1.Area
	})

	for _, rectangle := range rectangles {
		minX := math.Min(rectangle.P1.X, rectangle.P2.X)
		maxX := math.Max(rectangle.P1.X, rectangle.P2.X)
		minY := math.Min(rectangle.P1.Y, rectangle.P2.Y)
		maxY := math.Max(rectangle.P1.Y, rectangle.P2.Y)

		if IsRectangleValid(minX, maxX, minY, maxY, boundariesSlice, boundsMinY) {
			maxArea = rectangle.Area
			break
		}
	}

	return maxArea
}

func getCoords(fileName string) (coords []points.Point2) {
	lines := files.ReadLines(fileName)
	for _, line := range lines {
		rawCoords := strings.Split(line, ",")

		coord := points.Point2{
			X: conversion.IntFromString(rawCoords[0]),
			Y: conversion.IntFromString(rawCoords[1]),
		}

		coords = append(coords, coord)
	}

	return
}

func getRectangles(coords []points.Point2) (rectangles []shapes.Rectangle) {
	for i := range len(coords) {
		p1 := coords[i]

		for j := i + 1; j < len(coords); j++ {
			p2 := coords[j]

			dx := math.Abs(p2.X-p1.X) + 1
			dy := math.Abs(p2.Y-p1.Y) + 1

			area := int(dx * dy)
			rectangles = append(rectangles, shapes.Rectangle{P1: p1, P2: p2, Area: area})
		}
	}

	return
}

func IsRectangleValid(minX, maxX, minY, maxY int, bounds []points.Bounds2, boundsMinY int) bool {
	for y := minY; y <= maxY; y++ {
		index := y - boundsMinY
		if index < 0 || index >= len(bounds) {
			return false
		}
		b := bounds[index]
		if !b.IsProcessed() || minX < b.Min() || maxX > b.Max() {
			return false
		}
	}
	return true
}
