(function() {
    'use strict';

    angular
        .extend(Array.prototype, {
            first: function(){
                return this[0];
            },
            last: function(){
                return this[this.length - 1];
            },
            index: function (fn) {
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])){
                        return i;
                    }
                }
                return -1;
            },
            find: function (fn) {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])){
                        result.push(this[i]);
                    }
                }
                return result;
            },
            findOne: function (fn) {
                for (var i = 0; i < this.length; i++) {
                    if (fn.call(null, this[i])){
                        return this[i];
                    }
                }
                return null;
            },
            has: function (fn) {
                return !!this.findOne(fn);
            },
            remove: function (fn) {
                var index = this.index(fn);
                if (index > -1) {
                    this.splice(index, 1);
                }
                return this;
            },
            move: function (from, to) {
                this.splice(to, 0, this.splice(from, 1)[0]);
                return this;
            }
        });

})();