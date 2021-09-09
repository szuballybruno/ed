"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const StorageFile_1 = require("./StorageFile");
const User_1 = require("./User");
let Video = class Video {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Video.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Video.prototype, "orderIndex", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "videoFileId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => StorageFile_1.StorageFile, s => s.videos),
    typeorm_1.JoinColumn({ name: "videoFileId" }),
    __metadata("design:type", StorageFile_1.StorageFile
    // thumbnail file
    )
], Video.prototype, "videoFile", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "thumbnailFileId", void 0);
__decorate([
    typeorm_1.OneToOne(type => StorageFile_1.StorageFile),
    typeorm_1.JoinColumn({ name: "thumbnailFileId" }),
    __metadata("design:type", StorageFile_1.StorageFile
    // -> users 
    )
], Video.prototype, "thumbnailFile", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_1.User, user => user.currentVideo),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Video.prototype, "users", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Video.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Course_1.Course, course => course.videos),
    typeorm_1.JoinColumn({ name: "courseId" }),
    __metadata("design:type", Course_1.Course)
], Video.prototype, "course", void 0);
Video = __decorate([
    typeorm_1.Entity()
], Video);
exports.Video = Video;
//# sourceMappingURL=Video.js.map