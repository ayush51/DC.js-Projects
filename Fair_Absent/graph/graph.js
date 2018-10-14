// (function(){

//     var pieChart = dc.pieChart("#pie");
//     var pieChart2 = dc.pieChart("#pie2");
//     var rowchart = dc.rowChart("#row");
//     var tableChart = dc.dataTable("#table");

//     var data = api.studata();


//     var mycrossfilter = crossfilter(data);
  
//     var batchwisedim = mycrossfilter.dimension(function (d) {
//             return [Month = d.Mnth,Status = d.Status];//d.Status];
//         });
//     var batchwisegrp = batchwisedim.group().reduceCount()

//         //RowChart
//     var batchwiseRow = mycrossfilter.dimension(function (d) {
//             return [d.BID,d.Status,d.Mnth];
//         });
//     var batchwisegrpRow = batchwiseRow.group().reduceCount();

//               var batchwiseStudent = mycrossfilter.dimension(function(dd){
//                 return [dd.FNm];
//             });
//             var groupingforforBatch = batchwiseStudent.group().reduceCount();
    
   
//      pieChart2
//      .width(400)
//      .height(250)
//      .dimension(batchwisedim)
//      .group(batchwisegrp)
//      .label(function (d) {
//          debugger;
//          return convertmonthToLetter(d.key[0]) + ":" + " " + d.value + d.key[1];})
//      .on('renderlet', function(chart) {
//          chart.selectAll('rect').on('click', function(d) {
//             console.log('click!', d);
//          });
//       });

//       rowchart
//       .width(400)
//       .height(250)
//       .x(d3.scale.linear().domain([20,70]))
//       .title(function(d){return [d.batchid];})
//       .elasticX(true)
//       .dimension(batchwiseRow)
//       .group(batchwisegrpRow)
//       .label(function (d) {
//         return d.key[0] + ":" + " " + d.value + d.key[1];})
//       .on('renderlet', function(chart) {
//         chart.selectAll('rect').on('click', function(d) {
//             debugger;
//             var tableData = {};
//              tableData.Month = d.key[2];
//              tableData.Batch = d.key[0];
//              tableData.Status = d.key[1];

//             var a =data.filter(function(e){
//             return e.Status==tableData.Status && e.Mnth == tableData.Month && e.BID == tableData.Batch;
//     })
            

//             var cross = crossfilter(a);
//             var aa = cross.dimension(function(dd){
//                 return [dd.FNm];
//             });
//             var bb = aa.group().reduceCount();
//             tableChart
//             .width(700)
//             .dimension(aa)
//             .group(function (data) {
//                 return [data.FNm,data.SID,data.MOB,data.BID,data.RNo,data.Amount];
//              })
//              .columns(['Name ,', 'StudentID ,', 'Mobile ,', 'BatchID ,', 'RollNumber ,','Balance'])
//              .size(Infinity)
//              tableChart.render();
//         });
//      });


//      dc.renderAll();
  
//      function convertmonthToLetter(key) {
//         switch (+key) {
            
//             case 01:
//                 return "Jan"
//                 break;
//             case 02:
//                 return "Feb"
//                 break;
//             case 03:
//                 return "Mar"
//                 break;
//             case 04:
//                 return "Apr"
//                 break;
//             case 05:
//                 return "May"
//                 break;
//             case 06:
//                 return "Jun"
//                 break;
//             case 07:
//                 return "Jul"
//                 break;
//             case 08:
//                 return "Aug"
//                 break;
//             case 09:
//                 return "Sep"
//                 break;
//             case 10:
//                 return "Oct"
//                 break;
//             case 11:
//                 return "Nov"
//                 break;
//             case 12:
//                 return "Dec"
//                 break;
//             default:
//                 break;
//         }
//     }

// })()