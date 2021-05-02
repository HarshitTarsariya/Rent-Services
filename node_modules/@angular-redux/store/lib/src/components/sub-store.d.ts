import { AnyAction, Dispatch, Reducer } from 'redux';
import { Observable } from 'rxjs';
import { PathSelector, Comparator } from './selectors';
import { NgRedux } from './ng-redux';
import { ObservableStore } from './observable-store';
/** @hidden */
export declare class SubStore<State> implements ObservableStore<State> {
    private rootStore;
    private basePath;
    constructor(rootStore: NgRedux<any>, basePath: PathSelector, localReducer: Reducer<State, AnyAction>);
    dispatch: Dispatch<AnyAction>;
    getState: () => State;
    configureSubStore: <SubState>(basePath: (string | number)[], localReducer: Reducer<SubState, AnyAction>) => ObservableStore<SubState>;
    select: <SelectedState>(selector?: string | number | symbol | (string | number)[] | ((s: State) => SelectedState) | undefined, comparator?: Comparator | undefined) => Observable<SelectedState>;
    subscribe: (listener: () => void) => () => void;
    replaceReducer: (nextLocalReducer: Reducer<State, AnyAction>) => void;
}
