function calcMainTerm(level, base, DV, EV){
    var EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
    var basepart = (base + DV) * 2;

    var levelpart = level * (basepart + EVpart);

    return Math.floor(levelpart / 100);
}

function calcStat(stat,level, base, DV, EV){
    var mt = calcMainTerm(level, base, DV, EV);
    if(stat == "HP"){
        return mt + level + 10;
    }else{
        return mt + 5;
    }
    return 0;
}

function calcRanges() {
    var level = Number(document.getElementById('level').value);
    var stats = ["HP","ATK","DEF","SPD","SPC"];
    stats.forEach(function(st){
        var base = Number(document.getElementById('base'+st).value);
        var min = calcStat(st, level, base, 0, 0);
        var max = calcStat(st, level, base, 15,0);
        document.getElementById('range'+st).value = ""+min+"-"+max;
    });
}
