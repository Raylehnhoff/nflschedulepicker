var isRNFLMarkdown = false;

function getParam(a) {
    var d = location.search.substr(location.search.indexOf("?") + 1),
        c = "", b; d = d.split("&"); for (b = 0; b < d.length; b++) {
        temp = d[b].split("="); if ([temp[0]] == a) { c = temp[1] }
        }
        return c
}
function setCookie(a, d, b) {
    var e = new Date(), c; e.setDate(e.getDate() + b); c = escape(d) + ((b == null) ? "" : "; expires=" + e.toUTCString());
    document.cookie = a + "=" + c
}
function set_game_cookie(c, a) {
    var b = "-" + c.join("") + "_"; a = (a == undefined) ? false : a;
    if (!a) {
        setCookie(games_cookie_name, b, 999)
    } set_visible_cookie(b)
}
function set_visible_cookie(a) {
    document.getElementById("save_string").innerHTML = "http://0003mg.github.io/nflschedulepicker/?a=" + a
}
function getCookie(b) {
    var c, a, e, d = document.cookie.split(";");
    for (c = 0; c < d.length; c++) {
        a = d[c].substr(0, d[c].indexOf("="));
        e = d[c].substr(d[c].indexOf("=") + 1);
        a = a.replace(/^\s+|\s+$/g, "");
        if (a == b) {
            return unescape(e);
        }
    }
}
var conferenceRankingObject = {};
var games_cookie_name = "NFL2014",
    cookie_letter_length = 86,
    cookie64_re = /-[A-Za-z0-9\-_]{86}_?/,
    base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    number_of_weeks = 21,
    week_lists = [
        /*1*/["PIT-NE", "GB-CHI", "KC-HOU", "CLE-NYJ", "IND-BUF", "MIA-WAS", "CAR-JAC", "SEA-STL", "NO-ARI", "DET-SD", "TEN-TB", "CIN-OAK", "BAL-DEN", "NYG-DAL", "PHI-ATL", "MIN-SF"],
        /*2*/["DEN-KC", "HOU-CAR", "SF-PIT", "TB-NO", "DET-MIN", "ARI-CHI", "NE-BUF", "SD-CIN", "TEN-CLE", "ATL-NYG", "STL-WAS", "MIA-JAC", "BAL-OAK", "DAL-PHI", "SEA-GB", "NYJ-IND"],
        /*3*/["WAS-NYG", "ATL-DAL", "IND-TEN", "OAK-CLE", "CIN-BAL", 'JAC-NE', 'NO-CAR', 'PHI-NYJ', 'TB-HOU', 'SD-MIN', 'PIT-STL', 'SF-ARI', 'BUF-MIA', 'CHI-SEA', 'DEN-DET', 'KC-GB'],
        /*4*/['BAL-PIT', 'NYJ-MIA', 'JAC-IND', 'NYG-BUF', 'CAR-TB', 'PHI-WAS', 'OAK-CHI', 'HOU-ATL', 'KC-CIN', 'CLE-SD', 'GB-SF', 'STL-ARI', 'MIN-DEN', 'DAL-NO', 'DET-SEA'],
        /*5*/['IND-HOU', 'CHI-KC', 'SEA-CIN', 'WAS-ATL', 'JAC-TB', 'NO-PHI', 'CLE-BAL', 'STL-GB', 'BUF-TEN', 'ARI-DET', 'NE-DAL', 'DEN-OAK', 'SF-NYG', 'PIT-SD'],
        /*6*/['ATL-NO', 'WAS-NYJ', 'ARI-PIT', 'KC-MIN', 'CIN-BUF', 'CHI-DET', 'DEN-CLE', 'HOU-JAC', 'MIA-TEN', 'CAR-SEA', 'SD-GB', 'BAL-SF', 'NE-IND', 'NYG-PHI'],
        /*7*/['SEA-SF', 'BUF-JAC', 'TB-WAS', 'ATL-TEN', 'NO-IND', 'MIN-DET', 'PIT-KC', 'CLE-STL', 'HOU-MIA', 'NYJ-NE', 'OAK-SD', 'DAL-NYG', 'PHI-CAR', 'BAL-ARI'],
        /*8*/['MIA-NE', 'DET-KC', 'TB-ATL', 'ARI-CLE', 'SF-STL', 'NYG-NO', 'MIN-CHI', 'SD-BAL', 'CIN-PIT', 'TEN-HOU', 'NYJ-OAK', 'SEA-DAL', 'GB-DEN', 'IND-CAR'],
        /*9*/['CLE-CIN', 'GB-CAR', 'WAS-NE', 'TEN-NO', 'MIA-BUF', 'STL-MIN', 'JAC-NYJ', 'OAK-PIT', 'NYG-TB', 'ATL-SF', 'DEN-IND', 'PHI-DAL', 'CHI-SD'],
        /*10*/['BUF-NYJ', 'DET-GB', 'DAL-TB', 'CAR-TEN', 'CHI-STL', 'NO-WAS', 'MIA-PHI', 'CLE-PIT', 'JAC-BAL', 'MIN-OAK', 'NE-NYG', 'KC-DEN', 'ARI-SEA', 'HOU-CIN'],
        /*11*/['TEN-JAC', 'OAK-DET', 'IND-ATL', 'NYJ-HOU', 'TB-PHI', 'DEN-CHI', 'GB-MIN', 'STL-BAL', 'DAL-MIA', 'WAS-CAR', 'CIN-ARI', 'SF-SEA', 'KC-SD', 'BUF-NE'],
        /*12*/['PHI-DET', 'CAR-DAL', 'CHI-GB', 'NO-HOU', 'STL-CIN', 'MIN-ATL', 'NYG-WAS', 'TB-IND', 'BUF-KC', 'OAK-TEN', 'SD-JAC', 'MIA-NYJ', 'ARI-SF', 'PIT-SEA', 'NE-DEN', 'BAL-CLE'],
        /*13*/['GB-DET', 'NYJ-NYG', 'ARI-STL', 'ATL-TB', 'CAR-NO', 'SEA-MIN', 'HOU-BUF', 'BAL-MIA', 'CIN-CLE', 'JAC-TEN', 'SF-CHI', 'DEN-SD', 'KC-OAK', 'PHI-NE', 'IND-PIT', 'DAL-WAS'],
        /*14*/['MIN-ARI', 'BUF-PHI', 'SF-CLE', 'DET-STL', 'NO-TB', 'TEN-NYJ', 'PIT-CIN', 'NE-HOU', 'IND-JAC', 'SD-KC', 'WAS-CHI', 'ATL-CAR', 'OAK-DEN', 'DAL-GB', 'SEA-BAL', 'NYG-MIA'],
        /*15*/['TB-STL', 'NYJ-DAL', 'CHI-MIN', 'ATL-JAC', 'HOU-IND', 'ARI-PHI', 'CAR-NYG', 'TEN-NE', 'BUF-WAS', 'KC-BAL', 'CLE-SEA', 'GB-OAK', 'DEN-PIT', 'MIA-SD', 'CIN-SF', 'DET-NO'],
        /*16*/['SD-OAK', 'WAS-PHI', 'NE-NYJ', 'HOU-TEN', 'CLE-KC', 'IND-MIA', 'JAC-NO', 'SF-DET', 'DAL-BUF', 'CHI-TB', 'CAR-ATL', 'NYG-MIN', 'STL-SEA', 'GB-ARI', 'PIT-BAL', 'CIN-DEN'],
        /*17*/['NYJ-BUF', 'NE-MIA',' TB-CAR', 'NO-ATL', 'BAL-CIN', 'PIT-CLE', 'JAC-HOU', 'TEN-IND', 'OAK-KC', 'WAS-DAL', 'PHI-NYG', 'DET-CHI', 'MIN-GB', 'SD-DEN', 'SEA-ARI', 'STL-SF'],
		/*WC*/[],
		/*DR*/[],
		/*CC*/[],
		/*SB*/[]
    ],
    team_week_lists = {},
    game_list = [],
    game_list_len = 267,
    day_codes =
      "T            NMM"  //01
    + "T             NM"  //02
    + "T             NM"  //03
    + "TU           NM"    //04
    + "T           NM"  //05
    + "T           NM"  //06
    + "TU          NM"  //07
    + "TU          NM"  //08
    + "T          NM"    //09
    + "T           NM"    //10
    + "T           NM"   //11
    + "T             NM"  //12
    + "T             NM" //13
    + "T             NM" //14
    + "TZ            NM" //15
    + "TZ            NM" //16
    + "                " //17
	+ "    " //WC
	+ "    " //DR
	+ "  " //CC
	+ " " //SB
    ,day_explaination = { T: "Thursday game", N: "Sunday Night game", M: "Monday Night game", U: "@ London, UK", C: "@ Toronto, Canada", " ": "Sunday game", Z:"Saturday game" },
    bye_lookup = {
        4: "NE TEN",
        5: "CAR MIA MIN NYJ",
        6: "DAL OAK STL TB",
        7: "CHI CIN DEN GB",
        8: "BUF JAC PHI WAS",
        9: "ARI BAL DET HOU KC SEA",
        10: "ATL IND SD SF",
        11: "CLE NO NYG PIT"
    },
    foe_lookup =
    {
        ARI: ['NO', 'CHI', 'SF', 'STL', 'DET', 'PIT', 'BAL', 'CLE', 'SEA', 'CIN', 'SF', 'STL', 'MIN', 'PHI', 'GB', 'SEA'],
        ATL: ['PHI', 'NYG', 'DAL', 'HOU', 'WAS', 'NO', 'TEN', 'TB', 'SF', 'IND', 'MIN', 'TB', 'CAR', 'JAC', 'CAR', 'NO'],
        BAL: ['DEN', 'OAK', 'CIN', 'PIT', 'CLE', 'SF', 'ARI', 'SD', 'JAC', 'STL', 'CLE', 'MIA', 'SEA', 'KC', 'PIT', 'CIN'],
        BUF: ['IND', 'NE', 'MIA', 'NYG', 'TEN', 'CIN', 'JAC', 'MIA', 'NYJ', 'NE', 'KC', 'HOU', 'PHI', 'WAS', 'DAL', 'NYJ'],
        CAR: ['JAC', 'HOU', 'NO', 'TB', 'SEA', 'PHI', 'IND', 'GB', 'TEN', 'WAS', 'DAL', 'NO', 'ATL', 'NYG', 'ATL', ' TB'],
        CHI: ['GB', 'ARI', 'SEA', 'OAK', 'KC', 'DET', 'MIN', 'SD', 'STL', 'DEN', 'GB', 'SF', 'WAS', 'MIN', 'TB', 'DET'],
        CIN: ['OAK', 'SD', 'BAL', 'KC', 'SEA', 'BUF', 'PIT', 'CLE', 'HOU', 'ARI', 'STL', 'CLE', 'PIT', 'SF', 'DEN', 'BAL'],
        CLE: ['NYJ', 'TEN', 'OAK', 'SD', 'BAL', 'DEN', 'STL', 'ARI', 'CIN', 'PIT', 'BAL', 'CIN', 'SF', 'SEA', 'KC', 'PIT'],
        DAL: ['NYG', 'PHI', 'ATL', 'NO', 'NE', 'NYG', 'SEA', 'PHI', 'TB', 'MIA', 'CAR', 'WAS', 'GB', 'NYJ', 'BUF', 'WAS'],
        DEN: ['BAL', 'KC', 'DET', 'MIN', 'OAK', 'CLE', 'GB', 'IND', 'KC', 'CHI', 'NE', 'SD', 'OAK', 'PIT', 'CIN', 'SD'],
        DET: ['SD', 'MIN', 'DEN', 'SEA', 'ARI', 'CHI', 'MIN', 'KC', 'GB', 'OAK', 'PHI', 'GB', 'STL', 'NO', 'SF', 'CHI'],
        GB: ['CHI', 'SEA', 'KC', 'SF', 'STL', 'SD', 'DEN', 'CAR', 'DET', 'MIN', 'CHI', 'DET', 'DAL', 'OAK', 'ARI', 'MIN'],
        HOU: ['KC', 'CAR', 'TB', 'ATL', 'IND', 'JAC', 'MIA', 'TEN', 'CIN', 'NYJ', 'NO', 'BUF', 'NE', 'IND', 'TEN', 'JAC'],
        IND: ['BUF', 'NYJ', 'TEN', 'JAC', 'HOU', 'NE', 'NO', 'CAR', 'DEN', 'ATL', 'TB', 'PIT', 'JAC', 'HOU', 'MIA', 'TEN'],
        JAC: ['CAR', 'MIA', 'NE', 'IND', 'TB', 'HOU', 'BUF', 'NYJ', 'BAL', 'TEN', 'SD', 'TEN', 'IND', 'ATL', 'NO', 'HOU'],
        KC: ['HOU', 'DEN', 'GB', 'CIN', 'CHI', 'MIN', 'PIT', 'DET', 'DEN', 'SD', 'BUF', 'OAK', 'SD', 'BAL', 'CLE', 'OAK'],
        MIA: ['WAS', 'JAC', 'BUF', 'NYJ', 'TEN', 'HOU', 'NE', 'BUF', 'PHI', 'DAL', 'NYJ', 'BAL', 'NYG', 'SD', 'IND', 'NE'],
        MIN: ['SF', 'DET', 'SD', 'DEN', 'KC', 'DET', 'CHI', 'STL', 'OAK', 'GB', 'ATL', 'SEA', 'ARI', 'CHI', 'NYG', 'GB'],
        NE: ['PIT', 'BUF', 'JAC', 'DAL', 'IND', 'NYJ', 'MIA', 'WAS', 'NYG', 'BUF', 'DEN', 'PHI', 'HOU', 'TEN', 'NYJ', 'MIA'],
        NO: ['ARI', 'TB', 'CAR', 'DAL', 'PHI', 'ATL', 'IND', 'NYG', 'TEN', 'WAS', 'HOU', 'CAR', 'TB', 'DET', 'JAC', 'ATL'],
        NYG: ['DAL', 'ATL', 'WAS', 'BUF', 'SF', 'PHI', 'DAL', 'NO', 'TB', 'NE', 'WAS', 'NYJ', 'MIA', 'CAR', 'MIN', 'PHI'],
        NYJ: ['CLE', 'IND', 'PHI', 'MIA', 'WAS', 'NE', 'OAK', 'JAC', 'BUF', 'HOU', 'MIA', 'NYG', 'TEN', 'DAL', 'NE', 'BUF'],
        OAK: ['CIN', 'BAL', 'CLE', 'CHI', 'DEN', 'SD', 'NYJ', 'PIT', 'MIN', 'DET', 'TEN', 'KC', 'DEN', 'GB', 'SD', 'KC'],
        PHI: ['ATL', 'DAL', 'NYJ', 'WAS', 'NO', 'NYG', 'CAR', 'DAL', 'MIA', 'TB', 'DET', 'NE', 'BUF', 'ARI', 'WAS', 'NYG'],
        PIT: ['NE', 'SF', 'STL', 'BAL', 'SD', 'ARI', 'KC', 'CIN', 'OAK', 'CLE', 'SEA', 'IND', 'CIN', 'DEN', 'BAL', 'CLE'],
        SD: ['DET', 'CIN', 'MIN', 'CLE', 'PIT', 'GB', 'OAK', 'BAL', 'CHI', 'KC', 'JAC', 'DEN', 'KC', 'MIA', 'OAK', 'DEN'],
        SEA: ['STL', 'GB', 'CHI', 'DET', 'CIN', 'CAR', 'SF', 'DAL', 'ARI', 'SF', 'PIT', 'MIN', 'BAL', 'CLE', 'STL', 'ARI'],
        SF: ['MIN', 'PIT', 'ARI', 'GB', 'NYG', 'BAL', 'SEA', 'STL', 'ATL', 'SEA', 'ARI', 'CHI', 'CLE', 'CIN', 'DET', 'STL'],
        STL: ['SEA', 'WAS', 'PIT', 'ARI', 'GB', 'CLE', 'SF', 'MIN', 'CHI', 'BAL', 'CIN', 'ARI', 'DET', 'TB', 'SEA', 'SF'],
        TB: ['TEN', 'NO', 'HOU', 'CAR', 'JAC', 'WAS', 'ATL', 'NYG', 'DAL', 'PHI', 'IND', 'ATL', 'NO', 'STL', 'CHI', 'CAR'],
        TEN: ['TB', 'CLE', 'IND', 'BUF', 'MIA', 'ATL', 'HOU', 'NO', 'CAR', 'JAC', 'OAK', 'JAC', 'NYJ', 'NE', 'HOU', 'IND'],
        WAS: ['MIA', 'STL', 'NYG', 'PHI', 'ATL', 'NYJ', 'TB', 'NE', 'NO', 'CAR', 'NYG', 'DAL', 'CHI', 'BUF', 'PHI', 'DAL']
    },
    foe_hash = {
        ARI: { NO: 1, CHI: 1, SF: 1, STL: 1, DET: 1, PIT: 1, BAL: 1, CLE: 1, SEA: 1, CIN: 1, SF: 1, STL: 1, MIN: 1, PHI: 1, GB: 1, SEA: 1 },
        ATL: { PHI: 1, NYG: 1, DAL: 1, HOU: 1, WAS: 1, NO: 1, TEN: 1, TB: 1, SF: 1, IND: 1, MIN: 1, TB: 1, CAR: 1, JAC: 1, CAR: 1, NO: 1 },
        BAL: { DEN: 1, OAK: 1, CIN: 1, PIT: 1, CLE: 1, SF: 1, ARI: 1, SD: 1, JAC: 1, STL: 1, CLE: 1, MIA: 1, SEA: 1, KC: 1, PIT: 1, CIN: 1 },
        BUF: { IND: 1, NE: 1, MIA: 1, NYG: 1, TEN: 1, CIN: 1, JAC: 1, MIA: 1, NYJ: 1, NE: 1, KC: 1, HOU: 1, PHI: 1, WAS: 1, DAL: 1, NYJ: 1 },
        CAR: { JAC: 1, HOU: 1, NO: 1, TB: 1, SEA: 1, PHI: 1, IND: 1, GB: 1, TEN: 1, WAS: 1, DAL: 1, NO: 1, ATL: 1, NYG: 1, ATL: 1, TB: 1 },
        CHI: { GB: 1, ARI: 1, SEA: 1, OAK: 1, KC: 1, DET: 1, MIN: 1, SD: 1, STL: 1, DEN: 1, GB: 1, SF: 1, WAS: 1, MIN: 1, TB: 1, DET: 1 },
        CIN: { OAK: 1, SD: 1, BAL: 1, KC: 1, SEA: 1, BUF: 1, PIT: 1, CLE: 1, HOU: 1, ARI: 1, STL: 1, CLE: 1, PIT: 1, SF: 1, DEN: 1, BAL: 1 },
        CLE: { NYJ: 1, TEN: 1, OAK: 1, SD: 1, BAL: 1, DEN: 1, STL: 1, ARI: 1, CIN: 1, PIT: 1, BAL: 1, CIN: 1, SF: 1, SEA: 1, KC: 1, PIT: 1 },
        DAL: { NYG: 1, PHI: 1, ATL: 1, NO: 1, NE: 1, NYG: 1, SEA: 1, PHI: 1, TB: 1, MIA: 1, CAR: 1, WAS: 1, GB: 1, NYJ: 1, BUF: 1, WAS: 1 },
        DEN: { BAL: 1, KC: 1, DET: 1, MIN: 1, OAK: 1, CLE: 1, GB: 1, IND: 1, KC: 1, CHI: 1, NE: 1, SD: 1, OAK: 1, PIT: 1, CIN: 1, SD: 1 },
        DET: { SD: 1, MIN: 1, DEN: 1, SEA: 1, ARI: 1, CHI: 1, MIN: 1, KC: 1, GB: 1, OAK: 1, PHI: 1, GB: 1, STL: 1, NO: 1, SF: 1, CHI: 1 },
        GB: { CHI: 1, SEA: 1, KC: 1, SF: 1, STL: 1, SD: 1, DEN: 1, CAR: 1, DET: 1, MIN: 1, CHI: 1, DET: 1, DAL: 1, OAK: 1, ARI: 1, MIN: 1 },
        HOU: { KC: 1, CAR: 1, TB: 1, ATL: 1, IND: 1, JAC: 1, MIA: 1, TEN: 1, CIN: 1, NYJ: 1, NO: 1, BUF: 1, NE: 1, IND: 1, TEN: 1, JAC: 1 },
        IND: { BUF: 1, NYJ: 1, TEN: 1, JAC: 1, HOU: 1, NE: 1, NO: 1, CAR: 1, DEN: 1, ATL: 1, TB: 1, PIT: 1, JAC: 1, HOU: 1, MIA: 1, TEN: 1 },
        JAC: { CAR: 1, MIA: 1, NE: 1, IND: 1, TB: 1, HOU: 1, BUF: 1, NYJ: 1, BAL: 1, TEN: 1, SD: 1, TEN: 1, IND: 1, ATL: 1, NO: 1, HOU: 1 },
        KC: { HOU: 1, DEN: 1, GB: 1, CIN: 1, CHI: 1, MIN: 1, PIT: 1, DET: 1, DEN: 1, SD: 1, BUF: 1, OAK: 1, SD: 1, BAL: 1, CLE: 1, OAK: 1 },
        MIA: { WAS: 1, JAC: 1, BUF: 1, NYJ: 1, TEN: 1, HOU: 1, NE: 1, BUF: 1, PHI: 1, DAL: 1, NYJ: 1, BAL: 1, NYG: 1, SD: 1, IND: 1, NE: 1 },
        MIN: { SF: 1, DET: 1, SD: 1, DEN: 1, KC: 1, DET: 1, CHI: 1, STL: 1, OAK: 1, GB: 1, ATL: 1, SEA: 1, ARI: 1, CHI: 1, NYG: 1, GB: 1 },
        NE: { PIT: 1, BUF: 1, JAC: 1, DAL: 1, IND: 1, NYJ: 1, MIA: 1, WAS: 1, NYG: 1, BUF: 1, DEN: 1, PHI: 1, HOU: 1, TEN: 1, NYJ: 1, MIA: 1 },
        NO: { ARI: 1, TB: 1, CAR: 1, DAL: 1, PHI: 1, ATL: 1, IND: 1, NYG: 1, TEN: 1, WAS: 1, HOU: 1, CAR: 1, TB: 1, DET: 1, JAC: 1, ATL: 1 },
        NYG: { DAL: 1, ATL: 1, WAS: 1, BUF: 1, SF: 1, PHI: 1, DAL: 1, NO: 1, TB: 1, NE: 1, WAS: 1, NYJ: 1, MIA: 1, CAR: 1, MIN: 1, PHI: 1 },
        NYJ: { CLE: 1, IND: 1, PHI: 1, MIA: 1, WAS: 1, NE: 1, OAK: 1, JAC: 1, BUF: 1, HOU: 1, MIA: 1, NYG: 1, TEN: 1, DAL: 1, NE: 1, BUF: 1 },
        OAK: { CIN: 1, BAL: 1, CLE: 1, CHI: 1, DEN: 1, SD: 1, NYJ: 1, PIT: 1, MIN: 1, DET: 1, TEN: 1, KC: 1, DEN: 1, GB: 1, SD: 1, KC: 1 },
        PHI: { ATL: 1, DAL: 1, NYJ: 1, WAS: 1, NO: 1, NYG: 1, CAR: 1, DAL: 1, MIA: 1, TB: 1, DET: 1, NE: 1, BUF: 1, ARI: 1, WAS: 1, NYG: 1 },
        PIT: { NE: 1, SF: 1, STL: 1, BAL: 1, SD: 1, ARI: 1, KC: 1, CIN: 1, OAK: 1, CLE: 1, SEA: 1, IND: 1, CIN: 1, DEN: 1, BAL: 1, CLE: 1 },
        SD: { DET: 1, CIN: 1, MIN: 1, CLE: 1, PIT: 1, GB: 1, OAK: 1, BAL: 1, CHI: 1, KC: 1, JAC: 1, DEN: 1, KC: 1, MIA: 1, OAK: 1, DEN: 1 },
        SEA: { STL: 1, GB: 1, CHI: 1, DET: 1, CIN: 1, CAR: 1, SF: 1, DAL: 1, ARI: 1, SF: 1, PIT: 1, MIN: 1, BAL: 1, CLE: 1, STL: 1, ARI: 1 },
        SF: { MIN: 1, PIT: 1, ARI: 1, GB: 1, NYG: 1, BAL: 1, SEA: 1, STL: 1, ATL: 1, SEA: 1, ARI: 1, CHI: 1, CLE: 1, CIN: 1, DET: 1, STL: 1 },
        STL: { SEA: 1, WAS: 1, PIT: 1, ARI: 1, GB: 1, CLE: 1, SF: 1, MIN: 1, CHI: 1, BAL: 1, CIN: 1, ARI: 1, DET: 1, TB: 1, SEA: 1, SF: 1 },
        TB: { TEN: 1, NO: 1, HOU: 1, CAR: 1, JAC: 1, WAS: 1, ATL: 1, NYG: 1, DAL: 1, PHI: 1, IND: 1, ATL: 1, NO: 1, STL: 1, CHI: 1, CAR: 1 },
        TEN: { TB: 1, CLE: 1, IND: 1, BUF: 1, MIA: 1, ATL: 1, HOU: 1, NO: 1, CAR: 1, JAC: 1, OAK: 1, JAC: 1, NYJ: 1, NE: 1, HOU: 1, IND: 1 },
        WAS: { MIA: 1, STL: 1, NYG: 1, PHI: 1, ATL: 1, NYJ: 1, TB: 1, NE: 1, NO: 1, CAR: 1, NYG: 1, DAL: 1, CHI: 1, BUF: 1, PHI: 1, DAL: 1 }
    }, unique_foes = 13,
    NFL_teams = ["ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAC", "KC", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "OAK", "PHI", "PIT", "SD", "SEA", "SF", "STL", "TB", "TEN", "WAS"],
    NFL_teams_len = NFL_teams.length,
    division_teams = {
        AE: ["BUF", "MIA", "NE", "NYJ"],
        AN: ["BAL", "CLE", "CIN", "PIT"],
        AS: ["HOU", "IND", "JAC", "TEN"],
        AW: ["DEN", "KC", "OAK", "SD"],
        NE: ["DAL", "NYG", "PHI", "WAS"],
        NN: ["CHI", "DET", "GB", "MIN"],
        NS: ["ATL", "CAR", "NO", "TB"],
        NW: ["ARI", "SF", "STL", "SEA"]
    },
    division = {
        BUF: "AE",
        MIA: "AE",
        NE: "AE",
        NYJ: "AE",
        BAL: "AN",
        CLE: "AN",
        CIN: "AN",
        PIT: "AN",
        HOU: "AS",
        IND: "AS",
        JAC: "AS",
        TEN: "AS",
        DEN: "AW",
        KC: "AW",
        OAK: "AW",
        SD: "AW",
        DAL: "NE",
        NYG: "NE",
        PHI: "NE",
        WAS: "NE",
        CHI: "NN",
        DET: "NN",
        GB: "NN",
        MIN: "NN",
        ATL: "NS",
        CAR: "NS",
        NO: "NS",
        TB: "NS",
        ARI: "NW",
        SF: "NW",
        STL: "NW",
        SEA: "NW"
    },
    table_offsets = {
        NE: 1,
        NN: 6,
        NS: 11,
        NW: 16,
        AE: 1,
        AN: 6,
        AS: 11,
        AW: 16
    }, active_tab,
    tab_prefixes = [
        "week-1",
        "week-2",
        "week-3",
        "week-4",
        "week-5",
        "week-6",
        "week-7",
        "week-8",
        "week-9",
        "week-10",
        "week-11",
        "week-12",
        "week-13",
        "week-14",
        "week-15",
        "week-16",
        "week-17",
		"week-18",
		"week-19",
		"week-20",
		"week-21",
        "help",
        "BUF",
        "MIA",
        "NE",
        "NYJ",
        "BAL",
        "CLE",
        "CIN",
        "PIT",
        "HOU",
        "IND",
        "JAC",
        "TEN",
        "DEN",
        "KC",
        "OAK",
        "SD",
        "DAL",
        "NYG",
        "PHI",
        "WAS",
        "CHI",
        "DET",
        "GB",
        "MIN",
        "ATL",
        "CAR",
        "NO",
        "TB",
        "ARI",
        "SF",
        "STL",
        "SEA"
    ],
    team_name = {
        ARI: "Arizona Cardinals",
        ATL: "Atlanta Falcons",
        BAL: "Baltimore Ravens",
        BUF: "Buffalo Bills",
        CAR: "Carolina Panthers",
        CHI: "Chicago Bears",
        CIN: "Cincinnati Bengals",
        CLE: "Cleveland Browns",
        DAL: "Dallas Cowboys",
        DEN: "Denver Broncos",
        DET: "Detroit Lions",
        GB: "Green Bay Packers",
        HOU: "Houston Texans",
        IND: "Indianapolis Colts",
        JAC: "Jacksonville Jaguars",
        KC: "Kansas City Chiefs",
        MIA: "Miami Dolphins",
        MIN: "Minnesota Vikings",
        NE: "New England Patriots",
        NO: "New Orleans Saints",
        NYG: "New York Giants",
        NYJ: "New York Jets",
        OAK: "Oakland Raiders",
        PHI: "Philadelphia Eagles",
        PIT: "Pittsburgh Steelers",
        SD: "San Diego Chargers",
        SEA: "Seattle Seahawks",
        SF: "San Francisco 49ers",
        STL: "St. Louis Rams",
        TB: "Tampa Bay Buccaneers",
        TEN: "Tennessee Titans",
        WAS: "Washington Redskins"
    },
    NFC_table = document.getElementById("NFC-table"),
    AFC_table = document.getElementById("AFC-table"),
    table_divider = '<div style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;</div>',
    NO_GAME = 0,
    AWAY_WIN = 1,
    HOME_WIN = 2,
    TIE_GAME = 3,
    WINS = 0,
    LOSSES = 1,
    TIES = 2,
    cookie_bits = [],
    cookie_letters = [],
    game_position = {},
    game_states = {},
    unpicked_games_count = game_list_len,
    conf_record = {},
    div_record = {},
    all_record = {},
    SOS_record = {},
    SOV_record = {},
    conf_pct = {},
    div_pct = {},
    all_pct = {},
    team_pct = {},
    SOS_pct = {},
    SOV_pct = {},
    ii,
    jj;
