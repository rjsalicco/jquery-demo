function _policyImpl() {
	$("#policyDialog").dialog({
		autoOpen: false,
		width: 800,
		height: 500,
		buttons: {
			"Save": function() {
				$(this).dialog("close");
			},
			"Document": function() {
				var id = $("#policy_id").val();
				getPolicy(id, function(arg) {
					createPolicyDocument(arg);
				});
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		},
		open: function() {
			$("#policyAccordion").accordion({ 
				header: "h3",
				collapsible: true,
				autoHeight: false
			});
		}
	});
	
	// load tab with data
	getPolicies();
}

function clearPolicyInputFieldData() {
	$("input[id^='policy_']").val("");
}

function createPolicyDocument(policy) {
	var doc = new jsPDF();
	
	doc.setProperties ({
		title: 'Policy Document'
	});
	
	doc.setFontSize(20);
	doc.text(10, 10, 'My Incredible Insurance Company');
	
	doc.setFontSize(12);
	var now = new Date();
	var strNow = now.getMonth() + 1 + "\/" + now.getDate() + "\/" + now.getFullYear();
	doc.text(10, 20, 'As Of: ' + strNow);
	
	doc.setFontSize(14);
	doc.text(10, 40, 'Policy Number: ' + policy.policyNumber);
	doc.text(10, 48, 'Face Value: ' + policy.faceValue);
	doc.text(10, 56, 'Cash Value: ' + policy.cashValue);
	
	// call to shared new window function
	createDocument(doc, "Policy Document");
}

function createPolicyRow(policy) {
	return "<tr id=\"" + policy.id + "\"><td>" 
		+ policy.id + "</td><td>" 
		+ policy.policyNumber + "</td><td>"
		+ policy.faceValue + "</td><td>"
		+ policy.effectiveDate + "</td><td>"
		+ policy.status + "</td></tr>";
}

function displayPolicy(policy) {
	// reset values before binding data
	clearPolicyInputFieldData();

	// bind data values
	$("#policy_id").val(policy.id);
	$("#policy_policyNumber").val(policy.policyNumber);
	$("#policy_lineOfBusiness").val(policy.lineOfBusiness);
	$("#policy_faceValue").val(policy.faceValue);
	$("#policy_cashValue").val(policy.cashValue);
	$("#policy_effectiveDate").val(policy.effectiveDate);
	$("#policy_paidToDate").val(policy.paidToDate);
	$("#policy_status").val(policy.status);

	// checking for insured
	if(policy.insured) {
		$("#policy_insured_firstName").val(policy.insured.person.firstName);
		$("#policy_insured_lastName").val(policy.insured.person.lastName);
		$("#policy_insured_taxId").val(policy.insured.person.taxId);	
	}
	openDialog("#policyDialog", "Viewing Policy: " + policy.policyNumber);
}

function getPolicies() {
	clearContainer("#policyList > tbody");
	$.getJSON(getURLBase() + '\/data\/policy\/list.json', function(json) {
		
		drawResults(json.policies, "#policyList > tbody:last", function(arg) {
			return createPolicyRow(arg.policy);
		});
		
		enableClickable("#policyList > tbody > tr", function(arg) {
			getPolicy(arg, function(arg) {
				displayPolicy(arg);
			});
		});
	});
}

function getPolicy(id, callback) {
	$.getJSON(getURLBase() + '\/data\/policy\/'+ id + '.json', function(json) {
		callback(json.policy);
	}).error(function() {
		openErrorDialog("#errorDialog", "#errorMessage", "Could not find policy!");
	});
}