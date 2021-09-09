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
exports.getStorageFileUrl = exports.deleteStorageFileAsync = exports.uploadToStorageAsync = void 0;
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const bucketName = "epistogram_bucket_dev";
const uploadToStorageAsync = (file, path) => new Promise((resolve, reject) => {
    const bucket = getBucket();
    const { data: buffer } = file;
    const blob = bucket.file(path.replace(/ /g, "_"));
    const blobStream = blob
        .createWriteStream({
        resumable: false
    });
    blobStream
        .on('finish', () => {
        resolve();
    })
        .on('error', (e) => {
        reject(e);
    })
        .end(buffer);
});
exports.uploadToStorageAsync = uploadToStorageAsync;
const deleteStorageFileAsync = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const bucket = getBucket();
    yield bucket.file(filePath).delete();
});
exports.deleteStorageFileAsync = deleteStorageFileAsync;
const getStorageFileUrl = (filePath) => {
    if (!filePath)
        return null;
    return `https://storage.googleapis.com/${bucketName}/${filePath}`;
};
exports.getStorageFileUrl = getStorageFileUrl;
const getBucket = () => {
    const storage = new storage_1.Storage({
        keyFilename: path_1.default.join(__dirname, "../epistogram_service_user_key.json")
    });
    return storage.bucket(bucketName);
};
//# sourceMappingURL=storageService.js.map