my_init_func();
function my_init_func() {
    var g = getCookie(games_cookie_name), b = getParam("a"), e, f, a, d, c, h; for (e = NFL_teams_len; e--;) {
        team_week_lists[NFL_teams[e]] = []
    }
    for (e = 0; e < number_of_weeks; e++) {
        a = week_lists[e]; d = a.length;
        Array.prototype.push.apply(game_list, a);
        for (f = 0; f < d; f++) {
            c = a[f];
            h = c.match(/(\w+)-(\w+)/);
            team_week_lists[h[1]][e] = c;
            team_week_lists[h[2]][e] = c
        }
    }
    for (e = game_list_len; e--;) {
        game_position[game_list[e]] = e
    }
    clear_data();
    if (b !== "") {
        set_games_from_string(b)
    }
    else {
        if (g !== null && g !== "") {
            set_games_from_string(g)
        }
    }
    set_all_rankings();
    show_week_tab("week-1");
    set_game_cookie(cookie_letters, true)
}
function calc_pct(a) {
    var b = a[WINS] + a[LOSSES] + a[TIES];
    if (b === 0) {
        return 0
    }
    return (a[WINS] + 0.5 * a[TIES]) / b
}
function coin_flip(b) {
    var c = b[0], a;
    for (a = 1; a < b.length; a++) {
        if (b[a] < c) { c = b[a] }
    }
    return c;
}
function clear_data() {
    var c,
        b,
        a;
    unpicked_games_count = 256;
    for (c = NFL_teams_len; c--;) {
        a = NFL_teams[c];
        document.getElementById(a + "-WLT").innerHTML = "0-0";
        document.getElementById(a + "-div").innerHTML = "0-0";
        all_record[a] = [0, 0, 0];
        conf_record[a] = [0, 0, 0];
        div_record[a] = [0, 0, 0];
        SOS_record[a] = [0, 0, 0];
        SOV_record[a] = [0, 0, 0];
        all_pct[a] = 0;
        conf_pct[a] = 0;
        div_pct[a] = 0;
        SOS_pct[a] = 0;
        SOV_pct[a] = 0
    }
    for (c = game_list_len; c--;) {
        b = game_list[c];
        game_states[b] = NO_GAME
    }
    for (c = cookie_letter_length; c--;) {
        cookie_bits[c] = 0;
        cookie_letters[c] = "A"
    }
}

