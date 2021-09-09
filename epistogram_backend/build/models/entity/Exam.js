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
exports.Exam = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const User_1 = require("./User");
let Exam = class Exam {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Exam.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Exam.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Exam.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Exam.prototype, "thumbnailUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Exam.prototype, "orderIndex", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_1.User, user => user.currentCourse),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Exam.prototype, "users", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Exam.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Course_1.Course, course => course.exams),
    typeorm_1.JoinColumn({ name: "courseId" }),
    __metadata("design:type", Course_1.Course)
], Exam.prototype, "course", void 0);
Exam = __decorate([
    typeorm_1.Entity()
], Exam);
exports.Exam = Exam;
//# sourceMappingURL=Exam.js.map