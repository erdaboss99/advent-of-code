package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPart1(t *testing.T) {
	t.Run("Part 1 - test input", func(t *testing.T) {
		expected := 13
		actual := part1("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 1 - real input", func(t *testing.T) {
		expected := 1445
		actual := part1("input.txt")
		assert.Equal(t, expected, actual)
	})
}

func TestPart2(t *testing.T) {
	t.Run("Part 2 - test input", func(t *testing.T) {
		expected := 43
		actual := part2("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 2 - real input", func(t *testing.T) {
		expected := 8317
		actual := part2("input.txt")
		assert.Equal(t, expected, actual)
	})
}