function set_games_from_string(b) {
    if (b.match(cookie64_re) === null) {
        alert("Game data is corrupt, sorry. :(");
        clear_data(); return
    }
    var a = [],
        c = b.substring(1, 1 + cookie_letter_length).split("");
    ii;
    for (ii = 0; ii < cookie_letter_length; ii++) {
        value = base64.indexOf(c[ii]);
        a[ii] = value
    }
    for (ii = 0; ii < game_list_len; ii++) {
        bit_subslot = ii % 3;
        bit_slot = (ii - bit_subslot) / 3; game_value = (a[bit_slot] >> (bit_subslot * 2)) & 3;
        change_game(game_list[ii], game_value)
    }
}

function xor_cookie_bits(b, c, a) {
    position = game_position[b];
    bit_subslot = position % 3;
    bit_slot = (position - bit_subslot) / 3;
    new_value = cookie_bits[bit_slot] ^ ((c ^ a) * Math.pow(4, bit_subslot));
    cookie_bits[bit_slot] = new_value;
    cookie_letters[bit_slot] = base64[new_value];
}

function reset_button() {
    if (confirm("Reset all games to unpicked?")) {
        clear_data(); set_all_rankings();
        set_game_cookie(cookie_letters, true);
        show_week_tab("week-1")
    }
}

