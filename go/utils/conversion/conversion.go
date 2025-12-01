package conversion

import "strconv"

func IntFromString(s string) int {
	v, err := strconv.Atoi(s)
	if err != nil {
		panic(err)
	}

	return v
}
