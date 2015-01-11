(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$scope'];

    function ImportController($scope) {
        var vm = this;
        vm.onChange = onChange;

        function onChange($files) {
            var f = $files[0],
                reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                xlsxworker_xfer(data, process_wb);
            };
            reader.readAsBinaryString(f);
        }

        function xlsxworker_xfer(data, cb) {
            var worker = new Worker('/js/js-xlsx/xlsxworker2.js');
            worker.onmessage = function (e) {
                switch (e.data.t) {
                    case 'ready':
                        break;
                    default:
                        var xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                        cb(JSON.parse(xx));
                        break;
                }
            };
            var val = s2ab(data);
            worker.postMessage(val[1], [val[1]]);
        }

        function process_wb(wb) {
            $scope.$apply(function () {
                var data = to_json(wb),
                    sheets = [];
                angular.forEach(data, function (sheet) {
                    sheets.push({
                        name: sheet.name,
                        rows: getStandards(sheet.rows, 0, 0)
                    });
                });
                vm.sheets = sheets;
                console.log(vm.sheets)
            });
        }

        function to_json(workbook) {
            var result = [];
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result.push({
                        name: sheetName,
                        rows: roa
                    });
                }
            });
            return result;
        }

        function ab2str(data) {
            var o = "", l = 0, w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
            return o;
        }

        function s2ab(s) {
            var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
            for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
            return [v, b];
        }

        function getStandards(array, level, start) {
            var standards = [],
                parent;
            for (var i = start, l = array.length; i < l; i++) {
                var item = array[i],
                    content = item['课标'] || '',
                    mark = content.match(/^(\*+)\s/);
                if (mark) {
                    if(mark[1].length == level + 1){
                        item['课标'] = content.replace(/^(\*+)\s/gi, '');
                        item.children = getStandards(array, mark[1].length, i + 1);
                        parent = item;
                        standards.push(parent);
                    }else{
                        break;
                    }
                }else if(!parent){
                    standards.push(item);
                }
            }
            return standards;
        }
    }
})();