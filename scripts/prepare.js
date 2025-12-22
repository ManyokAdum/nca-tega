#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Skip husky install in CI environments or if not a git repo
if (process.env.CI || !existsSync('.git')) {
  process.exit(0);
}

// Try to install husky, but don't fail if it doesn't work
const result = spawnSync('husky', ['install'], { stdio: 'ignore' });
process.exit(result.status || 0);

