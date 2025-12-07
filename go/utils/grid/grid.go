package grid

import (
	"github.com/erdaboss99/advent-of-code-utils/math"
	"github.com/erdaboss99/advent-of-code-utils/points"
)

type Grid struct {
	height int
	width  int
	Data   []byte
}

func FromSlice(lines []string) Grid {
	data := []byte{}
	height := len(lines)
	width := len(lines[0])

	for row := range height {
		for column := range width {
			current := lines[row][column]
			data = append(data, current)
		}
	}

	return Grid{
		height: height,
		width:  width,
		Data:   data,
	}
}

func (g *Grid) GetDimensions() (int, int) {
	return g.width, g.height
}

func (g *Grid) GetValue(p points.Point2) byte {
	return g.Data[p.Y*g.width+p.X]
}

func (g *Grid) IsValueAt(p points.Point2, val byte) bool {
	return g.GetValue(p) == val
}

func (g *Grid) IsInside(p points.Point2) bool {
	return p.X >= 0 && p.X < g.width && p.Y >= 0 && p.Y < g.height
}

func (g *Grid) SetValue(p points.Point2, value byte) {
	g.Data[p.Y*g.width+p.X] = value
}

func (g *Grid) FindValue(val byte) points.Point2 {
	for idx, v := range g.Data {
		if v == val {
			q, r := math.DivMod(idx, g.width)
			return points.Point2{
				X: r,
				Y: q,
			}
		}
	}

	panic("Value not found")
}
