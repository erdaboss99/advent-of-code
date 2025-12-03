package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPart1(t *testing.T) {
	t.Run("Part 1 - test input", func(t *testing.T) {
		expected := 357
		actual := part1("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 1 - real input", func(t *testing.T) {
		expected := 17207
		actual := part1("input.txt")
		assert.Equal(t, expected, actual)
	})
}

func TestPart2(t *testing.T) {
	t.Run("Part 2 - test input", func(t *testing.T) {
		expected := 3121910778619
		actual := part2("test-input.txt")
		assert.Equal(t, expected, actual)
	})

	t.Run("Part 2 - real input", func(t *testing.T) {
		expected := 170997883706617
		actual := part2("input.txt")
		assert.Equal(t, expected, actual)
	})
}
