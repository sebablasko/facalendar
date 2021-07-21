#!/bin/sh
npm run build
rm -rf ../sebablasko.github.io/facalendardelta/dist
cp -r dist ../sebablasko.github.io/facalendardelta/dist
cd ../sebablasko.github.io
git add .
git commit -m "update calendar"
git push