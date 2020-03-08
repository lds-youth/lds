window.onload = function () {
    activities();
};

function activities() {

    // ID of the Google Spreadsheet
    var spreadsheetID = "1htKurJOhlkboSaiK3_ehqASi-Z9gHyBQbLOc1YPp7h4";

    // Make sure it is public or set to Anyone with link can view
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";


    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(x) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var activities = JSON.parse(xhr.responseText);
            CreateTableFromJSON(activities.feed.entry);
        }
    }
}

function CreateTableFromJSON(act) {
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = ['Date', 'Activity', 'Details'];

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var fields = [];

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < act.length; i++) {
        fields = [act[i].gsx$date.$t, act[i].gsx$activity.$t, act[i].gsx$details.$t, act[i].gsx$linkifexists.$t];
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var field = fields[j];
            var link = fields[j + 1];

            var tabCell = tr.insertCell(-1);
            if (j == col.length - 1 && link) {
                tabCell.appendChild(generateLink(field, link));
            } else {
                tabCell.innerHTML = field;
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("attach");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function generateLink(text, link) {
    var a = document.createElement('a');
    var linkNode = document.createTextNode(text);
    a.appendChild(linkNode);
    a.title = text;
    a.href = link;
    return a;
}