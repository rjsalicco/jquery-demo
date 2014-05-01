// Begin Global Variables
var hostName = "localhost";
// End Global Variables

function clearContainer(container) {
	($(container)).empty();
}

function createDocument(doc, name) {
	// get default buffer and output to new window
	window.open('data:application/pdf;base64,' + Base64.encode(doc.output()), name);
}

function drawResults(array, container, rowCreator) {
	var length = array.length;
	if(length > 0) {
		for(i=0; i<length; i++) {
			($(container)).append(rowCreator(array[i]));
		}
	}
}

function enableClickable(container, getAction) {
	($(container)).click(function(event) {
		getAction($(this).attr("id"));
	});
}

function getURLBase() {
	return 'http:\/\/' + ($.dataViewer.hostName) + '\/' + ($.dataViewer.contextPath);
}

function openDialog(container, title) {
	($(container)).dialog('open');
	($(container)).dialog( "option", "title", title);
	($(container)).scrollTop(0);
}

function openErrorDialog(container, messageContainer, message) {
	($(container)).dialog('open');
	($(container)).scrollTop(0);
	($(messageContainer)).text(message);
}

$(document).ready(function(){
	$.dataViewer = {
		hostName: hostName,
		contextPath: ""
	}
	
	$("#mainTabs").tabs();
	
	$("#errorDialog").dialog({
		autoOpen: false,
		width: 600,
		height: 300,
		buttons: {
			"Close": function() {
				$(this).dialog("close");
			}
		}
	});
	
	// initialize chart
	_chart();
	
	// initialize domain components
	_personImpl();
	_policyImpl();
});