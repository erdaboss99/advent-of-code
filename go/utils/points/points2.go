package points

type Point2 struct {
	X, Y int
}

var (
	UP          = Point2{0, -1}
	DOWN        = Point2{0, 1}
	RIGHT       = Point2{1, 0}
	LEFT        = Point2{-1, 0}
	TOPLEFT     = Point2{-1, -1}
	TOPRIGHT    = Point2{1, -1}
	BOTTOMLEFT  = Point2{-1, 1}
	BOTTOMRIGHT = Point2{1, 1}
)

var DIRECTIONS = []Point2{
	UP,
	DOWN,
	RIGHT,
	LEFT,
	TOPRIGHT,
	TOPLEFT,
	BOTTOMRIGHT,
	BOTTOMLEFT,
}

func (p *Point2) Add(p2 Point2) Point2 {
	return Point2{p.X + p2.X, p.Y + p2.Y}
}
