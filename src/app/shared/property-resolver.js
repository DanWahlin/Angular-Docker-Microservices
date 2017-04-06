"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var propertyResolver = (function () {
    function propertyResolver() {
    }
    propertyResolver.resolve = function (path, obj) {
        return path.split('.').reduce(function (prev, curr) {
            return (prev ? prev[curr] : undefined);
        }, obj || self);
    };
    return propertyResolver;
}());
exports.propertyResolver = propertyResolver;
//# sourceMappingURL=property-resolver.js.map