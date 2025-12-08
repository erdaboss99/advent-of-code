package graph

type Edge[T comparable] struct {
	from, to T
	weight   int
}

func NewEdge[T comparable](from, to T, weight int) Edge[T] {
	return Edge[T]{from: from, to: to, weight: weight}
}

func (e Edge[T]) From() T {
	return e.from
}

func (e Edge[T]) To() T {
	return e.to
}

type Edges[T comparable] []Edge[T]

func (e Edges[T]) Len() int { return len(e) }

func (e Edges[T]) Swap(e1Idx, e2Idx int) { e[e1Idx], e[e2Idx] = e[e2Idx], e[e1Idx] }

func (e Edges[T]) Less(e1Idx, e2Idx int) bool { return e[e1Idx].weight < e[e2Idx].weight }
