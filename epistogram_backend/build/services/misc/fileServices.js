"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchImages = exports.createFile = exports.getFileExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("./logger");
const node_ssh_1 = require("node-ssh");
const staticProvider_1 = require("../../staticProvider");
const getFileExtension = (fileName) => {
    logger_1.log("FileName: " + fileName);
    return (fileName.substr(fileName.lastIndexOf('.') + 1));
};
exports.getFileExtension = getFileExtension;
const makeDirAsync = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs_1.default.mkdir(folderPath, { recursive: true }, (error) => {
            if (!error) {
                resolve();
            }
            else {
                reject(error);
            }
        });
    });
});
const deleteDirOrFileAsync = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs_1.default.rm(filePath, resolve);
    });
});
const createFile = (file, localpath, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const lowercaseFileName = file.name.toLowerCase();
    const tempFolderPath = "./temp/";
    const tempFilePath = tempFolderPath + lowercaseFileName;
    const fileNameWithExtension = fileName + "." + exports.getFileExtension(lowercaseFileName);
    // create folder if does not exist
    if (!fs_1.default.existsSync(tempFolderPath))
        yield makeDirAsync(tempFolderPath);
    // move to temp
    yield file.mv(tempFilePath);
    // setup scp
    const sshClient = new node_ssh_1.NodeSSH();
    yield sshClient.connect({
        host: staticProvider_1.staticProvider.globalConfig.vps.host,
        port: parseInt(staticProvider_1.staticProvider.globalConfig.vps.scpPort),
        username: staticProvider_1.staticProvider.globalConfig.vps.username,
        passphrase: staticProvider_1.staticProvider.globalConfig.vps.passphrase,
        privateKey: staticProvider_1.staticProvider.globalConfig.vps.privateKey
    });
    // PUT FILE 
    logger_1.log(`Uploading file from: '${tempFilePath}'...`);
    const uploadFilePath = localpath + "/" + fileNameWithExtension;
    yield sshClient.putFile(tempFilePath, uploadFilePath);
    // DELETE TEMP FILE
    yield deleteDirOrFileAsync(tempFilePath);
    console.log("File feltöltve");
});
exports.createFile = createFile;
const searchImages = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return fs_1.default.readdirSync(path);
});
exports.searchImages = searchImages;
//# sourceMappingURL=fileServices.js.map