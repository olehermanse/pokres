function gen1_calc_main_term(level, base, DV, EV) {
    var EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
    var basepart = (base + DV) * 2;

    var levelpart = level * (basepart + EVpart);

    return Math.floor(levelpart / 100);
}

function gen1_calc_stat(stat, level, base, DV, EV) {
    var mt = gen1_calc_main_term(level, base, DV, EV);
    if (stat == "HP") {
        return mt + level + 10;
    } else {
        return mt + 5;
    }
    return 0;
}

function gen1_encounter_calc() {
    var level = Number(document.getElementById('encounter_level').value);
    var stats = ["HP", "ATK", "DEF", "SPE", "SPC"];
    stats.forEach(function(st) {
        var base = Number(document.getElementById('encounter_base_' + st).value);
        var min = gen1_calc_stat(st, level, base, 0, 0);
        var max = gen1_calc_stat(st, level, base, 15, 0);
        document.getElementById('encounter_range_' + st).value = "" + min + "-" + max;
    });
}

function gen1_init() {
    $.getJSON("web/files/gen1.mini.json", function(data) {
        var items = [];
        $.each(data.dex, function(key, val) {
            items.push([key,val.name]);
        });
        items = items.sort();

        var not_selected = {
            value: "000",
            text : " "
        };

        $("#encounter_species").append($('<option>', not_selected));
        $("#DV_species").append($('<option>', not_selected));
        $.each(items, function (i, item) {
            $('#encounter_species').append($('<option>', {
                value: item[0],
                text : item[1]
            }));
        });
        $.each(items, function (i, item) {
            $('#DV_species').append($('<option>', {
                value: item[0],
                text : item[1]
            }));
        });
    });
    gen1_encounter_species_select();
}

function gen1_encounter_species_select(){
    var choice = $('#encounter_species').find(":selected").val();
    $.getJSON("web/files/gen1.mini.json", function(data) {
        if (choice in data.dex){
            var stat_values = data.dex[choice].stats;
            var stat_names = data.stats.order;
            for(var index in stat_names){
                var name = stat_names[index];
                var value = ""+stat_values[index];
                var base_id = "#encounter_base_"+name;
                var range_id = "#encounter_range_"+name;
                $(base_id).val(value);
                $(range_id).val("");
            }
        }
    });
}


function gen1_DV_calc()
{
    var level = Number(document.getElementById('DV_level').value);
    var stats = ["HP", "ATK", "DEF", "SPE", "SPC"];
    stats.forEach(function(st) 
    {
        var base = Number(document.getElementById('DV_base_' + st).value);
        var encounter = Number(document.getElementById('DV_encounter_' + st).value);
        var min = 0;
        var max = 15;
        for(var DV = 0; DV < 16; ++DV)
        {
            var stat = gen1_calc_stat(st, level, base, DV, 0);
            if (stat < encounter){
                min = DV + 1;
            }
            if (stat == encounter){
                max = DV;
            }
        }
        var set_text = "" + min + "-" + max;
        var stat_min = gen1_calc_stat(st, level, base, 0, 0);
        var stat_max = gen1_calc_stat(st, level, base, 15, 0);
        if (min > max || 
            encounter < stat_min ||
            encounter > stat_max)
        {
            set_text = "Error";
        }
        document.getElementById('DV_' + st).value = set_text;
    });
}

function gen1_DV_species_select(){
    var choice = $('#DV_species').find(":selected").val();
    $.getJSON("web/files/gen1.mini.json", function(data) {
        if (choice in data.dex){
            var stat_values = data.dex[choice].stats;
            var stat_names = data.stats.order;
            for(var index in stat_names){
                var name = stat_names[index];
                var value = ""+stat_values[index];
                var base_id = "#DV_base_"+name;
                var DV_id = "#DV_"+name;
                $(base_id).val(value);
                $(DV_id).val("");
            }
        }
    });
}