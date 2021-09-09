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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const Exam_1 = require("./Exam");
const User_1 = require("./User");
const Video_1 = require("./Video");
const Organization_1 = require("./Organization");
let Course = class Course {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "category", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "courseGroup", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "permissionLevel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "colorOne", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "colorTwo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Course.prototype, "organizationId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Organization_1.Organization, organization => organization.courses),
    typeorm_1.JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization_1.Organization)
], Course.prototype, "organization", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_1.User, user => user.currentCourse),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Course.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(type => Video_1.Video, video => video.course, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Course.prototype, "videos", void 0);
__decorate([
    typeorm_1.OneToMany(type => Exam_1.Exam, exam => exam.course, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Course.prototype, "exams", void 0);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;
//# sourceMappingURL=Course.js.map