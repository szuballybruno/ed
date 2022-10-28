echo "Runninng LR."

cd ..\
npx ts-node --esm --experimentalSpecifierResolution node ./src/server.ts --lightRecreate
cd deploy

echo "Done."