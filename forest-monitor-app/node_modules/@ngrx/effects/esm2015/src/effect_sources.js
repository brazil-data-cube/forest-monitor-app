/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { dematerialize, exhaustMap, filter, groupBy, map, mergeMap, } from 'rxjs/operators';
import { reportInvalidActions, } from './effect_notification';
import { mergeEffects } from './effects_resolver';
import { onIdentifyEffectsKey, onRunEffectsKey, onInitEffects, } from './lifecycle_hooks';
import { getSourceForInstance } from './utils';
export class EffectSources extends Subject {
    /**
     * @param {?} errorHandler
     * @param {?} store
     */
    constructor(errorHandler, store) {
        super();
        this.errorHandler = errorHandler;
        this.store = store;
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.next(effectSourceInstance);
        if (onInitEffects in effectSourceInstance &&
            typeof effectSourceInstance[onInitEffects] === 'function') {
            this.store.dispatch(effectSourceInstance[onInitEffects]());
        }
    }
    /**
     * \@internal
     * @return {?}
     */
    toActions() {
        return this.pipe(groupBy(getSourceForInstance), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        source$ => source$.pipe(groupBy(effectsInstance)))), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        source$ => source$.pipe(exhaustMap(resolveEffectSource(this.errorHandler)), map((/**
         * @param {?} output
         * @return {?}
         */
        output => {
            reportInvalidActions(output, this.errorHandler);
            return output.notification;
        })), filter((/**
         * @param {?} notification
         * @return {?}
         */
        (notification) => notification.kind === 'N')), dematerialize()))));
    }
}
EffectSources.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EffectSources.ctorParameters = () => [
    { type: ErrorHandler },
    { type: Store }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.errorHandler;
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.store;
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function effectsInstance(sourceInstance) {
    if (onIdentifyEffectsKey in sourceInstance &&
        typeof sourceInstance[onIdentifyEffectsKey] === 'function') {
        return sourceInstance[onIdentifyEffectsKey]();
    }
    return '';
}
/**
 * @param {?} errorHandler
 * @return {?}
 */
function resolveEffectSource(errorHandler) {
    return (/**
     * @param {?} sourceInstance
     * @return {?}
     */
    sourceInstance => {
        /** @type {?} */
        const mergedEffects$ = mergeEffects(sourceInstance, errorHandler);
        if (isOnRunEffects(sourceInstance)) {
            return sourceInstance.ngrxOnRunEffects(mergedEffects$);
        }
        return mergedEffects$;
    });
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function isOnRunEffects(sourceInstance) {
    /** @type {?} */
    const source = getSourceForInstance(sourceInstance);
    return (onRunEffectsKey in source && typeof source[onRunEffectsKey] === 'function');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X3NvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQVUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBNEIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFDTCxhQUFhLEVBQ2IsVUFBVSxFQUNWLE1BQU0sRUFDTixPQUFPLEVBQ1AsR0FBRyxFQUNILFFBQVEsR0FDVCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFDTCxvQkFBb0IsR0FFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixlQUFlLEVBR2YsYUFBYSxHQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRy9DLE1BQU0sT0FBTyxhQUFjLFNBQVEsT0FBWTs7Ozs7SUFDN0MsWUFBb0IsWUFBMEIsRUFBVSxLQUFpQjtRQUN2RSxLQUFLLEVBQUUsQ0FBQztRQURVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUV6RSxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxvQkFBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWhDLElBQ0UsYUFBYSxJQUFJLG9CQUFvQjtZQUNyQyxPQUFPLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxLQUFLLFVBQVUsRUFDekQ7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDOzs7OztJQUtELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQ2QsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQzdCLFFBQVE7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUMsRUFDM0QsUUFBUTs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQ1YsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUNsRCxHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDWCxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDLEVBQUMsRUFDRixNQUFNOzs7O1FBQ0osQ0FBQyxZQUFZLEVBQXdDLEVBQUUsQ0FDckQsWUFBWSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQzVCLEVBQ0QsYUFBYSxFQUFFLENBQ2hCLEVBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBdkNGLFVBQVU7Ozs7WUExQkYsWUFBWTtZQUNKLEtBQUs7Ozs7Ozs7SUEyQlIscUNBQWtDOzs7OztJQUFFLDhCQUF5Qjs7Ozs7O0FBd0MzRSxTQUFTLGVBQWUsQ0FBQyxjQUFtQjtJQUMxQyxJQUNFLG9CQUFvQixJQUFJLGNBQWM7UUFDdEMsT0FBTyxjQUFjLENBQUMsb0JBQW9CLENBQUMsS0FBSyxVQUFVLEVBQzFEO1FBQ0EsT0FBTyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDO0tBQy9DO0lBRUQsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7OztBQUVELFNBQVMsbUJBQW1CLENBQzFCLFlBQTBCO0lBRTFCOzs7O0lBQU8sY0FBYyxDQUFDLEVBQUU7O2NBQ2hCLGNBQWMsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQztRQUVqRSxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNsQyxPQUFPLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN4RDtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsY0FFdkI7O1VBQ08sTUFBTSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztJQUVuRCxPQUFPLENBQ0wsZUFBZSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxVQUFVLENBQzNFLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24sIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZW1hdGVyaWFsaXplLFxuICBleGhhdXN0TWFwLFxuICBmaWx0ZXIsXG4gIGdyb3VwQnksXG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgcmVwb3J0SW52YWxpZEFjdGlvbnMsXG4gIEVmZmVjdE5vdGlmaWNhdGlvbixcbn0gZnJvbSAnLi9lZmZlY3Rfbm90aWZpY2F0aW9uJztcbmltcG9ydCB7IG1lcmdlRWZmZWN0cyB9IGZyb20gJy4vZWZmZWN0c19yZXNvbHZlcic7XG5pbXBvcnQge1xuICBvbklkZW50aWZ5RWZmZWN0c0tleSxcbiAgb25SdW5FZmZlY3RzS2V5LFxuICBvblJ1bkVmZmVjdHNGbixcbiAgT25SdW5FZmZlY3RzLFxuICBvbkluaXRFZmZlY3RzLFxufSBmcm9tICcuL2xpZmVjeWNsZV9ob29rcyc7XG5pbXBvcnQgeyBnZXRTb3VyY2VGb3JJbnN0YW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWZmZWN0U291cmNlcyBleHRlbmRzIFN1YmplY3Q8YW55PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gICAgdGhpcy5uZXh0KGVmZmVjdFNvdXJjZUluc3RhbmNlKTtcblxuICAgIGlmIChcbiAgICAgIG9uSW5pdEVmZmVjdHMgaW4gZWZmZWN0U291cmNlSW5zdGFuY2UgJiZcbiAgICAgIHR5cGVvZiBlZmZlY3RTb3VyY2VJbnN0YW5jZVtvbkluaXRFZmZlY3RzXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChlZmZlY3RTb3VyY2VJbnN0YW5jZVtvbkluaXRFZmZlY3RzXSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB0b0FjdGlvbnMoKTogT2JzZXJ2YWJsZTxBY3Rpb24+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlKFxuICAgICAgZ3JvdXBCeShnZXRTb3VyY2VGb3JJbnN0YW5jZSksXG4gICAgICBtZXJnZU1hcChzb3VyY2UkID0+IHNvdXJjZSQucGlwZShncm91cEJ5KGVmZmVjdHNJbnN0YW5jZSkpKSxcbiAgICAgIG1lcmdlTWFwKHNvdXJjZSQgPT5cbiAgICAgICAgc291cmNlJC5waXBlKFxuICAgICAgICAgIGV4aGF1c3RNYXAocmVzb2x2ZUVmZmVjdFNvdXJjZSh0aGlzLmVycm9ySGFuZGxlcikpLFxuICAgICAgICAgIG1hcChvdXRwdXQgPT4ge1xuICAgICAgICAgICAgcmVwb3J0SW52YWxpZEFjdGlvbnMob3V0cHV0LCB0aGlzLmVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0Lm5vdGlmaWNhdGlvbjtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAobm90aWZpY2F0aW9uKTogbm90aWZpY2F0aW9uIGlzIE5vdGlmaWNhdGlvbjxBY3Rpb24+ID0+XG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5raW5kID09PSAnTidcbiAgICAgICAgICApLFxuICAgICAgICAgIGRlbWF0ZXJpYWxpemUoKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlZmZlY3RzSW5zdGFuY2Uoc291cmNlSW5zdGFuY2U6IGFueSkge1xuICBpZiAoXG4gICAgb25JZGVudGlmeUVmZmVjdHNLZXkgaW4gc291cmNlSW5zdGFuY2UgJiZcbiAgICB0eXBlb2Ygc291cmNlSW5zdGFuY2Vbb25JZGVudGlmeUVmZmVjdHNLZXldID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHJldHVybiBzb3VyY2VJbnN0YW5jZVtvbklkZW50aWZ5RWZmZWN0c0tleV0oKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdFNvdXJjZShcbiAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbik6IChzb3VyY2VJbnN0YW5jZTogYW55KSA9PiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4ge1xuICByZXR1cm4gc291cmNlSW5zdGFuY2UgPT4ge1xuICAgIGNvbnN0IG1lcmdlZEVmZmVjdHMkID0gbWVyZ2VFZmZlY3RzKHNvdXJjZUluc3RhbmNlLCBlcnJvckhhbmRsZXIpO1xuXG4gICAgaWYgKGlzT25SdW5FZmZlY3RzKHNvdXJjZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZUluc3RhbmNlLm5ncnhPblJ1bkVmZmVjdHMobWVyZ2VkRWZmZWN0cyQpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZWRFZmZlY3RzJDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNPblJ1bkVmZmVjdHMoc291cmNlSW5zdGFuY2U6IHtcbiAgW29uUnVuRWZmZWN0c0tleV0/OiBvblJ1bkVmZmVjdHNGbjtcbn0pOiBzb3VyY2VJbnN0YW5jZSBpcyBPblJ1bkVmZmVjdHMge1xuICBjb25zdCBzb3VyY2UgPSBnZXRTb3VyY2VGb3JJbnN0YW5jZShzb3VyY2VJbnN0YW5jZSk7XG5cbiAgcmV0dXJuIChcbiAgICBvblJ1bkVmZmVjdHNLZXkgaW4gc291cmNlICYmIHR5cGVvZiBzb3VyY2Vbb25SdW5FZmZlY3RzS2V5XSA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuIl19