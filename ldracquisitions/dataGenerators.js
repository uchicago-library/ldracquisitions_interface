function generateAdminCommentDataItem(adminCommentDataObject) {
    "use strict";
    var dt_text = adminCommentDataObject;
    var dd_text = null;
    return {
    category: 'administrative comment',
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
    category: 'origin description',
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
    category: 'summary',
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
    category: 'accession id',
    dt_text: dt_text,
    dd_text: dd_text,
    accession: dt_text
    };
}

function generateCollectionTitleDataItem(orgDataObject) {
    "use strict";
    var dt_text = orgDataObject;
    var dd_text = null;
    return {
    category: 'collection title',
    dt_text: dt_text,
    dd_text: dd_text,
    collection: dt_text
    };
}

function generateOrgDataItem(coltitleDataObject) {
    "use strict";
    var dt_text = coltitleDataObject;
    var dd_text = null;
    return {
    category: 'organization name',
    dt_text: dt_text,
    dd_text: dd_text,
    organization: dt_text
    };
}

function generateTypeDataItem(acctypeDataObject) {
    "use strict";
    var dt_text = acctypeDataObject;
    var dd_text = null;
    return {
    category: 'type',
    dt_text: dt_text,
    dd_text: dd_text,
    type: dt_text
    };
}

function generatePhysMediaDataItem(physmediaDataObject) {
    "use strict";
    var dt_text = physmediaDataObject.Description;
    var dd_text = physmediaDataObject.Quantity;
    return {
    category: 'physmedia',
    dt_text: dt_text,
    dd_text: dd_text,
    label: dt_text,
    amount: dd_text
    };
}

function generateRestrictionDataItem(restrictionDataObject) {
    "use strict";
    var dt_text = restrictionDataObject.Restriction[0];
    var dd_text = restrictionDataObject.Comment[0];
    return {
    category: 'restriction',
    dt_text: dt_text,
    dd_text: dd_text,
    code: dt_text,
    description: dd_text
    };
}

function generatePersonDataItem(personDataObject, catName) {
    "use strict";
    var name = personDataObject['First Name'][0] + " " + personDataObject['Last Name'][0];
    var dt_text = name;
    var dd_text = "";
    var Email = personDataObject.Email;
    var Phone = personDataObject.Phone;
    var j = 0;
    var curP = "";
    var curE = "";
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
    var category = 'none';
    if (catName !== undefined) {
        category = catName.split('-')[0];
    }
    return {
        category: category,
        dt_text: dt_text,
        dd_text: dd_text,
        first: personDataObject['First Name'],
        last: personDataObject['Last Name'],
        emails: Email,
        phones: Phone
    };
}
