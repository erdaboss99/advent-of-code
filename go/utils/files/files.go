package files

import (
	"bufio"
	"os"
	"path/filepath"
	"runtime"
)

func Read(fileName string) string {
	_, callingFile, _, ok := runtime.Caller(1)

	if !ok {
		panic("unable to find caller so cannot build path to read file")
	}

	content, err := os.ReadFile(filepath.Join(filepath.Dir(callingFile), fileName))
	if err != nil {
		panic(err)
	}

	return string(content)
}

func ReadLines(fileName string) []string {
	_, callingFile, _, ok := runtime.Caller(1)

	if !ok {
		panic("unable to find caller so cannot build path to read file")
	}

	return readLines(fileName, callingFile)
}

func readLines(fileName string, callingFile string) []string {
	inputFile, err := os.Open(filepath.Join(filepath.Dir(callingFile), fileName))
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
