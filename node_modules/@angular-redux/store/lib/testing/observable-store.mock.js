"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/** @hidden */
var MockObservableStore = /** @class */ (function () {
    function MockObservableStore() {
        var _this = this;
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = function (selector, comparator) {
            return _this.initSelectorStub(selector, comparator).subject;
        };
        this.reset = function () {
            Object.keys(_this.subStores).forEach(function (k) { return _this.subStores[k].reset(); });
            _this.selections = {};
            _this.subStores = {};
        };
        this.dispatch = function (action) { return action; };
        this.replaceReducer = function () { return null; };
        this.getState = function () { return ({}); };
        this.subscribe = function () { return function () { return null; }; };
        this.select = function (selector, comparator) {
            var stub = _this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(operators_1.distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = function (basePath, _) { return _this.initSubStore(basePath); };
        this.getSubStore = function () {
            var pathSelectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pathSelectors[_i] = arguments[_i];
            }
            var first = pathSelectors[0], rest = pathSelectors.slice(1);
            return (first
                ? (_a = _this.initSubStore(first)).getSubStore.apply(_a, rest) : _this);
            var _a;
        };
    }
    MockObservableStore.prototype.initSubStore = function (basePath) {
        var result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    };
    MockObservableStore.prototype.initSelectorStub = function (selector, comparator) {
        var key = selector ? selector.toString() : '';
        var record = this.selections[key] || {
            subject: new rxjs_1.ReplaySubject(),
            comparator: comparator,
        };
        this.selections[key] = record;
        return record;
    };
    return MockObservableStore;
}());
exports.MockObservableStore = MockObservableStore;
//# sourceMappingURL=observable-store.mock.js.map