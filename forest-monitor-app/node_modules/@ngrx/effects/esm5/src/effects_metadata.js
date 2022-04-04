import * as tslib_1 from "tslib";
import { getCreateEffectMetadata } from './effect_creator';
import { getEffectDecoratorMetadata } from './effect_decorator';
export function getEffectsMetadata(instance) {
    var e_1, _a;
    var metadata = {};
    try {
        for (var _b = tslib_1.__values(getSourceMetadata(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = _c.value, propertyName = _d.propertyName, dispatch = _d.dispatch, resubscribeOnError = _d.resubscribeOnError;
            metadata[propertyName] = { dispatch: dispatch, resubscribeOnError: resubscribeOnError };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return metadata;
}
export function getSourceMetadata(instance) {
    var effects = [
        getEffectDecoratorMetadata,
        getCreateEffectMetadata,
    ];
    return effects.reduce(function (sources, source) { return sources.concat(source(instance)); }, []);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEUsTUFBTSxVQUFVLGtCQUFrQixDQUFJLFFBQVc7O0lBQy9DLElBQU0sUUFBUSxHQUF1QixFQUFFLENBQUM7O1FBRXhDLEtBSUssSUFBQSxLQUFBLGlCQUFBLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBSnZCLElBQUEsYUFJVixFQUhDLDhCQUFZLEVBQ1osc0JBQVEsRUFDUiwwQ0FBa0I7WUFFbEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxVQUFBLEVBQUUsa0JBQWtCLG9CQUFBLEVBQUUsQ0FBQztTQUMzRDs7Ozs7Ozs7O0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxRQUFXO0lBQzlDLElBQU0sT0FBTyxHQUFnRDtRQUMzRCwwQkFBMEI7UUFDMUIsdUJBQXVCO0tBQ3hCLENBQUM7SUFFRixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ25CLFVBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSyxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLEVBQ3JELEVBQUUsQ0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVmZmVjdE1ldGFkYXRhLCBFZmZlY3RzTWV0YWRhdGEgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBnZXRDcmVhdGVFZmZlY3RNZXRhZGF0YSB9IGZyb20gJy4vZWZmZWN0X2NyZWF0b3InO1xuaW1wb3J0IHsgZ2V0RWZmZWN0RGVjb3JhdG9yTWV0YWRhdGEgfSBmcm9tICcuL2VmZmVjdF9kZWNvcmF0b3InO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0c01ldGFkYXRhPFQ+KGluc3RhbmNlOiBUKTogRWZmZWN0c01ldGFkYXRhPFQ+IHtcbiAgY29uc3QgbWV0YWRhdGE6IEVmZmVjdHNNZXRhZGF0YTxUPiA9IHt9O1xuXG4gIGZvciAoY29uc3Qge1xuICAgIHByb3BlcnR5TmFtZSxcbiAgICBkaXNwYXRjaCxcbiAgICByZXN1YnNjcmliZU9uRXJyb3IsXG4gIH0gb2YgZ2V0U291cmNlTWV0YWRhdGEoaW5zdGFuY2UpKSB7XG4gICAgbWV0YWRhdGFbcHJvcGVydHlOYW1lXSA9IHsgZGlzcGF0Y2gsIHJlc3Vic2NyaWJlT25FcnJvciB9O1xuICB9XG5cbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlTWV0YWRhdGE8VD4oaW5zdGFuY2U6IFQpOiBFZmZlY3RNZXRhZGF0YTxUPltdIHtcbiAgY29uc3QgZWZmZWN0czogQXJyYXk8KGluc3RhbmNlOiBUKSA9PiBFZmZlY3RNZXRhZGF0YTxUPltdPiA9IFtcbiAgICBnZXRFZmZlY3REZWNvcmF0b3JNZXRhZGF0YSxcbiAgICBnZXRDcmVhdGVFZmZlY3RNZXRhZGF0YSxcbiAgXTtcblxuICByZXR1cm4gZWZmZWN0cy5yZWR1Y2U8RWZmZWN0TWV0YWRhdGE8VD5bXT4oXG4gICAgKHNvdXJjZXMsIHNvdXJjZSkgPT4gc291cmNlcy5jb25jYXQoc291cmNlKGluc3RhbmNlKSksXG4gICAgW11cbiAgKTtcbn1cbiJdfQ==