function set_game_buttons(b, a) {
    var c = b.match(/(\w+)-(\w+)/);
    if (document.getElementById(b + "-away-td") === null) {
        return
    }
    switch (a) {
        case AWAY_WIN:
            document.getElementById(b + "-away-td").className = c[2] == active_tab ? "team-font selected other-team-tab" : "team-font selected " + c[1];
            document.getElementById(b + "-tie-td").className = "anti-selected"; document.getElementById(b + "-home-td").className = "team-font anti-selected";
            break;
        case HOME_WIN:
            document.getElementById(b + "-away-td").className = "team-font anti-selected";
            document.getElementById(b + "-tie-td").className = "anti-selected";
            document.getElementById(b + "-home-td").className = c[1] == active_tab ? "team-font selected other-team-tab" : "team-font selected " + c[2];
            break;
        case TIE_GAME:
            document.getElementById(b + "-away-td").className = "team-font tied-team";
            document.getElementById(b + "-tie-td").className = "selected tied-tie";
            document.getElementById(b + "-home-td").className = "team-font tied-team";
            break;
        case NO_GAME:
            document.getElementById(b + "-away-td").className = "team-font not-selected";
            document.getElementById(b + "-tie-td").className = "not-selected";
            document.getElementById(b + "-home-td").className = "team-font not-selected";
            break
    }
}

