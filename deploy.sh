#!/bin/sh
npm run build
rm -rf ../sebablasko.github.io/facalendarbeta/dist
cp -r dist ../sebablasko.github.io/facalendarbeta/dist
cd ../sebablasko.github.io
git add .
git commit -m "update calendar"
git push