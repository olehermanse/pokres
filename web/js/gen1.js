function calc_main_term(level, base, DV, EV) {
    var EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
    var basepart = (base + DV) * 2;

    var levelpart = level * (basepart + EVpart);

    return Math.floor(levelpart / 100);
}

function calc_stat(stat, level, base, DV, EV) {
    var mt = calcMainTerm(level, base, DV, EV);
    if (stat == "HP") {
        return mt + level + 10;
    } else {
        return mt + 5;
    }
    return 0;
}

function calc_ranges() {
    var level = Number(document.getElementById('level').value);
    var stats = ["HP", "ATK", "DEF", "SPE", "SPC"];
    stats.forEach(function(st) {
        var base = Number(document.getElementById('base' + st).value);
        var min = calcStat(st, level, base, 0, 0);
        var max = calcStat(st, level, base, 15, 0);
        document.getElementById('range' + st).value = "" + min + "-" + max;
    });
}

function init_pok() {
    $.getJSON("web/files/gen1.mini.json", function(data) {
        var items = [];
        $.each(data.dex, function(key, val) {
            items.push([key,val.name]);
        });
        $("#species").append($('<option>', {
            value: "000",
            text : " "
        }));
        items = items.sort();
        $.each(items, function (i, item) {
            $('#species').append($('<option>', {
                value: item[0],
                text : item[1]
            }));
        });
    });
    select_species();
}

function select_species(){
    var choice = $('#species').find(":selected").val();
    $.getJSON("web/files/gen1.mini.json", function(data) {
        if (choice in data.dex){
            var stat_values = data.dex[choice].stats;
            var stat_names = data.stats.order;
            for(var index in stat_names){
                var name = stat_names[index];
                var value = ""+stat_values[index];
                var base_id = "#base"+name;
                var range_id = "#range"+name;
                $(base_id).val(value);
                $(range_id).val("");
            }
        }
    });
}