function set_standings_game(b, a) {
    var c = b.match(/(\w+)-(\w+)/);

    switch (a) {
        case AWAY_WIN:
            modify_game(b, c[1], c[2], 1, 0);
            break;
        case HOME_WIN:
            modify_game(b, c[2], c[1], 1, 0);
            break;
        case TIE_GAME:
            modify_game(b, c[1], c[2], 0, 1);
            break
    }
}

function change_game(c, b) {
    var a = game_states[c],
        d;
    if (a != b) {
        d = c.match(/(\w+)-(\w+)/); game_states[c] = b;
        xor_cookie_bits(c, a, b);
        switch (a) {
            case AWAY_WIN:
                modify_game(c, d[1], d[2], -1, 0);
                break;
            case HOME_WIN:
                modify_game(c, d[2], d[1], -1, 0);
                break;
            case TIE_GAME:
                modify_game(c, d[1], d[2], 0, -1);
                break;
            case NO_GAME:
                break
        }
        set_standings_game(c, b); set_game_buttons(c, b)
    }
}

function wgc(b, a) {
    if (a == game_states[b]) {
        a = NO_GAME
    }
    change_game(b, a);
    set_game_cookie(cookie_letters);
    set_all_rankings();
	edit_playoffs();
}

function set_all_rankings() {
    var d = [],
        a = [],
        c = {},
        b;
    if (unpicked_games_count > 255) {
        b = "You haven't picked any games. "
    }
    else {
        if (unpicked_games_count > 1) {
            b = "You have " + unpicked_games_count + " unpicked games. "
        }
        else {
            if (unpicked_games_count > 0) {
                b = "You have 1 unpicked game. "
            }
            else {
                b = ""
            }
        }
    }
    document.getElementById("unpicked-warning").innerHTML = b;
    conf_ranker(
        [
            div_ranker("NE", NFC_table, a, c),
            div_ranker("NN", NFC_table, a, c),
            div_ranker("NS", NFC_table, a, c),
            div_ranker("NW", NFC_table, a, c)
        ], 'NFC'
    );

    conf_ranker(
        [
            div_ranker("AE", AFC_table, d, c),
            div_ranker("AN", AFC_table, d, c),
            div_ranker("AS", AFC_table, d, c),
            div_ranker("AW", AFC_table, d, c)
        ], 'AFC');

    wild_ranker(d, c, 'AFC');
    wild_ranker(a, c, 'NFC');
	
	edit_playoffs();
}

function wild_ranker(c, b, confName) {
    var e = c.slice(0),
        a,
        d;

    a = conf_pick_top(e);
    document.getElementById(a + "-conf-rank").innerHTML = '<font color="green"><b>5</b></font>';
    e.splice(e.indexOf(a), 1); e.push(b[a]); d = conf_pick_top(e);
    document.getElementById(d + "-conf-rank").innerHTML = '<font color="green"><b>6</b></font>';
    conferenceRankingObject[confName].placements[5] = { name: a, record: all_record[a] };
    conferenceRankingObject[confName].placements[6] = { name: d, record: all_record[d] };
	
	//Non-Playoff Teams
	e.splice(e.indexOf(d), 1); e.push(b[d]);
	var seventhPlace = conf_pick_top(e);
	document.getElementById(seventhPlace + "-conf-rank").innerHTML = '<font color="red">7</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(seventhPlace), 1); e.push(b[seventhPlace]);
	var eighthPlace = conf_pick_top(e);
	document.getElementById(eighthPlace + "-conf-rank").innerHTML = '<font color="red">8</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(eighthPlace), 1); e.push(b[eighthPlace]);
	var ninthPlace = conf_pick_top(e);
	document.getElementById(ninthPlace + "-conf-rank").innerHTML = '<font color="red">9</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(ninthPlace), 1); e.push(b[ninthPlace]);
	var tenthPlace = conf_pick_top(e);
	document.getElementById(tenthPlace + "-conf-rank").innerHTML = '<font color="red">10</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(tenthPlace), 1); e.push(b[tenthPlace]);
	var eleventhPlace = conf_pick_top(e);
	document.getElementById(eleventhPlace + "-conf-rank").innerHTML = '<font color="red">11</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(eleventhPlace), 1); e.push(b[eleventhPlace]);
	var twelthPlace = conf_pick_top(e);
	document.getElementById(twelthPlace + "-conf-rank").innerHTML = '<font color="red">12</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(twelthPlace), 1); e.push(b[twelthPlace]);
	var thirteenthPlace = conf_pick_top(e);
	document.getElementById(thirteenthPlace + "-conf-rank").innerHTML = '<font color="red">13</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(thirteenthPlace), 1); e.push(b[thirteenthPlace]);
	var fourteenthPlace = conf_pick_top(e);
	document.getElementById(fourteenthPlace + "-conf-rank").innerHTML = '<font color="red">14</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(fourteenthPlace), 1); e.push(b[fourteenthPlace]);
	var fifthteenthPlace = conf_pick_top(e);
	document.getElementById(fifthteenthPlace + "-conf-rank").innerHTML = '<font color="red">15</font>';
	
	cleanArray(e);
	e.splice(e.indexOf(fifthteenthPlace), 1); e.push(b[fifthteenthPlace]);
	var sixteenthPlace = conf_pick_top(e);
	document.getElementById(sixteenthPlace + "-conf-rank").innerHTML = '<font color="red">16</font>';
}

