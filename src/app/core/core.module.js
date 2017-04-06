"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("./data.service");
var data_filter_service_1 = require("./data-filter.service");
var sorter_1 = require("./sorter");
var trackby_service_1 = require("./trackby.service");
var ensureModuleLoadedOnceGuard_1 = require("../shared/ensureModuleLoadedOnceGuard");
var CoreModule = (function (_super) {
    __extends(CoreModule, _super);
    //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    function CoreModule(parentModule) {
        return _super.call(this, parentModule) || this;
    }
    return CoreModule;
}(ensureModuleLoadedOnceGuard_1.EnsureModuleLoadedOnceGuard));
CoreModule = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule],
        providers: [
            //Default XSRF provider setup (change cookie or header name if needed): 
            //{ provide: XSRFStrategy, useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN') },
            data_service_1.DataService, data_filter_service_1.DataFilterService, sorter_1.Sorter, trackby_service_1.TrackByService
        ] // these should be singleton
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map