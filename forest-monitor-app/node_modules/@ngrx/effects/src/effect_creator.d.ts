import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { EffectMetadata, EffectConfig } from './models';
declare type DispatchType<T> = T extends {
    dispatch: infer U;
} ? U : unknown;
declare type ObservableReturnType<T> = T extends false ? Observable<unknown> : Observable<Action>;
/**
 * @description
 * Creates an effect from an `Observable` and an `EffectConfig`.
 *
 * @param source A function which returns an `Observable`.
 * @param config A `Partial<EffectConfig>` to configure the effect.  By default, `dispatch` is true and `resubscribeOnError` is true.
 * @returns If `EffectConfig`#`dispatch` is true, returns `Observable<Action>`.  Else, returns `Observable<unknown>`.
 *
 * @usageNotes
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
 */
export declare function createEffect<C extends EffectConfig, T extends DispatchType<C>, O extends ObservableReturnType<T>, R extends O | ((...args: any[]) => O)>(source: () => R, config?: Partial<C>): R;
export declare function getCreateEffectMetadata<T>(instance: T): EffectMetadata<T>[];
export {};