function cleanArray(e) {
	
	for (var i = 0; i < e.length; i++) {
		if (e[i] == undefined) {         
			e.splice(i, 1);
		i--;
		}
	}
	return e;
}

function exchange(d, c, b) {
    var a = b.tBodies[0].getElementsByTagName("tr"),
        e,
        f = 4;
    if (parseFloat(b.rows[d].cells[f].textContent) < parseFloat(b.rows[c].cells[f].textContent)) {
        return;
    }
    if (d == c + 1) {
        b.tBodies[0].insertBefore(a[d], a[c])
    }
    else {
        if (c == d + 1) {
            b.tBodies[0].insertBefore(a[c], a[d])
        }
        else {
            e = b.tBodies[0].replaceChild(a[d], a[c]);
            if (typeof (a[d]) != "undefined") {
                b.tBodies[0].insertBefore(e, a[d])
            }
            else {
                b.appendChild(e)
            }
        }
    }
}

function sort_div(c, a) {
    var b = table_offsets[c];
    exchange(b, b + 2, a);
    exchange(b + 1, b + 3, a);
    exchange(b, b + 1, a);
    exchange(b + 2, b + 3, a);
    exchange(b + 1, b + 2, a)
}

function conf_ranker(c, confName) {
    if (unpicked_games_count === 256) return;
    var e = c.slice(0),
        b,
        d,
        a;

    b = conf_pick_top(e);
    document.getElementById(b + "-conf-rank").innerHTML = '<font color="green"><b>1</b></font>';
    e.splice(e.indexOf(b), 1);
    d = conf_pick_top(e);
    document.getElementById(d + "-conf-rank").innerHTML = '<font color="green"><b>2</b></font>';
    e.splice(e.indexOf(d), 1); a = conf_pick_top(e);
    document.getElementById(a + "-conf-rank").innerHTML = '<font color="green"><b>3</b></font>';
    e.splice(e.indexOf(a), 1);
    document.getElementById(e[0] + "-conf-rank").innerHTML = '<font color="green"><b>4</b></font>';
    if (confName) {
        conferenceRankingObject[confName] = {
            name: confName,
            placements: {}
        };
        conferenceRankingObject[confName].placements[1] = { name: b, record: all_record[b] };
        conferenceRankingObject[confName].placements[2] = { name: d, record: all_record[d] };
        conferenceRankingObject[confName].placements[3] = { name: a, record: all_record[a] };
        conferenceRankingObject[confName].placements[4] = { name: e[0], record: all_record[e[0]] }
    }
}

function div_ranker(b, d, c, f) {
    var h = division_teams[b].slice(0),
        e,
        g,
        a,
		l;

    e = division_pick_top(h);
    document.getElementById(e + "-div-rank").innerHTML = 1;
    h.splice(h.indexOf(e), 1);
    g = division_pick_top(h);
    document.getElementById(g + "-div-rank").innerHTML = 2;
    document.getElementById(g + "-conf-rank").innerHTML = "";
    h.splice(h.indexOf(g), 1);
    c.push(g);
    a = division_pick_top(h);
    document.getElementById(a + "-div-rank").innerHTML = 3;
    document.getElementById(a + "-conf-rank").innerHTML = "";
    h.splice(h.indexOf(a), 1); f[g] = a;
    document.getElementById(h[0] + "-div-rank").innerHTML = 4;
    document.getElementById(h[0] + "-conf-rank").innerHTML = "";
	f[a] = h[0];
    sort_div(b, d);
    return e
}

function conf_pick_top(a) {
    remaining_teams = best_pct(a, all_pct);
    if (remaining_teams.length == 1) {
        return remaining_teams[0];
    }
    return (conf_tiebreaker(remaining_teams));
}

function conf_tiebreaker(b) {
    var a = (b.length > 2),
        c = b.slice(0);

    c = hth_conf(b);

    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return conf_tiebreaker(c);
            }
    }
    c = best_pct(c, conf_pct);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return conf_tiebreaker(c)
            }
    } c = best_common_pct(c);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return conf_tiebreaker(c);
            }
    }
    c = best_pct(c, SOV_pct);

    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return conf_tiebreaker(c);
            }
    }
    c = best_pct(c, SOS_pct);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return conf_tiebreaker(c);
            }
    }
    return coin_flip(c);
}
function division_pick_top(a) {
    remaining_teams = best_pct(a, all_pct);
    if (remaining_teams.length == 1) {
        return remaining_teams[0]
    } return (division_tiebreaker(remaining_teams))
}

function division_tiebreaker(b) {
    var a = (b.length > 2),
        c;
    c = hth_div(b);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return division_tiebreaker(c)
            }
    }
    c = best_pct(c, div_pct);

    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return division_tiebreaker(c)
            }
    }
    c = best_common_pct(c);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return division_tiebreaker(c);
            }
    }
    c = best_pct(c, conf_pct);
    switch (c.length) {
        case 1:
            return c[0];
        case 2: if (a) {
            return division_tiebreaker(c);
        }
    }
    c = best_pct(c, SOV_pct);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return division_tiebreaker(c)
            }
    } c = best_pct(c, SOS_pct);
    switch (c.length) {
        case 1:
            return c[0];
        case 2:
            if (a) {
                return division_tiebreaker(c);
            }
    }
    return coin_flip(c);
}

function hth_conf(e) {
    var g,
        a = e.length,
        b,
        f,
        c,
        d;
    for (c = a; c--;) {
        b = e[c];
        for (d = a; d--;) {
            if (c == d) {
                continue;
            }
            f = e[d];
            if (!(game_states[b + "-" + f] == AWAY_WIN || game_states[f + "-" + b] == HOME_WIN)) {
                break;
            }
        }
        if (d < 0) { return [b] }
    }
    for (c = a; c--;) {
        b = e[c];
        for (d = a; d--;) {
            if (c == d) {
                continue;
            }
            f = e[d];
            if (!(game_states[b + "-" + f] == HOME_WIN || game_states[f + "-" + b] == AWAY_WIN)) {
                break;
            }
        }
        if (d < 0) {
            g = e.slice(0);
            g.splice(c, 1);
            return g
        }
    } return e
}

function hth_div(g) {
    var a, f = {},
        h = {},
        d, e, c,
        b;

    a = g.length;
    for (d = a; d--;) {
        f[g[d]] = [0, 0, 0]
    }
    for (d = a; d--;) {
        c = g[d];

        for (e = a; e--;) {
            if (d == e) {
                continue;
            }
            b = g[e];
            switch (game_states[c + "-" + b]) {
                case AWAY_WIN:
                    f[c][WINS]++;
                    f[b][LOSSES]++;
                    break;
                case HOME_WIN:
                    f[b][WINS]++;
                    f[c][LOSSES]++;
                    break;
                case TIE_GAME:
                    f[c][TIES]++;
                    f[b][TIES]++;
                    break
            }
        }
    }
    for (d = a; d--;) {
        c = g[d]; h[c] = calc_pct(f[c])
    }
    return best_pct(g, h);
}

