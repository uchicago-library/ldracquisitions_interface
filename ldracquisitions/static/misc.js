function checkEquality(prime, comparable)
{
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

function addADataObjectToLocalStorage(dataObject)
{
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
    if (answer == true)
    {
        var lastPage = localStorage.getItem("lastPage");
        localStorage.clear();
        location.replace(lastPage);
    }
}

function checkForSubFormInfo() {
    "use strict";
    var isDonors = localStorage.getItem("Donor").length
    var isSources = localStorage.getItem("Source").length
    var isPhysMedia = localStorage.getItem("Physical Media Information").length
    var isRestriction = localStorage.getItem("Restriciton Information").length
    console.log(isDonors);
    console.log(isSources);
    console.log(isPhysMedia);
    console.log(isRestriction);
    return true;
}

function capitalize_Words(str) {
    "use strict";
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function groupEverythingIntoOneObject(inputsArray, storedObject, recordTypeString)
{
    "use strict";
    //var anArray = storedObject.keys();
    var obj = new Object();
    $.each(inputsArray, function(index, value) {
        var name = value.getAttribute('name');
        var displayName = '';
        var nameWordList = name.split('-');
        $.each(nameWordList, function(si, sv) {
            displayName = displayName + capitalize_Words(sv) + ' ';
        });
        var data = value.value;
        displayName = displayName.trim();
        if (value.getAttribute("type") == "checkbox")
        {
            if (value.checked)
            {

                obj[displayName] = true;
            }
            else 
            {
                obj[displayName] = false;
            }
        }
        else
        {
            if (data != "")
            {
                obj[displayName] = data;
            }
        }
    });
    for (var key in storedObject) 
    {
        if (key != 'lastPage') {
            if (key == 'Accession Type')
            {
                var data = storedObject[key]; 
                data = JSON.parse(data);
                data = JSON.parse(data[0]);
                data = data["Label"];
                obj[key] = data;

            }
            else {
            var data = storedObject[key];
            var unjsonified = JSON.parse(data);
            var newArray = new Array();
            $.each(unjsonified, function(ssi, ssv) {
                newArray.push(JSON.parse(ssv)); 
            });
            obj[key] = unjsonified;
            }
        }
    }
    var curdate = new Date();
    var date = curdate.getDate();
    var month = curdate.getMonth();
    var year = curdate.getFullYear();
    var dateString = month+"/"+date+"/"+year;
    obj["Acquisition Date"] = dateString;
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