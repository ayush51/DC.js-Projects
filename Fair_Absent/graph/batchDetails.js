
var ConstructPie = (function (e, allData) {

    
    //chart.selectAll('path').on('click', function(d) {
    var batchwiseChart = dc.pieChart("#batchpie");
    var tableData = {};
    tableData.Batch = e.data.key[0];
    tableData.STS = e.data.value.STS;
    tableData.Count = e.data.value.count;

    var filteredData = allData.filter(function (e) {

        return e.BID == tableData.Batch && e.STS != "VALID";    //e.STS==tableData.STS &&;

    })
    var crosFiltr = crossfilter(filteredData);
    var ndx = crosFiltr.dimension(function (dd) {
        return [dd.BID, dd.STS];
    });
    var grp = ndx.group().reduceCount();


    batchwiseChart
        .width(400)
        .height(250)
        .innerRadius(30)
        .dimension(ndx)
        .group(grp)
        .minAngleForLabel(0)
        .label(function (d) {
            debugger;
            return d.key[0] + ":" + " " + d.key[1] + "'s = " + d.value;
        })
        .on('renderlet', function (chart) {
            chart.selectAll('path').on('click', tableData)
            $("#txt").show();
            $("#table").show();
        })


    batchwiseChart.render();

    var tableData = function (e) {
        ConstructTable(e, allData);
    }


});