function common_foes(f) {
    var e = foe_lookup[f[0]],
        c = f.length, a = [],
        b,
        d;

    loop_first_foes:
        for (b = 0; b < unique_foes; b++) {
            foe_to_check = e[b];
            for (d = 1; d < c; d++) {
                if (foe_hash[f[d]][foe_to_check] == undefined) {
                    continue loop_first_foes;
                }
            }
            a.push(foe_to_check)
        } return a
}

function best_common_pct(g) {
    var h = g.length,
        f = {},
        a = common_foes(g),
        b = a.length,
        k,
        e,
        c,
        d,
        j,
        i = [];

    for (k = h; k--;) {
        f[g[k]] = [0, 0, 0]
    }
    for (k = 0; k < b; k++) {
        c = a[k];

        for (e = 0; e < h; e++) {
            d = g[e]; j = f[d]; switch (game_states[c + "-" + d]) {
                case AWAY_WIN:
                    j[LOSSES]++;
                    break;
                case HOME_WIN:
                    j[WINS]++;
                    break;
                case TIE_GAME:
                    j[TIES]++;
                    break
            }

            switch (game_states[d + "-" + c]) {
                case AWAY_WIN:
                    j[WINS]++;
                    break;
                case HOME_WIN:
                    j[LOSSES]++;
                    break;
                case TIE_GAME:
                    j[TIES]++;
                    break
            }
        }
    }

    for (k = 0; k < g.length; k++) {
        d = g[k];
        j = f[d];
        if (j[WINS] + j[LOSSES] + j[TIES] < 4) {
            return g;
        }
        i[d] = calc_pct(j)
    }
    return best_pct(g, i)
}

function best_pct(e, d) {
    var b = [e[0]],
        a = d[e[0]],
        c;

    for (c = 1; c < e.length; c++) {
        test_pct = d[e[c]];
        if (test_pct > a) {
            b = [e[c]];
            a = test_pct
        }
        else {
            if (test_pct == a) {
                b.push(e[c]);
            }
        }
    }
    return b;
}

function set_tabbing_buttons(b) {
    var a = tab_prefixes.length,
        c,
        d;

    active_tab = b;
    document.getElementById("help-tab").style.display = "none";
    autogen_tab.style.display = "block";
    for (c = a; c--;) {
        d = tab_prefixes[c];
        if (d == b) {
            document.getElementById(d + "-button").className = "button_down"
        }
        else {
            document.getElementById(d + "-button").className = "button_up"
        }
    }
}
function show_help() {
    set_tabbing_buttons("help");
    autogen_tab.style.display = "none";
    document.getElementById("help-tab").style.display = "block";
}

function show_week_tab(e) {
    var d,
        g,
        b,
        f,
        c,
        a = document.getElementById("autogen_tab");

    set_tabbing_buttons(e);
    a.className = "";
    d = e.match(/week-(\d+)/);
    g = parseInt(d[1], 10);
    b = week_lists[g - 1];
    a.innerHTML = week_tab(e, g, b);
    for (f = b.length; f--;) {
        c = b[f];
        set_game_buttons(c, game_states[c])
    }
}

function show_team_tab(c) {
    set_tabbing_buttons(c);
    var a = document.getElementById("autogen_tab"),
        d,
        b;
    a.className = c;
    a.innerHTML = team_header(c) + '<div style="clear:both"><br></div>' + make_team_game_tables(c);
    d = team_week_lists[c];
    for (ii = d.length; ii--;) {
        b = d[ii];
        if (b != undefined) {
            set_game_buttons(b, game_states[b]);
        }
    }
}

function week_tab(e, k, p) {
    var j,
        o,
        l,
        i = [],
        m = [],
        b = [],
        a = "",
        d,
        h,
        f,
        c = "", g = "", n; d = bye_lookup[k]; if (d != undefined) {
            a = '<div class="bye_header">Byes: ' + d + "</div>"
        }
    j = p.length; for (n = 0; n < j; n++) {
        o = p[n]; l = o.match(/(\w+)-(\w+)/);
        h = division[l[1]][0];
        f = division[l[2]][0];
        if (h != f) {
            m.push(o)
        }
        else {
            if (h == "A") {
                i.push(o)
            }
            else { b.push(o) }
        }
    }
    if (k > 1) {
        c = '<input class="button_up" type="button" onclick="show_week_tab(\'week-' + (k - 1) + '\')"value="<-- Go to Week ' + (k - 1) + '"></input>';
    }
    if (k < number_of_weeks) {
        g = '<input class="button_up" type="button" style="text-align:right" onclick="show_week_tab(\'week-' + (k + 1) + '\')"value="Go to Week ' + (k + 1) + ' -->"></input>'
    }
    return "Week " + k + ":" + a + "<div>" + week_game_table("AFC", i) + table_divider + week_game_table("AFC vs. NFC", m) + table_divider + week_game_table("NFC", b) + '</div><div style="clear:both"><br></div><div><div style="float:left">' + c + '</div><div style="float:right">' + g + "</div></div>" + table_divider
}

function team_header(b) {
    var a,
        c;
    a = team_name[b].toUpperCase().match(/(.*)\s(.*)/);
    c = a[1] + "&nbsp;<br>" + a[2];
    return '<div><div class="m-icon sp-m' + b + '" style="float: left"></div><div class="team-header" style="float: left">&nbsp;' + c + '&nbsp</div><div class="m-icon sp-m' + b + '" style="float: left"></div><table class="recordtable" style="float: right"><tr><th>WLT</th><th>Div</th><th>Conf</th></tr><tr><td id="team-WLT">' + WLT_string(all_record[b]) + '</td><td id="team-div">' + WLT_string(div_record[b]) + '</td><td id="team-conf">' + WLT_string(conf_record[b]) + '</td></tr><tr><th>SOV</th><th>SOS</th><th></th></tr><tr><td id="team-SOV">' + SOV_pct[b].toFixed(3) + '</td><td id="team-SOS">' + SOS_pct[b].toFixed(3) + "</td><td></td></tr></table></div>";
}

function make_team_game_tables(a) {
    return team_game_table(1, 6, a) + table_divider + team_game_table(7, 12, a) + table_divider + team_game_table(13, 17, a)
}

function week_game_table(g, b) {
    var c,
        e,
        j = "",
        a = "",
        f = "",
        k = "",
        i,
        h,
        d;

    c = '<div style="float:left"><table class="gametable"><tr><th colspan="3">' + g + '</th><th class="transparent"></th></tr><tr><th>Away</th><th class="transparent"></th><th>Home</th><th class="transparent"></th></tr>';

    d = b.length;
    for (h = 0; h < d; h++) {
        i = b[h];
        e = game_buttons(i);
        switch (day_codes[game_position[i]]) {
            case "T":
                j += e;
                break;
            case " ":
            case "U":
            case "C":
            case "Z":
                a += e;
                break;
            case "N":
                f += e;
                break;
            case "M":
                k += e;
                break;
            //default: alert("OUCH " + i);
			default: a += e;
                break
        }
    }
    c += j + a + f + k + "</table></div>";
    return c
}

function team_game_table(e, c, b) {
    var f, g, d, a; f = '<div style="float:left"><table class="gametable ' + b + '" ><tr><th class="transparent"></th><th class="' + b + '"      >Away</th><th class="transparent"></td><th class="' + b + '"      >Home</th><th class="transparent"></th></tr>'; g = team_week_lists[b]; for (d = e; d <= c; d++) { a = g[d - 1]; f += game_buttons(a, d) } f += "</table></div>"; return f
}

function game_buttons(i, a) {
    var b = (a == undefined) ? "" : "<td>" + a + " </td>", g, c, f, d, h, e;
    if (i == undefined) {
        e = "<tr>" + b + '<td class="byeweek" colspan="3">Bye week</td></tr>'
    } else {
        g = i.match(/(\w+)-(\w+)/);
        c = g[1];
        f = g[2];
        d = day_codes[game_position[i]];
        h = day_explaination[d];
        e = "<tr>" + b + '<td id="' + i + '-away-td" onclick="wgc( \'' + i + "', " + AWAY_WIN + ')"><div class="m-icon sp-m' + c + '" style="float: left"></div><div style="float:right;padding:3px">' + c + '<br>&nbsp;</div></td><td title="Click = to predict a tie."id="' + i + '-tie-td"  onclick="wgc( \'' + i + "', " + TIE_GAME + ')">&nbsp;=&nbsp;</td><td id="' + i + '-home-td" onclick="wgc( \'' + i + "', " + HOME_WIN + ')"><div style="float:left;padding:3px">' + f + '<br>&nbsp;</div><div class="m-icon sp-m' + f + '" style="float: right"></div></td><td title="' + h + '">' + d + "</td></tr>"
    }
    return e
}


