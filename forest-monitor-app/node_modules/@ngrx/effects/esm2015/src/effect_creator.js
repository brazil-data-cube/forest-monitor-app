/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CREATE_EFFECT_METADATA_KEY = '__@ngrx/effects_create__';
/**
 * \@description
 * Creates an effect from an `Observable` and an `EffectConfig`.
 *
 * \@usageNotes
 *
 * ** Mapping to a different action **
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(FeatureActions.actionOne),
 *     map(() => FeatureActions.actionTwo())
 *   )
 * );
 * ```
 *
 *  ** Non-dispatching effects **
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(FeatureActions.actionOne),
 *     tap(() => console.log('Action One Dispatched'))
 *   ),
 *   { dispatch: false }
 *   // FeatureActions.actionOne is not dispatched
 * );
 * ```
 * @template C, T, O, R
 * @param {?} source A function which returns an `Observable`.
 * @param {?=} config A `Partial<EffectConfig>` to configure the effect.  By default, `dispatch` is true and `resubscribeOnError` is true.
 * @return {?} If `EffectConfig`#`dispatch` is true, returns `Observable<Action>`.  Else, returns `Observable<unknown>`.
 *
 */
export function createEffect(source, config) {
    /** @type {?} */
    const effect = source();
    // Right now both createEffect and @Effect decorator set default values.
    // Ideally that should only be done in one place that aggregates that info,
    // for example in mergeEffects().
    /** @type {?} */
    const value = Object.assign({ dispatch: true, resubscribeOnError: true }, config);
    Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
        value,
    });
    return effect;
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getCreateEffectMetadata(instance) {
    /** @type {?} */
    const propertyNames = (/** @type {?} */ (Object.getOwnPropertyNames(instance)));
    /** @type {?} */
    const metadata = propertyNames
        .filter((/**
     * @param {?} propertyName
     * @return {?}
     */
    propertyName => instance[propertyName] &&
        instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY)))
        .map((/**
     * @param {?} propertyName
     * @return {?}
     */
    propertyName => {
        /** @type {?} */
        const metaData = ((/** @type {?} */ (instance[propertyName])))[CREATE_EFFECT_METADATA_KEY];
        return Object.assign({ propertyName }, metaData);
    }));
    return metadata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O01BSU0sMEJBQTBCLEdBQUcsMEJBQTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0M3RCxNQUFNLFVBQVUsWUFBWSxDQUsxQixNQUFlLEVBQUUsTUFBbUI7O1VBQzlCLE1BQU0sR0FBRyxNQUFNLEVBQUU7Ozs7O1VBSWpCLEtBQUssbUJBQ1QsUUFBUSxFQUFFLElBQUksRUFDZCxrQkFBa0IsRUFBRSxJQUFJLElBQ3JCLE1BQU0sQ0FDVjtJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFO1FBQ3hELEtBQUs7S0FDTixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQUksUUFBVzs7VUFDOUMsYUFBYSxHQUFHLG1CQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFHdkQ7O1VBRUcsUUFBUSxHQUF3QixhQUFhO1NBQ2hELE1BQU07Ozs7SUFDTCxZQUFZLENBQUMsRUFBRSxDQUNiLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDdEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwRTtTQUNBLEdBQUc7Ozs7SUFBQyxZQUFZLENBQUMsRUFBRTs7Y0FDWixRQUFRLEdBQUcsQ0FBQyxtQkFBQSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQU8sQ0FBQyxDQUM5QywwQkFBMEIsQ0FDM0I7UUFDRCx1QkFDRSxZQUFZLElBQ1QsUUFBUSxFQUNYO0lBQ0osQ0FBQyxFQUFDO0lBRUosT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdE1ldGFkYXRhLCBFZmZlY3RDb25maWcgfSBmcm9tICcuL21vZGVscyc7XG5cbmNvbnN0IENSRUFURV9FRkZFQ1RfTUVUQURBVEFfS0VZID0gJ19fQG5ncngvZWZmZWN0c19jcmVhdGVfXyc7XG5cbnR5cGUgRGlzcGF0Y2hUeXBlPFQ+ID0gVCBleHRlbmRzIHsgZGlzcGF0Y2g6IGluZmVyIFUgfSA/IFUgOiB1bmtub3duO1xudHlwZSBPYnNlcnZhYmxlUmV0dXJuVHlwZTxUPiA9IFQgZXh0ZW5kcyBmYWxzZVxuICA/IE9ic2VydmFibGU8dW5rbm93bj5cbiAgOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhbiBlZmZlY3QgZnJvbSBhbiBgT2JzZXJ2YWJsZWAgYW5kIGFuIGBFZmZlY3RDb25maWdgLlxuICpcbiAqIEBwYXJhbSBzb3VyY2UgQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIGBPYnNlcnZhYmxlYC5cbiAqIEBwYXJhbSBjb25maWcgQSBgUGFydGlhbDxFZmZlY3RDb25maWc+YCB0byBjb25maWd1cmUgdGhlIGVmZmVjdC4gIEJ5IGRlZmF1bHQsIGBkaXNwYXRjaGAgaXMgdHJ1ZSBhbmQgYHJlc3Vic2NyaWJlT25FcnJvcmAgaXMgdHJ1ZS5cbiAqIEByZXR1cm5zIElmIGBFZmZlY3RDb25maWdgI2BkaXNwYXRjaGAgaXMgdHJ1ZSwgcmV0dXJucyBgT2JzZXJ2YWJsZTxBY3Rpb24+YC4gIEVsc2UsIHJldHVybnMgYE9ic2VydmFibGU8dW5rbm93bj5gLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogKiogTWFwcGluZyB0byBhIGRpZmZlcmVudCBhY3Rpb24gKipcbiAqIGBgYHRzXG4gKiBlZmZlY3ROYW1lJCA9IGNyZWF0ZUVmZmVjdChcbiAqICAgKCkgPT4gdGhpcy5hY3Rpb25zJC5waXBlKFxuICogICAgIG9mVHlwZShGZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUpLFxuICogICAgIG1hcCgoKSA9PiBGZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28oKSlcbiAqICAgKVxuICogKTtcbiAqIGBgYFxuICpcbiAqICAqKiBOb24tZGlzcGF0Y2hpbmcgZWZmZWN0cyAqKlxuICogYGBgdHNcbiAqIGVmZmVjdE5hbWUkID0gY3JlYXRlRWZmZWN0KFxuICogICAoKSA9PiB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gKiAgICAgb2ZUeXBlKEZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSksXG4gKiAgICAgdGFwKCgpID0+IGNvbnNvbGUubG9nKCdBY3Rpb24gT25lIERpc3BhdGNoZWQnKSlcbiAqICAgKSxcbiAqICAgeyBkaXNwYXRjaDogZmFsc2UgfVxuICogICAvLyBGZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUgaXMgbm90IGRpc3BhdGNoZWRcbiAqICk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVmZmVjdDxcbiAgQyBleHRlbmRzIEVmZmVjdENvbmZpZyxcbiAgVCBleHRlbmRzIERpc3BhdGNoVHlwZTxDPixcbiAgTyBleHRlbmRzIE9ic2VydmFibGVSZXR1cm5UeXBlPFQ+LFxuICBSIGV4dGVuZHMgTyB8ICgoLi4uYXJnczogYW55W10pID0+IE8pXG4+KHNvdXJjZTogKCkgPT4gUiwgY29uZmlnPzogUGFydGlhbDxDPik6IFIge1xuICBjb25zdCBlZmZlY3QgPSBzb3VyY2UoKTtcbiAgLy8gUmlnaHQgbm93IGJvdGggY3JlYXRlRWZmZWN0IGFuZCBARWZmZWN0IGRlY29yYXRvciBzZXQgZGVmYXVsdCB2YWx1ZXMuXG4gIC8vIElkZWFsbHkgdGhhdCBzaG91bGQgb25seSBiZSBkb25lIGluIG9uZSBwbGFjZSB0aGF0IGFnZ3JlZ2F0ZXMgdGhhdCBpbmZvLFxuICAvLyBmb3IgZXhhbXBsZSBpbiBtZXJnZUVmZmVjdHMoKS5cbiAgY29uc3QgdmFsdWU6IEVmZmVjdENvbmZpZyA9IHtcbiAgICBkaXNwYXRjaDogdHJ1ZSxcbiAgICByZXN1YnNjcmliZU9uRXJyb3I6IHRydWUsXG4gICAgLi4uY29uZmlnLCAvLyBPdmVycmlkZXMgYW55IGRlZmF1bHRzIGlmIHZhbHVlcyBhcmUgcHJvdmlkZWRcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVmZmVjdCwgQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVksIHtcbiAgICB2YWx1ZSxcbiAgfSk7XG4gIHJldHVybiBlZmZlY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDcmVhdGVFZmZlY3RNZXRhZGF0YTxUPihpbnN0YW5jZTogVCk6IEVmZmVjdE1ldGFkYXRhPFQ+W10ge1xuICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpIGFzIEV4dHJhY3Q8XG4gICAga2V5b2YgVCxcbiAgICBzdHJpbmdcbiAgPltdO1xuXG4gIGNvbnN0IG1ldGFkYXRhOiBFZmZlY3RNZXRhZGF0YTxUPltdID0gcHJvcGVydHlOYW1lc1xuICAgIC5maWx0ZXIoXG4gICAgICBwcm9wZXJ0eU5hbWUgPT5cbiAgICAgICAgaW5zdGFuY2VbcHJvcGVydHlOYW1lXSAmJlxuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdLmhhc093blByb3BlcnR5KENSRUFURV9FRkZFQ1RfTUVUQURBVEFfS0VZKVxuICAgIClcbiAgICAubWFwKHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICBjb25zdCBtZXRhRGF0YSA9IChpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdIGFzIGFueSlbXG4gICAgICAgIENSRUFURV9FRkZFQ1RfTUVUQURBVEFfS0VZXG4gICAgICBdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAuLi5tZXRhRGF0YSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuIl19