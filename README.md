# Advent of Code Solutions

My solutions for [Advent of Code](https://adventofcode.com/) challenges.

## Structure

```
advent-of-code/
├── go/
│   ├── 2025/           # Solutions for 2025
│   │   ├── days/       # Individual day solutions
│   │   ├── template/   # Template for new days
│   │   └── Makefile    # Build automation
│   └── utils/          # Shared utilities
└── .github/
    └── workflows/      # CI/CD automation
```

## Getting Started

### Prerequisites

- Go 1.25.5 or later
- Make
- curl (for automatic input download)

### Setup

1. Clone the repository
2. Add your Advent of Code session cookie to `go/2025/cookie.txt`
3. Navigate to the year directory: `cd go/2025`

### Usage

#### Create a new day solution:

```bash
make create-day DAY=1
```

#### Run tests for a specific day:

```bash
make test DAY=1
```

#### Run all tests:

```bash
make test-all
```

#### Execute a day's solution:

```bash
make run DAY=1
```

#### Download input for a specific day:

```bash
make get-input DAY=1
```

## Project Features

- **Automated setup**: Creates day structure from template
- **Input download**: Automatically fetches puzzle input
- **Testing framework**: Built-in test structure with sample inputs
- **Shared utilities**: Common functions for file handling and data conversion
- **CI/CD**: GitHub Actions for automated testing
- **Go workspace**: Multi-module setup for clean organization

## Development

Each day follows this structure:

- `main.go` - Solution implementation
- `main_test.go` - Unit tests
- `input.txt` - Puzzle input (auto-downloaded)
- `test-input.txt` - Sample input for testing

The project uses Go workspaces to manage multiple modules and shared utilities.
