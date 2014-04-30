function _chart() {
	buildPersonPolicyBreakdownChart();
	buildPolicyStatusBreakdownChart();
}

function buildPersonPolicyBreakdownChart() {
	drawPieChart(getPersonPolicyBreakdownData(), 'personPolicyBreakdownPieChart', 'Data Breakdown: Persons vs. Policies');
}

function buildPolicyStatusBreakdownChart() {
	drawPieChart(getPolicyStatusBreakdownData(), 'policyStatusBreakdownPieChart', 'Data Breakdown: Policy Statuses');
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

function getPersonPolicyBreakdownData() {
	var personTotal = getPersonTotal();
	var policyTotal = getPolicyTotal();
	var personPolicyBreakdownData = [];

	var total = personTotal + policyTotal;
	
	var personPercentage = (personTotal / total) * 100;
	var policyPercentage = (policyTotal / total) * 100;
	
	// rounding the values
	personPercentage = Math.round(personPercentage * 100) / 100;
	policyPercentage = Math.round(policyPercentage * 100) / 100;

	personPolicyBreakdownData = [["Persons", personPercentage], ["Policies", policyPercentage]];

	return personPolicyBreakdownData;
}

function getPolicyStatusBreakdownData() {
	var policyStatusBreakdownData = [];
	var policyStatusBreakdownDataMap = {};

	$.ajaxSetup( { "async": false } );
	$.getJSON(getURLBase() + '\/data\/policy\/list.js', {async: false}, function(json) {
		for (var i = json.policies.length-1; i >= 0; i--) {
			var iterator = json.policies[i];
			var status = iterator.policy.status;
			
			if(status in policyStatusBreakdownDataMap) {
				policyStatusBreakdownDataMap[status] = policyStatusBreakdownDataMap[status] + 1;
			} else {
				policyStatusBreakdownDataMap[status] = 1;
			}
		}
	});

	// convert Map data into Array
	for ( var key in policyStatusBreakdownDataMap) {
		policyStatusBreakdownData.push([key, policyStatusBreakdownDataMap[key]])
	}

	return policyStatusBreakdownData;
}

function drawPieChart(data, containerId, chartTitle) {
	var chart;
    chart = new Highcharts.Chart({
        chart: {
            renderTo: containerId,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: chartTitle
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
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
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
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