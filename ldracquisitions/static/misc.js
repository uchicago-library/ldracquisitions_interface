function checkEquality(prime, comparable) {
    "use strict";
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
    "use strict";
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
        //var currentValue = JSON.parse(storedObjectArray);
        var anArray = null;
        if (obj[value] != undefined)
        {
            console.log("hi");
            anArray = obj[value];
        }
        else {
            console.log("foo");
            anArray = new Array();
        }
        console.log(anArray);
        obj[value] = anArray;
    });
    return obj;
}

function isObjInArray(anArray, objectToFind) {
    "use strict";
    for (var i=0; i<anArray.length; i++) {
        var cur = anArray[i];
        if (cur.dt_text == objectToFind.dt_text) {
            return true;
        }
    }
    return false;
}

function WhichLink()
{
    "use strict";
    var link = null;
    if (localStorage.getItem("lastPage") == "index.html")
    {
        link = "acquisition.html";
    }
    else if (localStorage.getItem("lastPage") == "list.html")
    {
        link = "accession.html";
    }
    return link;
}

function AddEmail()
{
    "use strict";
    var phonenumbersgroup = document.getElementsByClassName("email-addresses");
    var inputrows = phonenumbersgroup[phonenumbersgroup.length - 1].getElementsByClassName("email-address-row");
    var formgroup = inputrows[inputrows.length - 1].getElementsByClassName("form-group")[0];
    var lastinput = formgroup.getElementsByTagName("input")[0];
    var lastlabel = formgroup.getElementsByTagName("label")[0];
    var lastinputname = lastinput.getAttribute("name");
    var lastinputnum = parseInt(lastinputname.split('-')[2]);
    var newinputnum = lastinputnum + 1;
    var newinputname = 'email-' + newinputnum.toString();
    var newinput = lastinput.cloneNode();
    newinput.value = "";
    var newlabel = lastlabel.cloneNode();
    newlabel.setAttribute("for", newinputname);
    newlabel.appendChild(document.createTextNode("Email Address"));
    newinput.setAttribute('name', newinputname);
    var newformgroupdiv = document.createElement("div")
    newformgroupdiv.setAttribute("class", "form-group")
    newformgroupdiv.appendChild(newlabel);
    newformgroupdiv.appendChild(newinput);
    var newformgrouperrorsdiv = document.createElement("div");
    newformgrouperrorsdiv.setAttribute("class", "help-block with-errors");
    newformgroupdiv.appendChild(newformgrouperrorsdiv);
    var newformgroupcol = document.createElement("div");
    newformgroupcol.setAttribute('class', 'col-sm-10');
    newformgroupcol.appendChild(newformgroupdiv);
    var newformgrouprow = document.createElement("div");
    newformgrouprow.setAttribute("class", "row email-address-row");
    newformgrouprow.appendChild(newformgroupcol);
    phonenumbersgroup[0].appendChild(newformgrouprow);
}

function AddPhoneNumber() 
{
    "use strict";
    var phonenumbersgroup = document.getElementsByClassName("phone-numbers");
    var inputrows = phonenumbersgroup[phonenumbersgroup.length - 1].getElementsByClassName("phone-number-row");
    var formgroup = inputrows[inputrows.length - 1].getElementsByClassName("form-group")[0]
    var lastinput = formgroup.getElementsByTagName("input")[0];
    var lastlabel = formgroup.getElementsByTagName("label")[0];
    var lastinputname = lastinput.getAttribute("name");
    var lastinputnum = parseInt(lastinputname.split('-')[2]);
    var newinputnum = lastinputnum + 1;
    var newinputname = 'phone-number-' + newinputnum.toString();
    var newinput = lastinput.cloneNode();
    newinput.value = "";
    var newlabel = lastlabel.cloneNode();
    newlabel.setAttribute("for", newinputname);
    newlabel.appendChild(document.createTextNode("Phone Number"));
    newinput.setAttribute('name', newinputname);
    var newformgroupdiv = document.createElement("div")
    newformgroupdiv.setAttribute("class", "form-group")
    newformgroupdiv.appendChild(newlabel);
    newformgroupdiv.appendChild(newinput);
    var newformgrouperrorsdiv = document.createElement("div");
    newformgrouperrorsdiv.setAttribute("class", "help-block with-errors");
    newformgroupdiv.appendChild(newformgrouperrorsdiv);
    var newformgroupcol = document.createElement("div");
    newformgroupcol.setAttribute('class', 'col-sm-10');
    newformgroupcol.appendChild(newformgroupdiv);
    var newformgrouprow = document.createElement("div");
    newformgrouprow.setAttribute("class", "row phone-number-row");
    newformgrouprow.appendChild(newformgroupcol);
    phonenumbersgroup[0].appendChild(newformgrouprow);
}

function AddMailingAddressInput() 
{
    var addressgroup = document.getElementsByClassName("address-forms")
    var addressrows = addressgroup[addressgroup.length - 1].getElementsByClassName("address-form-row");
    var lastaddressrow = addressrows[addressrows.length - 1];
    var newaddressrow = lastaddressrow.cloneNode(true);
    var addressrowclasses = (newaddressrow.getAttribute('class'));
    var addressrowunit = addressrowclasses.split(' ')[1];
    var lastaddressrowunitnum = parseInt(addressrowunit.split('-')[2]);
    console.log(addressrowunit);
    var newaddressrowunitnum = lastaddressrowunitnum + 1;
    console.log(newaddressrowunitnum);
    var str_newaddressunitnum = newaddressrowunitnum.toString();
    var newaddressrowname = 'mailing-address-' + str_newaddressunitnum;
    newaddressrow.setAttribute('class', 'address-form-row ' + newaddressrowname);
    newaddressrowlegend = newaddressrow.getElementsByTagName("legend")[0]
    newaddressrowlegenda = newaddressrowlegend.getElementsByTagName('a')
    if (newaddressrowlegenda.length == 1) {
        newaddressrowlegend.removeChild(newaddressrowlegend.getElementsByTagName('a')[0]);
    }
    inputsToChange = newaddressrow.getElementsByClassName('form-control')
    for (var i = 0; i < inputsToChange.length; i++) {
        var inputName = inputsToChange[i].getAttribute('name');
        oldnumber = newaddressrowunitnum - 1;
        newnumber = newaddressrowunitnum;
        newInputName = inputName.replace(oldnumber.toString(), newnumber.toString());
        inputsToChange[i].setAttribute('name', newInputName);
        inputsToChange[i].value = "";
    }
    addressgroup[0].appendChild(newaddressrow);
}