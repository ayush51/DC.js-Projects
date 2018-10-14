
var ConstructTable = (function (e, data) {

    var tableChart = dc.dataTable("#table");   
    var filteredData;
    var defaultlimit = 5;
    var ofs = 0, pag = defaultlimit;
    if (e.data.key[1] == "DPOUT") {

        filteredData = data.filter(function (x) {
            return x.BID == e.data.key[0] && x.STS == e.data.key[1];    //e.STS==tableData.STS &&;
        })
    }

    if (e.data.key[1] == "DEFLT") {
        filteredData = data.filter(function (x) {

            return x.BID == e.data.key[0] && x.STS == "VALID" && x.TBD7 == "Y" || x.STS == "DEFLT" && x.BID == e.data.key[0];    //e.STS==tableData.STS &&;
        })
    }

    var tableCrossFilter = crossfilter(filteredData);
    var tableDim = tableCrossFilter.dimension(function (d) {
        return d.STS;
    });



    var tableGrp = tableDim.group().reduceCount();

    var display = function display(chart, cross) {
        var total = ofs + pag;
        var offset = (total > cross.size()) ? cross.size() : total;
        // var begincount =(total>cross.size())?ofs-1:ofs;
        d3.select('#begin')
            .text(ofs + 1);
        d3.select('#end')
            .text(offset);
        d3.select('#last')
            .attr('disabled', ofs - pag < 0 ? 'true' : null)
            .on("click", function () {
                debugger;
                last(chart, cross);
            })
        d3.select('#next')
            .attr('disabled', ofs + pag >= cross.size() ? 'true' : null)
            .on("click", function () {
                debugger;
                next(chart, cross);
            })
        d3.select('#size').text(cross.size());

        d3.select('#download')
            .on('click', function () {
                download(chart)
            })
    }

    var update = function update(tableChart, tableCrossFilter) {
        tableChart.beginSlice(ofs);
        var offset = (ofs + pag > tableCrossFilter.size()) ? tableCrossFilter.size() : ofs + pag;
        tableChart.endSlice(offset);
        display(tableChart, tableCrossFilter);
    }

    var last = function last(tableChart, cross) {
        ofs -= pag;
        update(tableChart, cross);
        tableChart.redraw();
    }

    var next = function next(tableChart, cross) {
        ofs += pag;
        update(tableChart, cross);
        tableChart.redraw();
    }


    var download = function (tableChart) {
        var data = tableDim.top(Infinity);
        data = data.sort(function (a, b) {
            return tableChart.order()(tableChart.sortBy()(a), tableChart.sortBy()(b));
        });
        data = data.map(function (d) {
            var row = {};
            tableChart.columns().forEach(function (c) {
                row[tableChart._doColumnHeaderFormat(c)] = tableChart._doColumnValueFormat(c, d);
            });
            return row;
        });
        var blob = new Blob([d3.csvFormat(data)], { type: "text/csv;charset=utf-8" });
        saveAs(blob, 'data.csv');
    }

    tableChart
        .width(700)
        .dimension(tableDim)
        .group(function (data) {
              //return [data.FNm, data.SID, data.RNo, data.STS, data.Amount, data.NPD, data.NPD];
            return [data.value];
        })
        .columns([

            {
                label: 'Status',
                format: function (d) {
                    return d.STS;
                }
            }
        ])

        .size(Infinity)
        .order(d3.ascending).on("renderlet", function () {
            $("#paging").show();
            $("#download").show();
        });

    update(tableChart, tableCrossFilter)
    tableChart.render();

})