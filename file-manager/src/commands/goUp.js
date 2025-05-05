import { chdir, cwd } from 'process';
import path from 'path';

export function goUp() {
  const current = cwd();
  const parent = path.resolve(current, '..');
  const root = path.parse(current).root;

  if (current === root) {
    return;
  }

  try {
    chdir(parent);
  } catch {
    console.log('Operation failed');
  }
}
