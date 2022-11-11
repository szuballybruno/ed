/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SoftSchemaScriptService.ts":
/*!****************************************!*\
  !*** ./src/SoftSchemaScriptService.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftSchemaScriptService = void 0;
var polyfills_1 = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
var XDInjector_1 = __webpack_require__(/*! ./XDInjection/XDInjector */ "./src/XDInjection/XDInjector.ts");
var SoftSchemaScriptService = /** @class */ (function () {
    function SoftSchemaScriptService(_sqlFolderPath) {
        this._sqlFolderPath = _sqlFolderPath;
        this._sqlFolderNames = ['views', 'constraints', 'functions', 'indices', 'triggers'];
    }
    SoftSchemaScriptService.prototype.getSoftSchemaScript = function () {
        var _this = this;
        var foldersAndFiles = this
            ._readAllSQLFolders();
        var scripts = foldersAndFiles
            .map(function (x) { return (__assign(__assign({}, x), { script: x.sqlFolderName === 'views'
                ? _this._getViewCreationScript(x.files)
                : x
                    .files
                    .map(function (file) { return "-- ".concat(file.name, " \n").concat(file.content).concat(file.content.endsWith(';') ? '' : ';'); })
                    .join('\n') })); });
        var wrappedScripts = scripts
            .map(function (script) { return _this._mainScectionWrapper(script.sqlFolderName, script.script); });
        var script = wrappedScripts
            .join('\n');
        return script;
    };
    /**
     * SQL section wrapper
     */
    SoftSchemaScriptService.prototype._mainScectionWrapper = function (schemaItemName, script) {
        return "\n-- CREATE ".concat(schemaItemName, "\n").concat(script, "\n");
    };
    /**
     * Reads sql folder file paths
     */
    SoftSchemaScriptService.prototype._readSQLFolderFiles = function (folderName) {
        var path = "".concat(this._sqlFolderPath, "/").concat(folderName);
        var files = Array.from((0, polyfills_1.getAllFilePaths)(path))
            .map(function (x) { return "".concat(path, "/").concat(x); });
        return files;
    };
    /**
     * Read sql folders
     */
    SoftSchemaScriptService.prototype._readAllSQLFolders = function () {
        var _this = this;
        return this
            ._sqlFolderNames
            .map(function (x) {
            return {
                sqlFolderName: x,
                files: _this._readSQLFolderFiles(x)
                    .filter(function (x) { return x.endsWith('.sql'); })
                    .map(function (x) { return ({
                    name: polyfills_1.Polyfills.getFileName(x).replace('.sql', ''),
                    path: x,
                    content: (0, polyfills_1.readFileSync)(x),
                }); })
            };
        });
    };
    /**
     * Get view createion script
     */
    SoftSchemaScriptService.prototype._getViewCreationScript = function (viewFiles) {
        var nameAndDeps = this
            ._getDepsOfViews(viewFiles);
        var ordered = XDInjector_1.XDependency
            .orderDepHierarchy(nameAndDeps);
        var viewFilesOrdered = ordered
            .map(function (x) { return viewFiles
            .single(function (y) { return y.name === x.getCompareKey(); }); });
        var createScript = viewFilesOrdered
            .map(function (x) { return "\n--".concat(x.name, "\nCREATE VIEW ").concat(x.name, "\nAS\n").concat(x.content, ";"); })
            .join('\n');
        return createScript;
    };
    /**
     * Get deps of views
     */
    SoftSchemaScriptService.prototype._getDepsOfViews = function (namesAndContents) {
        var _this = this;
        return namesAndContents
            .map(function (x) { return new XDInjector_1.DepHierarchyItem({
            key: x.name,
            deps: _this
                ._getDepsOfView(x.content)
        }); });
    };
    /**
     * Get deps of view
     */
    SoftSchemaScriptService.prototype._getDepsOfView = function (viewSql) {
        var matches = (0, polyfills_1.regexMatchAll)(viewSql, new RegExp('public\\..*_view', 'g'));
        var filtered = matches
            .map(function (x) { return x.replace('public.', ''); })
            .groupBy(function (x) { return x; })
            .map(function (x) { return x.key; });
        return filtered;
    };
    return SoftSchemaScriptService;
}());
exports.SoftSchemaScriptService = SoftSchemaScriptService;


