#!/bin/bash

COMMITS_FILE="commits.txt"

# Extract commits to file
extract_commits() {
    echo "Extracting commits..."
    git log --reverse --pretty=format:"%H|%ai|%s" > "$COMMITS_FILE"
    echo "Commits extracted to $COMMITS_FILE"
    echo "Format: hash|date|message"
    echo "Edit dates in $COMMITS_FILE, then run: $0 replay"
}

# Replay commits with modified timestamps
replay_commits() {
    if [[ ! -f "$COMMITS_FILE" ]]; then
        echo "Error: $COMMITS_FILE not found. Run: $0 extract"
        exit 1
    fi

    echo "WARNING: This will reset your repo and replay commits!"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi

    # Get original branch
    ORIGINAL_BRANCH=$(git branch --show-current)
    
    # Create orphan branch for replay
    git checkout --orphan temp_replay
    git rm -rf . 2>/dev/null || true

    # Replay each commit
    while IFS='|' read -r hash date_str message; do
        echo "Replaying: $message"
        
        # Convert human date to timestamp
        timestamp=$(date -d "$date_str" +%s)
        
        # Get original commit details
        AUTHOR_NAME=$(git show -s --format="%an" "$hash")
        AUTHOR_EMAIL=$(git show -s --format="%ae" "$hash")
        COMMITTER_NAME=$(git show -s --format="%cn" "$hash")
        COMMITTER_EMAIL=$(git show -s --format="%ce" "$hash")
        
        # Get files from original commit
        git checkout "$hash" -- . 2>/dev/null || {
            echo "Manual resolution needed for $hash"
            read -p "Press Enter when ready..."
        }
        
        # Stage all changes
        git add .
        
        # Commit with modified timestamp
        GIT_AUTHOR_NAME="$AUTHOR_NAME" \
        GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL" \
        GIT_AUTHOR_DATE="$timestamp" \
        GIT_COMMITTER_NAME="$COMMITTER_NAME" \
        GIT_COMMITTER_EMAIL="$COMMITTER_EMAIL" \
        GIT_COMMITTER_DATE="$timestamp" \
        git commit -m "$message"
        
    done < "$COMMITS_FILE"
    
    # Replace original branch
    git branch -D "$ORIGINAL_BRANCH" 2>/dev/null || true
    git checkout -b "$ORIGINAL_BRANCH"
    git branch -D temp_replay
    
    echo "Replay complete!"
}

case "$1" in
    extract)
        extract_commits
        ;;
    replay)
        replay_commits
        ;;
    *)
        echo "Usage: $0 {extract|replay}"
        echo "  extract - Export commits to $COMMITS_FILE for editing"
        echo "  replay  - Replay commits with modified dates"
        ;;
esac
