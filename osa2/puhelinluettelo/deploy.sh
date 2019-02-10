#!/bin/sh
npm run build
rm -rf ../../../puhelinluettelo-fullstack/build
cp -r build ../../../puhelinluettelo-fullstack/
