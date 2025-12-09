package points

import "github.com/erdaboss99/advent-of-code-utils/math"

type Bounds2 struct {
	min, max    int
	isProcessed bool
}

func CreateBoundariesSlice(coords []Point2) ([]Bounds2, int) {
	if len(coords) == 0 {
		return nil, 0
	}

	minY, maxY := findYRange(coords)
	bounds := make([]Bounds2, maxY-minY+1)

	for i := range coords {
		p1, p2 := coords[i], coords[math.Mod((i+1), len(coords))]
		processEdge(p1, p2, bounds, minY)
	}

	return bounds, minY
}

func (b *Bounds2) Min() int {
	return b.min
}

func (b *Bounds2) Max() int {
	return b.max
}

func (b *Bounds2) IsProcessed() bool {
	return b.isProcessed
}

func (b *Bounds2) UpdateBounds(minX, maxX int) {
	if !b.isProcessed {
		b.min = minX
		b.max = maxX
		b.isProcessed = true
	}
	b.min = math.Min(minX, b.min)
	b.max = math.Max(maxX, b.max)
	b.isProcessed = true
}

func findYRange(coords []Point2) (int, int) {
	minY, maxY := coords[0].Y, coords[0].Y
	for _, coord := range coords {
		if coord.Y < minY {
			minY = coord.Y
		}
		if coord.Y > maxY {
			maxY = coord.Y
		}
	}
	return minY, maxY
}

func processEdge(p1, p2 Point2, bounds []Bounds2, minY int) {
	if p1.X == p2.X {
		processVerticalEdge(p1.X, p1.Y, p2.Y, bounds, minY)
	} else if p1.Y == p2.Y {
		processHorizontalEdge(p1.X, p2.X, p1.Y, bounds, minY)
	}
}

func processVerticalEdge(x, y1, y2 int, bounds []Bounds2, minY int) {
	lo, hi := math.Min(y1, y2), math.Max(y1, y2)
	for y := lo; y <= hi; y++ {
		bounds[y-minY].UpdateBounds(x, x)
	}
}

func processHorizontalEdge(x1, x2, y int, bounds []Bounds2, minY int) {
	minX, maxX := math.Min(x1, x2), math.Max(x1, x2)
	bounds[y-minY].UpdateBounds(minX, maxX)
}
