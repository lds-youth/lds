window.onload = function () {
    yc();
};

function yc() {

    // ID of the Google Spreadsheet
    var spreadsheetID = "1htKurJOhlkboSaiK3_ehqASi-Z9gHyBQbLOc1YPp7h4";
    var gid = "3"

    // Make sure it is public or set to Anyone with link can view
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + gid + "/public/values?alt=json";


    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(x) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var talks = JSON.parse(xhr.responseText);
            CreateTableFromJSON(talks.feed.entry);
            // document.getElementById("test").innerHTML = JSON.stringify(talks);
        }
    }
}

function CreateTableFromJSON(act) {

    var i = 0;
    //MAIN HEADLINE
    document.getElementById("h-title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("h-subtitle").innerHTML = act[i].gsx$subtitle.$t;
    document.getElementById("h-caption").innerHTML = act[i].gsx$text.$t;
    i++
    //Blue Section Left
    document.getElementById("b-title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("b-subtitle").innerHTML = act[i].gsx$subtitle.$t;
    document.getElementById("b-caption").innerHTML = act[i].gsx$text.$t;
    generateLink(act[i].gsx$button.$t, act[i].gsx$link.$t, "b-link");
    i++
    //Body Text
    document.getElementById("t-title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("t-subtitle").innerHTML = act[i].gsx$subtitle.$t;
    document.getElementById("t-caption").innerHTML = act[i].gsx$text.$t;
}

function generateLink(text, link, id) {
    var a = document.getElementById(id);
    a.innerHTML = text;
    a.href = link;
    return a;
}