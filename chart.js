function incBytesChart(incomingBytesArr, dates) {

$.getJSON("https://data.marincounty.org/resource/mw3d-ud6d.json", function(result){
        new_data = [];
        result.forEach(function (e){    
            data = {};
            data.amount = e.amount
            data.department = e.department
            data.month_and_year = e.month_and_year
            new_data.push(data);            
        });
        console.log(new_data);

	const barChart = document.getElementById('incBytesChart');
	let chart = new Chart(barChart, {
	type: 'bar',

	data: {
		labels: dates,
		datasets: [{
			label: 'bytes',
			data: incomingBytesArr,
			backgroundColor: 'hsla(44, 100%, 60%, 0.70)',
			borderColor: 'hsla(44, 100%, 40%, 1)',
			borderWidth: 2 }]},

	options: {
		responsive: true,
		title:{
			display: true,
			text:'incoming bytes',
		 	fontColor: "#424242" },
		legend: {
			display: false },
		scales: {
			yAxes: [{
				ticks: {
					fontColor: "#f",
					fontSize: 11,
					beginAtZero: true,
					userCallback: function(value, index, values) {
						/** value convertion **/
						if (value >= 1000000000000) {
							return value / 1000000000000 + 'T';
						} else if (value >= 1000000000) {
							return value / 1000000000 + 'G';
						} else if (value >= 1000000) {
							return value / 1000000 + 'M';
						} else if (value >= 1000) {
							return value / 1000 + 'k';
						} else if (value < 10) {
							return value.toPrecision(2);
						}
						return value; }},
				gridLines: {
					color: 'hsla(0, 0%, 75%, 0.84)',
					lineWidth: 0.8 }}],
			xAxes: [{
				display: false,
				gridLines: {
					color: 'hsla(0, 0%, 75%, 0.84)',
					lineWidth: 0.8 }}]}}});
}

incBytesChart();