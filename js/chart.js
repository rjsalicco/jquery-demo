function _chart() {
	var personTotal = getPersonTotal();
	var policyTotal = getPolicyTotal();

	var total = personTotal + policyTotal;
	
	var personPercentage = (personTotal / total) * 100;
	var policyPercentage = (policyTotal / total) * 100;
	
	// rounding the values
	personPercentage = Math.round(personPercentage * 100) / 100;
	policyPercentage = Math.round(policyPercentage * 100) / 100;
	
	drawPieChart([["Persons", personPercentage], ["Policies", policyPercentage]]);
}

function getPersonTotal() {
	var personTotal = 0;
	
	$.ajaxSetup( { "async": false } );
	$.getJSON(getURLBase() + '\/data\/person\/list.js', function(json) {
		personTotal = json.persons.length;
	});
	
	return personTotal;
}

function getPolicyTotal() {
	var policyTotal = 0;
	
	$.ajaxSetup( { "async": false } );
	$.getJSON(getURLBase() + '\/data\/policy\/list.js', {async: false}, function(json) {
		policyTotal = json.policies.length;
	});
	
	return policyTotal;
}

function drawPieChart(data) {
	var chart;
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'pieChart',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Data Breakdown'
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Data Breakdown',
            data: data
        }]
    });
}

function drawScatterChart(data) {
    var chart;
    chart = new Highcharts.Chart({
		chart: {
	         renderTo: 'scatterChart',
	         type: 'scatter',
	         zoomType: 'xy'
	     },
	     title: {
	         text: 'Height Versus Weight of 507 Individuals by Gender'
	     },
	     subtitle: {
	         text: 'Source: Heinz  2003'
	     },
	     xAxis: {
	         title: {
	             enabled: true,
	             text: 'Height (cm)'
	         },
	         startOnTick: true,
	         endOnTick: true,
	         showLastLabel: true
	     },
	     yAxis: {
	         title: {
	             text: 'Weight (kg)'
	         }
	     },
	     tooltip: {
	         formatter: function() {
	                 return ''+
	                 this.x +' cm, '+ this.y +' kg';
	         }
	     },
	     legend: {
	         layout: 'vertical',
	         align: 'left',
	         verticalAlign: 'top',
	         x: 100,
	         y: 70,
	         floating: true,
	         backgroundColor: '#FFFFFF',
	         borderWidth: 1
	     },
	     plotOptions: {
	         scatter: {
	             marker: {
	                 radius: 5,
	                 states: {
	                     hover: {
	                         enabled: true,
	                         lineColor: 'rgb(100,100,100)'
	                     }
	                 }
	             },
	             states: {
	                 hover: {
	                     marker: {
	                         enabled: false
	                     }
	                 }
	             }
	         }
	     },
	     series: [{
	         name: 'Female',
	         color: 'rgba(223, 83, 83, .5)',
	         data: []

	     }, {
	         name: 'Male',
	         color: 'rgba(119, 152, 191, .5)',
	         data: []
	     }]
	 });
}