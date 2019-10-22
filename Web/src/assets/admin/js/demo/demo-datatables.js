$(document).ready(function() {
    $('#datatables-example').dataTable({responsive: true, 
                                        oLanguage: {
                                            info:         'Page _PAGE_/_PAGES_',
                                            infoEmpty:    'No records found',
                                            infoFiltered: '(filtered from _MAX_ records)',
                                            zeroRecords:  'Nothing records found. Sorry ;_(',
                                            sSearch:      'Search in all columns:',
                                            sLengthMenu:  '_MENU_ records/page'
                                        },
                                        sAjaxSource: 'data/datatables.json',
                                        aoColumns: [
                                            { mData: 'id' },
                                            { mData: 'first_name' },
                                            { mData: 'last_name' },
                                            { mData: 'email' },
                                            { mData: 'country' },
                                            { mData: 'ip_address' }
                                        ]});      
    });
$(document).ready(function() {
    $('#datatables-column-example').dataTable({responsive: true, 
                                                oLanguage: {
                                                    info:         'Page _PAGE_/_PAGES_',
                                                    infoEmpty:    'No records found',
                                                    infoFiltered: '(filtered from _MAX_ records)',
                                                    zeroRecords:  'Nothing records found. Sorry ;_(',
                                                    sSearch:      'Search in all columns:',
                                                    sLengthMenu:  '_MENU_ records/page'
                                                },
                                                sAjaxSource: 'data/datatables.json',
                                                aoColumns: [
                                                    { mData: 'id' },
                                                    { mData: 'first_name' },
                                                    { mData: 'last_name' },
                                                    { mData: 'email' },
                                                    { mData: 'country' },
                                                    { mData: 'ip_address' }
                                                ],
                                                sDom: 'RC<"clear">lfrtip',
                                                colVis: {
                                                    buttonText: 'Show/Hide Columns'
                                                }
                                              });
});
$(document).ready(function() {

    $('#datatables-scroller-example').dataTable({responsive: true, 
                                                oLanguage: {
                                                    info:         'Page _PAGE_/_PAGES_',
                                                    infoEmpty:    'No records found',
                                                    infoFiltered: '(filtered from _MAX_ records)',
                                                    zeroRecords:  'Nothing records found. Sorry ;_(',
                                                    sSearch:      'Search in all columns:',
                                                    sLengthMenu:  '_MENU_ records/page'
                                                },
                                                sAjaxSource: 'data/datatables.json',
                                                aoColumns: [
                                                    { mData: 'id' },
                                                    { mData: 'first_name' },
                                                    { mData: 'last_name' },
                                                    { mData: 'email' },
                                                    { mData: 'country' },
                                                    { mData: 'ip_address' }
                                                ],
                                                scrollY: '240px',
                                                dom:     'frtiS'});
});
$(document).ready(function() {
    var t = $('#datatables-xeditable-example').dataTable({responsive: true, 
                                            order: [[ 0, 'desc' ]],
                                            oLanguage: {
                                                info:         'Page _PAGE_/_PAGES_',
                                                infoEmpty:    'No records found',
                                                infoFiltered: '(filtered from _MAX_ records)',
                                                zeroRecords:  'Nothing records found. Sorry ;_(',
                                                sSearch:      'Search in all columns:',
                                                sLengthMenu:  '_MENU_ records/page'}
                                           });
    // Init X-Editable fields
    $('.xeditable').editable({mode: 'inline', showbuttons: false});
    // API Example with row adding
    var counter = 11;
    $('#addRow').on('click', function () {
        t.fnAddData( [
            counter++,
            "<a class='xeditable editable editable-click' data-title='Empty' href='#'></a>",
            "<a class='xeditable editable editable-click' data-title='Empty' href='#'></a>",
            "<a class='xeditable editable editable-click' data-title='Empty' href='#'></a>",
            "<a class='xeditable editable editable-click' data-title='Empty' href='#'></a>",
            "<a class='xeditable editable editable-click' data-title='Empty' href='#'></a>"
        ] );
        $('.xeditable').editable({mode: 'inline', showbuttons: false});
    });
});
