(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('qnUpload', qnUpload);

    qnUpload.$inject = ['QINIU', 'QiniuTokens', 'Resources'];

    function qnUpload(QINIU, QiniuTokens, Resources) {
        return qnUploadLink;

        function qnUploadLink(scope, element, attr) {

            var config = {
                    url: QINIU.upload,
                    name: 'file',
                    bucket: QINIU.buckets.static
                },
                onBegin = scope.$eval(attr.onBegin) || angular.noop,
                onProgress = scope.$eval(attr.onProgress) || angular.noop,
                onSuccess = scope.$eval(attr.onSuccess) || angular.noop,
                onCompleted = scope.$eval(attr.onCompleted) || angular.noop,
                onError = scope.$eval(attr.onError) || angular.noop;

            scope.$watch(attr.qnUpload, function (conf) {
                conf && angular.extend(config, conf);
            }, true);

            element.on('click', function () {
                var inputElement = angular.element('<input type="file" />');
                if (config.multiple) {
                    inputElement.attr('multiple', true);
                }
                if (config.accept) {
                    inputElement.attr('accept', config.accept);
                }
                inputElement.on('change', function () {
                    var self = this,
                        files = self.files,
                        total = 0,
                        loaded = 0,
                        uploaded = [],
                        count = files.length,
                        updateCount = function () {
                            !count && onCompleted.call(self, uploaded);
                        };
                    if (files.length) {
                        scope.$apply(function () {
                            onBegin.call(self, files);
                        });
                    }
                    angular.forEach(files, function (file, i) {
                        total += file.size;
                        var data = {
                            bucket: config.bucket
                        };
                        if (config.key) {
                            data.key = config.key;
                        }
                        QiniuTokens.add(data, function (result) {
                            var xhr = new XMLHttpRequest(),
                                fd = new FormData(),
                                params = {
                                    token: result.token
                                };
                            if (config.key) {
                                params.key = config.key;
                            }

                            xhr.upload.addEventListener('progress', function (evt) {
                                if (evt.lengthComputable) {
                                    scope.$apply(function () {
                                        file.loaded = evt.loaded;
                                        loaded = 0;
                                        angular.forEach(files, function (file) {
                                            loaded += file.loaded;
                                        });
                                        if (loaded > total) {
                                            loaded = total;
                                        }
                                        onProgress.call(file, {loaded: loaded || 0, total: total});
                                    });
                                }
                            }, false);

                            xhr.addEventListener('error', function () {
                                scope.$apply(function () {
                                    onError.call(file, xhr);
                                    count--;
                                    updateCount();
                                });
                            }, false);

                            xhr.addEventListener('load', function (data) {
                                if (xhr.status >= 300) {
                                    onError.call(file, xhr);
                                } else {
                                    try {
                                        data = JSON.parse(xhr.responseText);
                                        uploaded.push(data);
                                        var resource = {
                                            owner_type: config.ownerType,
                                            owner_id: config.ownerId
                                        };
                                        angular.forEach(data, function (v, n) {
                                            if(v === null){
                                                delete data[n];
                                            }else if(typeof v == 'object'){
                                                data[n] = JSON.stringify(v);
                                            }
                                        });
                                        angular.extend(resource, data);
                                        Resources.add(resource, function (result) {
                                            data.resource = result.data;
                                            onSuccess.call(file, data, xhr);
                                        });
                                    } catch (e) {
                                        onError.call(file, null, xhr);
                                    }
                                }
                                count--;
                                updateCount();
                            }, false);

                            xhr.open('POST', config.url, true);
                            xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
                            fd.append(config.name, file);
                            angular.forEach(config.headers, function (v, n) {
                                xhr.setRequestHeader(n, v);
                            });
                            angular.forEach(params, function (v, n) {
                                fd.append(n, v);
                            });
                            xhr.send(fd);
                        });
                    });
                });
                inputElement.trigger('click');
            });

        }

    }

})();