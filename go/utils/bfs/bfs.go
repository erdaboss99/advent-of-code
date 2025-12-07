package bfs

import (
	"github.com/erdaboss99/advent-of-code-utils/points"
	"github.com/erdaboss99/advent-of-code-utils/queue"
)

type BFS struct {
	queue   queue.Queue[points.Point2]
	visited map[points.Point2]bool
}

func Init(start points.Point2) BFS {
	q := queue.Init[points.Point2]()
	q.Push(start)

	return BFS{
		queue:   q,
		visited: map[points.Point2]bool{},
	}
}

func (b *BFS) Loop() bool {
	return b.queue.HasItems()
}

func (b *BFS) Pop() points.Point2 {
	return b.queue.Pop()
}

func (b *BFS) Push(p points.Point2) {
	b.queue.Push(p)
}

func (b *BFS) IsVisited(p points.Point2) bool {
	return b.visited[p]
}

func (b *BFS) VisitPoint(p points.Point2) {
	b.visited[p] = true
}
