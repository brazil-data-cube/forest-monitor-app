/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { merge } from 'rxjs';
import { ignoreElements, map, materialize, catchError } from 'rxjs/operators';
import { getSourceMetadata } from './effects_metadata';
import { getSourceForInstance } from './utils';
/**
 * @param {?} sourceInstance
 * @param {?=} errorHandler
 * @return {?}
 */
export function mergeEffects(sourceInstance, errorHandler) {
    /** @type {?} */
    const sourceName = getSourceForInstance(sourceInstance).constructor.name;
    /** @type {?} */
    const observables$ = getSourceMetadata(sourceInstance).map((/**
     * @param {?} __0
     * @return {?}
     */
    ({ propertyName, dispatch, resubscribeOnError, }) => {
        /** @type {?} */
        const observable$ = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        /** @type {?} */
        const resubscribable$ = resubscribeOnError
            ? observable$.pipe(catchError((/**
             * @param {?} error
             * @return {?}
             */
            error => {
                if (errorHandler)
                    errorHandler.handleError(error);
                // Return observable that produces this particular effect
                return observable$;
            })))
            : observable$;
        if (dispatch === false) {
            return resubscribable$.pipe(ignoreElements());
        }
        /** @type {?} */
        const materialized$ = resubscribable$.pipe(materialize());
        return materialized$.pipe(map((/**
         * @param {?} notification
         * @return {?}
         */
        (notification) => ({
            effect: sourceInstance[propertyName],
            notification,
            propertyName,
            sourceName,
            sourceInstance,
        }))));
    }));
    return merge(...observables$);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLEtBQUssRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRy9DLE1BQU0sVUFBVSxZQUFZLENBQzFCLGNBQW1CLEVBQ25CLFlBQTJCOztVQUVyQixVQUFVLEdBQUcsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7O1VBRWxFLFlBQVksR0FBc0IsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRzs7OztJQUMzRSxDQUFDLEVBQ0MsWUFBWSxFQUNaLFFBQVEsRUFDUixrQkFBa0IsR0FDbkIsRUFBa0MsRUFBRTs7Y0FDN0IsV0FBVyxHQUNmLE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLFVBQVU7WUFDaEQsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNoQyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQzs7Y0FFNUIsZUFBZSxHQUFHLGtCQUFrQjtZQUN4QyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDZCxVQUFVOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksWUFBWTtvQkFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCx5REFBeUQ7Z0JBQ3pELE9BQU8sV0FBVyxDQUFDO1lBQ3JCLENBQUMsRUFBQyxDQUNIO1lBQ0gsQ0FBQyxDQUFDLFdBQVc7UUFFZixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDdEIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDL0M7O2NBRUssYUFBYSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUN2QixHQUFHOzs7O1FBQ0QsQ0FBQyxZQUFrQyxFQUFzQixFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLEVBQUUsY0FBYyxDQUFDLFlBQVksQ0FBQztZQUNwQyxZQUFZO1lBQ1osWUFBWTtZQUNaLFVBQVU7WUFDVixjQUFjO1NBQ2YsQ0FBQyxFQUNILENBQ0YsQ0FBQztJQUNKLENBQUMsRUFDRjtJQUVELE9BQU8sS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IG1lcmdlLCBOb3RpZmljYXRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGlnbm9yZUVsZW1lbnRzLCBtYXAsIG1hdGVyaWFsaXplLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBFZmZlY3ROb3RpZmljYXRpb24gfSBmcm9tICcuL2VmZmVjdF9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHsgZ2V0U291cmNlTWV0YWRhdGEgfSBmcm9tICcuL2VmZmVjdHNfbWV0YWRhdGEnO1xuaW1wb3J0IHsgZ2V0U291cmNlRm9ySW5zdGFuY2UgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VFZmZlY3RzKFxuICBzb3VyY2VJbnN0YW5jZTogYW55LFxuICBlcnJvckhhbmRsZXI/OiBFcnJvckhhbmRsZXJcbik6IE9ic2VydmFibGU8RWZmZWN0Tm90aWZpY2F0aW9uPiB7XG4gIGNvbnN0IHNvdXJjZU5hbWUgPSBnZXRTb3VyY2VGb3JJbnN0YW5jZShzb3VyY2VJbnN0YW5jZSkuY29uc3RydWN0b3IubmFtZTtcblxuICBjb25zdCBvYnNlcnZhYmxlcyQ6IE9ic2VydmFibGU8YW55PltdID0gZ2V0U291cmNlTWV0YWRhdGEoc291cmNlSW5zdGFuY2UpLm1hcChcbiAgICAoe1xuICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgZGlzcGF0Y2gsXG4gICAgICByZXN1YnNjcmliZU9uRXJyb3IsXG4gICAgfSk6IE9ic2VydmFibGU8RWZmZWN0Tm90aWZpY2F0aW9uPiA9PiB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlJDogT2JzZXJ2YWJsZTxhbnk+ID1cbiAgICAgICAgdHlwZW9mIHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0oKVxuICAgICAgICAgIDogc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXTtcblxuICAgICAgY29uc3QgcmVzdWJzY3JpYmFibGUkID0gcmVzdWJzY3JpYmVPbkVycm9yXG4gICAgICAgID8gb2JzZXJ2YWJsZSQucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyb3JIYW5kbGVyKSBlcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAvLyBSZXR1cm4gb2JzZXJ2YWJsZSB0aGF0IHByb2R1Y2VzIHRoaXMgcGFydGljdWxhciBlZmZlY3RcbiAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIDogb2JzZXJ2YWJsZSQ7XG5cbiAgICAgIGlmIChkaXNwYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3Vic2NyaWJhYmxlJC5waXBlKGlnbm9yZUVsZW1lbnRzKCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXRlcmlhbGl6ZWQkID0gcmVzdWJzY3JpYmFibGUkLnBpcGUobWF0ZXJpYWxpemUoKSk7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbGl6ZWQkLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAobm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb248QWN0aW9uPik6IEVmZmVjdE5vdGlmaWNhdGlvbiA9PiAoe1xuICAgICAgICAgICAgZWZmZWN0OiBzb3VyY2VJbnN0YW5jZVtwcm9wZXJ0eU5hbWVdLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uLFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgc291cmNlTmFtZSxcbiAgICAgICAgICAgIHNvdXJjZUluc3RhbmNlLFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICApO1xuXG4gIHJldHVybiBtZXJnZSguLi5vYnNlcnZhYmxlcyQpO1xufVxuIl19