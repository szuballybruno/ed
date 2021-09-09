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
exports.TestChild = void 0;
const typeorm_1 = require("typeorm");
const TestParent_1 = require("./TestParent");
let TestChild = class TestChild {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TestChild.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TestChild.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => TestParent_1.TestParent, c => c.children),
    typeorm_1.JoinColumn(),
    __metadata("design:type", TestParent_1.TestParent)
], TestChild.prototype, "parent", void 0);
TestChild = __decorate([
    typeorm_1.Entity()
], TestChild);
exports.TestChild = TestChild;
//# sourceMappingURL=TestChild.js.map