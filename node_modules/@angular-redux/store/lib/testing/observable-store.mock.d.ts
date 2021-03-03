import { Comparator, ObservableStore } from '@angular-redux/store';
import { AnyAction, Reducer, Dispatch } from 'redux';
import { Observable, Subject } from 'rxjs';
/** @hidden */
export interface SelectorStubRecord {
    subject: Subject<any>;
    comparator: Comparator;
}
/** @hidden */
export interface SelectorStubMap {
    [selector: string]: SelectorStubRecord;
}
/** @hidden */
export interface SubStoreStubMap {
    [basePath: string]: MockObservableStore<any>;
}
/** @hidden */
export declare class MockObservableStore<State> implements ObservableStore<any> {
    selections: SelectorStubMap;
    subStores: SubStoreStubMap;
    getSelectorStub: <SelectedState>(selector?: string | number | symbol | (string | number)[] | ((s: State) => SelectedState) | undefined, comparator?: Comparator | undefined) => Subject<SelectedState>;
    reset: () => void;
    dispatch: Dispatch<AnyAction>;
    replaceReducer: () => null;
    getState: () => State;
    subscribe: () => () => null;
    select: <SelectedState>(selector?: string | number | symbol | (string | number)[] | ((s: any) => SelectedState) | undefined, comparator?: Comparator | undefined) => Observable<any>;
    configureSubStore: <SubState>(basePath: (string | number)[], _: Reducer<SubState, AnyAction>) => MockObservableStore<SubState>;
    getSubStore: <SubState>(...pathSelectors: (string | number)[][]) => MockObservableStore<any>;
    private initSubStore<SubState>(basePath);
    private initSelectorStub<SelectedState>(selector?, comparator?);
}
