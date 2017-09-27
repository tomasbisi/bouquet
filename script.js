
$.getJSON("https://data.marincounty.org/resource/mw3d-ud6d.json", function(result){
        new_data = [];
        
        result.forEach(function (e){    
            data = {};
            data.department = e.department
            data.amount = parseInt(e.amount);
            // data.month_and_year = e.month_and_year
            data.month_and_year = new Date(e.month_and_year).getTime(),
    
            data_values = new Array();
            for (var key in data)
                data_values.push(data[key]);
                new_data.push(data_values);
        });                 
        console.log(new_data);


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
                text: 'Amount'
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
            data: new_data,
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