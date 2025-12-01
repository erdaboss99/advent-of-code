.PHONE: create-day test run get-input

DAY ?= $(shell date +%-d)
PADDED_DAY = $(shell printf "%02d" $(DAY))

create-day:
	@cp -r ./template days/day$(PADDED_DAY)
	@$(MAKE) get-input
	@echo "Day $(DAY) created"

test:
	@go test ./days/day$(PADDED_DAY)

test-all:
	@go test ./...

run:
	@go run ./days/day$(PADDED_DAY)/main.go

get-input:
	@if [ -n "$(AOC_SESSION)" ]; then \
		curl --silent --header "Cookie: session=$(AOC_SESSION)" --output ./days/day$(PADDED_DAY)/input.txt https://adventofcode.com/2025/day/$(DAY)/input; \
	else \
		curl --silent --header @cookie.txt --output ./days/day$(PADDED_DAY)/input.txt https://adventofcode.com/2025/day/$(DAY)/input; \
	fi
