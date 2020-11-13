#!/bin/sh
npm run build
cp -r dist ../sebablasko.github.io/facalendar/
cd ../sebablasko.github.io
git add .
git commit -m "update calendar"
git push