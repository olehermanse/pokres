function calcMainTerm(level, base, DV, EV) {
    var EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
    var basepart = (base + DV) * 2;

    var levelpart = level * (basepart + EVpart);

    return Math.floor(levelpart / 100);
}

function calcStat(stat, level, base, DV, EV) {
    var mt = calcMainTerm(level, base, DV, EV);
    if (stat == "HP") {
        return mt + level + 10;
    } else {
        return mt + 5;
    }
    return 0;
}

function calcRanges() {
    var level = Number(document.getElementById('level').value);
    var stats = ["HP", "ATK", "DEF", "SPD", "SPC"];
    stats.forEach(function(st) {
        var base = Number(document.getElementById('base' + st).value);
        var min = calcStat(st, level, base, 0, 0);
        var max = calcStat(st, level, base, 15, 0);
        document.getElementById('range' + st).value = "" + min + "-" + max;
    });
}

function pokInit() {
    $.getJSON("res/json/gen1.json", function(data) {
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
    getSpecies();
}

function getSpecies(){
    var choice = $('#species').find(":selected").val();
    $.getJSON("res/json/gen1.json", function(data) {
        if (choice in data.dex){
            var stats = data.dex[choice].stats;
            for(var key in stats){
                var id = "base"+key;
                var value = ""+stats[key];
                console.log(id+" "+value);
                $("#"+id).val(value);
                //$("#"+id).text(""+stats[key]);
            }
        }
    });
}
