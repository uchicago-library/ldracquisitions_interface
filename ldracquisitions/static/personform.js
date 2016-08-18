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
    if (anObject['Phone'] == undefined) {
        anArray = new Array();
    }
    else {
        anArray = anObject['Phone'];
    }
    anArray.push(anInputElement.value);
    anObject['Phone'] = anArray;
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
    var anArray = null;
    if (anObject['First Name'] == undefined) {
        anArray = [];
    }
    else
    {
        anArray = anObject['First Name'];
    }
    anArray.push(anInputElement.value);
    anObject['First Name'] = anArray;
    return anObject;
}

function unserializeQuantity(anInputElement, anObject)
{
    "use strict";
    var baseObject = null;
    if (anObject['Physical Media Information'] != undefined) {
        baseObject = anObject['Physical Media Information'];
    }
    else
    {
       anObject['Physical Media Information'] = new Object();
       baseObject = anObject['Physical Media Information'];
    }
    var anArray = new Array();
    anArray.push(anInputElement.value);
    baseObject['Quantity'] = anArray;
    return anObject['Physical Media Information'];
}

function unserializeLabel(anInputElement, anObject)
{
    "use strict";
    var baseObject = null;
    if (anObject['Physical Media Information'] != undefined) {
        baseObject = anObject['Physical Media Information'];
    }
    else
    {
       anObject['Physical Media Information'] = new Object();
       baseObject = anObject['Physical Media Information'];
    }
    var anArray = new Array();
    anArray.push(anInputElement.value);
    baseObject['Label'] = anArray;
    return anObject;
}

function unserializeRestrictionCode(anInputElement, anObject)
{
    "use strict";
    var anArray = new Array();
    anArray.push(anInputElement.value);
    anObject['Restriction Code'] = anArray;
    return anObject;
}

function unserializeRestrictionComment(anInputElement, anObject)
{
    "use strict";
    var anArray = new Array();
    anArray.push(anInputElement.value);
    anObject['Restriction Comment'] = anArray;
    return anObject;
}
