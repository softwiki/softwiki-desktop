cd "$(dirname "$0")"
cd app
yarn install
yarn build
cd -
rm -rf ./electron/resources/app
cp -r ./app/build ./electron/resources/app
cd electron
yarn install
yarn make
cd -