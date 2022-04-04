import * as tslib_1 from "tslib";
import { NgModule, Inject, Optional } from '@angular/core';
import { Store, StoreRootModule, StoreFeatureModule, } from '@ngrx/store';
import { EffectsRunner } from './effects_runner';
import { EffectSources } from './effect_sources';
import { ROOT_EFFECTS } from './tokens';
export var ROOT_EFFECTS_INIT = '@ngrx/effects/init';
var EffectsRootModule = /** @class */ (function () {
    function EffectsRootModule(sources, runner, store, rootEffects, storeRootModule, storeFeatureModule) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach(function (effectSourceInstance) {
            return sources.addEffects(effectSourceInstance);
        });
        store.dispatch({ type: ROOT_EFFECTS_INIT });
    }
    EffectsRootModule.prototype.addEffects = function (effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    };
    EffectsRootModule = tslib_1.__decorate([
        NgModule({}),
        tslib_1.__param(3, Inject(ROOT_EFFECTS)),
        tslib_1.__param(4, Optional()),
        tslib_1.__param(5, Optional()),
        tslib_1.__metadata("design:paramtypes", [EffectSources,
            EffectsRunner,
            Store, Array, StoreRootModule,
            StoreFeatureModule])
    ], EffectsRootModule);
    return EffectsRootModule;
}());
export { EffectsRootModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yb290X21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yb290X21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFFTCxLQUFLLEVBQ0wsZUFBZSxFQUNmLGtCQUFrQixHQUNuQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFeEMsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7QUFHdEQ7SUFDRSwyQkFDVSxPQUFzQixFQUM5QixNQUFxQixFQUNyQixLQUFpQixFQUNLLFdBQWtCLEVBQzVCLGVBQWdDLEVBQ2hDLGtCQUFzQztRQUwxQyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBTzlCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVmLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxvQkFBb0I7WUFDdEMsT0FBQSxPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1FBQXhDLENBQXdDLENBQ3pDLENBQUM7UUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLG9CQUF5QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFwQlUsaUJBQWlCO1FBRDdCLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFNUixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFMTSxhQUFhO1lBQ3RCLGFBQWE7WUFDZCxLQUFLLFNBRWlCLGVBQWU7WUFDWixrQkFBa0I7T0FQekMsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFN0b3JlTW9kdWxlLFxuICBTdG9yZSxcbiAgU3RvcmVSb290TW9kdWxlLFxuICBTdG9yZUZlYXR1cmVNb2R1bGUsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdHNSdW5uZXIgfSBmcm9tICcuL2VmZmVjdHNfcnVubmVyJztcbmltcG9ydCB7IEVmZmVjdFNvdXJjZXMgfSBmcm9tICcuL2VmZmVjdF9zb3VyY2VzJztcbmltcG9ydCB7IFJPT1RfRUZGRUNUUyB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFJPT1RfRUZGRUNUU19JTklUID0gJ0BuZ3J4L2VmZmVjdHMvaW5pdCc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBFZmZlY3RzUm9vdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc291cmNlczogRWZmZWN0U291cmNlcyxcbiAgICBydW5uZXI6IEVmZmVjdHNSdW5uZXIsXG4gICAgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgQEluamVjdChST09UX0VGRkVDVFMpIHJvb3RFZmZlY3RzOiBhbnlbXSxcbiAgICBAT3B0aW9uYWwoKSBzdG9yZVJvb3RNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBzdG9yZUZlYXR1cmVNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZVxuICApIHtcbiAgICBydW5uZXIuc3RhcnQoKTtcblxuICAgIHJvb3RFZmZlY3RzLmZvckVhY2goZWZmZWN0U291cmNlSW5zdGFuY2UgPT5cbiAgICAgIHNvdXJjZXMuYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZSlcbiAgICApO1xuXG4gICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBST09UX0VGRkVDVFNfSU5JVCB9KTtcbiAgfVxuXG4gIGFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2U6IGFueSkge1xuICAgIHRoaXMuc291cmNlcy5hZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlKTtcbiAgfVxufVxuIl19