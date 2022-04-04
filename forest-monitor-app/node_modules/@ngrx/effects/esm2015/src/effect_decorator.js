/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { compose } from '@ngrx/store';
import { getSourceForInstance } from './utils';
/** @type {?} */
const METADATA_KEY = '__@ngrx/effects__';
/**
 * @template T
 * @param {?=} __0
 * @return {?}
 */
export function Effect({ dispatch = true, resubscribeOnError = true, } = {}) {
    return (/** @type {?} */ ((/**
     * @template K
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    function (target, propertyName) {
        // Right now both createEffect and @Effect decorator set default values.
        // Ideally that should only be done in one place that aggregates that info,
        // for example in mergeEffects().
        /** @type {?} */
        const metadata = {
            propertyName,
            dispatch,
            resubscribeOnError,
        };
        setEffectMetadataEntries(target, [metadata]);
    })));
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getEffectDecoratorMetadata(instance) {
    /** @type {?} */
    const effectsDecorators = compose(getEffectMetadataEntries, getSourceForInstance)(instance);
    return effectsDecorators;
}
/**
 * @template T
 * @param {?} sourceProto
 * @param {?} entries
 * @return {?}
 */
function setEffectMetadataEntries(sourceProto, entries) {
    /** @type {?} */
    const constructor = sourceProto.constructor;
    /** @type {?} */
    const meta = constructor.hasOwnProperty(METADATA_KEY)
        ? ((/** @type {?} */ (constructor)))[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
/**
 * @template T
 * @param {?} sourceProto
 * @return {?}
 */
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
        ? ((/** @type {?} */ (sourceProto.constructor)))[METADATA_KEY]
        : [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X2RlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0X2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7O01BRXpDLFlBQVksR0FBRyxtQkFBbUI7Ozs7OztBQUV4QyxNQUFNLFVBQVUsTUFBTSxDQUFJLEVBQ3hCLFFBQVEsR0FBRyxJQUFJLEVBQ2Ysa0JBQWtCLEdBQUcsSUFBSSxNQUNULEVBQUU7SUFDbEIsT0FBTzs7Ozs7O0lBQUEsVUFDTCxNQUFTLEVBQ1QsWUFBZTs7Ozs7Y0FLVCxRQUFRLEdBQXNCO1lBQ2xDLFlBQVk7WUFDWixRQUFRO1lBQ1Isa0JBQWtCO1NBQ25CO1FBQ0Qsd0JBQXdCLENBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDLEdBQXVELENBQUM7QUFDM0QsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN4QyxRQUFXOztVQUVMLGlCQUFpQixHQUF3QixPQUFPLENBQ3BELHdCQUF3QixFQUN4QixvQkFBb0IsQ0FDckIsQ0FBQyxRQUFRLENBQUM7SUFFWCxPQUFPLGlCQUFpQixDQUFDO0FBQzNCLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLHdCQUF3QixDQUMvQixXQUFjLEVBQ2QsT0FBNEI7O1VBRXRCLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVzs7VUFDckMsSUFBSSxHQUE2QixXQUFXLENBQUMsY0FBYyxDQUMvRCxZQUFZLENBQ2I7UUFDQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxXQUFXLEVBQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQzdELFlBQVksQ0FDYjtJQUNMLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQzs7Ozs7O0FBRUQsU0FBUyx3QkFBd0IsQ0FBSSxXQUFjO0lBQ2pELE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDLG1CQUFBLFdBQVcsQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNoRCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3RNZXRhZGF0YSwgRWZmZWN0Q29uZmlnIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgZ2V0U291cmNlRm9ySW5zdGFuY2UgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgTUVUQURBVEFfS0VZID0gJ19fQG5ncngvZWZmZWN0c19fJztcblxuZXhwb3J0IGZ1bmN0aW9uIEVmZmVjdDxUPih7XG4gIGRpc3BhdGNoID0gdHJ1ZSxcbiAgcmVzdWJzY3JpYmVPbkVycm9yID0gdHJ1ZSxcbn06IEVmZmVjdENvbmZpZyA9IHt9KTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb248SyBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oXG4gICAgdGFyZ2V0OiBULFxuICAgIHByb3BlcnR5TmFtZTogS1xuICApIHtcbiAgICAvLyBSaWdodCBub3cgYm90aCBjcmVhdGVFZmZlY3QgYW5kIEBFZmZlY3QgZGVjb3JhdG9yIHNldCBkZWZhdWx0IHZhbHVlcy5cbiAgICAvLyBJZGVhbGx5IHRoYXQgc2hvdWxkIG9ubHkgYmUgZG9uZSBpbiBvbmUgcGxhY2UgdGhhdCBhZ2dyZWdhdGVzIHRoYXQgaW5mbyxcbiAgICAvLyBmb3IgZXhhbXBsZSBpbiBtZXJnZUVmZmVjdHMoKS5cbiAgICBjb25zdCBtZXRhZGF0YTogRWZmZWN0TWV0YWRhdGE8VD4gPSB7XG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkaXNwYXRjaCxcbiAgICAgIHJlc3Vic2NyaWJlT25FcnJvcixcbiAgICB9O1xuICAgIHNldEVmZmVjdE1ldGFkYXRhRW50cmllczxUPih0YXJnZXQsIFttZXRhZGF0YV0pO1xuICB9IGFzICh0YXJnZXQ6IHt9LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHN5bWJvbCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVmZmVjdERlY29yYXRvck1ldGFkYXRhPFQ+KFxuICBpbnN0YW5jZTogVFxuKTogRWZmZWN0TWV0YWRhdGE8VD5bXSB7XG4gIGNvbnN0IGVmZmVjdHNEZWNvcmF0b3JzOiBFZmZlY3RNZXRhZGF0YTxUPltdID0gY29tcG9zZShcbiAgICBnZXRFZmZlY3RNZXRhZGF0YUVudHJpZXMsXG4gICAgZ2V0U291cmNlRm9ySW5zdGFuY2VcbiAgKShpbnN0YW5jZSk7XG5cbiAgcmV0dXJuIGVmZmVjdHNEZWNvcmF0b3JzO1xufVxuXG5mdW5jdGlvbiBzZXRFZmZlY3RNZXRhZGF0YUVudHJpZXM8VD4oXG4gIHNvdXJjZVByb3RvOiBULFxuICBlbnRyaWVzOiBFZmZlY3RNZXRhZGF0YTxUPltdXG4pIHtcbiAgY29uc3QgY29uc3RydWN0b3IgPSBzb3VyY2VQcm90by5jb25zdHJ1Y3RvcjtcbiAgY29uc3QgbWV0YTogQXJyYXk8RWZmZWN0TWV0YWRhdGE8VD4+ID0gY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoXG4gICAgTUVUQURBVEFfS0VZXG4gIClcbiAgICA/IChjb25zdHJ1Y3RvciBhcyBhbnkpW01FVEFEQVRBX0tFWV1cbiAgICA6IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgTUVUQURBVEFfS0VZLCB7IHZhbHVlOiBbXSB9KVtcbiAgICAgICAgTUVUQURBVEFfS0VZXG4gICAgICBdO1xuICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShtZXRhLCBlbnRyaWVzKTtcbn1cblxuZnVuY3Rpb24gZ2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzPFQ+KHNvdXJjZVByb3RvOiBUKTogRWZmZWN0TWV0YWRhdGE8VD5bXSB7XG4gIHJldHVybiBzb3VyY2VQcm90by5jb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShNRVRBREFUQV9LRVkpXG4gICAgPyAoc291cmNlUHJvdG8uY29uc3RydWN0b3IgYXMgYW55KVtNRVRBREFUQV9LRVldXG4gICAgOiBbXTtcbn1cbiJdfQ==