function WLT_string(a) {
    return (a[TIES] === 0) ? a.slice(0, 2).join("-") : a.slice(0, 3).join("-")
}

function update_WLT_html(e, b, a, g, d) {
    var f, c;
    f = WLT_string(a);
    c = WLT_string(g);
    if (d !== "conf") {
        document.getElementById(e + "-" + d).innerHTML = f;
        document.getElementById(b + "-" + d).innerHTML = c
    }
    if (active_tab === e) {
        document.getElementById("team-" + d).innerHTML = f
    }
    else {
        if (active_tab === b) {
            document.getElementById("team-" + d).innerHTML = c
        }
    }
}

function modify_game(e, d, b, c, a) { unpicked_games_count -= (c + a); if (a == -1) { modify_SOV(e, d, b, 0, -1); modify_SOV(e, b, d, 0, -1) } else { if (c == -1) { modify_SOV(e, d, b, -1, 0) } } game_work(d, b, all_record, all_pct, "WLT", c, a); modify_SOS(d, c, 0, a); modify_SOS(b, 0, c, a); if (a == 1) { modify_SOV(e, d, b, 0, 1); modify_SOV(e, b, d, 0, 1) } else { if (c == 1) { modify_SOV(e, d, b, 1, 0) } } if (division[d][0] == division[b][0]) { game_work(d, b, conf_record, conf_pct, "conf", c, a); if (division[d] == division[b]) { game_work(d, b, div_record, div_pct, "div", c, a) } } } function game_work(i, h, d, g, b, c, a) { var f = d[i], e = d[h]; f[WINS] += c; e[LOSSES] += c; f[TIES] += a; e[TIES] += a; g[i] = calc_pct(f); g[h] = calc_pct(e); update_WLT_html(i, h, f, e, b) } function modify_SOV(e, j, i, n, r) { var p = foe_lookup[j], o = foe_lookup[i], b, f, a, h, k, d, m, c, g, l, q; c = SOV_record[j]; g = all_record[i]; c[WINS] += g[WINS] * n; c[LOSSES] += g[LOSSES] * n; c[TIES] += g[TIES] * n; l = calc_pct(c); SOV_pct[j] = l; if (active_tab == j) { document.getElementById("team-SOV").innerHTML = l.toFixed(3) } for (f = 0; f < unique_foes; f++) { b = p[f]; a = SOV_record[b]; h = j + "-" + b; k = (h == e) ? undefined : game_states[h]; if (k == HOME_WIN) { a[WINS] += n; a[TIES] += r } d = b + "-" + j; m = (d == e) ? undefined : game_states[d]; if (m == AWAY_WIN) { a[WINS] += n; a[TIES] += r } q = calc_pct(a); SOV_pct[b] = q; if (active_tab == b) { document.getElementById("team-SOV").innerHTML = q.toFixed(3) } if (r === 0) { b = o[f]; a = SOV_record[b]; h = i + "-" + b; k = (h == e) ? undefined : game_states[h]; if (k === HOME_WIN) { a[LOSSES] += n } d = b + "-" + i; m = (d == e) ? undefined : game_states[d]; if (m === AWAY_WIN) { a[LOSSES] += n } q = calc_pct(a); SOV_pct[b] = q; if (active_tab == b) { document.getElementById("team-SOV").innerHTML = q.toFixed(3) } } } } function modify_SOS(e, d, j, a) {
    var g = division[e], f = foe_lookup[e], c, b, h, i;
    for (i = unique_foes; i--;) {
        c = f[i];
        b = (division[c] == g) ? 2 : 1;
        h = SOS_record[c];
        h[WINS] += b * d;
        h[LOSSES] += b * j;
        h[TIES] += b * a;
        foe_SOS_pct = calc_pct(h);
        SOS_pct[c] = foe_SOS_pct;
        if (active_tab == c) {
            document.getElementById("team-SOS").innerHTML = foe_SOS_pct.toFixed(3)
        }
    }
};
function rnfl(elem) {
    isRNFLMarkdown = elem.checked;
    markdownExport();
}
function markdownExport() {
    var sb = [];
    var url = $("#save_string").html();
    if (!url) return;
    for (var conference in conferenceRankingObject) {
        var conferenceName = conferenceRankingObject[conference].name,
            conferenceLogo = '';
        if (isRNFLMarkdown) {
            conferenceLogo = "[](/" + conferenceName+")"
        }
        //1-6
        sb.push("#" + conferenceLogo + conferenceName+"\n\n");
        sb.push("Rank | Team | W | L | T\n");
        sb.push("-|-|-:|-:|-:|\n");

        for (var placement in conferenceRankingObject[conference].placements) {
            /* AFC
             *  1   |   KC  |  8 |  8   |   0   |
             */
            var team = conferenceRankingObject[conference].placements[placement],
                TeamLogo = '';
            if (isRNFLMarkdown) {
                TeamLogo = "[](/" + team.name + ")";
            }
            sb.push(placement + "|" + TeamLogo
                + "["+team.name +"]("+url+"#"+ team.name+")" + "|"
                + team.record[0] + "|"
                + team.record[1] + "|"
                + team.record[2] + "|\n");
        }
    }
    sb.push("[Generated by the NFL Playoff Predictor](" + url + ")");
    $("#markdownField").html(sb.join(''));
}

function update_outcomes() {
	
	set_games_from_string('-WapWqmmlmamVppZmllqWqlqZVmqZVamWpaqapZaqaqmWllZVlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA_');
	set_all_rankings();
    set_game_cookie(cookie_letters, true);
}

function edit_playoffs() {
	
	//Wild Card
	var afcWildCard1 = conferenceRankingObject['AFC'].placements[5].name + '-' + conferenceRankingObject['AFC'].placements[4].name;
	var afcWildCard2 = conferenceRankingObject['AFC'].placements[6].name + '-' + conferenceRankingObject['AFC'].placements[3].name;
	var nfcWildCard1 = conferenceRankingObject['NFC'].placements[5].name + '-' + conferenceRankingObject['NFC'].placements[4].name;
	var nfcWildCard2 = conferenceRankingObject['NFC'].placements[6].name + '-' + conferenceRankingObject['NFC'].placements[3].name;
	week_lists[17] = [afcWildCard1, afcWildCard2, nfcWildCard1, nfcWildCard2];
	
	//Divisional
	var afcDivisional1 = conferenceRankingObject['AFC'].placements[4].name + '-' + conferenceRankingObject['AFC'].placements[1].name;
	var afcDivisional2 = conferenceRankingObject['AFC'].placements[3].name + '-' + conferenceRankingObject['AFC'].placements[2].name;
	var nfcDivisional1 = conferenceRankingObject['NFC'].placements[4].name + '-' + conferenceRankingObject['NFC'].placements[1].name;
	var nfcDivisional2 = conferenceRankingObject['NFC'].placements[3].name + '-' + conferenceRankingObject['NFC'].placements[2].name;
	week_lists[18] = [afcDivisional1, afcDivisional2, nfcDivisional1, nfcDivisional2];
	
	//Conference Championships
	var afcChampionship = conferenceRankingObject['AFC'].placements[2].name + '-' + conferenceRankingObject['AFC'].placements[1].name;
	var nfcChampionship = conferenceRankingObject['NFC'].placements[2].name + '-' + conferenceRankingObject['NFC'].placements[1].name;
	week_lists[19] = [afcChampionship, nfcChampionship];
	
	//Super Bowl
	var superBowl = conferenceRankingObject['NFC'].placements[1].name + '-' + conferenceRankingObject['AFC'].placements[1].name;
	week_lists[20] = [superBowl];
}