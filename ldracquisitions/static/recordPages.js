/*global window*/
/*global alert*/
/*global $*/
/*global confirm*/

var ajaxURL = "https://y2.lib.uchicago.edu/hrapi/";

$(document).ready(function() {
    "use strict";

    function displayAWord(aString) {
        var firstLetter = aString[0].toUpperCase();
        var restOfString = aString.slice(1, aString.length);
        return firstLetter + restOfString;
    }

    function displayAMachinePhrase(aString) {
        var stringParts = aString.split("-");
        var output = "";
        for (var n in stringParts) {
            output = output + " " + displayAWord(stringParts[n]);
        }
        return output;
    }

    function machinifyAPhrase(aString) {
        var newPhrase = aString.replace(/\s/g, '-');
        return newPhrase.toLowerCase();
    }

    function formLabel(forId) {
        var labelStrings = forId.split("-");
        var labelText = "";
        if (labelStrings.length > 1) {
            var i = null;
            var cur = null;
            var display = null;
            var newLabelText = null;
            for (i = 0; i < labelStrings.length; i += 1) {
                cur = labelStrings[i];
                display = displayAWord(cur);
                newLabelText = " " + display;
                labelText += newLabelText;
            }
        } else if (labelStrings.length === 1) {
            labelText = displayAWord(labelStrings[0]);
        }
        var label = document.createElement("label");
        label.setAttribute("for", forId);
        if (labelText !== "" && labelText.indexOf("Save") === -1 && labelText.indexOf("Cancel") === -1) {
            label.appendChild(document.createTextNode(labelText));
        }
        return label;
    }

    function formSelectField(inputName, innerElementList) {
        var select = document.createElement("select");
        select.setAttribute("name", inputName);
        select.setAttribute("class", "form-control");
        var i = null;
        for (i = 0; i < innerElementList.length; i += 1) {
            select.appendChild(innerElementList[i]);
        }
        return select;
    }

    function formSelectOptionItem(valueString) {
        var option = document.createElement("option");
        option.setAttribute("id", valueString);
        option.appendChild(document.createTextNode(valueString));
        return option;
    }

    function formInputField(inputName, inputType, placeholder) {
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", inputName);
        input.setAttribute("type", inputType);
        input.setAttribute("id", inputName);
        return input;
    }

    function formHiddenField(inputName, inputValue) {
        var input = document.createElement("input");
        input.setAttribute("name", inputName);
        input.setAttribute("type", "hidden");
        input.value = inputValue;
        return input;
    }

    function formTextAreaField(inputName, placeholder) {
        var textfield = document.createElement("textarea");
        textfield.setAttribute("class", "form-control");
        textfield.setAttribute("name", inputName);
        return textfield;
    }

    function formCheckBoxField(inputName) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", inputName);
        return checkbox;
    }

    function formGroup(innerElement, helpText) {
        var div = document.createElement("div");
        div.setAttribute("class", "form-group");
        var labelName = innerElement.getAttribute("name");
        var popOverElement = document.createElement("a");
        if (helpText !== undefined) {
            popOverElement.setAttribute("data-toggle", "popover");
            popOverElement.setAttribute("data-placement", "right");
            popOverElement.setAttribute("data-content", helpText);
            popOverElement.appendChild(document.createTextNode("Help"));
        }
	if (labelName.indexOf("address-information-") >= 0) {
		labelName = labelName.split(/address-information-\d+-/)[1]
	} else if (labelName.indexOf("physmedia") >= 0) {
        labelName = labelName.split('-')[2];
    }
    var label = null;
	var inputName = innerElement.getAttribute("name");
        if (innerElement.getAttribute("type") === "checkbox") {
            label = formLabel(labelName);
	    label.setAttribute("class", "center-block");
            div.appendChild(label);
        label.appendChild(document.createElement("?"));
        div.appendChild(document.createTextNode(" "));
        div.appendChild(popOverElement);
	    div.appendChild(innerElement);
        } else if ((innerElement.getAttribute("type") === "submit") | (innerElement.getAttribute("name") === "cancel")) {
            label = formLabel(labelName);
            div.appendChild(label);
            div.appendChild(document.createTextNode(" "));
            div.appendChild(innerElement);
        } else {
            label = formLabel(labelName);
            div.appendChild(label);
            div.appendChild(document.createTextNode(" "));
            if (helpText !== undefined) {
                div.appendChild(popOverElement);
            }
            div.appendChild(innerElement);
        }
        return div;
    }

    function phoneGroupDiv(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("id", "phone-numbers");
        div.appendChild(innerElement);
        return div;
    }

    function emailGroupDiv(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("id", "emails");
        div.appendChild(innerElement);
        return div;
    }

    function physMediaGroupDiv(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("id", "physmedia");
        div.appendChild(innerElement);
        return div;
    }

    function formRow(innerElementList) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");
        var i = null;
        for (i = 0; i < innerElementList.length; i += 1) {
            div.appendChild(innerElementList[i]);
        }
        return div;
    }

    function formRowWholeColumn(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("class", "col-sm-10");
        div.appendChild(innerElement);
        return div;
    }

    function formRowHalfColumn(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("class", "col-sm-5");
        div.appendChild(innerElement);
        return div;
    }

    function formRowThirdColumn(innerElement) {
        var div = document.createElement("div");
        div.setAttribute("class", "col-sm-3");
        div.appendChild(innerElement);
        return div;
    }

    function makeAFormInputRequired(inputElement) {
        inputElement.setAttribute("required", "true");
        return inputElement;
    }

    function setRegexValidatorInput(inputElement, regexPattern, titleString) {
        inputElement.setAttribute("pattern", regexPattern);
        inputElement.setAttribute("title", titleString);
        return inputElement;
    }

    function makePhoneInput(num) {
        var name = "phone-" + num.toString();
        var phone = formRowWholeColumn(formGroup(setRegexValidatorInput(formInputField(name, "tel", "773-555-5555 or 1-2345"), "\\d{3}[-]\\d{3}[-]\\d{4}|\\d{1}[-]\\d{4}", "should look like 7773-444-5555 or 1-2345"), "Enter a phone number at which we can reach the individual or the organization." ));
        return formRow([phone]);
    }

    function addInputToGroupDiv(inputElement, idString) {
        var divToAppendTo = document.getElementById(idString);
        divToAppendTo.appendChild(inputElement);
        return divToAppendTo;

    }

    function makeEmailInput(num) {
        var name = "email-" + num.toString();
        var email = formRowWholeColumn(formGroup(formInputField(name, "email", "example@uchicago.edu", "should be a valid email address"), "Enter the individual's primary email address here."));
        return formRow([email]);
    }

    function makePhysMediaInput(num) {
        var name = "physmedia-" + num.toString();
        var physmediaOptions = ["", "3.5in floppy disk", "5.25 floppy disk", "8in floppy disk", "CD", "DVD", "USB storage", "Hard drive (external)", "Hard drive (internal)", "Zip disk", "Computer (laptop)", "Computer (desktop)"]
        var mediaRealOptions = []
        var i = null;
        for (i = 0; i < physmediaOptions.length; i += 1) {
            mediaRealOptions.push(formSelectOptionItem(physmediaOptions[i]));
        }
        var physmedialabel = formGroup(makeAFormInputRequired(formSelectField(name +  "-label-" + num, mediaRealOptions)), "Select the medium name that matches the item that you are looking at. If there are more than types of physical media, than add a lne for each type");
        var physmediaquantity = formGroup(makeAFormInputRequired(formInputField(name + "-quantity-" + num, "num", "10")), "Enter the number of total pieces of this type of physical media represented in the accession.");
        var aFormRow = formRow([formRowHalfColumn(physmedialabel), formRowHalfColumn(physmediaquantity)]);
        return aFormRow;
    }


    function submitButton(buttonLabel, abandonHopeButtonLabel) {
        var button = document.createElement("button");
        var cancel = document.createElement("a");
        button.setAttribute("name", "save");
        //button.setAttribute("type", "submit");
        button.setAttribute("class", "btn btn-primary");
        button.appendChild(document.createTextNode(buttonLabel));
        if (abandonHopeButtonLabel !== null) {
        cancel.setAttribute("href", "null");
        cancel.setAttribute("name", "cancel");
        cancel.setAttribute("class", "btn btn-warning");
        cancel.setAttribute("role", "button");
        cancel.appendChild(document.createTextNode(abandonHopeButtonLabel));
        return formRow([formRowHalfColumn(formGroup(button)), formRowHalfColumn(formGroup(cancel))]);
        } else {
        return formRow([formRowHalfColumn(formGroup(button))])
        }


    }

    function getPrePopElements() {
        var inputs = $("input");
        var textareas = $("textarea");
        return { inputs: inputs, textareas: textareas };
    }

    function addRecordToCategory(categoryName, recordID) {
        var urlString = ajaxURL + 'category/' + categoryName;
        var newObj = Object.create(null);
        newObj.record_identifier = recordID;
        var data = $.ajax({
            type: "POST",
            url: urlString,
            data: JSON.stringify(newObj),
            async: true,
            success: function(data) {
                return data;
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        return data;
    }

    function getRecord(recordID) {
        var urlString = ajaxURL + "record/" + recordID;
        var newObj = Object.create(null);
        return $.ajax({
            type: "GET",
            url: urlString,
            data: JSON.stringify(newObj),
            async: false,
            success: function(data) {
                return data;
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }


    function getRecordsByCategory(categoryName) {
        var urlString = ajaxURL + "category/" + categoryName;
        var newObj = Object.create(null);
        return $.ajax({
            type: "GET",
            url: urlString,
            data: JSON.stringify(newObj),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                return data;
            }
        });
    }

    function getCollections() {
        var urlString = "https://y2.lib.uchicago.edu/inventory/inventories/collections.json";
        var newObj = Object.create(null);
        return $.ajax({
            type: "GET",
            url: urlString,
            data: JSON.stringify(newObj),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                return data;
            }
        });
    }



    function getAValueInARecord(recordId, key) {
        "use strict";
        var urlString = ajaxURL + "record/" + recordId + "/" + encodeURIComponent(key);
        var newObj = Object.create(null);
        return $.ajax({
            type: "GET",
            url: urlString,
            data: JSON.stringify(newObj),
            contenType: "application/json",
            dataType: "json",
            async: false,
            success: function(data) {
                return data;
            }
        })
    }

    function getCollectionTitleList() {
	var collections = getCollections().responseJSON.Collections
	return collections
	/*if (localStorage["Collections"] == undefined) {
        	var collection_category = getRecordsByCategory('Collection');
		var records = collection_category.responseJSON.data.record_identifiers;
	      	var out = new Array();
        	$.each(records, function(index, value) {
            		var vdata = getAValueInARecord(value, "Collection Title");
            		var vdata = vdata.responseJSON.data.value[0];
	            	out.push(vdata);
        	});
                localStorage.setItem("Collections", JSON.stringify(out));
		return out;
	} else {
		var collections = JSON.parse(localStorage.getItem("Collections"));
		return collections;
	}*/
    }

    function postNewRecord(o) {
        var urlString = ajaxURL + "record";
        var newObj = Object.create(null);
        return $.ajax({
            type: "POST",
            url: urlString,
            data: JSON.stringify(newObj),
            async: false,
            success: function(data) {
                return data;
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }

    function addKeyValueToRecord(recordID, key, valueString) {
        var urlString = ajaxURL + "record/" + recordID + "/" + encodeURIComponent(key);
        var newObj = Object.create(null);
        newObj.value = valueString;
        return $.ajax({
            type: "POST",
            url: urlString,
            data: JSON.stringify(newObj),
            async: false,
            success: function(data) {
                return data;
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }

    function findObjectInAnArray(id, listName) {
        var gettable = localStorage.getItem(listName);
        var out = Object.create(null);
        var match = null;
        if (gettable !== null) {
            var mainObj = JSON.parse(localStorage.getItem(listName));
            var keys = Object.keys(mainObj);

            for (var n in keys) {
                var cur = n;
                if (cur === id) {
                    match = mainObj[cur];
                }
            }
        }
        return match;
    }

    function getAValueFromCurrentRecord(record, inputElement) {
        if (typeof(inputElement) === "object") {
            name = displayAMachinePhrase(inputElement.getAttribute("name")).replace(' ', '');
            if (typeof(record[name]) === "string") {
                inputElement.value = record[name];
            } else if (record[name] instanceof Array) {
                inputElement.value = record[name][0];
            }
        }
        return inputElement;
    }

    function prePopInputs(currentRecord) {
        var selects = document.getElementsByTagName("select");
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");
        for (var n in selects) {
            getAValueFromCurrentRecord(currentRecord, selects[n]);
        }
        for (var n in inputs) {
            getAValueFromCurrentRecord(currentRecord, inputs[n]);
        }
        for (var n in textareas) {
            getAValueFromCurrentRecord(currentRecord, textareas[n]);
        }
    }

    function prePopMajorForm(word) {
        buildAcquisitionForm();
        var n = localStorage.getItem("Major Form");
        var data = null
        if (n !== null) {
            data = JSON.parse(n);
        }
        var d = data[0];
        $.each(Object.keys(d), function(index, value) {
            var st = "[name='" + value + "']";
	    if (value == "other-collection-status") {
        	var otherCollectionStatus = formRow([formRowWholeColumn(formGroup(makeAFormInputRequired(formInputField("other-collection-status", "text", ""))))]);
		var theDiv = document.getElementById("collection-status-definition");
		theDiv.appendChild(otherCollectionStatus);
	    }
	    if (value == "other-organization") {
		var input = formInputField("other-organization", "text", "")
		var requiredInput = makeAFormInputRequired(input);
		var theGroup = formGroup(requiredInput);
		var theRow = formRow([formRowWholeColumn(theGroup)]);
		var theDiv = document.getElementById("organization-definition");
		theDiv.appendChild(theRow);	
	    }
            var t = $(st);
            t.val(d[value]);
        });
    }

    function prePopPersonForm(word) {
        buildPersonForm(word);
        var currentRecord = findObjectInAnArray(id, displayAWord(word));
        var emaildiv = document.getElementById("emails");
        var phonediv = document.getElementById("phone-numbers");
        var addresses = document.getElementById("addresses");
        var recordEmails = currentRecord["Email"];
        var recordPhones = currentRecord["Phone"];
        var recordAddresses = currentRecord["Address Information"];
        if (recordEmails !== undefined) {
            var emailKeys = Object.keys(recordEmails);
            var copied = emailKeys.splice(1, emailKeys.length - 1);
            for (var i in copied) {
                if (i == "0") {
                    i = "2";
                }
                var newEmailInput = makeEmailInput(i);

                addInputToGroupDiv(newEmailInput, "emails");
            }
            for (var j in Object.keys(currentRecord["Email"])) {
                var newNumber = (parseInt(j) + 1).toString();
                var cur = recordEmails[j];
                var a = $("input[name='email-" + newNumber.toString() + "']");
                a.val(cur);
            }
        }
        if (recordPhones !== undefined) {
            var phoneKeys = Object.keys(recordPhones);
            for (var i in phoneKeys.splice(1, phoneKeys.length - 1)) {
                if (i == "0") {
                    i = "2";
                }
                var newPhoneInput = makePhoneInput(i);
                addInputToGroupDiv(newPhoneInput, "phone-numbers");
            }
            for (var j in Object.keys(currentRecord["Phone"])) {
                var newNumber = (parseInt(j) + 1).toString();
                var cur = recordPhones[j];
                var a = $("input[name='phone-" + newNumber + "']")
                a.val(cur);
            }
        }
        if (recordAddresses !== undefined) {
            var addressKeys = Object.keys(recordAddresses);
            for (var i in addressKeys.splice(1, addressKeys.length - 1)) {
                if (i == "0") {
                    i = "2";
                }
                var newAddress = buildAddressForm(newNumber);
                addInputToGroupDiv(newAddress, 'addresses');
            }
            for (var j in Object.keys(currentRecord["Address Information"])) {
                var newNumber = (parseInt(j) + 1).toString();
                var cur = recordAddresses[newNumber.toString()];
                for (var prop in cur) {
                    var b = cur[prop];
                    var label = "address-information-" + newNumber + machinifyAPhrase(prop);
                    var curin = $("input[name='" + label + "']");
                    curin.val(b);
                }
            }
        }
        var firstInput = $("input[name='first-name']");
        var lastInput = $("input[name='last-name']");
        var affil = $("input[name='affiliated-organization']");
        var jobtitle = $("input[name='job-title']");
        if (currentRecord["First Name"] !== undefined) {
            firstInput.val(currentRecord["First Name"]);
        }
        if (currentRecord["Last Name"] !== undefined) {
            lastInput.val(currentRecord["Last Name"]);
        }
        if (currentRecord["Affiliated Organization"] !== undefined) {
            affil.val(currentRecord["Affiliated Organization"]);
        }
        if (currentRecord["Job Title"] !== undefined) {
            jobtitle.val(currentRecord["Job Title"]);
        }
    }

    function prePopPhysmediaForm(word) {
        buildPhysmediaForm();
        var currentRecord = findObjectInAnArray(id, "Physical Media Information");
        var newObj = Object.create(null);
        newObj["Physmedia 0 Label 0"] = currentRecord.Label;
        newObj["Physmedia 0 Quantity 0"] = currentRecord.Quantity;
        prePopInputs(newObj);
    }

    function prePopRestrictionForm(word) {
        buildRestrictionForm();
        var currentRecord = findObjectInAnArray(id, "Restriction Information");
        var inputs = document.getElementsByTagName("select");
        var textareas = document.getElementsByTagName("textarea");
        prePopInputs(currentRecord);
    }

    function prePopSwitchFunc(word, id) {
        var output = null;
        var currentRecord = null;
        if (word === 'donor' || word === 'source') {
            prePopPersonForm(word);
        } else if (word === 'accession') {
            prePopMajorForm(word);
        } else if (word === 'acquisition') {
            prePopMajorForm(word);
        } else if (word === 'physmedia') {
            prePopPhysmediaForm();
        } else if (word === 'restriction') {
            prePopRestrictionForm();
        } else {
        }
    }

    function buildAddressForm(num) {
        var numString = num.toString();
        var individualAddressDiv = document.createElement("div");
        individualAddressDiv.setAttribute("id", "address-" + numString);
        var addressLegend = document.createElement("legend");
        var addressFieldSet = document.createElement("fieldset");
        addressLegend.appendChild(document.createTextNode("Mailing Address Information " + numString));
        addressFieldSet.appendChild(addressLegend);
        var streetAddress = formRowHalfColumn(formGroup(formInputField("address-information-" + numString + "-street-address", "text"), "Enter the mailing address including street number and street name"));
        var unitNumber = formRowHalfColumn(formGroup(formInputField("address-information-" + numString + "-unit-number", "text"), "Enter the unit or suite number for the address if it exists"));
        var city = formRowThirdColumn(formGroup(formInputField("address-information-" + numString + "-city", "text"), "Enter the name of the city for the address"));
        var state = formRowThirdColumn(formGroup(setRegexValidatorInput(formInputField("address-information-" + numString + "-state", "text"), "\\w{2}", "should be a mailing address state code like IL"), "Enter the two character state code. For example: WI for Wisconsin, IL for Illinois, NY for New York"));
        var zipCode = formRowThirdColumn(formGroup(setRegexValidatorInput(formInputField("address-information-" + numString + "-zip-code", "zipcode"), "\\d{5}[-]?[\\d{4}]?", "should look like 60637"), "Enter the five digit zipcode"));
        addressFieldSet.appendChild(formRow([streetAddress, unitNumber]));
        addressFieldSet.appendChild(formRow([city, state, zipCode]));
        individualAddressDiv.appendChild(addressFieldSet);
        return individualAddressDiv;
    }

    function buildPersonForm(correctTerm) {
        var formdiv = $("#form-div");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", correctTerm + "-form");
        form.setAttribute("data-toggle", "validator");
        form.setAttribute("role", "form");
        form.setAttribute("action", "form.html?action=acquisition");
        form.setAttribute("form", "form-horizontal");

        var addPhone = document.createElement("a");
        addPhone.setAttribute("href", "#");
        addPhone.setAttribute("id", "addPhone");
        addPhone.setAttribute("class", "btn btn-primary");
        addPhone.setAttribute("role", "button");
        addPhone.appendChild(document.createTextNode("Add Phone"));

        var addEmail = document.createElement("a");
        addEmail.setAttribute("id", "addEmail");
        addEmail.setAttribute("class", "btn btn-primary");
        addEmail.setAttribute("role", "button");
        addEmail.appendChild(document.createTextNode("Add Email"));

        var addAddress = document.createElement("a");
        addAddress.setAttribute("id", "addAddress");
        addAddress.setAttribute("class", "btn btn-primary");
        addAddress.setAttribute("role", "button");
        addAddress.appendChild(document.createTextNode("Add Address"));

        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");
        var legendH3 = document.createElement("h3");
        var legendP = document.createElement("p");

	var setType = document.createElement("a");
        setType.setAttribute("id", "setInstitutionType");
        setType.setAttribute("class", "btn btn-primary");
        setType.setAttribute("role", "button");
        setType.appendChild(document.createTextNode("Is An Institution"));

	var unsetType = document.createElement("a");
        unsetType.setAttribute("id", "unsetInstitutionType");
        unsetType.setAttribute("class", "btn btn-primary");
        unsetType.setAttribute("role", "button");
        unsetType.appendChild(document.createTextNode("Is Not An Institution"));



        legendH3.appendChild(document.createTextNode("Creating a " + displayAWord(correctTerm)));
        legendP = document.createElement("p");
        legendP.appendChild(addPhone);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addEmail);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addAddress);
        legend.appendChild(legendH3);
        legend.appendChild(legendP);
        legend.appendChild(addPhone);
        legend.appendChild(document.createTextNode(" "));
        legend.appendChild(addEmail);
        legend.appendChild(document.createTextNode(" "));
        legend.appendChild(addAddress);
        legend.appendChild(document.createTextNode(" "));
	legend.appendChild(setType);
        legend.appendChild(document.createTextNode(" "));
	legend.appendChild(unsetType);
        fieldset.appendChild(legend);

	var nameDiv = document.createElement("div");
	nameDiv.setAttribute("id", "nameInputArea");
	
        var firstName = formRowHalfColumn(formGroup(makeAFormInputRequired(formInputField("first-name", "text", "Jane")), "Enter the " + correctTerm + "'s given name in this field. For example, it might be Jane or John."));

        var lastName = formRowHalfColumn(formGroup(makeAFormInputRequired(formInputField("last-name", "text", "Doe")), "Enter the " + correctTerm  + "'s family name in this field. For example, it might be Smith."));

        var affiliatedOrganization = formRowHalfColumn(formGroup(formInputField("affiliated-organization", "text", "University of Chicago Physics Department"), "Enter the " + correctTerm + "'s insititution. For example, University of Chicago Physics Department or University of Chicago Press"));
	var nameRow = formRow([firstName, lastName]);
	nameDiv.appendChild(nameRow);

        var jobTitle = formRowHalfColumn(formGroup(formInputField("job-title", "text", "Department Chair"), "Enter the " + correctTerm + "'s job title or role with the affiliated organization. For example: dean or associate professor or club president."));
	
        var phone = phoneGroupDiv(makePhoneInput(1), "phone-numbers");
        var email = emailGroupDiv(makeEmailInput(1), "emails");
        fieldset.appendChild(nameDiv);
        fieldset.appendChild(formRow([affiliatedOrganization, jobTitle]));
        fieldset.appendChild(phone);
        fieldset.appendChild(email);
        var addressGroupDiv = document.createElement("div");
        addressGroupDiv.setAttribute("id", "addresses");
        var anAddressForm = buildAddressForm("1");
        addressGroupDiv.appendChild(anAddressForm);
        fieldset.appendChild(addressGroupDiv);
        fieldset.appendChild(submitButton("Save", "Get me out of here"));
        form.appendChild(fieldset);
        formdiv.html(form);
    }

    function generateHiddenFieldForPerson(term, appendableDiv, peopleRecords) {
        for (var n in peopleRecords) {
            var anObj = peopleRecords[n];
	    if (anObj['notApplicable'] !== undefined) {
		var newhiddenfield = formHiddenField(term + "-not-applicable", "not-applicable");
		appendableDiv.appendChild(newhiddenfield);
	    } else {
            var firstNameField = term + "-" + n.toString() + "-" + "first-name";
            var firstNameValue = anObj["First Name"];
            var lastNameField = term + "-" + n.toString() + "-" + "last-name";
            var lastNameValue = anObj["Last Name"];

            var firstNameFHF = formHiddenField(firstNameField, firstNameValue);
            var lastNameFHF = formHiddenField(lastNameField, lastNameValue);

            appendableDiv.appendChild(firstNameFHF);
            appendableDiv.appendChild(lastNameFHF);

            for (var phone in anObj["Phone"]) {
                var fieldName = term + "-" + n.toString() + "-phone-" + phone;
                var fieldValue = anObj["Phone"][phone];
                var fhf = formHiddenField(fieldName, fieldValue);
                appendableDiv.appendChild(fhf);
            }
            for (var email in anObj["Email"]) {
                var fieldName = term + "-" + n.toString() + "-email-" + email;
                var fieldValue = anObj["Email"][email];
                var fhf = formHiddenField(fieldName, fieldValue);
                appendableDiv.appendChild(fhf);
            }
            for (var address in anObj["Address Information"]) {
                var baseField = term + "-" + n.toString() + "-address-information-" + address;
                for (var field in anObj["Address Information"][address]) {
                    var fieldName = baseField + machinifyAPhrase(field);
                    var fieldValue = anObj["Address Information"][address][field];
                    var fhf = formHiddenField(fieldName, fieldValue);
                    appendableDiv.appendChild(fhf);
                }
            }
        }
	}
    }

    function generateHiddenFieldForListOfDatum(term, appendableDiv, datumObjs) {
        for (var a in datumObjs) {
            var anObj = datumObjs[a];
            for (var b in anObj) {
                var fieldName = term + "-" + a.toString() + "-" + machinifyAPhrase(b);
                var fieldValue = anObj[b];
                var fhf = formHiddenField(fieldName, fieldValue);
                appendableDiv.appendChild(fhf);
            }
        }
    }

    function addHiddenFields() {
        var hiddenFieldsDiv = document.createElement("div");
        hiddenFieldsDiv.setAttribute("id", "hidden-fields");
        if (localStorage.getItem("Donor") !== null) {
            var obj = JSON.parse(localStorage.getItem("Donor"));
            generateHiddenFieldForPerson("donor", hiddenFieldsDiv, obj);
        }
        if (localStorage.getItem("Source") !== null) {
            var obj = JSON.parse(localStorage.getItem("Source"));
            generateHiddenFieldForPerson("source", hiddenFieldsDiv, obj);
        }
        if (localStorage.getItem("Restriction Information") !== null) {
            var obj = JSON.parse(localStorage.getItem("Restriction Information"));
            generateHiddenFieldForListOfDatum("restriction-information", hiddenFieldsDiv, obj);
        }
        if (localStorage.getItem("Physical Media Information") !== null) {
            var obj = JSON.parse(localStorage.getItem("Physical Media Information"));
            generateHiddenFieldForListOfDatum("physical-media-information", hiddenFieldsDiv, obj);
        }
        return hiddenFieldsDiv;
    }

    function buildAccessionForm() {
        var formdiv = $("#form-div");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", "accession-form");
        form.setAttribute("data-toggle", "validator");
        form.setAttribute("role", "form");
        for (var p in getURLQueryParams(location)) {
            if (getURLQueryParams(location)[p].indexOf("item=") > -1) {
                var id = getURLQueryParams(location)[p].split("item=")[1];
                localStorage.setItem("acquisitionBeingCompleted", id);
            }
        }
        form.setAttribute("form", "form-horizontal");
        var fieldset = document.createElement("fieldset");

	var noDonorOrSource = document.createElement("a");
        noDonorOrSource.setAttribute("href", "#");
        noDonorOrSource.setAttribute("id", "new-donor-button");
        noDonorOrSource.setAttribute("class", "btn btn-primary");
        noDonorOrSource.setAttribute("role", "button");
        noDonorOrSource.appendChild(document.createTextNode("Donor/Source N/A"));

        var addDonor = document.createElement("a");
        addDonor.setAttribute("href", "#");
        addDonor.setAttribute("id", "new-donor-button");
        addDonor.setAttribute("class", "btn btn-primary");
        addDonor.setAttribute("role", "button");
        addDonor.appendChild(document.createTextNode("Add a Donor"));

        var addSource = document.createElement("a");
        addSource.setAttribute("href", "#");
        addSource.setAttribute("id", "new-source-button");
        addSource.setAttribute("class", "btn btn-primary");
        addSource.setAttribute("role", "button");
        addSource.appendChild(document.createTextNode("Add a Source"));

        var addPhysmedia = document.createElement("a");
        addPhysmedia.setAttribute("href", "#");
        addPhysmedia.setAttribute("id", "new-physmedia-button");
        addPhysmedia.setAttribute("class", "btn btn-primary");
        addPhysmedia.setAttribute("role", "button");
        addPhysmedia.appendChild(document.createTextNode("Add Physical Media"));

        var addRestriction = document.createElement("a");
        addRestriction.setAttribute("href", "#");
        addRestriction.setAttribute("id", "new-restriction-button");
        addRestriction.setAttribute("class", "btn btn-primary");
        addRestriction.setAttribute("role", "button");
        addRestriction.appendChild(document.createTextNode("Add a Restriction"));

        var legend = document.createElement("legend");
        var legendH3 = document.createElement("h3");
        var legendP = document.createElement("p");

	
        legendH3.appendChild(document.createTextNode("Creating an Accession"));

	//legendP.appendChild(noDonorOrSource);
        legendP.appendChild(document.createTextNode("hello "));
        legendP.appendChild(addDonor);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addSource);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addPhysmedia);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addRestriction);

        legend.appendChild(legendH3);
        legend.appendChild(legendP);

        var mixedAcquisition = formGroup(setRegexValidatorInput(makeAFormInputRequired(formInputField("mixed-acquisition", "text", "true or false")), "true|false", "must be either \'true\' or \'false\'"));
        var accessionId = formGroup(makeAFormInputRequired(setRegexValidatorInput(makeAFormInputRequired(formInputField("accession-identifier", "text", "2016-002")), "\\d{4}[-]\\d{3}", "should look like 2001-001")));
        var collectionTitle = formGroup(makeAFormInputRequired(formInputField("collection-title", "text", "John Doe Manuscripts. Digital Collection.")));
	var eadid = formGroup(makeAFormInputRequired(setRegexValidatorInput(formInputField("EADID", "text", "ICU.SPCL.CAMPUB"), "ICU.SPCL.\\w{3,}", "should look like ICU.SPCL.CAMPUB or ICU.SPCL.TEST")));
        var spanDate = formGroup(setRegexValidatorInput(formInputField("span-date", "text", "1980-199"), "[\d{4}]?", "should look like 02/1980-04/1999 or 1980-1999"));
        var access = formGroup(formCheckBoxField("access"));
        var discover = formGroup(formCheckBoxField("discover"));
        var receiptRequired = formGroup(formCheckBoxField("receipt-letter-required"));
        var giftAckRequired = formGroup(formCheckBoxField("gift-acknowledgement-required"));
        var receiptLetterDate = formGroup(formInputField("receipt-letter-information-sent", "text", "02/01/1999"));
        var fiscalYear = formGroup(setRegexValidatorInput(formInputField("fiscal-year", "text", "2006-2007"), "\\d{4}-\\d{4}", "should look like 2016-2017"));
        var giftAckDate = formGroup(formInputField("gift-acknowledgement-information-received", "text", "10/20/1999"));
        var organization = formGroup(formInputField("organization-name", "text", "University of Chicago Special Collections Research Center"));
        var summary = formGroup(formTextAreaField("summary", "This is a description of the accession"));
        var orginDescription = formGroup(formTextAreaField("origin-description", "This is a description of the origin of this accession"));
        var rights = formGroup(formTextAreaField("rights", "This is a description of the rights for this accession"));
        var accessDescription = formGroup(formTextAreaField("access-description", "This is a description of the access constraints for this accession"));
        var adminContent = formGroup(formTextAreaField("administrative-content", "This is a note that the processor shouild know about this accession"));
        var ownershipStatus = formGroup(setRegexValidatorInput(formInputField("ownership-status", "text", "Owned or Donated or Other"), "Owned|Deposited|Other", "should be either Owned or Deposited or Other"));
        var filesReceived = formGroup(makeAFormInputRequired(formInputField("date-files-received", ",text", "The date LDR received the files")));
        var materialsReceived = formGroup(formInputField("date-materials-received", "text", "The date SPCL received materials"));
        var firstRow = formRow([formRowWholeColumn(mixedAcquisition)]);
        var secondRow = formRow([formRowHalfColumn(accessionId), formRowHalfColumn(eadid)]);
        var thirdRow = formRow([formRowHalfColumn(collectionTitle), formRowHalfColumn(spanDate)]);
        var fourthRow = formRow([formRowWholeColumn(summary)]);
        var fifthRow = formRow([formRowHalfColumn(access), formRowHalfColumn(discover)]);
        var sixthRow = formRow([formRowHalfColumn(receiptRequired), formRowHalfColumn(receiptLetterDate)]);
        var seventhRow = formRow([formRowHalfColumn(giftAckRequired), formRowHalfColumn(giftAckDate)]);
        var eighthRow = formRow([formRowHalfColumn(fiscalYear), formRowHalfColumn(organization)]);
        var ninthRow = formRow([formRowWholeColumn(ownershipStatus)]);
        var tenthRow = formRow([formRowWholeColumn(orginDescription)]);
        var eleventhRow = formRow([formRowWholeColumn(rights)]);
        var twelfthRow = formRow([formRowWholeColumn(accessDescription)]);
        var thirteenthRow = formRow([formRowWholeColumn(adminContent)]);
        var fourteenthRow = formRow([formRowHalfColumn(filesReceived), formRowHalfColumn(materialsReceived)]);
        var hiddenFields = addHiddenFields();

        fieldset.appendChild(legend);
        fieldset.appendChild(firstRow);
        fieldset.appendChild(secondRow);
        fieldset.appendChild(thirdRow);
        fieldset.appendChild(fourthRow);
        fieldset.appendChild(fifthRow);
        fieldset.appendChild(sixthRow);
        fieldset.appendChild(seventhRow);
        fieldset.appendChild(eighthRow);
        fieldset.appendChild(ninthRow);
        fieldset.appendChild(tenthRow);
        fieldset.appendChild(eleventhRow);
        fieldset.appendChild(twelfthRow);
        fieldset.appendChild(thirteenthRow);
        fieldset.appendChild(fourteenthRow);
        fieldset.appendChild(hiddenFields);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var currentDate = yyyy + "-" + mm + "-" + dd;
        var recordCreationDate = formHiddenField("date-record-created", currentDate);
        fieldset.appendChild(recordCreationDate);
        fieldset.appendChild(submitButton("Submit", null));
        form.appendChild(fieldset);
        formdiv.html(form);
    }

    function buildAcquisitionForm() {
        var formdiv = $("#form-div");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", "acquisition-form");
        form.setAttribute("data-toggle", "validator");
        form.setAttribute("role", "form");
        form.setAttribute("action", "receipt.html");
        form.setAttribute("form", "form-horizontal");

	var noDonorOrSource = document.createElement("a");
        noDonorOrSource.setAttribute("href", "#");
        noDonorOrSource.setAttribute("id", "no-donorSource-button");
        noDonorOrSource.setAttribute("class", "btn btn-primary");
        noDonorOrSource.setAttribute("role", "button");
        noDonorOrSource.appendChild(document.createTextNode("No Donor/Source"));

        var addDonor = document.createElement("a");
        addDonor.setAttribute("href", "#");
        addDonor.setAttribute("id", "new-donor-button");
        addDonor.setAttribute("class", "btn btn-primary");
        addDonor.setAttribute("role", "button");
        addDonor.appendChild(document.createTextNode("Donor"));

        var addSource = document.createElement("a");
        addSource.setAttribute("href", "#");
        addSource.setAttribute("id", "new-source-button");
        addSource.setAttribute("class", "btn btn-primary");
        addSource.setAttribute("role", "button");
        addSource.appendChild(document.createTextNode("Source"));

        var addPhysmedia = document.createElement("a");
        addPhysmedia.setAttribute("href", "#");
        addPhysmedia.setAttribute("id", "new-physmedia-button");
        addPhysmedia.setAttribute("class", "btn btn-primary");
        addPhysmedia.setAttribute("role", "button");
        addPhysmedia.appendChild(document.createTextNode("Physical Media"));

        var addRestriction = document.createElement("a");
        addRestriction.setAttribute("href", "#");
        addRestriction.setAttribute("id", "new-restriction-button");
        addRestriction.setAttribute("class", "btn btn-primary");
        addRestriction.setAttribute("role", "button");
        addRestriction.appendChild(document.createTextNode("Restriction"));

        var mainForm = document.createElement("a");
        mainForm.setAttribute("href", "#");
        mainForm.setAttribute("id", "main-form");
        mainForm.setAttribute("class", "btn btn-primary");
        mainForm.setAttribute("role", "button");
        mainForm.appendChild(document.createTextNode("Main Form"));

        var legend = document.createElement("legend");

        var legendH3 = document.createElement("h3");

        var legendP = document.createElement("p");
        legendH3.appendChild(document.createTextNode("Creating an Acquisition"));

	legendP.appendChild(noDonorOrSource);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addDonor);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addSource);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addPhysmedia);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(addRestriction);
        legendP.appendChild(document.createTextNode(" "));
        legendP.appendChild(mainForm);
        legend.appendChild(legendH3);
        legend.appendChild(legendP);

        var fieldset = document.createElement("fieldset");
        fieldset.appendChild(legend);

        var mixedOptions = ["", "Digital only" ,"Paper and Digital"]
        var mixedRealOptions = []
        var i = null;
        for (i = 0; i < mixedOptions.length; i += 1) {
            mixedRealOptions.push(formSelectOptionItem(mixedOptions[i]));
        }
        var mixedAcquisition = formGroup(makeAFormInputRequired(formSelectField("mixed-acquisition", mixedRealOptions)), "If you select Digital only, this means that the accession you are recording only has digital material. If you are selecting Paper and digital, this means that the accession you are recording has both a paper component and a digital component.");

        var accessionId = formGroup(setRegexValidatorInput(makeAFormInputRequired(formInputField("accession-identifier", "text", "2017-001")), "\\d{4}[-]\\d{3}", "must look like 2007-001"), "You must use a valid SPCL identifier. This is the only way for SPCL to link this record with the corresponding physical accession.");
        var collectionTitle = formGroup(makeAFormInputRequired(formInputField("collection-title", "text", "McQuowan Papers. Digital Collection.")), "Enter the collection title that this accession belongs to. If the collection title has alreaydy been entered, then you can type any word or combination of letters that exist in the title and select from the dropdown that appears. If this is the first time that ths collection is being recorded then you will have to type the entire collection title.");
        var spanDate = formGroup(setRegexValidatorInput(formInputField("span-date", "text", "1980-1999"), "\\d{2}[/]\\d{4}-\\d{4}|\\d{4}-\\d{2}[/]\\d{4}|\\d{2}[/]\\d{4}-\\d{2}[/]\\d{4}|\\d{2}[/]\\d{4}|\\d{4}|\\d{4}-\\d{4}", "must look like 01/1980-02/1980 or 01/1980-1999 or 1980-1999"), "The Span Date is the range of time represented by the content in the accession. For example, a collection of President Barack Obama's Presidential Papers would have a span date of 01/2009-01/2017.");

        var organizationOptions = ["", "DLDC", "Law", "Preservation", "Special Collections Research Center", "Other"];
        var orgRealOptions = []
        var i = null;
        for (i = 0; i < organizationOptions.length; i += 1) {
            orgRealOptions.push(formSelectOptionItem(organizationOptions[i]));
        }
        var organization = formGroup(makeAFormInputRequired(formSelectField("organization", orgRealOptions)), "The organization is the organization that initially recieved the accession. Most of the time, this will be Special Collections Research Center");

        var sixthRow = formRow([formRowWholeColumn(organization)]);
	var organizationDefinitionDiv = document.createElement("div");
	organizationDefinitionDiv.setAttribute("id", "organization-definition");
	organizationDefinitionDiv.append(sixthRow);	

        var summary = formGroup(formTextAreaField("summary", "This acquisition is part of long term digitization effort"), "You should enter as much descriptive information about the access as you have available to you in this field");
        var collectionStatusOptions = ["","Gift", "Deposit", "Purchase", "Transfer", "Other"];
        var realOptions = [];
        var i = null;
        for (i = 0; i < collectionStatusOptions.length; i += 1) {
            realOptions.push(formSelectOptionItem(collectionStatusOptions[i]));
        }

        var orginDescription = formGroup(formSelectField("collection-status", realOptions), "need to fill out");
        var eighthRow = formRow([formRowWholeColumn(orginDescription)]);

	var originDescriptionDiv = document.createElement("div");
	originDescriptionDiv.setAttribute("id", "collection-status-definition");
	originDescriptionDiv.append(eighthRow);	

	
        var adminContent = formGroup(formTextAreaField("staff-comment", "Here is some information that a processor needs to know that is exceptional about this acquisition"), "Enter any information that you the recorder thinks is relevant about this accession. For example: do the CDs have scratches on them, is their water damage on any of the documents");
        var firstRow = formRow([formRowWholeColumn(mixedAcquisition)]);
        var secondRow = formRow([formRowWholeColumn(accessionId)])
        var thirdRow = formRow([formRowHalfColumn(collectionTitle), formRowHalfColumn(spanDate)]);
       
        var seventhRow = formRow([formRowWholeColumn(summary)]);

        var ninthRow = formRow([formRowWholeColumn(adminContent)]);
        var hiddenFields = addHiddenFields();
        fieldset.appendChild(legend);
        fieldset.appendChild(firstRow);
        fieldset.appendChild(secondRow);
        fieldset.appendChild(thirdRow);
        fieldset.appendChild(organizationDefinitionDiv);
        fieldset.appendChild(seventhRow);
        fieldset.appendChild(originDescriptionDiv);
        fieldset.appendChild(ninthRow);
        fieldset.appendChild(hiddenFields);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var currentDate = yyyy + "-" + mm + "-" + dd;
        var accessionDate = formHiddenField("accession-date", currentDate);
        var acquisitionDate = formHiddenField("acquisition-date", currentDate);
        fieldset.appendChild(acquisitionDate);

        var save = document.createElement("a");
        save.setAttribute("role", "button");
        save.setAttribute("name", "save");
        save.setAttribute("id", "save-acquisition");
        save.setAttribute("class", "btn btn-primary");
        save.appendChild(document.createTextNode("Save This Part of The Record"));

        var div = document.createElement("div");
        div.setAttribute("id", "submit-acquisition");
	div.appendChild(save);
        fieldset.appendChild(div);

        form.appendChild(fieldset);
        formdiv.html(form);
    }

    function buildPhysmediaForm() {
        var formdiv = $("#form-div");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", "physmedia-form");
        form.setAttribute("data-toggle", "validator");
        form.setAttribute("role", "form");
        form.setAttribute("action", "form.html?action=acquisition&last=acquisition");
        form.setAttribute("form", "form-horizontal");
        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");

        var header = document.createElement("h3");
        header.appendChild(document.createTextNode("Adding Physical Media"));
        var addPhysmedia = document.createElement("a");
        addPhysmedia.setAttribute("href", "#");
        addPhysmedia.setAttribute("id", "addPhysMedium");
        addPhysmedia.setAttribute("class", "btn btn-primary");
        addPhysmedia.setAttribute("role", "button");
        addPhysmedia.appendChild(document.createTextNode("Add a Physical Medium"));


        legend.appendChild(header);
        legend.appendChild(addPhysmedia)
        fieldset.appendChild(legend);

        var newInput = makePhysMediaInput(0);
        var physmediaDiv = physMediaGroupDiv(newInput);

        fieldset.appendChild(physmediaDiv);
        fieldset.appendChild(submitButton("Save", "Get me out of here"));
        form.appendChild(fieldset);
        formdiv.html(form);
    }

    function buildRestrictionForm() {
        var formdiv = $("#form-div");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", "restriction-form");
        form.setAttribute("data-toggle", "validator");
        form.setAttribute("role", "form");
        form.setAttribute("action", "form.html?action=acquisition");
        form.setAttribute("form", "form-horizontal");

        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");
        legend.appendChild(document.createTextNode("Adding a Restriction"));
        fieldset.appendChild(legend);
        var restrictionCodes = ["", "O", "OU", "DR-##", "R-DA", "R-30", "R-50", "R-80", "R-X", "R-P30", "R-S", "R-C", "E"];
        var restrictionOptions = [];
        var i = null;
        for (i = 0; i < restrictionCodes.length; i += 1) {
            restrictionOptions.push(formSelectOptionItem(restrictionCodes[i]));
        }
        var restrictionCode = formRow([formRowWholeColumn(formGroup(makeAFormInputRequired(formSelectField("restriction-code", restrictionOptions)), "Select the SPCL restriction code that has been attached to this accession."))]);
        var restrictionComment = formRow([formRowWholeColumn(formGroup(formTextAreaField("restriction-comment", "There are financial records in this acquisition"), "Enter any additional information that you think might be pertinent about the restrictions on this accession."))]);
        fieldset.appendChild(restrictionCode);
        fieldset.appendChild(restrictionComment);
        form.appendChild(fieldset);
        form.appendChild(submitButton("Save", "Get me out of here"));
        formdiv.html(form);
    }

    function emptyFormSwitchFunc(word) {
        if (word === 'donor' || word === 'source') {
            buildPersonForm(word);
        } else if (word === 'accession') {
            buildAccessionForm();
        } else if (word === 'acquisition') {
            buildAcquisitionForm();
        } else if (word === 'physmedia') {
            buildPhysmediaForm();
        } else if (word === 'restriction') {
            buildRestrictionForm();
        } else {
        }
    }

    function getURLQueryParams() {
        var url = window.location;
        var searchParams = url.search;
        var out = null;
        if (searchParams.indexOf("&") > -1) {
            out = searchParams.split("?")[1].split("&");
        } else {
            out = searchParams.split("?"); //.split("&");
        }
        return out;
    }

    function findStringInArray(aList, stringValue) {
        var cur = null;
        var out = null;
        var i = 0;
        for (i = 0; i < aList.length; i += 1) {
            cur = aList[i];
            if (cur.indexOf(stringValue) > -1) {
                out = cur;
            }
        }
        return out;
    }


    $(function() {
        var availableTags = getCollectionTitleList() //getRecordsByCategory('Collection').responseJSON.data.record_identifiers;
        $('input[name="collection-title"]').autocomplete({
            source: availableTags
        });
    });

    $(function() {
        $("#addPhysMedium").click(function() {
            var physmediaDiv = document.getElementById("physmedia");
            var array = physmediaDiv.getElementsByTagName("input");
            var i = null;
            var allnums = []
            for (i = 0; i < array.length; i++) {
                var n = array[i];
                var num = parseInt(n.getAttribute("name").split('-')[1]);
                allnums.push(num);
            }
            var sortedAllNums = allnums.sort();
            var highestNum = sortedAllNums[sortedAllNums.length -1];
            var newNumber = highestNum + 1;
            var newInput = makePhysMediaInput(newNumber);
            addInputToGroupDiv(newInput, "physmedia");
        });
    });

    $(function() {
        $("#addEmail").click(function() {
            var emailDiv = document.getElementById("emails");
            var i = null;
            var array = emailDiv.getElementsByTagName("input");
            var name = null;
            var allnums = [];
            for (i = 0; i < array.length; i += 1) {
                name = parseInt(array[i].getAttribute("name").split("-")[1]);
                allnums.push(name);
            }
            var sortedAllNums = allnums.sort();
            var highestNum = sortedAllNums[sortedAllNums.length - 1];
            var newNumber = highestNum + 1;
            var newEmailInput = makeEmailInput(newNumber);

            addInputToGroupDiv(newEmailInput, "emails");
        });
    });

    $(function() {
        $("#addPhone").click(function() {
            var phoneDiv = document.getElementById("phone-numbers");
            var i = null;
            var array = phoneDiv.getElementsByTagName("input");
            var name = null;
            var allnums = [];
            for (i = 0; i < array.length; i += 1) {
                name = parseInt(array[i].getAttribute("name").split("-")[1]);
                allnums.push(name);
            }
            var sortedAllNums = allnums.sort();
            var highestNum = sortedAllNums[sortedAllNums.length - 1];
            var newNumber = highestNum + 1;
            var newEmailInput = makePhoneInput(newNumber);
            addInputToGroupDiv(newEmailInput, "phone-numbers");

        });
    });

    $(function() {
        $("#addAddress").click(function() {
            var addresses = document.getElementById("addresses");
            var i = null;
            var potentialDivs = addresses.getElementsByTagName("div");
            var addressDivs = [];
            var addressNum = null;
            var divId = null;
            for (i = 0; i < potentialDivs.length; i += 1) {
                divId = potentialDivs[i].getAttribute("id");
                if (divId !== null) {
                    addressNum = parseInt(divId.split('-')[1]);
                    addressDivs.push(addressNum);
                }
            }
            var sortedAllNums = addressDivs.sort();
            var highestNum = sortedAllNums[sortedAllNums.length - 1];
            var newNumber = highestNum + 1;
            var newAddress = buildAddressForm(newNumber);
            addInputToGroupDiv(newAddress, 'addresses');
        });
    });

    function saveMajorFormState(thingToBeEdited) {
        var form = document.getElementById("acquisition-form");
        var forminputs = form.getElementsByClassName("form-control");
        var newObj = Object.create(null);
        newObj[0] = Object.create(null);
        $.each(forminputs, function(index, value) {
            var val = value.value;
            var name = value.getAttribute("name");
            newObj[0][name] = val;
        });
        if (localStorage.getItem("Major Form") === null) {
	        var string_data = JSON.stringify(newObj);
        	localStorage.setItem("Major Form", string_data);
        } else {
		var t = JSON.parse(localStorage.getItem("Major Form"));
		t[thingToBeEdited] = newObj[0];
		var string_data = JSON.stringify(t);
		localStorage.setItem("Major Form", string_data);
       	}
    }

    function savePhysmediaForm(thingToBeEdited) {
        var form = document.getElementById("physmedia-form");
        var forminputs = form.getElementsByClassName("form-control");
        var newObj = Object.create(null);
        var currentInput = null;
        var name = null;
        var i = null;
        for (i = 0; i < forminputs.length; i += 1) {
            currentInput = (forminputs[i]);
            name = currentInput.getAttribute("name");
            var num = name.split('-')[1]
            if (newObj[num] === undefined) {
                newObj[num] = Object.create(null);
            }
            if (name.indexOf("label") > -1 && forminputs[i].value !== "") {
                newObj[num].Label = forminputs[i].value;
            } else if (name.indexOf("quantity") > -1 && forminputs[i].value !== "") {
                newObj[num].Quantity = forminputs[i].value;
            }
        }
        var data = localStorage.getItem("Physical Media Information");
        var highest = 0;
        if (thingToBeEdited !== null) {
            var donors = JSON.parse(data);
            donors[thingToBeEdited] = newObj[0];
            localStorage.setItem("Physical Media Information", JSON.stringify(donors));
        } else if (data !== null) {
             data = JSON.parse(data);
             $.each(Object.keys(data), function(index,value) {
                 if (parseInt(value) > highest) {
                     highest = parseInt(value);
                 }
             });
            var newObjKeys = Object.keys(newObj);
            $.each(newObjKeys, function(index, value) {
                data[highest + 1] = newObj[value];
                highest += 1;
            });
           var new_physmedia_info = JSON.stringify(data);
           localStorage.setItem("Physical Media Information", new_physmedia_info);
        } else {
             var new_physmedia_info = JSON.stringify(newObj);
             localStorage.setItem("Physical Media Information", new_physmedia_info);
        }
    }

    function saveRestrictionForm(thingToBeEdited) {
        var form = document.getElementById("restriction-form");
        var forminputs = form.getElementsByClassName("form-control");
        var newObj = Object.create(null);
        var currentInput = null;
        var name = null;
        var i = null;
        for (i = 0; i < forminputs.length; i += 1) {
            currentInput = (forminputs[i]);
            name = currentInput.getAttribute("name");
            if (name.indexOf("restriction-code") > -1 && forminputs[i].value !== "") {
                newObj["Restriction Code"] = forminputs[i].value;
            } else if (name.indexOf("restriction-comment") > -1 && forminputs[i].value !== "") {
                newObj["Restriction Comment"] = forminputs[i].value;
            }
        }
        if (thingToBeEdited !== null) {
            var donors = JSON.parse(localStorage.getItem("Restriction Information"));
            var donorkeys = Object.keys(donors);
            donors[thingToBeEdited] = newObj;
            localStorage.setItem("Restriction Information", JSON.stringify(donors));
        } else if (localStorage["Restriction Information"] !== undefined) {
            var n = JSON.parse(localStorage.getItem("Restriction Information"));
            var restrictionNumbered = Object.keys(n);
            var sortedRestrictionNumbered = restrictionNumbered.sort();
            var lastRestrictionNumber = sortedRestrictionNumbered[sortedRestrictionNumbered.length - 1];
            lastRestrictionNumber = parseInt(lastRestrictionNumber);
            var newRestrictionNumber = lastRestrictionNumber + 1;
            n[newRestrictionNumber.toString()] = newObj;
            var stringN = JSON.stringify(n);
            localStorage.setItem("Restriction Information", stringN);
        } else {
            var newRestriction = Object.create(null);
            newRestriction["0"] = newObj;
            localStorage.setItem("Restriction Information", JSON.stringify(newRestriction));
        }
    }

    function savePersonForm(word, thingToBeEdited) {
        var form = document.getElementById(word + "-form");
        var displayWord = displayAWord(word);
        var forminputs = form.getElementsByClassName("form-control");
        var i = null;
        var currentInput = null;
        var name = null;
        var newObj = Object.create(null);
        var emails = Object.create(null);
        var phones = Object.create(null);
        var addressName = null;
        var emailNum = null;
        var phoneNum = null;
        var addressNumber = null;
        var field = null;
        var fieldWord = null;
        var displayField = null;
        var displayPart = null;
        var k = null;
        for (i = 0; i < forminputs.length; i += 1) {
            currentInput = forminputs[i];
            name = currentInput.getAttribute("name");
            if (name.indexOf('email-') > -1 && forminputs[i].value !== "") {
                emailNum = name.split("email-")[1];
                if (newObj.Email === undefined) {
                    newObj.Email = Object.create(null);
                }
                newObj.Email[emailNum] = forminputs[i].value;
            } else if (name.indexOf('phone') > -1 && forminputs[i].value !== "") {
                phoneNum = name.split("phone-")[1];
                if (newObj.Phone === undefined) {
                    newObj.Phone = Object.create(null);
                }
                newObj.Phone[phoneNum] = forminputs[i].value;
            } else if (name.indexOf('institution-name') > -1 && forminputs[i].value !== "") {
	       var v = forminputs[i].value;
	       newObj["Institution Name"] = v;
	
            } else if (name.indexOf('first-name') > -1 && forminputs[i].value !== "") {
                newObj["First Name"] = forminputs[i].value;
            } else if (name.indexOf('last-name') > -1 && forminputs[i].value !== "") {
                newObj["Last Name"] = forminputs[i].value;
            } else if (name.indexOf('affiliated-organization') > -1 && forminputs[i].value !== "") {
                newObj["Affiliated Organization"] = forminputs[i].value;
            } else if (name.indexOf('job-title') > -1 && forminputs[i].value !== "") {
                newObj["Job Title"] = forminputs[i].value;
            } else if (name.indexOf('address-information') > -1 && forminputs[i].value !== "") {
                addressName = name.split("address-information-")[1];
                addressNumber = addressName[0];
                if (newObj["Address Information"] === undefined) {
                    newObj["Address Information"] = Object.create(null);
                }
                field = addressName.split(addressNumber + '-')[1];
                fieldWord = field.split('-');
                displayField = "";
                for (k = 0; k < fieldWord.length; k += 1) {
                    displayPart = displayAWord(fieldWord[k]);
                    displayField += " " + displayPart;
                }
                if (newObj["Address Information"][addressNumber] === undefined) {
                    newObj["Address Information"][addressNumber] = Object.create(null);
                }
                if (newObj["Address Information"][addressNumber][displayField] === undefined) {
                    newObj["Address Information"][addressNumber][displayField] = forminputs[i].value;
                }
            }
        }
        if (thingToBeEdited !== null) {
            var donors = JSON.parse(localStorage.getItem(displayWord));
            var donorkeys = Object.keys(donors);
            donors[thingToBeEdited] = newObj;
            localStorage.setItem(displayWord, JSON.stringify(donors));

        } else if (localStorage[displayWord] !== undefined) {
            var n = JSON.parse(localStorage.getItem(displayWord));
            var donorsNumbered = Object.keys(n);
            var sortedDonorsNumbered = donorsNumbered.sort();
            var lastDonorNumber = sortedDonorsNumbered[sortedDonorsNumbered.length - 1];
            lastDonorNumber = parseInt(lastDonorNumber);
            var newDonorNumber = lastDonorNumber + 1;
            n[newDonorNumber.toString()] = newObj;
            var stringN = JSON.stringify(n);
            localStorage.setItem(displayWord, stringN);
        } else {
            var newPerson = Object.create(null);
            newPerson["0"] = newObj;
            localStorage.setItem(displayWord, JSON.stringify(newPerson));
        }
    }

    function loadAList(listName) {
        var dl = document.createElement("dl");
        if (listName.split("s-").length == 2) {
            var editType = listName.split("s-")[0];
        } else if (listName.split('-').length == 2) {
            var editType = listName.split('-')[0];
        }
        var listDiv = $("#" + listName);
        var localStorageLookup = null;
        if (listName === "donors-list") {
            localStorageLookup = "Donor";
        } else if (listName === "sources-list") {
            localStorageLookup = "Source";
        } else if (listName === "restriction-list") {
            localStorageLookup = "Restriction Information";
        } else if (listName === "physmedia-list") {
            localStorageLookup = "Physical Media Information";
        } else if (listName === "acquisition-list") {
            localStorageLookup = "Major Form";
        } else {
        }
        var dataToLoad = JSON.parse(localStorage.getItem(localStorageLookup));
        if (dataToLoad !== null) {
            var n = Object.keys(dataToLoad);
            var i = null;
            var dt = null;
            var dd = null;
            var string = null;
            for (i = 0; i < n.length; i += 1) {
                if (listName === "donors-list") {
		    if (dataToLoad[0]["notApplicable"] !== undefined) {
                    	dt = document.createElement("dt");
                    	dt.appendChild(document.createTextNode("You said that donors are not applicable to this record."));
                    	dl.appendChild(dt);
		    } else {
			if (dataToLoad[i]["Institution Name"] !== undefined) {
			    string = dataToLoad[i]["Institution Name"];
			} else {
                    	    string = dataToLoad[i]["First Name"] + " " + dataToLoad[i]["Last Name"];
                        }
                    	dt = document.createElement("dt");
                    	dt.appendChild(document.createTextNode(string));
                    	dl.appendChild(dt);
		   }
                } else if (listName === "sources-list") {
		    if (dataToLoad[0]["notApplicable"] !== undefined) {
                    	dt = document.createElement("dt");
                    	dt.appendChild(document.createTextNode("You said that sources are not applicable to this record."));
                    	dl.appendChild(dt);
		    } else  {
			if (dataToLoad[i]["Institution Name"] !== undefined) {
			    string = dataToLoad[i]["Institution Name"];
			} else {
                    	    string = dataToLoad[i]["First Name"] + " " + dataToLoad[i]["Last Name"];
			}
                    	dt = document.createElement("dt");
                    	dt.appendChild(document.createTextNode(string));
                    	dl.appendChild(dt);
	           }
                } else if (listName === "restriction-list") {
                    dt = document.createElement("dt");
                    dt.appendChild(document.createTextNode(dataToLoad[i]["Restriction Code"]));
                    dl.appendChild(dt);
                    if (dataToLoad[i]["Restriction Comment"] !== undefined) {
                        dd = document.createElement("dd");
                        dd.appendChild(document.createTextNode(dataToLoad[i]["Restriction Comment"]));
                        dl.appendChild(dt);
                    }
                } else if (listName === "physmedia-list") {
                    dt = document.createElement("dt");
                    dt.appendChild(document.createTextNode(dataToLoad[i].Label + " (amount: " + dataToLoad[i].Quantity + ")"));
                    dl.appendChild(dt);
                }
                var itemNum = i;
                itemNum = itemNum.toString();
                if (listName !== "acquisitions-list") {
                    var dd = document.createElement("dd");
                    var editButton = document.createElement("a");
                    editButton.setAttribute("href", "form.html?action=" + editType + "&item=" + itemNum);
                    editButton.setAttribute("class", "btn btn-primary btn-sm");
                    editButton.setAttribute("role", "button")
                    editButton.setAttribute("id", "edit-" + editType + (i + 1).toString());
                    editButton.appendChild(document.createTextNode("Review This"));

                    var deleteButton = document.createElement("a");
                    deleteButton.setAttribute("class", "btn btn-danger btn-sm");
                    deleteButton.setAttribute("role", "button")
                    deleteButton.setAttribute("id", "delete-" + editType + "-" + i.toString());
                    deleteButton.appendChild(document.createTextNode("Delete This"));
                    dd.appendChild(editButton);
                    dd.appendChild(document.createTextNode(" "));
                    dd.appendChild(deleteButton);
                    dl.appendChild(dd);
                }

                listDiv.html(dl);
            }
        }
    }

    function addFieldToARecord(recordID, field, value) {
        var fieldParts = field.split("-");
        var fieldName = null;
        if (field.indexOf("physical-media-information") > -1) {
            var num = fieldParts[3];
            var field = displayAMachinePhrase(fieldParts[fieldParts.length - 1]).replace(' ', '');
            fieldName = "Physical Media Information" + num.toString() + '.' + field + "0";
        } else if (field.indexOf("restriction-information") > -1) {
            var num = fieldParts[2];
            var field = displayAMachinePhrase(fieldParts[fieldParts.length - 2] + '-' + fieldParts[fieldParts.length - 1]).replace(' ', '');
            fieldName = "Restriction Information" + num.toString() + '.' + field + "0";
        } else if (field.indexOf("address-information") > -1) {
            var type = fieldParts[0];
            var num = fieldParts[1];
            var addressInfoNum = fieldParts[4];
            var field = fieldParts.splice(5, fieldParts.length);
            var aString = "";
            for (var n in field) {
                aString = aString + "-" + field[n];
            }
            aString = displayAMachinePhrase(aString.replace('-', '')).replace(' ', '');
            fieldName = type + num.toString() + '.' + "Address Information" + addressInfoNum.toString() + '.' + aString + '0';
        } else if (field.indexOf("email") > -1 || field.indexOf("phone") > -1) {
            var num = fieldParts[1];
            var type = displayAMachinePhrase(fieldParts[0]).replace(' ', '');
            var field = displayAMachinePhrase(fieldParts[2]).replace(' ', '');
            var fieldNum = fieldParts[3] - 1;
            fieldNum = fieldNum.toString();
            fieldName = type + num + '.' + field + fieldNum;
        } else if (field.indexOf("last-name") > -1 || field.indexOf("first-name") > -1) {
            var num = fieldParts[1] - 1;
            var type = fieldParts[0];
            var field = fieldParts[fieldParts.length - 2] + "-" + fieldParts[fieldParts.length - 1];
            fieldName = displayAMachinePhrase(type).replace(' ', '') + num.toString() + '.' + displayAMachinePhrase(field).replace(' ', '') + "0";
        } else {
            fieldName = displayAMachinePhrase(field).replace(' ', '') + "0";
            if (fieldName === "Mixed Acquisition") {
                if (value === "yes") {
                    value = Boolean(true);
                } else {
                    value = Boolean(false);
                }
            }
        }


	if (fieldName.indexOf('-') > -1) {
		fieldName = fieldName.replace('-', '');
		fieldName = fieldName.replace('-', '');
	}
	if (value !== "") {
		if (value === "false") {
			value = Boolean(false);
		}
		if (value === "true") {
			value = Boolean(true);
		}
       	 	else {
			value = value;
		}
		addKeyValueToRecord(recordID, fieldName, value);
	}

    }

    function saveMajorForm(formTypeString) {
        var form = document.getElementById(formTypeString + "-form");
        var inputs = form.getElementsByTagName("input");
        var textareas = form.getElementsByTagName("textarea");
        var newObj = Object.create(null);
        var currentInput = null;
        var name = null;
        var i = null;
        var recordID = postNewRecord();
        recordID = recordID.responseJSON.data.record_identifier;
        var category = displayAWord(formTypeString);
        var fullcategory = category + "Record";
        var added = addRecordToCategory(displayAWord(formTypeString) + "Record", recordID);
        for (i = 0; i < inputs.length; i += 1) {
            var cur = inputs[i];
	    if ((cur.getAttribute("name") == "donor-not-applicable") || (cur.getAttribute("source-not-applicable"))) {
		var value = null;
	    } 
            if (cur.getAttribute("type") === "checkbox") {
                var t = $("input[name=\'" + cur.getAttribute("name") + "\']");
                var value = t.is(":checked").toString();
            } else if (cur.value === "") {
                var value = null;
            } else {
                var value = cur.value;
            }
            if (value !== null) {
                addFieldToARecord(recordID, cur.getAttribute("name"), value)
            }
        }
        for (i = 0; i < textareas.length; i += 1) {
            var cur = textareas[i];
            addFieldToARecord(recordID, cur.getAttribute("name"), cur.value);
        }
        return recordID;
    }

    $(function() {
	$("#donor-form").on('submit', function(event) {
	    var isValid = event.currentTarget.checkValidity();
	    if (isValid == true) {
	    	var p = getURLQueryParams();
            	var editable = findStringInArray(p, "item=");
            	if (editable !== null) {
                    var t = savePersonForm("donor", editable.split("=")[1]);
                } else {
                    var t = savePersonForm("donor", null);
            	}
		return false;
	    } else {
	    }
	});

    });

    $(function() {
        $("#source-form").on('submit', function(event) {
	    var isValid = event.currentTarget.checkValidity();
	    if (isValid == true) {
                 var p = getURLQueryParams();
                 var editable = findStringInArray(p, "item=");
             	 if (editable !== null) {
                     answer = savePersonForm("source", editable.split("=")[1]);
             	 } else {
                     answer = savePersonForm("source", null);
             	 }
            } else {
	    }
        });
    });

    $(function() {
	$("#physmedia-form").on('submit', function(event) {
	    var isValid = event.currentTarget.checkValidity();
	    if (isValid == true) {
	    	var p = getURLQueryParams();
            	var editable = findStringInArray(p, "item=");
            	if (editable !== null) {
                    var t = savePhysmediaForm(editable.split("=")[1]);
                } else {
                    var t = savePhysmediaForm(null);
            	}
	    } else {
	    }
	});
    });

    $(function() {
	$("#restriction-form").on('submit', function(e) {
	    var isValid = event.currentTarget.checkValidity();
	    if (isValid == true) {
                var p = getURLQueryParams();
            	var editable = findStringInArray(p, "item=");
            	if (editable !== null) {
            	    saveRestrictionForm(editable.split("=")[1]);
            	} else {
                   saveRestrictionForm(null);
                }
            } else {
	    }
        });

    });

    $(function() {
        $("#acquisition-form").on('submit', function(event) {
	    var isValid = event.currentTarget.checkValidity();
	    if (isValid == true) {
	        var answer = confirm("You are about to submit your complete acquisition record including: donor/source, physical media, restriction and main form information, to the LDR. Are you sure that you want to do this?");
		if (answer == true) {
	    	    var recordID = saveMajorForm("acquisition");
		    localStorage.setItem("New Record", recordID);

		} else {
		   return false;
		}
	    } else {
	    }
        });
    }); 


    $(function() {
        $("#save-acquisition").click(function() {
            var p = getURLQueryParams();
            var editable = findStringInArray(p, "item=");
	    if (editable !== null) {
		saveMajorFormState(editable.split("=")[1]);
	    } else {
            	saveMajorFormState();
	    }
            location.reload();
        });
    });

    $(function() {
        $("a[name='cancel']").click(function() {
            var cancelAction = localStorage.getItem("action");
            var newurl = "form.html?action=" + cancelAction;
            if (localStorage.getItem("acquisitionBeingCompleted") !== null) {
                newurl += "&item=" + localStorage.getItem("acquisitionBeingCompleted");
            }
            this.setAttribute("href", newurl);
        });
    });

    $(function() {
        $("#no-donorSource-button").click(function() {
	    var newObj = Object.create(null);
	    newObj[0] =  Object.create(null);
	    newObj[0]['notApplicable'] = true;
	    localStorage.setItem("Donor", JSON.stringify(newObj));
	    localStorage.setItem("Source", JSON.stringify(newObj));
	    location.reload();
	    return false;	
        });
    });

  

    $(function() {
        $("#new-donor-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=donor&last=" + last);
        });
    });

    $(function() {
        $("#start-over").click(function() {
            var confirmAction = confirm("Are you sure?");
            if (confirmAction == true) {
                var cancelAction = localStorage.getItem("action");
                localStorage.clear();
                location.replace("form.html?action=" + cancelAction);
            }
        });
    });

    $(function() {
        $("#new-source-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=source&last=" + last);
        });
    });

    $(function() {
        $("#new-restriction-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=restriction&last=" + last);
        });
    });

    $(function() {
        $("#new-physmedia-button").click(function() {
            location.replace("form.html?action=physmedia");
        });
    });

    $(function() {
        $("#main-form").click(function() {
            location.replace("form.html?action=acquisition");
	    var majorFormData = localStorage.getItem("Major Form");
        });
    });



    $(function() {
        $("#save-acquisition").click(function() {
        });
    });

    $(function() {
	    $("#start-over").click(function() {
	        localStorage.clear();
	    });
    });

    $(function() {
        $("[id^='delete']").click(function() {
            var check = confirm("Are you sure?");
	    if (check == true) {
            	var id = this.getAttribute("id");
            	var idParts = id.split('-');
            	var idCategory = idParts[1];
            	if (idCategory == "physmedia") {
                var word = "Physical Media Information";
            	} else if (idCategory == "restriction") {
                var word = "Restriction Information";
            	} else if (idCategory == "acquisition") {
                var word = "Major Form";
            	} else {
                word = displayAWord(idParts[1]).replace(' ', '');
          	}
            	var l = JSON.parse(localStorage.getItem(word));
            	var record = idParts[2];
            	delete l[record];
            	var numKeys = Object.keys(l).length;
            	var newObj = Object.create(null);
            	var next = 0;
            	$.each(l, function(index, value) {
                    if (value !== record) {
                        newObj[next] = value;
                        next += 1;
               	    }
            	});
            	if (numKeys == 0) {
                    localStorage.removeItem(word);
                } else {
                    localStorage.setItem(word, JSON.stringify(newObj));
                }
		location.reload();
	    } else {

	    }
        });
    });

    $(function() {
        $("#new-donor-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=donor&last=" + last);
        });
    });

    $(function() {
        $("#start-over").click(function() {
            var confirmAction = confirm("Are you sure?");
            if (confirmAction == true) {
                var cancelAction = localStorage.getItem("action");
                localStorage.clear();
                location.replace("form.html?action=" + cancelAction);
            }
        });
    });

    $(function() {
        $("#new-source-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=source&last=" + last);
        });
    });

    $(function() {
        $("#new-restriction-button").click(function() {
            var last = localStorage.getItem("action");
            location.replace("form.html?action=restriction&last=" + last);
        });
    });

    $(function() {
        $("#new-physmedia-button").click(function() {
            location.replace("form.html?action=physmedia");
        });
    });

    $(function() {
        $("#main-form").click(function() {
            location.replace("form.html?action=acquisition");
	    var majorFormData = localStorage.getItem("Major Form");
        });
    });



    $(function() {
        $("#save-acquisition").click(function() {
        });
    });

    $(function() {
	    $("#start-over").click(function() {
	        localStorage.clear();
	    });
    });

    $(function() {
        $("button[id^='delete']").click(function() {
            var id = this.getAttribute("id");
            var idParts = id.split('-');
            var idCategory = idParts[1];
            if (idCategory == "physmedia") {
                var word = "Physical Media Information";
            } else if (idCategory == "restriction") {
                var word = "Restriction Information";
            } else if (idCategory == "acquisition") {
                var word = "Major Form";
            } else {
                word = displayAWord(idParts[1]).replace(' ', '');
            }
            var l = JSON.parse(localStorage.getItem(word));
            var record = idParts[2];
            delete l[record];
            var numKeys = Object.keys(l).length;
            var newObj = Object.create(null);
            var next = 0;
            $.each(l, function(index, value) {
                if (value !== record) {
                    newObj[next] = value;
                    next += 1;
                }
            });
            if (numKeys == 0) {
                localStorage.removeItem(word);
            } else {
                localStorage.setItem(word, JSON.stringify(newObj));

            }
            location.reload();
         });
    });

    $(function() {
        $('input[name="gift-acknowledgement-information-received"]').datepicker();
    });

    $(function() {
        $('input[name="receipt-letter-information-sent"]').datepicker();
    });

    $(function() {
       $('[name="collection-status"]').change(function() {
	   var selected_value = $(this).val();
	   if ((selected_value == 'Other') & (document.getElementById("other-=collection-status") === null)) {
        	var otherCollectionStatus = formRow([formRowWholeColumn(formGroup(makeAFormInputRequired(formInputField("other-collection-status", "text", ""))))]);
		var theDiv = document.getElementById("collection-status-definition");
		theDiv.appendChild(otherCollectionStatus);
           }
       });
    });

    $(function() {
       $('[name="organization"]').change(function() {
	   var selected_value = $(this).val();
	   if ((selected_value == 'Other') & (document.getElementById("other-organization") === null)) {
		var input = formInputField("other-organization", "text", "")
		var requiredInput = makeAFormInputRequired(input);
		var theGroup = formGroup(requiredInput);
		var theRow = formRow([formRowWholeColumn(theGroup)]);
		var theDiv = document.getElementById("organization-definition");
		theDiv.appendChild(theRow);	
           }
       });
    });


    $(function() {
       $("#setInstitutionType").click(function() {
	    var t = $("#nameInputArea");
	    var institutionName = formRowWholeColumn(formGroup(makeAFormInputRequired(formInputField("institution-name", "text", "Jane")), "Enter the institution's given name in this field. For example, it might be Jane or John."));
	    var newRow = formRow([institutionName]);
	    t.html(newRow); 
       });
    });

    $(function() {
       $("#unsetInstitutionType").click(function() {
    		var t = $("#nameInputArea");
        	var firstName = formRowHalfColumn(formGroup(makeAFormInputRequired(formInputField("first-name", "text", "Jane")), "Enter the person's given name in this field. For example, it might be Jane or John."));

        	var lastName = formRowHalfColumn(formGroup(makeAFormInputRequired(formInputField("last-name", "text", "Doe")), "Enter the person's family name in this field. For example, it might be Smith."));
			
		var nameRow = formRow([firstName, lastName]);
	    	t.html(nameRow); 
       });
    });



    $(function() {
        $('input[name="date-files-received"]').datepicker();
    });

    $(function() {
        $('input[name="date-materials-received"]').datepicker();
    });

    $(function() {
        $('[data-toggle="popover"]').popover();
    });

    var params = getURLQueryParams();
    var id = findStringInArray(params, "item=");
    var decision = findStringInArray(params, "action=");
    if (decision === "") {
        decision = null;
    } else {
        decision = decision.split("action=")[1];
    }
    if (decision === 'accession' || decision === 'acquisition') {
        localStorage.setItem("action", decision);
    }
    if (id === "" || id === null) {
        id = null;
    } else {
        id = id.split("item=")[1];
    }
    if (id !== null) {
        prePopSwitchFunc(decision, id);
    } else {
        emptyFormSwitchFunc(decision);
    }
    loadAList("donors-list");
    loadAList("sources-list");
    loadAList("physmedia-list");
    loadAList("restriction-list");
    loadAList("acquisition-list");

    var donorFilled = localStorage.getItem("Donor");
    var sourceFilled = localStorage.getItem("Source");
    var physmediaFilled = localStorage.getItem("Physical Media Information");
    var restrictionFilled = localStorage.getItem("Restriction Information");
    if (((donorFilled !== null) | (sourceFilled !== null)) & (restrictionFilled !== null)) {
        var submit = document.createElement("button");
        submit.setAttribute("name", "save");
        submit.setAttribute("id", "submit-acquisition");
        submit.setAttribute("class", "btn btn-primary");
        submit.appendChild(document.createTextNode("Submit Acquisition"));
        var d = document.getElementById("submit-acquisition");
        var form = document.getElementById("submit-acquisition");
	form.appendChild(document.createTextNode(" "));
        form.appendChild(submit)
    }
});
