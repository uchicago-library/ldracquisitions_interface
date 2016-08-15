function unserializeAddressPart(anInputElement, anObject) {
    "use strict";
    var name = anInputElement.getAttribute('name');
    var number = name.split('address-')[1];
    number = number.split('-')[0];
    var test = anObject['Address Information'];
    var anArray = null;
    if (test == undefined) {
        anArray = [];
    }
    else {
        anArray = test;
    }
    var currentAddress = null;
    var indexToRemove = null;
    for (var i=0; i<anArray.length; i++) {
         var cur = anArray[i];
         if (cur.num == number)
         {
            indexToRemove = i;
            currentAddress = cur;
         }
     }
     if (currentAddress == null) {
         currentAddress = new Object();
         currentAddress.num = number;
     }

    if (name.indexOf('zipcode') >= 0)
    {
        currentAddress['Zip Code'] = anInputElement.value;
    }
    else if (name.indexOf('street-address') >= 0)
    {
         currentAddress['Street Address'] = anInputElement.value;
    }
    else if (name.indexOf('unit-number') >= 0)
    {
        currentAddress['Unit Number'] = anInputElement.value;
    }
    else if (name.indexOf('state') >= 0)
    {
        currentAddress['State'] = anInputElement.value;
    }
    else if (name.indexOf('city') >= 0)
    {
        currentAddress['City'] = anInputElement.value;
    }

    if (indexToRemove != null) {
        anArray.splice(i, 1);
    }
    else {
        anArray.push(currentAddress)
    }
    anObject['Address Information'] = anArray;
    return anObject;
}

function unseriailzeEmail(anInputElement, anObject) {
    if (anObject.Email == undefined) {
        anArray = new Array();
    }
    else {
        anArray = anObject.Email;
    }
    anArray.push(anInputElement.value);
    anObject['Email'] = anArray;
    return anObject;
}

function unserializePhoneNumber(anInputElement, anObject) {
    if (anObject['Phone Number'] == undefined) {
        anArray = new Array();
    }
    else {
        anArray = anObject['Phone Number'];
    }
    anArray.push(anInputElement.value);
    anObject['Phone Number'] = anArray;
    return anObject;
}

function unserializeLastName(anInputElement, anObject) {
    if (anObject['Last Name'] == undefined) {
        anArray = new Array();
    }
    else {
        anArray = anObject['Last Name'];
    }
    anArray.push(anInputElement.value);
    anObject['Last Name'] = anArray;
    return anObject;
}

function unserializeFirstName(anInputElement, anObject) {
    if (anObject['First Name'] == undefined) {
        anArray = new Array();
    }
    else {
        anArray = anObject['First Name'];
    }
    anArray.push(anInputElement.value);
    anObject['First Name'] = anArray;
    return anObject;
}