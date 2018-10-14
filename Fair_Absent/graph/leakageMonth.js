var TotalLeakageModule = (function(totalLeakage,mycrossfilter){
    var mydimension = mycrossfilter.dimension(function(d){
        return [d.Mnth];
    })
    var mygroup =  mydimension.group().reduce( function (p, v) {
        
        ++p.count;
        //p.month=v.Mnth;
        p.faultyPercent =p.count ? (v.TLS/v.TS) * 100 : 0;
        return p;
    },
    function (p, v) {
        --p.count;
        //p.month=v.Mnth;
        p.faultyPercent =p.count ? (v.TLS/v.TS) * 100 : 0;
        return p;
    },
    function () {
        return {
            count: 0,
            //month:"",
            faultyPercent: 0
        };
    })
    
    
    totalLeakage

    .dimension(mydimension)
    .valueAccessor(function (x) {
        return x.value.faultyPercent;
    })
    .html({
        one:"<span style=\"color:#000; font-size: 48px;\">%number  %</span>",
        some:"<span style=\"color:#000; font-size: 48px;\">%number %</span>",
        none:"<span style=\"color:#000; font-size: 48px;\">No  %</span>"
      }) 
    .group(mygroup)
    .label(function (d) {
        debugger;
        return convertmonthToLetter(d.key) +" "+Math.floor(d.value.faultyPercent) + "%"})
    .on('renderlet', function(chart) {
        chart.selectAll('rect').on('click', function(d) {
           console.log('click!', d);
           
        });
     });
});
