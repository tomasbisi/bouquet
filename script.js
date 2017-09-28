// function saveDateTimes (){
//         var temp = document.getElementById('date').value;
//         var paramDate = new Date(temp).getTime();
//         // ChartBuild(paramDate);
//         // dateArr.push(paramDate);
//         // console.log(paramDate);
//         return paramDate;
        
//     }

function ChartBuild (){
            console.log("inside");
    $.getJSON("https://data.marincounty.org/resource/mw3d-ud6d.json", function(result){
            clean_data = []; // Clean json with Amount, departments and Date. 
            dated_data = []; // Filtered data with the input date.
           
                result.forEach(function (e){    
                    data = {};
                    data.department = e.department
                    data.amount = parseInt(e.amount, 10); // convert from string to integer.
                    data.month_and_year = new Date(e.month_and_year).getTime(),
                    data_values = new Array();
                    for (var key in data)
                        data_values.push(data[key]);
                        clean_data.push(data_values);
                });

            var temp = document.getElementById('date').value; // on submit save value.
            var paramDate = new Date(temp).getTime(); // epoch time date convert.
            console.log("test");
            console.log(paramDate);
            console.log("end-test");
            dated_data = clean_data.filter(data => data[2] == paramDate); // filter through date parameters.
            

            console.log(dated_data);
            console.log(clean_data);
            

// Chart Build Code
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Bouquet'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Amount ($)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Amount: <b>{point.y:.1f}</b>'
            },
            series: [{
                name: 'Population',
                data: dated_data,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });

    });
}

ChartBuild();