/***/ }),

/***/ "./src/XDInjection/XDInjector.ts":
/*!***************************************!*\
  !*** ./src/XDInjection/XDInjector.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XDependency = exports.DepHierarchyItem = void 0;
var DepHierarchyItem = /** @class */ (function () {
    function DepHierarchyItem(opts) {
        var _a;
        this.key = opts.key;
        this.deps = (_a = opts.deps) !== null && _a !== void 0 ? _a : [];
        this.params = opts.params;
        this.instance = opts.instance;
    }
    DepHierarchyItem.prototype.getCompareKey = function () {
        return this
            ._getCompareKeyFromValue(this.key);
    };
    DepHierarchyItem.prototype.getDepsCompareKeys = function () {
        var _this = this;
        return this
            .deps
            .map(function (x) { return _this
            ._getCompareKeyFromValue(x); });
    };
    DepHierarchyItem.prototype._getCompareKeyFromValue = function (value) {
        return typeof value === 'string'
            ? value
            : value.name;
    };
    return DepHierarchyItem;
}());
exports.DepHierarchyItem = DepHierarchyItem;
var XDependencyHierarchyBuilder = /** @class */ (function () {
    function XDependencyHierarchyBuilder() {
        this._items = [];
    }
    XDependencyHierarchyBuilder.prototype.addFunction = function (fn, deps, params) {
        var item = new DepHierarchyItem({
            key: fn,
            deps: deps,
            params: params
        });
        this._items.push(item);
        return this;
    };
    XDependencyHierarchyBuilder.prototype.addClass = function (classType, deps) {
        var item = new DepHierarchyItem({
            key: classType,
            deps: deps
        });
        this._items.push(item);
        return this;
    };
    XDependencyHierarchyBuilder.prototype.addClassInstance = function (classType, instance) {
        var item = new DepHierarchyItem({
            key: classType,
            instance: instance
        });
        this._items.push(item);
        return this;
    };
    XDependencyHierarchyBuilder.prototype.getContainer = function () {
        return this._items;
    };
    return XDependencyHierarchyBuilder;
}());
var XDependency = /** @class */ (function () {
    function XDependency() {
    }
    XDependency.getFunctionBuilder = function () {
        return new XDependencyHierarchyBuilder();
    };
    XDependency.getClassBuilder = function () {
        return new XDependencyHierarchyBuilder();
    };
    XDependency.instantiate = function (container) {
        // order items 
        var orderedContainer = this
            .orderDepHierarchy(container);
        // instantiate 
        return this
            .instatiateOnly(orderedContainer);
    };
    XDependency.instatiateOnly = function (orderedContainer) {
        // instance container 
        var instances = {};
        // reg instance 
        var regInstance = function (item, instance) { return instances[item.getCompareKey()] = instance; };
        // execute function
        var instantiateItem = function (item, args) {
            var _a;
            if (item.instance)
                return item.instance;
            var fn = item.key;
            var isClass = Object
                .getOwnPropertyNames(fn)
                .includes('prototype');
            return isClass
                ? new ((_a = fn).bind.apply(_a, __spreadArray([void 0], args, false)))() : fn.apply(void 0, args);
        };
        // get instance 
        var getInstance = function (key) { var _a; return (_a = instances[key]) !== null && _a !== void 0 ? _a : null; };
        // has instance
        var hasInstance = function (key) { return !!getInstance(key); };
        // instatniate item
        var instatiateItem = function (item) {
            // get dep instances
            var depInstances = item
                .getDepsCompareKeys()
                .map(function (dependencyKey) {
                // existing instance 
                if (hasInstance(dependencyKey))
                    return getInstance(dependencyKey);
                // new item
                return instatiateItem(orderedContainer
                    .single(function (x) { return x
                    .getCompareKey() === dependencyKey; }));
            });
            // get instance 
            var instance = instantiateItem(item, depInstances);
            // reg instance 
            regInstance(item, instance);
        };
        // instantiate items
        orderedContainer
            .forEach(function (item) { return instatiateItem(item); });
        var itemInstancePairs = orderedContainer
            .map(function (item) { return [item, getInstance(item.getCompareKey())]; });
        return {
            getInstance: getInstance,
            instances: instances,
            itemInstancePairs: itemInstancePairs
        };
    };
    XDependency.orderDepHierarchy = function (container) {
        /**
         * State
         */
        var ordered = [];
        var unordered = __spreadArray([], container, true).orderBy(function (x) { return x.getDepsCompareKeys().length; });
        /**
         * Check integrity
         */
        var allKeys = unordered
            .map(function (w) { return w.getCompareKey(); });
        var allDeps = unordered
            .flatMap(function (x) { return x.getDepsCompareKeys(); })
            .groupBy(function (x) { return x; })
            .map(function (x) { return x.key; });
        var missingDeps = allDeps
            .filter(function (x) { return allKeys
            .none(function (y) { return y === x; }); });
        if (missingDeps.length > 0)
            throw new Error("Missing deps: [".concat(missingDeps.join(', '), "]"));
        /**
         * Move function
         */
        var move = function (item) {
            // add to ordered
            ordered
                .push(item);
            // remove from unordered
            unordered = unordered
                .filter(function (x) { return x.getCompareKey() !== item.getCompareKey(); });
        };
        /**
         * Begin ordering
         */
        while (unordered.length > 0) {
            var itemToMove = null;
            for (var index = 0; index < unordered.length; index++) {
                var depHierarchyItem = unordered[index];
                var hasZeroDeps = depHierarchyItem.getDepsCompareKeys().length === 0;
                var allDepsInOrdered = depHierarchyItem
                    .getDepsCompareKeys()
                    .all(function (x) { return ordered
                    .any(function (orderedItem) { return orderedItem.getCompareKey() === x; }); });
                if (hasZeroDeps || allDepsInOrdered) {
                    itemToMove = depHierarchyItem;
                    break;
                }
            }
            if (!itemToMove)
                throw new Error('Dep hierarchy ordering iteration failed.');
            move(itemToMove);
        }
        return ordered;
    };
    return XDependency;
}());
exports.XDependency = XDependency;


