package points

import "github.com/erdaboss99/advent-of-code-utils/math"

type Point3 struct {
	X, Y, Z int
}

func (p *Point3) DistanceInt(p2 Point3) int {
	dx := p.X - p2.X
	dy := p.Y - p2.Y
	dz := p.Z - p2.Z

	return math.SqrtInt(dx*dx + dy*dy + dz*dz)
}
