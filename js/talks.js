window.onload = function () {
    talks();
};

function talks() {

    // ID of the Google Spreadsheet
    var spreadsheetID = "1htKurJOhlkboSaiK3_ehqASi-Z9gHyBQbLOc1YPp7h4";
    var gid = "2"

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
    // CREATE DYNAMIC TABLE.

    var i = 0;
    //MAIN HEADLINE
    document.getElementById("m-Title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("m-Caption").innerHTML = act[i].gsx$text.$t;
    i++
    //THEME
    document.getElementById("t-Title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("t-Caption").innerHTML = act[i].gsx$text.$t;
    generateLink(act[i].gsx$button.$t, act[i].gsx$link.$t, "t-Link");
    i++
    //Picture Caption
    generateLink(act[i].gsx$text.$t, act[i].gsx$link.$t, "p-Link");
    i++
    //TALK 1
    document.getElementById("tk1-Title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("tk1-Author").innerHTML = act[i].gsx$author.$t;
    document.getElementById("tk1-Caption").innerHTML = act[i].gsx$text.$t;
    generateLink(act[i].gsx$button.$t, act[i].gsx$link.$t, "tk1-Link");
    i++
    //TALK 2
    document.getElementById("tk2-Title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("tk2-Author").innerHTML = act[i].gsx$author.$t;
    document.getElementById("tk2-Caption").innerHTML = act[i].gsx$text.$t;
    generateLink(act[i].gsx$button.$t, act[i].gsx$link.$t, "tk2-Link");
    i++
    //TALK 3
    document.getElementById("tk3-Title").innerHTML = act[i].gsx$title.$t;
    document.getElementById("tk3-Author").innerHTML = act[i].gsx$author.$t;
    document.getElementById("tk3-Caption").innerHTML = act[i].gsx$text.$t;
    generateLink(act[i].gsx$button.$t, act[i].gsx$link.$t, "tk3-Link");
}

function generateLink(text, link, id) {
    var a = document.getElementById(id);
    a.innerHTML = text;
    a.href = link;
    return a;
}