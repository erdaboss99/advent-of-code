package files

import (
	"bufio"
	"os"
	"path/filepath"
	"runtime"
)

// ReadLines reads a file and returns a slice of strings, one for each line
func ReadLines(name string) []string {
	_, callingFile, _, ok := runtime.Caller(1)

	if !ok {
		panic("unable to find caller so cannot build path to read file")
	}

	return readLines(name, callingFile)
}

func readLines(name string, callingFile string) []string {
	inputFile, err := os.Open(filepath.Join(filepath.Dir(callingFile), name))
	if err != nil {
		panic(err)
	}

	defer func(inputFile *os.File) {
		err := inputFile.Close()
		if err != nil {
			panic(err)
		}
	}(inputFile)

	scanner := bufio.NewScanner(inputFile)
	scanner.Split(bufio.ScanLines)

	var lines []string

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
}
