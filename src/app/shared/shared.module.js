"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var pagination_component_1 = require("./pagination/pagination.component");
var capitalize_pipe_1 = require("./pipes/capitalize.pipe");
var trim_pipe_1 = require("./pipes/trim.pipe");
var filter_textbox_component_1 = require("./filter-textbox/filter-textbox.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe, filter_textbox_component_1.FilterTextboxComponent, pagination_component_1.PaginationComponent],
        exports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe, filter_textbox_component_1.FilterTextboxComponent, pagination_component_1.PaginationComponent]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map