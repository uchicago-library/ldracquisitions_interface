function checkEquality(prime, comparable) {
    if (!comparable || prime.length != comparable.length) {
        return false;
    }
    for (var i=0; i<prime.length; i++) {
        if (prime[i] != comparable[i]) {
            return false;
        }
    }
    return true;
}

function addADataObjectToLocalStorage(dataObject) {
    "use strict";
    var category = dataObject.category;
    var anArray = null;
    console.log(category)
    if (localStorage.getItem(category) != undefined)
    {
        anArray = JSON.parse(localStorage.getItem(category));
    }
    else
    {
        anArray = new Array();
    }
    anArray.push(JSON.stringify(dataObject));

    for (var i=0; i<anArray.length; i++) {
        var curObj = JSON.parse(anArray[i]);
        if (!checkEquality(curObj, dataObject)) {
            anArray.push(JSON.stringify(dataObject));
        }
    }
    localStorage.setItem(category, JSON.stringify(anArray));
}

function doCancelButton() {
    "use strict";
    var answer = confirm(
     "Are you sure? If you proceed with this command you will be deleting all the work you have been started with this acquisition."
    );
    if (answer == true) {
        var lastPage = localStorage.getItem("lastPage");
        localStorage.clear();
        location.replace(lastPage);
    }
}

function checkForSubFormInfo() {
    "use strict";
    var isDonors = localStorage.getItem("donors");
    var isSources = localStorage.getItem("sources");
    var isPhysMedia = localStorage.getItem("physmedia");
    var isRestriction = localStorage.getItem("restriction");
    if (!!isDonors || !!isSources || !!isPhysMedia || !isRestriction) {
        return false;
    }
    return true;
}

function capitalize_Words(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function saveARecord(inputsArray, storedObject, recordTypeString) {
    "use strict";
    var obj = new Object();
    var anArray = Object.keys(storedObject);

    $.each(inputsArray, function(index, value) {
        var name = value.getAttribute('name');
        var data = value.value;
        obj[name] = data;
    });

    $.each(anArray, function(index, value) {
       console.log("this is from " + value);
       var storedObjectArray = storedObject[value];
       var currentValue = storedObject[value];
       currentValue = JSON.parse(currentValue);
       var anArray = null;
       if (obj[value] != undefined) {
           anArray = obj[value];
       }
       else {
           anArray = new Array();
       }
       if (obj[value] == undefined) {
           $.each(currentValue, function(i,v) {
               var curObj = JSON.parse(v);
               var check = isObjInArray(anArray, curObj);
               console.log(check);
               if (!check) {
                   anArray.push(curObj);
               }
           });
       }
       obj[value] = anArray;
    });
    return obj;
}

function isObjInArray(anArray, objectToFind) {
    for (var i=0; i<anArray.length; i++) {
        var cur = anArray[i];
        if (cur.dt_text == objectToFind.dt_text) {
            return true;
        }
    }
    return false;
}
