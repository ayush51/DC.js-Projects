var DistributionOfLeakage = (function (pieChart2, mycrossfilter, data) {
    // function convertmonthToLetter(key) {
    //     switch (+key) {

    //         case 01:
    //             return "Jan"
    //             break;
    //         case 02:
    //             return "Feb"
    //             break;
    //         case 03:
    //             return "Mar"
    //             break;
    //         case 04:
    //             return "Apr"
    //             break;
    //         case 05:
    //             return "May"
    //             break;
    //         case 06:
    //             return "Jun"
    //             break;
    //         case 07:
    //             return "Jul"
    //             break;
    //         case 08:
    //             return "Aug"
    //             break;
    //         case 09:
    //             return "Sep"
    //             break;
    //         case 10:
    //             return "Oct"
    //             break;
    //         case 11:
    //             return "Nov"
    //             break;
    //         case 12:
    //             return "Dec"
    //             break;
    //         default:
    //             break;
    //     }
    // }

    
    var batchwisedim = mycrossfilter.dimension(function (d) {
        return [d.BID];//,d.Mnth];
    });

    var batchwisegrp = batchwisedim.group().reduce(function (p, v) {
        //debugger;
        ++p.count;
        p.Status = v.Status;
       // p.month=v.Mnth;
        p.faultyPercent = p.count ? (v.TLB / v.BTC) * 100 : 0;
        return p;
    },
        function (p, v) {
            --p.count;
           // p.month=v.Mnth;
            p.Status = v.Status;
            p.faultyPercent = p.count ? (v.TLB / v.BTC) * 100 : 0;
            return p;
        },
        function () {
            return {
                count: 0,
               // month:"",
                Status: "",
                faultyPercent: 0
            };
        })


    pieChart2
        .width(400)
        .height(250)
        .title(function (d) { return [d.BID]; })
        .innerRadius(35)
        .valueAccessor(function (x) {
            return x.value.faultyPercent;
        })
        .dimension(batchwisedim)
        .group(batchwisegrp)
        .minAngleForLabel(0)
        .drawPaths(true)
        .label(function (d) {
            return d.key[0] + ":" + " " + Math.floor(d.value.faultyPercent) + "%";
        })
        .on('renderlet', function (chart) {
            chart.selectAll('path').on('click', batchwisePie)
            //chart.selectAll('path').on('click', tableData)
           
         })

    var batchwisePie = function (e) {
        ConstructPie(e, data);
    }


});

