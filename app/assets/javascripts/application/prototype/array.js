(function () {
    'use strict';

    angular
        .extend(Array.prototype, {
            first: function () {
                return this[0];
            },
            last: function () {
                return this[this.length - 1];
            },
            isFirst: function (index) {
                return index == 0;
            },
            isLast: function (index) {
                return this.length - 1 == index;
            },
            index: function (fn) {
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])) {
                        return i;
                    }
                }
                return -1;
            },
            idx: function (item) {
                for (var i = 0; i < this.length; i++) {
                    if (item === this[i]) {
                        return i;
                    }
                }
                return -1;
            },
            find: function (fn) {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])) {
                        result.push(this[i]);
                    }
                }
                return result;
            },
            findOne: function (fn) {
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])) {
                        return this[i];
                    }
                }
                return null;
            },
            has: function (fn) {
                if(typeof fn != 'function'){
                    return !!this.findOne(function (item) {
                        return fn === item;
                    });
                }
                return !!this.findOne(fn);
            },
            remove: function (fn, mark) {
                if (mark) {
                    var item = this.findOne(fn);
                    if (typeof item === 'object' && item.id) {
                        item._destroy = true;
                        return this;
                    } else {
                        return this.remove(fn);
                    }
                }
                var index = this.index(fn);
                if (index > -1) {
                    this.splice(index, 1);
                }
                return this;
            },
            removeAll: function (fn, mark) {
                var self = this,
                    remove = function () {
                        self.remove(fn, mark);
                        if(self.has(fn)){
                            remove();
                        }
                    };
                remove();
                return self;
            },
            move: function (from, to) {
                this.splice(to, 0, this.splice(from, 1)[0]);
                return this;
            }
        });

})();