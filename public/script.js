
function ChartBuild (){
    $.getJSON("https://data.marincounty.org/resource/mw3d-ud6d.json", function(result){
            clean_data = []; // Clean json with Amount, departments and Date. 
            dated_data = []; // Filtered data with the input date.
            fixed_data = []; // Fixed data.

            // Make a new object of the needed parameters/
            function dataClean(){
                result.forEach(function (e){            // new Hash with desired parameters.
                    data = {};                         
                    data.department = e.department
                    data.amount = parseInt(e.amount, 10); // convert from string to integer.
                    data.month_and_year = new Date(e.month_and_year).getTime(),
                    data_values = new Array();
                    for (var key in data)               // iteration over json object to extract values from keys.
                        data_values.push(data[key]);
                        clean_data.push(data_values);
                });
            }
            dataClean();

            // Filter the data using the month_and_year parameter.
            function dataFilter(){
                var temp = document.getElementById('date').value; // on submit save value.
                temp = temp + 'T00:00:00'; // time append to date for propper epoch convertion.
                var paramDate = new Date(temp).getTime(); // epoch time date convert.
                dated_data = clean_data.filter(data => data[2] == paramDate); // filter through date parameters.
            }
            dataFilter();


            // Fixing the data output when multiple amounts of each department.
            var dictionary = {};
            var final_data = [];
            function dataFix(){
                
                    for (var i = 0; i < dated_data.length; i++){
                        if (dated_data[i][0] in dictionary) {
                            dictionary[dated_data[i][0]] += dated_data[i][1];
                        } else {
                            dictionary[dated_data[i][0]] = dated_data[i][1];
                        }
                         // console.log(dated_data[i][1], typeof(dated_data[i][1]));
                    }
                    
                    for (var key in dictionary)
                        final_data.push([key, dictionary[key]]);
                    
              
            }
            dataFix();
            // console.log(dictionary); // testing fixed Hash.
            // console.log(dated_data); // Testing filtered data.
            // console.log(clean_data); // Testing clean Json.
            

        // Chart Build Code
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Bouquet.ai'
            },
            subtitle: {
                text: 'Contract amounts in Marin Country by department'
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
                pointFormat: 'Amount $: <b>{point.y:,.0f}</b>'
            },
            series: [{
                name: 'Population',
                data: final_data, // Data parsed from API call filtered by date and fixed.
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:,.0f}', // one decimal
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

// ChartBuild();