"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var toSQLSnakeCasing = function (name) {
    return name.split(/(?=[A-Z])/).join('_').toLowerCase();
};
console.log("----- START");
var inFilePath = "C:\\Users\\EpistoLEN15_001\\sql_migration\\prod_data.sql";
var outFilePath = "C:\\Users\\EpistoLEN15_001\\sql_migration\\prod_data_gen.sql";
var fileText = fs_1.readFileSync(inFilePath, "utf-8");
var regex = "\".*\"";
var reg = /\".*?\"/g;
var newStr = fileText
    .replace(reg, function (match) {
    var newasd = toSQLSnakeCasing(match.substring(1, match.length - 1));
    return newasd;
});
fs_1.writeFileSync(outFilePath, newStr, { encoding: "utf8" });
console.log("---- END");
