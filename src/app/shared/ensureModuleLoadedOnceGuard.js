"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnsureModuleLoadedOnceGuard = (function () {
    function EnsureModuleLoadedOnceGuard(targetModule) {
        if (targetModule) {
            throw new Error(targetModule.constructor.name + " has already been loaded. Import this module in the AppModule only.");
        }
    }
    return EnsureModuleLoadedOnceGuard;
}());
exports.EnsureModuleLoadedOnceGuard = EnsureModuleLoadedOnceGuard;
//# sourceMappingURL=ensureModuleLoadedOnceGuard.js.map