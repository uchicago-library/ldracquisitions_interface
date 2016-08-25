function generateAdminCommentDataItem(adminCommentDataObject) {
    "use strict";
    var dt_text = adminCommentDataObject;
    var dd_text = null;
    return {
        category: "administrative comment",
        fields: ["summary"],
        dt_text: dt_text,
        dd_text: dd_text,
        summary: dt_text
    };
}

function generateOriginDescriptionDataItem(originDescDataObject) {
    "use strict";
    var dt_text = originDescDataObject;
    var dd_text = null;
    return {
        category: "origin description",
        fields: ["summary"],
        dt_text: dt_text,
        dd_text: dd_text,
        summary: dt_text
    };
}

function generateSummaryDataItem(summaryDataObject) {
    "use strict";
    var dt_text = summaryDataObject;
    var dd_text = null;
    return {
        category: "summary",
        fields: ["summary"],
        dt_text: dt_text,
        dd_text: dd_text,
        summary: dt_text
    };
}

function generateAccessionIdDataItem(accidDataObject) {
    "use strict";
    var dt_text = accidDataObject;
    var dd_text = null;
    return {
        category: "accession id",
        fields: ["accession"],
        dt_text: dt_text,
        dd_text: dd_text,
        accession: dt_text
    };
}

function generateCollectionTitleDataItem(colTitleDataObject) {
    "use strict";
    var dt_text = colTitleDataObject;
    var dd_text = null;
    return {
        category: "collection title",
        fields: ["collection"],
        dt_text: dt_text,
        dd_text: dd_text,
        collection: dt_text
    };
}

function generateOrgDataItem(orgDataObject) {
    "use strict";
    var dt_text = orgDataObject['Collection Title'];
    var dd_text = null;
    return {
        category: "organization name",
        fields: ["organization"],
        dt_text: dt_text,
        dd_text: dd_text,
        organization: dt_text
    };
}

function generateTypeDataItem(acctypeDataObject) {
    "use strict";
    var dt_text = acctypeDataObject.Label;
    var dd_text = null;
    return {
        category: "type",
        fields: ["type"],
        dt_text: dt_text,
        dd_text: dd_text,
        type: dt_text
    };
}

function generatePhysMediaDataItem(physmediaDataObject) {
    "use strict";
    var dt_text = physmediaDataObject.Label;
    var dd_text = "amount: " + physmediaDataObject.Quantity;
    return {
        category: "physmedia",
        fields: ["label", "amount"],
        dt_text: dt_text,
        dd_text: dd_text,
        label: dt_text,
        amount: dd_text
    };
}

function generateRestrictionDataItem(restrictionDataObject) {
    "use strict";
    var dt_text = restrictionDataObject["Restriction Code"];
    var dd_text = restrictionDataObject["Restriction Comment"];
    return {
        category: "restriction",
        fields: ["code", "description"],
        dt_text: dt_text[0],
        dd_text: dd_text[0],
        code: dt_text,
        description: dd_text
    };
}

function generatePersonDataItem(personDataObject, catName) {
    "use strict";
    name = personDataObject["First Name"]+" "+personDataObject["Last Name"];
    var dt_text = name;
    var dd_text = "";
    var Email = personDataObject.Email;
    var Phone = personDataObject.Phone;
    var Addresses = personDataObject["Address Information"];
    var j = 0;
    var curP = "";
    var curE = "";
    var category = catName;
    for (j = 0; j < Email.length; j += 1) {
        curE = Email[j];
        if (curE !== null) {
            dd_text = dd_text + " " + curE;
        }
    }

    dd_text = dd_text + ";";
    for (j = 0; j < Phone.length; j += 1) {
        curP = Phone[j];
        if (curP !== null) {
            dd_text = dd_text + " " + curP;
        }
    }


    if (catName !== undefined) {
        category = catName.split("-")[0];
    }
    return {
        category: category,
        fields: ["first", "last", "emails", "phones", "addresses"],
        dt_text: dt_text,
        dd_text: dd_text,
        first: personDataObject["First Name"][0],
        last: personDataObject["Last Name"][0],
        emails: Email,
        phones: Phone,
        addresses: Addresses
    };
}

function buildADataItem(someThing, decision, subdecision) {
    "use strict";
    var data = null;
    if (decision == "person") {
        data = generatePersonDataItem(someThing, subdecision);
    }
    else if (decision == "restriction") {
        data = generateRestrictionDataItem(someThing);
    }
    else if (decision == "media") {
        data = generatePhysMediaDataItem(someThing);
    }
    else if (decision == "type") {
        data = generateTypeDataItem(someThing);
    }
    else if (decision == "organization") {
        data = generateOrgDataItem(someThing);
    }
    else if (decision == "collection") {
        data = generateCollectionTitleDataItem(someThing);
    }
    else if (decision == "accessionid") {
        data = generateAccessionIdDataItem(someThing);
    }
    else if (decision == "summary") {
        data = generateSummaryDataItem(someThing);
    }
    else if (decision == "origin") {
        data = generateOriginDescriptionDataItem(someThing);
    }
    else if (decision == "comment") {
        data = generateAdminCommentDataItem(someThing);
    }
    else {
        data = null;
    }
    return data;
}
