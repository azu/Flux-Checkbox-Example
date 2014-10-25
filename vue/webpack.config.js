/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";
var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    context: __dirname,
    entry: {
        app: "./index.js",
        vendor: ["vue", "flux", "react", "events"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: "transform?brfs"
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};