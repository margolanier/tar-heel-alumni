var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('https://docs.google.com/spreadsheet/pub?key=0AuSm4qaFIJGKdEY3NXhsbXE1ci1FaXRZb0pfRWJLQ2c&output=html');

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
		{'mDataProp': 'name', 'sTitle': 'Name', 'sClass': 'left'},
		{'mDataProp': 'citystate', 'sTitle': 'Location', 'sClass': 'left'},
		{'mDataProp': 'major', 'sTitle': 'Undergrad Major', 'sClass': 'left'},
        {'mDataProp': 'plans', 'sTitle': 'Plans', 'sClass': 'left'},
        {'mDataProp': 'companyorschool', 'sTitle': 'Company or School', 'sClass': 'left'},
        {'mDataProp': 'careerfieldordegree', 'sTitle': 'Career Field or Degree', 'sClass': 'left'},
        {'mDataProp': 'contact', 'sTitle': 'Contact', 'sClass': 'left'}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 25,
        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};