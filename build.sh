cd "$(dirname "$0")"
git submodule init
git submodule update
cd app
rm -rf ./out
rm -rf ./build
npm install
npm run build
npm run electron-make
cd -