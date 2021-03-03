import { Store, AnyAction, Reducer, Middleware, StoreEnhancer, Unsubscribe, Dispatch } from 'redux';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from './ng-redux';
import { Comparator } from './selectors';
import { ObservableStore } from './observable-store';
/** @hidden */
export declare class RootStore<RootState> extends NgRedux<RootState> {
    private ngZone;
    private _store;
    private _store$;
    constructor(ngZone: NgZone);
    configureStore: (rootReducer: Reducer<RootState, AnyAction>, initState: RootState, middleware?: Middleware<{}, any, Dispatch<AnyAction>>[], enhancers?: StoreEnhancer<RootState, {}>[]) => void;
    provideStore: (store: Store<RootState, AnyAction>) => void;
    getState: () => RootState;
    subscribe: (listener: () => void) => Unsubscribe;
    replaceReducer: (nextReducer: Reducer<RootState, AnyAction>) => void;
    dispatch: Dispatch<AnyAction>;
    select: <SelectedType>(selector?: string | number | symbol | (string | number)[] | ((s: RootState) => SelectedType) | undefined, comparator?: Comparator | undefined) => Observable<SelectedType>;
    configureSubStore: <SubState>(basePath: (string | number)[], localReducer: Reducer<SubState, AnyAction>) => ObservableStore<SubState>;
    private setStore(store);
    private storeToObservable;
}
