"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var property_resolver_1 = require("../shared/property-resolver");
var DataFilterService = (function () {
    function DataFilterService() {
    }
    DataFilterService.prototype.filter = function (datasource, filterProperties, filterData) {
        if (datasource && filterProperties && filterData) {
            filterData = filterData.toUpperCase();
            var filtered = datasource.filter(function (item) {
                var match = false;
                for (var _i = 0, filterProperties_1 = filterProperties; _i < filterProperties_1.length; _i++) {
                    var prop = filterProperties_1[_i];
                    var propVal = '';
                    //Account for nested properties like 'state.name'
                    if (prop.indexOf('.') > -1) {
                        propVal = property_resolver_1.propertyResolver.resolve(prop, item);
                        if (propVal) {
                            propVal = propVal.toString().toUpperCase();
                        }
                    }
                    else {
                        if (item[prop]) {
                            propVal = item[prop].toString().toUpperCase();
                        }
                    }
                    if (propVal.indexOf(filterData) > -1) {
                        match = true;
                        break;
                    }
                }
                ;
                return match;
            });
            return filtered;
        }
        else {
            return datasource;
        }
    };
    return DataFilterService;
}());
DataFilterService = __decorate([
    core_1.Injectable()
], DataFilterService);
exports.DataFilterService = DataFilterService;
//# sourceMappingURL=data-filter.service.js.map