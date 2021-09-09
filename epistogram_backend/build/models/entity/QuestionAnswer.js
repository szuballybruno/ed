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
exports.QuestionAnswer = void 0;
const typeorm_1 = require("typeorm");
const Answer_1 = require("./Answer");
const Question_1 = require("./Question");
const User_1 = require("./User");
let QuestionAnswer = class QuestionAnswer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestionAnswer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QuestionAnswer.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.questionAnswers),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], QuestionAnswer.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QuestionAnswer.prototype, "questionId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Question_1.Question, question => question.questionAnswers),
    typeorm_1.JoinColumn({ name: "questionId" }),
    __metadata("design:type", Question_1.Question)
], QuestionAnswer.prototype, "question", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QuestionAnswer.prototype, "answerId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Answer_1.Answer, answer => answer.questionAnswers),
    typeorm_1.JoinColumn({ name: "answerId" }),
    __metadata("design:type", Answer_1.Answer)
], QuestionAnswer.prototype, "answer", void 0);
QuestionAnswer = __decorate([
    typeorm_1.Entity()
], QuestionAnswer);
exports.QuestionAnswer = QuestionAnswer;
//# sourceMappingURL=QuestionAnswer.js.map