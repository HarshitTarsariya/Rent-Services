"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ng_redux_1 = require("./ng-redux");
var selectors_1 = require("./selectors");
var assert_1 = require("../utils/assert");
var sub_store_1 = require("./sub-store");
var fractal_reducer_map_1 = require("./fractal-reducer-map");
/** @hidden */
var RootStore = /** @class */ (function (_super) {
    __extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this._store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert_1.assert(!_this._store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            _this.setStore(redux_1.compose.apply(null, [redux_1.applyMiddleware.apply(void 0, middleware)].concat(enhancers))(redux_1.createStore)(fractal_reducer_map_1.enableFractalReducers(rootReducer), initState));
        };
        _this.provideStore = function (store) {
            assert_1.assert(!_this._store, 'Store already configured!');
            _this.setStore(store);
        };
        _this.getState = function () { return _this._store.getState(); };
        _this.subscribe = function (listener) {
            return _this._store.subscribe(listener);
        };
        _this.replaceReducer = function (nextReducer) {
            _this._store.replaceReducer(nextReducer);
        };
        _this.dispatch = function (action) {
            assert_1.assert(!!_this._store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                'README.md#quick-start');
            if (!core_1.NgZone.isInAngularZone()) {
                return _this.ngZone.run(function () { return _this._store.dispatch(action); });
            }
            else {
                return _this._store.dispatch(action);
            }
        };
        _this.select = function (selector, comparator) {
            return _this._store$.pipe(operators_1.distinctUntilChanged(), operators_1.map(selectors_1.resolveToFunctionSelector(selector)), operators_1.distinctUntilChanged(comparator));
        };
        _this.configureSubStore = function (basePath, localReducer) {
            return new sub_store_1.SubStore(_this, basePath, localReducer);
        };
        _this.storeToObservable = function (store) {
            return new rxjs_1.Observable(function (observer) {
                observer.next(store.getState());
                var unsubscribeFromRedux = store.subscribe(function () {
                    return observer.next(store.getState());
                });
                return function () {
                    unsubscribeFromRedux();
                    observer.complete();
                };
            });
        };
        ng_redux_1.NgRedux.instance = _this;
        _this._store$ = new rxjs_1.BehaviorSubject(undefined).pipe(operators_1.filter(function (n) { return n !== undefined; }), operators_1.switchMap(function (observableStore) { return observableStore; })
        // TODO: fix this? needing to explicitly cast this is wrong
        );
        return _this;
    }
    RootStore.prototype.setStore = function (store) {
        this._store = store;
        var storeServable = this.storeToObservable(store);
        this._store$.next(storeServable);
    };
    return RootStore;
}(ng_redux_1.NgRedux));
exports.RootStore = RootStore;
//# sourceMappingURL=root-store.js.map