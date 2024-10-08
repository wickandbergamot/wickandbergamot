# |source| this file

set -ex
wickandbergamot --version

npm run clean
npm run build
ls -l lib
test -r lib/index.iife.js
test -r lib/index.cjs.js
test -r lib/index.esm.js
npm run ok
npm run codecov
npm run test:live-with-test-validator
