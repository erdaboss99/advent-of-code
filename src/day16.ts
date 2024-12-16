type Graph = Record<Node, Record<Node, number>>;

type Direction = 'N' | 'S' | 'W' | 'E';

type Node = `${number},${number},${Direction}`;

type PathNode = {
	node: Node;
	prev: PathNode[] | null;
};

type PriorityQueue = { node: Node; distance: number }[];

export const day16 = (input: string) => {
	const parseInput = (input: string[]): { graph: Graph; startNode: Node; endNodes: Node[] } => {
		const graph: Graph = {};
		const grid = input.filter((line) => line).map((row) => row.split(''));
		let startNode: Node = '-1,-1,E';
		const endNodes: Node[] = [];

		const setGraph = (from: Node, to: Node, weight: number) => {
			graph[from] ??= {};
			graph[from][to] = weight;
		};

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] === '#') continue;

				const [northPossible, southPossible, westPossible, eastPossible] = [
					grid[y - 1][x] !== '#',
					grid[y + 1][x] !== '#',
					grid[y][x - 1] !== '#',
					grid[y][x + 1] !== '#',
				];

				if (grid[y][x] === 'S') {
					startNode = `${x},${y},E`;
				}

				if (grid[y][x] === 'E') {
					if (northPossible) endNodes.push(`${x},${y},S`);
					if (southPossible) endNodes.push(`${x},${y},N`);
					if (westPossible) endNodes.push(`${x},${y},E`);
					if (eastPossible) endNodes.push(`${x},${y},W`);
				}

				if (northPossible) {
					setGraph(`${x},${y},N`, `${x},${y - 1},N`, 1);
					setGraph(`${x},${y},E`, `${x},${y},N`, 1000);
					setGraph(`${x},${y},W`, `${x},${y},N`, 1000);
				}
				if (southPossible) {
					setGraph(`${x},${y},S`, `${x},${y + 1},S`, 1);
					setGraph(`${x},${y},E`, `${x},${y},S`, 1000);
					setGraph(`${x},${y},W`, `${x},${y},S`, 1000);
				}
				if (westPossible) {
					setGraph(`${x},${y},W`, `${x - 1},${y},W`, 1);
					setGraph(`${x},${y},N`, `${x},${y},W`, 1000);
					setGraph(`${x},${y},S`, `${x},${y},W`, 1000);
				}
				if (eastPossible) {
					setGraph(`${x},${y},E`, `${x + 1},${y},E`, 1);
					setGraph(`${x},${y},N`, `${x},${y},E`, 1000);
					setGraph(`${x},${y},S`, `${x},${y},E`, 1000);
				}
			}
		}

		return { graph, startNode, endNodes };
	};

	const buildPaths = (lastNode: PathNode, pathSoFar: Node[] = []): Node[][] =>
		lastNode.prev
			? lastNode.prev.flatMap((prevNode) => buildPaths(prevNode, [lastNode.node, ...pathSoFar]))
			: [[lastNode.node, ...pathSoFar]];

	const findBestPaths = (graph: Graph, startNode: Node, endNodes: Node[]): { distance: number; paths: Node[][] } => {
		const distances: { [node: Node]: number } = {};
		const paths: { [node: Node]: PathNode } = {};
		const priorityQueue: PriorityQueue = [];

		Object.keys(graph).forEach((node) => {
			distances[node] = Infinity;
		});

		distances[startNode] = 0;
		paths[startNode] = { node: startNode, prev: null };

		priorityQueue.push({ node: startNode, distance: 0 });

		while (priorityQueue.length > 0) {
			priorityQueue.sort((a, b) => a.distance - b.distance);
			const { node: currentNode } = priorityQueue.shift()!;

			const neighbors = Object.keys(graph[currentNode]) as Node[];
			for (const neighborNode of neighbors) {
				const altDist = distances[currentNode] + graph[currentNode][neighborNode];

				if (altDist < distances[neighborNode]) {
					distances[neighborNode] = altDist;
					paths[neighborNode] = { node: neighborNode, prev: [paths[currentNode]] };
					priorityQueue.push({ node: neighborNode, distance: altDist });
				} else if (altDist === distances[neighborNode]) {
					paths[neighborNode].prev!.push(paths[currentNode]);
				}
			}
		}

		const minDistance = Math.min(...endNodes.map((node) => distances[node]));
		const bestPaths: Node[][] = endNodes
			.filter((node) => distances[node] === minDistance)
			.flatMap((node) => buildPaths(paths[node], []));

		return {
			distance: minDistance,
			paths: bestPaths,
		};
	};

	const { graph, startNode, endNodes } = parseInput(input.trim().split('\n'));

	const { distance, paths } = findBestPaths(graph, startNode, endNodes);
	const partOne = distance;
	console.log('Part one:', partOne);

	const uniqueSeats = new Set<string>();
	for (const path of paths) {
		for (const node of path) {
			const [x, y] = node.split(',');
			uniqueSeats.add(`${x},${y}`);
		}
	}

	const partTwo = uniqueSeats.size;
	console.log('Part two:', partTwo);
};
