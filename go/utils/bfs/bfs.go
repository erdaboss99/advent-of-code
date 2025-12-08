package bfs

import (
	"github.com/erdaboss99/advent-of-code-utils/queue"
)

type BFS[T comparable] struct {
	queue   queue.Queue[T]
	visited map[T]bool
}

func Init[T comparable](start T) BFS[T] {
	q := queue.Init[T]()
	q.Push(start)

	return BFS[T]{
		queue:   q,
		visited: map[T]bool{},
	}
}

func (b *BFS[T]) Loop() bool {
	return b.queue.HasItems()
}

func (b *BFS[T]) Pop() T {
	return b.queue.Pop()
}

func (b *BFS[T]) Push(item T) {
	b.queue.Push(item)
}

func (b *BFS[T]) IsVisited(item T) bool {
	return b.visited[item]
}

func (b *BFS[T]) VisitPoint(item T) {
	b.visited[item] = true
}
