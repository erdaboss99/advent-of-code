package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPart1(t *testing.T) {
	t.Run("Part 1 - test input", func(t *testing.T) {
		expected := 3
		actual := part1("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 1 - real input", func(t *testing.T) {
		expected := 773
		actual := part1("input.txt")
		assert.Equal(t, expected, actual)
	})
}

func TestPart2(t *testing.T) {
	t.Run("Part 2 - test input", func(t *testing.T) {
		expected := 14
		actual := part2("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 2 - real input", func(t *testing.T) {
		expected := 332067203034711
		actual := part2("input.txt")
		assert.Equal(t, expected, actual)
	})
}
