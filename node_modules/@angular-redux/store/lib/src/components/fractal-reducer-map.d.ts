import { AnyAction, Reducer } from 'redux';
import { PathSelector } from './selectors';
/**
 * @param rootReducer Call this on your root reducer to enable SubStore
 * functionality for pre-configured stores (e.g. using NgRedux.provideStore()).
 * NgRedux.configureStore
 * does it for you under the hood.
 */
export declare function enableFractalReducers(rootReducer: Reducer<any, AnyAction>): Reducer<any, AnyAction>;
/** @hidden */
export declare function registerFractalReducer(basePath: PathSelector, localReducer: Reducer<any, AnyAction>): void;
/** @hidden */
export declare function replaceLocalReducer(basePath: PathSelector, nextLocalReducer: Reducer<any, AnyAction>): void;
