function postNewRecord(o) {
    return $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:5000/record",
        data: JSON.stringify(o),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: !1,
        error: function() 
        {
            alert("Error occurred");
        }
    });
}

function addKeyValueToRecord(recordID, key, o) {
    urlString = "http://127.0.0.1:5000/record/" + recordID + "/" + key;
    json_obj = JSON.stringify(o);
    console.log(json_obj);
    console.log(urlString);
    return $.ajax({
        type: 'POST',
        url: urlString,
        contentType: 'application/json',
        dataType: "json",
        data: json_obj,
        async: !1,
        error: function() 
        {
            alert("Error occurred posting key/value to record");
        }
    });
}

function getRecord(recordID) {
    return $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:5000/record/" + recordID,
        data: JSON.stringify(new Object()),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: !1,
        error: function() 
        {
            alert("Error occurred");
        }
    });
}
