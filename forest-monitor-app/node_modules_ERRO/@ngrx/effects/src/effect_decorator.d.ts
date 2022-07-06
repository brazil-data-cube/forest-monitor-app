import { EffectMetadata, EffectConfig } from './models';
export declare function Effect<T>({ dispatch, resubscribeOnError, }?: EffectConfig): PropertyDecorator;
export declare function getEffectDecoratorMetadata<T>(instance: T): EffectMetadata<T>[];
