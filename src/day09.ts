type Block = number | string;

export const day09 = (input: string) => {
	const blocks: Block[] = input
		.trim()
		.split('')
		.map((digit, i) => (i % 2 === 0 ? Array(Number(digit)).fill(i / 2) : Array(Number(digit)).fill('.')))
		.filter((item) => item.length)
		.flat();

	const compactDrive = (blocks: Block[]): (number | string)[] => {
		const drive = [...blocks];
		let idx = drive.length - 1;

		while (idx >= drive.indexOf('.')) {
			if (!isNaN(Number(drive[idx]))) {
				const firstDotIndex = drive.indexOf('.');

				(drive[firstDotIndex] = drive[idx]), (drive[idx] = '.');
			}

			idx -= 1;
		}

		return drive;
	};

	const compactDriveUpdated = (blocks: Block[]) => {
		const drive = [...blocks];

		let idx = drive.length - 1;

		while (idx >= drive.indexOf('.')) {
			if (!isNaN(Number(drive[idx]))) {
				const firstIndex = drive.indexOf(drive[idx]);
				const rangeLength = idx - firstIndex + 1;

				for (let j = 0; j <= firstIndex; j++) {
					const slice = drive.slice(j, j + rangeLength);

					if (slice.every((item) => item === '.')) {
						const filled = Array(rangeLength).fill(drive[idx]);
						const dots = Array(rangeLength).fill('.');

						drive.splice(j, rangeLength, ...filled);
						drive.splice(firstIndex, rangeLength, ...dots);

						break;
					}
				}

				idx -= rangeLength;
				continue;
			}

			idx -= 1;
		}

		return drive;
	};

	const calculateCheckSum = (blocks: Block[]): number => {
		return Number(
			blocks.reduce((acc, curr, idx) => {
				if (!isNaN(Number(curr))) {
					return ((acc as number) += idx * Number(curr));
				} else {
					return acc;
				}
			}, 0),
		);
	};

	const partOne = calculateCheckSum(compactDrive(blocks));
	const partTwo = calculateCheckSum(compactDriveUpdated(blocks));

	console.log('Part one:', partOne);
	console.log('Part two:', partTwo);
};
