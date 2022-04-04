/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getCreateEffectMetadata } from './effect_creator';
import { getEffectDecoratorMetadata } from './effect_decorator';
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getEffectsMetadata(instance) {
    /** @type {?} */
    const metadata = {};
    for (const { propertyName, dispatch, resubscribeOnError, } of getSourceMetadata(instance)) {
        metadata[propertyName] = { dispatch, resubscribeOnError };
    }
    return metadata;
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getSourceMetadata(instance) {
    /** @type {?} */
    const effects = [
        getEffectDecoratorMetadata,
        getCreateEffectMetadata,
    ];
    return effects.reduce((/**
     * @param {?} sources
     * @param {?} source
     * @return {?}
     */
    (sources, source) => sources.concat(source(instance))), []);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVoRSxNQUFNLFVBQVUsa0JBQWtCLENBQUksUUFBVzs7VUFDekMsUUFBUSxHQUF1QixFQUFFO0lBRXZDLEtBQUssTUFBTSxFQUNULFlBQVksRUFDWixRQUFRLEVBQ1Isa0JBQWtCLEdBQ25CLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLENBQUM7S0FDM0Q7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUksUUFBVzs7VUFDeEMsT0FBTyxHQUFnRDtRQUMzRCwwQkFBMEI7UUFDMUIsdUJBQXVCO0tBQ3hCO0lBRUQsT0FBTyxPQUFPLENBQUMsTUFBTTs7Ozs7SUFDbkIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUNyRCxFQUFFLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZmZlY3RNZXRhZGF0YSwgRWZmZWN0c01ldGFkYXRhIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgZ2V0Q3JlYXRlRWZmZWN0TWV0YWRhdGEgfSBmcm9tICcuL2VmZmVjdF9jcmVhdG9yJztcbmltcG9ydCB7IGdldEVmZmVjdERlY29yYXRvck1ldGFkYXRhIH0gZnJvbSAnLi9lZmZlY3RfZGVjb3JhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVmZmVjdHNNZXRhZGF0YTxUPihpbnN0YW5jZTogVCk6IEVmZmVjdHNNZXRhZGF0YTxUPiB7XG4gIGNvbnN0IG1ldGFkYXRhOiBFZmZlY3RzTWV0YWRhdGE8VD4gPSB7fTtcblxuICBmb3IgKGNvbnN0IHtcbiAgICBwcm9wZXJ0eU5hbWUsXG4gICAgZGlzcGF0Y2gsXG4gICAgcmVzdWJzY3JpYmVPbkVycm9yLFxuICB9IG9mIGdldFNvdXJjZU1ldGFkYXRhKGluc3RhbmNlKSkge1xuICAgIG1ldGFkYXRhW3Byb3BlcnR5TmFtZV0gPSB7IGRpc3BhdGNoLCByZXN1YnNjcmliZU9uRXJyb3IgfTtcbiAgfVxuXG4gIHJldHVybiBtZXRhZGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZU1ldGFkYXRhPFQ+KGluc3RhbmNlOiBUKTogRWZmZWN0TWV0YWRhdGE8VD5bXSB7XG4gIGNvbnN0IGVmZmVjdHM6IEFycmF5PChpbnN0YW5jZTogVCkgPT4gRWZmZWN0TWV0YWRhdGE8VD5bXT4gPSBbXG4gICAgZ2V0RWZmZWN0RGVjb3JhdG9yTWV0YWRhdGEsXG4gICAgZ2V0Q3JlYXRlRWZmZWN0TWV0YWRhdGEsXG4gIF07XG5cbiAgcmV0dXJuIGVmZmVjdHMucmVkdWNlPEVmZmVjdE1ldGFkYXRhPFQ+W10+KFxuICAgIChzb3VyY2VzLCBzb3VyY2UpID0+IHNvdXJjZXMuY29uY2F0KHNvdXJjZShpbnN0YW5jZSkpLFxuICAgIFtdXG4gICk7XG59XG4iXX0=