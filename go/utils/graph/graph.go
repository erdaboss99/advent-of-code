package graph

type Graph[T comparable] struct {
	adjacencyList map[T][]T
	edges         Edges[T]
}

func Init[T comparable]() Graph[T] {
	return Graph[T]{
		adjacencyList: make(map[T][]T),
		edges:         Edges[T]{},
	}
}

func (g *Graph[T]) AddEdge(edge Edge[T]) {
	g.adjacencyList[edge.from] = append(g.adjacencyList[edge.from], edge.to)
	g.adjacencyList[edge.to] = append(g.adjacencyList[edge.to], edge.from)
	g.edges = append(g.edges, edge)
}

func (g *Graph[T]) GetNeighbors(node T) []T {
	return g.adjacencyList[node]
}
