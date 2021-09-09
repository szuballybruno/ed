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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const Question_1 = require("./Question");
const QuestionAnswer_1 = require("./QuestionAnswer");
let Answer = class Answer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Question_1.Question, question => question.answers),
    typeorm_1.JoinColumn({ name: "questionId" }),
    __metadata("design:type", Question_1.Question
    // question answers
    )
], Answer.prototype, "question", void 0);
__decorate([
    typeorm_1.OneToMany(() => QuestionAnswer_1.QuestionAnswer, qa => qa.answer),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Answer.prototype, "questionAnswers", void 0);
Answer = __decorate([
    typeorm_1.Entity()
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map