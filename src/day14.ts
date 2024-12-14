type Point = {
	x: number;
	y: number;
};

type Robot = {
	position: Point;
	velocity: { vX: number; vY: number };
};

export type Canvas = Array<string[]>;

export const day14 = (input: string) => {
	const parseInput = (input: string): Robot[] => {
		return input
			.trim()
			.split('\n')
			.map((line) => {
				const [x, y, vX, vY] = (line.match(/-?\d+/g) || []).map(Number);
				return {
					position: { x, y },
					velocity: { vX, vY },
				};
			});
	};

	const calculateNewPosition = (
		position: Point,
		velocity: { vX: number; vY: number },
		w: number,
		h: number,
	): Point => {
		return {
			x: (position.x + velocity.vX + w) % w,
			y: (position.y + velocity.vY + h) % h,
		};
	};

	const getRobotsCountInQuarters = (robots: Robot[], w: number, h: number): [number, number, number, number] => {
		const mX = Math.floor(w / 2);
		const mY = Math.floor(h / 2);

		return robots.reduce<[number, number, number, number]>(
			(quarters, { position }) => {
				if (position.x === mX || position.y === mY) return quarters;
				const isLeft = position.x < mX;
				const isTop = position.y < mY;
				const index = (isTop ? 0 : 2) + (isLeft ? 0 : 1);
				quarters[index]++;
				return quarters;
			},
			[0, 0, 0, 0],
		);
	};

	const calculateSafetyFactor = (robots: Robot[], w: number, h: number): number => {
		return getRobotsCountInQuarters(robots, w, h).reduce((acc, curr) => acc * curr, 1);
	};

	const simulateRobots = (robots: Robot[], w: number, h: number): Robot[] => {
		return robots.map((robot) => ({
			...robot,
			position: calculateNewPosition(robot.position, robot.velocity, w, h),
		}));
	};

	const W = 101;
	const H = 103;

	const robots = parseInput(input);

	const finalRobots = Array.from({ length: 100 }, (_, i) => i).reduce(
		(currentRobots) => simulateRobots(currentRobots, W, H),
		robots,
	);

	const partOne = calculateSafetyFactor(finalRobots, W, H);
	console.log('Part one: ', partOne);

	let minimumSafetyFactor = Infinity;
	let bestIteration = 0;
	let bestPositions: Point[] = [];

	let currentRobots = robots;
	for (let elapsedTime = 1; elapsedTime < W * H; elapsedTime++) {
		currentRobots = simulateRobots(currentRobots, W, H);
		const safetyFactor = calculateSafetyFactor(currentRobots, W, H);

		if (safetyFactor < minimumSafetyFactor) {
			minimumSafetyFactor = safetyFactor;
			bestIteration = elapsedTime;
			bestPositions = currentRobots.map(({ position }) => position);
		}
	}

	const canvas: Canvas = Array.from({ length: H }, () => Array(W).fill('.'));
	const filledCanvas = canvas.map((row, y) =>
		row.map((cell, x) => (bestPositions.some((point) => point.x === x && point.y === y) ? '*' : cell)),
	);
	console.log(filledCanvas.map((line) => line.join('')).join('\n'));

	console.log('Part two: ', bestIteration);
};
