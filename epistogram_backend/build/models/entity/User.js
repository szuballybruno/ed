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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const Exam_1 = require("./Exam");
const Organization_1 = require("./Organization");
const QuestionAnswer_1 = require("./QuestionAnswer");
const StorageFile_1 = require("./StorageFile");
const Task_1 = require("./Task");
const Video_1 = require("./Video");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "timeOfAdd", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "isInvitedOnly", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "invitationToken", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userDescription", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "linkedInUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "jobTitle", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "avatarFileId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => StorageFile_1.StorageFile, sf => sf.users),
    typeorm_1.JoinColumn({ name: 'avatarFileId' }),
    __metadata("design:type", StorageFile_1.StorageFile
    // Organization 
    )
], User.prototype, "avatarFile", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "organizationId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Organization_1.Organization, organization => organization.users),
    typeorm_1.JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization_1.Organization
    // Current course
    )
], User.prototype, "organization", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "currentCourseId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_1.Course, course => course.users),
    typeorm_1.JoinColumn({ name: 'currentCourseId' }),
    __metadata("design:type", Course_1.Course
    // Current video
    )
], User.prototype, "currentCourse", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "currentVideoId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Video_1.Video, video => video.users),
    typeorm_1.JoinColumn({ name: 'currentVideoId' }),
    __metadata("design:type", Video_1.Video
    // Current exam
    )
], User.prototype, "currentVideo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "currentExamId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Exam_1.Exam, exam => exam.users),
    typeorm_1.JoinColumn({ name: 'currentExamId' }),
    __metadata("design:type", Exam_1.Exam
    // Tasks
    )
], User.prototype, "currentExam", void 0);
__decorate([
    typeorm_1.OneToMany(() => Task_1.Task, task => task.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    typeorm_1.OneToMany(() => QuestionAnswer_1.QuestionAnswer, qa => qa.answer),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], User.prototype, "questionAnswers", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map