package queue

type Queue[T any] struct {
	data []T
}

func Init[T any]() Queue[T] {
	return Queue[T]{data: []T{}}
}

func (q *Queue[T]) HasItems() bool {
	return len(q.data) > 0
}

func (q *Queue[T]) Pop() T {
	item := q.data[0]
	q.data = q.data[1:]

	return item
}

func (q *Queue[T]) Push(item T) {
	q.data = append(q.data, item)
}
