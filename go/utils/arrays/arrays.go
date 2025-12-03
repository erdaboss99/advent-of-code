package arrays

import (
	"cmp"
	"slices"
)

func FindMaxWithIndex[T cmp.Ordered](arr []T) (maxVal T, maxIdx int) {
	if len(arr) == 0 {
		panic("array is empty")
	}

	maxVal = slices.Max(arr)
	maxIdx = slices.Index(arr, maxVal)
	return
}
