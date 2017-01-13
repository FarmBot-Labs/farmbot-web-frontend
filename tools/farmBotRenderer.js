var merge = require("lodash.merge");
var hbs = require("handlebars");
var fs = require("fs");

function FarmBotRenderer(options) {
    this.options = merge({}, {
        path: "/",
        filename: "index.html",
        outputPath: "/",
        isProd: false,
        include: "bundle"
    }, options);
}

FarmBotRenderer.prototype = {

    constructor: FarmBotRenderer,

    apply: function(compiler) {
        var self = this;

        compiler.plugin("after-emit", function(compilation, callback) {
            var options = compiler.options;
            var stats = compilation.getStats().toJson({
                hash: false,
                publicPath: true,
                assets: true,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            });

            var wantedAssets = [];

            stats.assets.map(function(asset) {
                var name = asset.name;
                if (asset.name.includes(self.options.include)) {

                    // Temp
                    if (asset.name.includes("bundle")) {
                        if (self.options.isProd) {
                            asset.name = "../app-resources" + asset.name.slice(2);
                        }

                    }
                    // Temp
                    if (asset.name.includes("front_page")) {
                        if (self.options.isProd) {
                            asset.name = "/app-resources" + asset.name.slice(2);
                        }
                    }
                    wantedAssets.push(asset);
                }
            });

            var finalPath = self.options.path;
            fs.readFile(finalPath, "utf-8", function(err, source) {

                var data = self.options;
                data.wantedAssets = wantedAssets;
                var template = hbs.compile(source);

                var html = template(data);
                var outputDest = self.options.outputPath + "/" + self.options.filename;

                fs.writeFile(outputDest, html, function(err, data) {
                    if (err) { console.error("error in writing file", err); }
                });
            });

            callback();
        })
    }
}

module.exports = FarmBotRenderer;