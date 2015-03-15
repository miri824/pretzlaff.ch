# Pretzlaff.ch Website

This is the source of my [personal website](http://www.pretzlaff.ch/).

It was built with [harp.js](http://harpjs.com/) and [Inuit.css](https://github.com/inuitcss).

## Getting started

    npm install -g harp browser-sync bower
    bower install
    harp server &
    browser-sync start --proxy 'localhost:9000' --files 'public/**'

## Deployment

    harp compile . dist
    git add dist && git commit -m "dist subtree commit"
    git subtree push --prefix dist origin gh-pages
