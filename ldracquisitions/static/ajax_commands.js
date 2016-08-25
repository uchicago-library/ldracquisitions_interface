function postNewRecord(o) {
    console.log("hi from postNewRecord");
    return $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/record",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: !1,
        error: function()
        {
            alert("Error occurred");
        }
    });
}

function addKeyValueToRecord(recordID, key, obj) {
    var urlString= "http://127.0.0.1:5000/record/" + recordID + "/" + encodeURIComponent(key);
    json_obj = JSON.stringify(obj);
    return $.ajax({
        type: "POST",
        url: urlString,
        contentType: "application/json",
        dataType: "json",
        data: json_obj,
        async: !1,
        error: function()
        {
            alert("Error occurred posting key/value to record");
        }
    });
}

function getAValueInARecord(recordId, key) {
    "use strict";
    var urlString = "http://127.0.0.1:5000/record/"+recordId+"/"+encodeURIComponent(key);
    return $.ajax({
        type:"GET",
        url: urlString,
        contenType: "application/json",
        dataType: "json",
        async: !1,
        error: function() {
            alert("An error occured fetching "+urlString);
        }
    })
}

function getRecord(recordID) {
    return $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/record/" + recordID,
        data: JSON.stringify(new Object()),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: !1,
        error: function()
        {
            alert("Error occurred");
        }
    });
}

function getRecordsByCategory(categoryName) {
    var urlString = "http://127.0.0.1:5000/category/" + categoryName;
    return $.ajax({
        type: "GET",
        url: urlString,
        data: JSON.stringify(new Object()),
        contentType: "application/json",
        dataType: "json",
        async: !1,
        error: function() {
            alert("Could not connect the endpoint for that category");
        }
    });
}

function addRecordToCategory(categoryName, obj) 
{
    var urlString = "http://127.0.0.1:5000/category/"+categoryName;
    console.log(urlString);
    console.log(obj);
    return $.ajax({
        type: "POST",
        url: urlString,
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        async:!1,
        error: function() {
            alert("Could not connect to endpoint for that category");
        }
    });
}

function getCollectionTitleList() {
    var collection_category = getRecordsByCategory('Collection');
    var records = collection_category.responseJSON.data.record_identifiers;
    var out = new Array();
    $.each(records, function(index, value) {
        var vdata = getAValueInARecord(value, "Collection Title");
        var vdata = vdata.responseJSON.data.value[0];
        out.push(vdata);
    });
    return out;
}
