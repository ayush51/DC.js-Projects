var allData = api.studata();
(function(w){

    var totalLeakage = dc.numberDisplay("#totalabsentchart");
    var distributionLeakage = dc.pieChart("#pie2");
    //var rowchart = dc.rowChart("#row");
    //var tableChart = dc.dataTable("#table");
  
   
    data = allData.filter(function (x) {
        return  x.STS == "DPOUT" || x.STS == "DEFLT" || x.STS == "VALID"    //e.STS==tableData.STS &&;
    })

    //var data = api.studata();
    var mycrossfilter = crossfilter(data);

    TotalLeakageModule(totalLeakage,mycrossfilter);
    DistributionOfLeakage(distributionLeakage,mycrossfilter,data);
    dc.renderAll();
})(window)