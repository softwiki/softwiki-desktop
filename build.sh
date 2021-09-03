cd "$(dirname "$0")"
git submodule init
git submodule update
cd app
rm -rf ./out
rm -rf ./build
yarn install
yarn build
yarn electron-make
cd -