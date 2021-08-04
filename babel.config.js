'use strict';

// todo: https://github.com/babel/babel/issues/8529 :'(
module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {
        "runtime": "automatic"
    }]],
};