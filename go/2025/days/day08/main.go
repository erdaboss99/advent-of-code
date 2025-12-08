package main

import (
	"fmt"
	"sort"
	"strings"
	"time"

	"github.com/erdaboss99/advent-of-code-utils/bfs"
	"github.com/erdaboss99/advent-of-code-utils/conversion"
	"github.com/erdaboss99/advent-of-code-utils/files"
	"github.com/erdaboss99/advent-of-code-utils/graph"
	"github.com/erdaboss99/advent-of-code-utils/points"
)

func main() {
	start := time.Now()
	result1 := part1("input.txt", 1000)
	fmt.Printf("Part 1: %d (%v)\n", result1, time.Since(start))

	start = time.Now()
	result2 := part2("input.txt")
	fmt.Printf("Part 2: %d (%v)\n", result2, time.Since(start))
}

func part1(fileName string, connections int) int {
	coords := getCoords(fileName)
	edges := getEdges(coords)
	graph := buildGraph(edges, connections)

	visited := make([]bool, len(coords))
	sizes := []int{}

	for i := range len(coords) {
		if !visited[i] {
			size := bfsComponentSize(i, graph, visited)
			sizes = append(sizes, size)
		}
	}

	sort.Slice(sizes, func(a, b int) bool {
		return sizes[a] > sizes[b]
	})

	return sizes[0] * sizes[1] * sizes[2]
}

func part2(fileName string) int {
	coords := getCoords(fileName)
	edges := getEdges(coords)

	graph := graph.Init[int]()

	cableLength := 0

	for _, edge := range edges {
		graph.AddEdge(edge)

		if isFullyConnected(graph, len(coords)) {
			x1 := coords[edge.From()].X
			x2 := coords[edge.To()].X
			cableLength = x1 * x2
			break
		}
	}

	return cableLength
}

func isFullyConnected(g graph.Graph[int], nodeCount int) bool {
	if nodeCount == 0 {
		return true
	}

	visited := make([]bool, nodeCount)
	bfs := bfs.Init(0)
	visited[0] = true
	count := 0

	for bfs.Loop() {
		node := bfs.Pop()
		count++

		for _, neighbor := range g.GetNeighbors(node) {
			if !visited[neighbor] {
				visited[neighbor] = true
				bfs.Push(neighbor)
			}
		}
	}

	return count == nodeCount
}

func bfsComponentSize(start int, g graph.Graph[int], visited []bool) (sizeCount int) {
	bfs := bfs.Init(start)
	visited[start] = true
	sizeCount = 0

	for bfs.Loop() {
		node := bfs.Pop()
		sizeCount++

		for _, neighbor := range g.GetNeighbors(node) {
			if !visited[neighbor] {
				visited[neighbor] = true
				bfs.Push(neighbor)
			}
		}
	}

	return
}

func getCoords(name string) (coords []points.Point3) {
	lines := files.ReadLines(name)
	coords = make([]points.Point3, 0, len(lines))

	for _, line := range lines {
		rawCoords := strings.Split(line, ",")

		coord := points.Point3{
			X: conversion.IntFromString(rawCoords[0]),
			Y: conversion.IntFromString(rawCoords[1]),
			Z: conversion.IntFromString(rawCoords[2]),
		}

		coords = append(coords, coord)
	}

	return
}

func getEdges(coords []points.Point3) (edges graph.Edges[int]) {
	for i := range len(coords) {
		for j := i + 1; j < len(coords); j++ {
			distance := coords[i].DistanceInt(coords[j])
			edges = append(edges, graph.NewEdge(i, j, distance))
		}
	}

	sort.Sort(edges)

	return
}

func buildGraph(edges graph.Edges[int], connections int) (g graph.Graph[int]) {
	g = graph.Init[int]()
	for i := 0; i < connections && i < len(edges); i++ {
		g.AddEdge(edges[i])
	}

	return
}
