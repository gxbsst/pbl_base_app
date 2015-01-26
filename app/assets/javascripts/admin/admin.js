$().ready(function () {
    $('.relation-select').each(function () {
        var select = $(this),
            prev = select.prevAll('.relation-select:first'),
            next = select.nextAll('.relation-select:first'),
            path = select.attr('data-path'),
            field = select.attr('data-field') || 'name';
        if(!prev[0]){
            $.get(path, function (result) {
                select.html(_.map(result.data, function (entry) {
                    return '<option value="' + entry.id + '">' + entry[field] + '</option>';
                })).trigger('change');
            });
        }
        if(next[0]){
            select.on('change', function () {
                var id = select.val(),
                    path = next.attr('data-path'),
                    field = next.attr('data-field') || 'name';
                $.get(path.replace(/\{id\}/gi, function () {
                    return id || '';
                }), function (result) {
                    var html = _.map(result.data, function (entry) {
                            return '<option value="' + entry.id + '">' + entry[field] + '</option>';
                        }).join('') || '<option>没有任何数据</option>';
                    next.html(html).trigger('change');
                });
            });
        }
    });
});