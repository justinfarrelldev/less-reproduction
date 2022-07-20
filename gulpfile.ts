import gulp from 'gulp';
import shelljs from 'shelljs';
import { MODULE_MAP } from './src/moduleMap';

const timestamp = () => {
  return new Date()
    .toLocaleTimeString('en-US', { hour12: false })
    .replace(/\s\w\w/, '');
};

const log = (color: string) => {
  return (msgs) => {
    console.log(`[${color}${timestamp()}\x1b[0m] ${msgs.join(' ')}`);
  };
};

const info = (...msgs: unknown[]) => {
  log('\x1b[2m')(msgs);
};

const warn = (...msgs: unknown[]) => {
  log('\x1b[33m')(msgs);
};

const error = (...msgs: unknown[]) => {
  log('\x1b[31m')(msgs);
};

console.info = info;
console.warn = warn;
console.error = error;

const defaultTask = (cb) => {
  // place code for your default task here
  console.log('Hello world!');
  cb();
};
gulp.task('start', async () => {
  const moduleToStart: string = process.argv[4].replace(/-/g, '');
  if (!moduleToStart) {
    console.error('No argument was passed to "npm run start".');
    return;
  }

  if (
    MODULE_MAP.filter((module) => module.name === moduleToStart).length === 0
  ) {
    console.error(`Module "${moduleToStart}" not found in module map.`);
    return;
  }
  shelljs.exec(`webpack serve --entry ./src/${moduleToStart} --color`);
});

gulp.task('start-verbose', async () => {
  const moduleToStart: string = process.argv[4].replace(/-/g, '');
  if (!moduleToStart) {
    console.error('No argument was passed to "npm run start".');
    return;
  }

  if (
    MODULE_MAP.filter((module) => module.name === moduleToStart).length === 0
  ) {
    console.error(`Module "${moduleToStart}" not found in module map.`);
    return;
  }
  shelljs.exec(
    `webpack serve --entry ./src/${moduleToStart} --stats verbose --color`
  );
});

exports.default = defaultTask;
