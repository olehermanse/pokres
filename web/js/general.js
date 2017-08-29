function fill_autocomplete() {
    var gen_file = $('#generation_select').find(":selected").val();
    $.getJSON(gen_file, function(data) {
        $( function() {
            var species_options = [];
            $.each(data.lookup, function(key, val) {
                species_options.push(key);
            });
            $( "#species_search" ).autocomplete({
                source: species_options,
                minLength: 2,
                select: function(event, ui) {
                    //assign value back to the form element
                    if(ui.item){
                        $(event.target).val(ui.item.value);
                    }
                    //submit the form
                    get_base_stats();
                }
            });
        });
    });
}

function get_base_stats() {
    var gen_file = $('#generation_select').find(":selected").val();
    $.getJSON(gen_file, function(data) {
        $( function() {
            var species = $('#species_search').val();
            var key = data.lookup[species];
            if (key == undefined){
                $('#base_display_table').html("");
                return;
            }
            var stats_short = data.stats.order;
            var stats_long = data.stats.names;
            var stats = data.dex[key].stats;
            var tab = $('#base_display_table')
            var label_row = "";
            var data_row = "";
            for (var i=0; i < stats.length; ++i){
                label_row += "<td>" + stats_long[stats_short[i]] + "</td>";
                data_row  += "<td>" + stats[i] + "</td>";
            }
            $('#base_display_table').html("<tr>" + label_row + "</tr>" + "<tr>" + data_row + "</tr>");
        });
    });
}
