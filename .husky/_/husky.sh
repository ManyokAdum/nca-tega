#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  if [ "$HUSKY" = 0 ]; then
    return
  fi
  command_exists () {
    command -v "$1" >/dev/null 2>&1
  }
  # Windows 10, Git Bash and Pnpm compatibility
  if command_exists winpty && test -t 1; then
    exec < /dev/tty
  fi
fi

