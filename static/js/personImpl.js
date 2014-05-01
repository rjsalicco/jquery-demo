function _personImpl() {
	$("#personDialog").dialog({
		autoOpen: false,
		width: 800,
		height: 500,
		buttons: {
			"Save": function() {
				$(this).dialog("close");
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		},
		open: function() {
			$("#personAccordion").accordion({ 
				header: "h3",
				collapsible: true,
				autoHeight: false
			});
		}
	});
	
	// load tab with data
	getPersons();
}

function clearPersonInputFieldData() {
	$("input[id^='person_'").val("");
}

function createPersonRow(person) {
	return "<tr id=\""+ person.id + "\"><td>" 
		+ person.id + "</td><td>" 
		+ person.firstName + "</td><td>" 
		+ person.lastName + "</td><td>" 
		+ person.dateOfBirth + "</td></tr>";
}

function displayPerson(person) {
	// reset values before binding data
	clearPersonInputFieldData();

	// bind data values
	$("#person_id").val(person.id);
	$("#person_firstName").val(person.firstName);
	$("#person_lastName").val(person.lastName);
	$("#person_dateOfBirth").val(person.dateOfBirth);
	$("#person_emailAddress").val(person.emailAddress);
	$("#person_taxId").val(person.taxId);
	openDialog("#personDialog", "Viewing Person: " + person.firstName + " " + person.lastName);
}

function getPersons() {
	clearContainer("#personList > tbody");
	
	$.getJSON(getURLBase() + '\/data\/person\/list.js', function(json) {
		
		drawResults(json.persons, "#personList > tbody:last", function(arg) {
			return createPersonRow(arg.person);
		});
		
		enableClickable("#personList > tbody > tr", function(arg) {
			getPerson(arg, function(arg) {
				displayPerson(arg);
			});
		});
	});
}

function getPerson(id, callback) {
	return $.getJSON(getURLBase() + '\/data\/person\/'+ id + '.js', function(json) {
		callback(json.person);
	}).error(function() {
		openErrorDialog("#errorDialog", "#errorMessage", "Could not find person!");
	});
}