/***/ }),

/***/ "./src/jsExtensions.ts":
/*!*****************************!*\
  !*** ./src/jsExtensions.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initJsExtensions = void 0;
console.log('Extending prototypes...');
var initJsExtensions = function () { return 1; };
exports.initJsExtensions = initJsExtensions;
String.prototype.trimChar = function (char) {
    return this.replace(new RegExp("^".concat(char, "+|").concat(char, "+$"), 'g'), '');
};
// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
Array.prototype.insert = function (index, newItem) {
    return __spreadArray(__spreadArray(__spreadArray([], this.slice(0, index), true), [
        // inserted item
        newItem
    ], false), this.slice(index), true);
};
// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function (func) {
    var groups = [];
    this
        .forEach(function (item) {
        var key = func(item);
        var currentGroup = groups
            .filter(function (x) { return x.key === key; })[0];
        var existingKey = !!currentGroup;
        if (existingKey) {
            currentGroup.items.push(item);
        }
        else {
            groups
                .push({
                key: key,
                items: [item],
                first: item
            });
        }
    });
    return groups;
};
// eslint-disable-next-line no-extend-native
Array.prototype.isDistinctBy = function (func) {
    return !this
        .groupBy(func)
        .some(function (x) { return x.items.length > 1; });
};
// eslint-disable-next-line no-extend-native
Array.prototype.firstOrNull = function (func) {
    if (!func)
        func = function (x) { return true; };
    var filtered = this.filter(func);
    var first = filtered[0];
    if (first === undefined)
        return null;
    if (first === null)
        return null;
    return first;
};
// eslint-disable-next-line no-extend-native
Array.prototype.lastOrNull = function (func) {
    if (!func)
        func = function (x) { return true; };
    var filtered = this.filter(func);
    var last = filtered[filtered.length - 1];
    if (last === undefined)
        return null;
    if (last === null)
        return null;
    return last;
};
// eslint-disable-next-line no-extend-native
Array.prototype.last = function (fn) {
    var func = fn ? fn : function () { return true; };
    var filtered = this.filter(func);
    if (filtered.length === 0)
        throw new Error('Last operaion found no matching elements!');
    return filtered[filtered.length - 1];
};
// eslint-disable-next-line no-extend-native
Array.prototype.first = function (func) {
    if (!func)
        func = function (x) { return true; };
    var filtered = this.filter(func);
    if (filtered.length === 0)
        throw new Error('First operaion found no matching elements!');
    return filtered[0];
};
// eslint-disable-next-line no-extend-native
Array.prototype.single = function (func) {
    var filtered = this.filter(func !== null && func !== void 0 ? func : (function () { return true; }));
    if (filtered.length === 0)
        throw new Error('Single operaion found no matching elements!');
    if (filtered.length > 1)
        throw new Error('Single operation found more than one matching element!');
    return filtered[0];
};
// eslint-disable-next-line no-extend-native
Array.prototype.singleIndex = function (func) {
    var indices = [];
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if (!func(element))
            continue;
        indices.push(index);
    }
    if (indices.length === 0)
        throw new Error('Single operaion found no matching elements!');
    if (indices.length > 1)
        throw new Error('Single operation found more than one matching element!');
    return indices[0];
};
// eslint-disable-next-line no-extend-native
Array.prototype.firstOrNullIndex = function (func) {
    var _a;
    var indices = [];
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if (!func(element))
            continue;
        indices.push(index);
    }
    return (_a = indices[0]) !== null && _a !== void 0 ? _a : null;
};
// eslint-disable-next-line no-extend-native
Array.prototype.byIndexOrNull = function (index) {
    var item = this[index];
    if (item === undefined)
        return null;
    return item;
};
// eslint-disable-next-line no-extend-native
Array.prototype.byIndex = function (index) {
    if (index >= this.length || index < 0)
        throw new Error("Index (".concat(index, ") is out of array bounds (0 - ").concat(this.length, ")!"));
    var item = this[index];
    if (item === undefined)
        throw new Error('Item is undefined!');
    return item;
};
// eslint-disable-next-line no-extend-native
Array.prototype.findLastIndex = function (func) {
    var filtered = this.filter(func);
    if (filtered.length === 0)
        return null;
    return filtered.length - 1;
};
// eslint-disable-next-line no-extend-native
Array.prototype.all = function (func) {
    return !this.some(function (x) { return !func(x); });
};
// eslint-disable-next-line no-extend-native
Array.prototype.any = function (funcOrItem) {
    if (!funcOrItem)
        return this.some(function (x) { return true; });
    if (typeof funcOrItem === 'function')
        return this.some(funcOrItem);
    return this.some(function (x) { return x === funcOrItem; });
};
// eslint-disable-next-line no-extend-native
Array.prototype.none = function (func) {
    if (!func)
        return this.length === 0;
    return !this.some(func);
};
// eslint-disable-next-line no-extend-native
Array.prototype.remove = function (func) {
    return this.filter(function (item) { return !func(item); });
};
// eslint-disable-next-line no-extend-native
Array.prototype.orderBy = function (func) {
    var sorted = __spreadArray([], this, true).sort(function (a, b) {
        if (func(a) < func(b))
            return -1;
        if (func(a) > func(b))
            return 1;
        return 0;
    });
    return sorted;
};
// eslint-disable-next-line no-extend-native
Array.prototype.count = function (func) {
    var count = 0;
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        var result = func(element);
        if (result)
            count++;
    }
    return count;
};
// eslint-disable-next-line no-extend-native
Array.prototype.each = function (func) {
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        func(element);
    }
    return this;
};


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polyfills = exports.readFileAsText = exports.existsSync = exports.readFileSync = exports.regexMatchAll = exports.getAllFilePaths = exports.logScoped = exports.writeFileSync = void 0;
var fs = __webpack_require__(/*! fs */ "fs");
var writeFileSync = function (filePath, data) {
    fs.writeFileSync(filePath, data);
};
exports.writeFileSync = writeFileSync;
var logScoped = function (scope, text) { return console.log("[".concat(scope, "] ").concat(text)); };
exports.logScoped = logScoped;
var getAllFilePaths = function (directoryPath) {
    return fs.readdirSync(directoryPath);
};
exports.getAllFilePaths = getAllFilePaths;
var regexMatchAll = function (text, regex) {
    var _a;
    var matches = (_a = text.match(regex)) !== null && _a !== void 0 ? _a : [];
    return matches.map(function (x) { return '' + x; });
};
exports.regexMatchAll = regexMatchAll;
var readFileSync = function (path) {
    try {
        return fs.readFileSync(path, 'utf-8');
    }
    catch (e) {
        throw new Error("Error reading path: ".concat(path, " Msg: ").concat(e.message));
    }
};
exports.readFileSync = readFileSync;
var existsSync = function (path) { return fs.existsSync(path); };
exports.existsSync = existsSync;
var readFileAsText = function (path) { return fs.readFileSync(path, 'utf-8'); };
exports.readFileAsText = readFileAsText;
var parseIntOrFail = function (text, name) {
    var parsed = parseInt(text);
    if (Number.isNaN(parsed))
        throw new Error("Parsing int param \"".concat(name !== null && name !== void 0 ? name : '-', "\" failed."));
    return parsed;
};
var getFileName = function (path) {
    var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop();
    };
    return splitTest(path);
};
exports.Polyfills = {
    readFileAsText: exports.readFileAsText,
    getAllFilePaths: exports.getAllFilePaths,
    parseIntOrFail: parseIntOrFail,
    getFileName: getFileName
};


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./jsExtensions */ "./src/jsExtensions.ts");
var polyfills_1 = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
var SoftSchemaScriptService_1 = __webpack_require__(/*! ./SoftSchemaScriptService */ "./src/SoftSchemaScriptService.ts");
var rootFolderPath = __dirname + '/../../../../';
var deployFolderFilePath = "".concat(rootFolderPath, "deploy");
var sqlFolderFilePath = "".concat(rootFolderPath, "packages/backend/sql");
var migrationsFolderFilePath = sqlFolderFilePath + '/migrations';
var getMigrationScript = function (_a) {
    var createMigrationsTableScript = _a.createMigrationsTableScript, migrationVersions = _a.migrationVersions, dropSoftSchemaScript = _a.dropSoftSchemaScript, softSchemaCreateScript = _a.softSchemaCreateScript;
    /**
     * Insert migration verisons
     */
    var insertMigrationVersionsScript = migrationVersions
        .map(function (ver) {
        return "\n-- MIGRATION: ".concat(ver, "\nINSERT INTO public.migration_version\nVALUES ('").concat(ver, "', now()); ");
    })
        .join('\n');
    /**
     * Migration scripts
     */
    var migartionScripts = migrationVersions
        .map(function (ver) {
        var migrationScript = "--MIGRATION: ".concat(ver, "\n").concat(polyfills_1.Polyfills
            .readFileAsText("".concat(migrationsFolderFilePath, "/").concat(ver, ".sql")));
        return migrationScript;
    })
        .join('\n\n');
    /**
     * Assemble final script
     */
    return "\n-- MIGRATION VERSIONS: ".concat(migrationVersions.join(', '), "\n\n-- BEGIN TRANSACTION\nBEGIN;\n\n-- CREATE MIGARTION VERSION TABLE\n").concat(createMigrationsTableScript, "\n\n-- STORE MIGRATION VERSION\n").concat(insertMigrationVersionsScript, "\n\n-- DROP SOFT SCHEMA\n").concat(dropSoftSchemaScript, "\n\n-- EXECUTE MIGRATIONS \n").concat(migartionScripts, "\n\n-- CREATE SOFT SCHEMA\n").concat(softSchemaCreateScript, "\n\n-- COMMIT TRANSACTION\nCOMMIT;\n");
};
var getMigrationVerisonsArgs = function () {
    var versions = polyfills_1.Polyfills
        .readFileAsText(deployFolderFilePath + '/out/migrationVersionsOnServer.txt');
    var veList = versions
        .split('\n')
        .map(function (x) { return x
        .replace(' ', '')
        .replace('\r', ''); })
        .filter(function (x) { return !!x; });
    if (!veList.any())
        throw new Error('Server has no version migration history. Create it manually.');
    return veList;
};
var getVersionNumber = function (migver) {
    return polyfills_1.Polyfills.parseIntOrFail(migver.replace('migration', ''));
};
var getServerVersionNumber = function () {
    var serverMigrationVersions = getMigrationVerisonsArgs();
    var ordered = serverMigrationVersions
        .orderBy(function (x) { return getVersionNumber(x); });
    var latestVersionOnServer = ordered
        .last();
    return getVersionNumber(latestVersionOnServer);
};
var getMissingMigrations = function (migrationsFolderFilePath) {
    var latestVersionOnServer = getServerVersionNumber();
    console.log("Latest version on server: ".concat(latestVersionOnServer));
    var allMigrationVersions = polyfills_1.Polyfills
        .getAllFilePaths(migrationsFolderFilePath)
        .map(function (x) { return polyfills_1.Polyfills
        .getFileName(x)
        .replace('.sql', ''); });
    var missingVersions = allMigrationVersions
        .filter(function (x) { return getVersionNumber(x) > latestVersionOnServer; });
    return missingVersions
        .orderBy(function (x) { return getVersionNumber(x); });
};
var createScripts = function () {
    var missingMigraitonVersions = getMissingMigrations(migrationsFolderFilePath);
    console.log("Missing versions: ".concat(missingMigraitonVersions.join(', ')));
    var softSchemaCreateScript = new SoftSchemaScriptService_1.SoftSchemaScriptService(sqlFolderFilePath)
        .getSoftSchemaScript();
    var createMigrationsTableScript = polyfills_1.Polyfills
        .readFileAsText("".concat(deployFolderFilePath, "/sql/createMigrationVersionTable.sql"));
    var dropSoftSchemaScript = polyfills_1.Polyfills
        .readFileAsText("".concat(deployFolderFilePath, "/sql/dropSoftSchema.sql"));
    var fullMigrationScript = getMigrationScript({
        createMigrationsTableScript: createMigrationsTableScript,
        softSchemaCreateScript: softSchemaCreateScript,
        dropSoftSchemaScript: dropSoftSchemaScript,
        migrationVersions: missingMigraitonVersions
    });
    (0, polyfills_1.writeFileSync)(deployFolderFilePath + '/out/fullMigrationScript.sql', fullMigrationScript);
    (0, polyfills_1.writeFileSync)(deployFolderFilePath + '/out/softSchemaCreateScript.sql', softSchemaCreateScript);
};
process
    .on('uncaughtException', function (err) {
    console.error('---- FATAL ERROR -----');
    console.error(err);
});
// console.log(Polyfills.getAllFilePaths(backendPath));
createScripts();

})();

/******/ })()
;
//# sourceMappingURL=deployScriptGen.js.map