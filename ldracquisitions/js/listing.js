
function buildDataItem(textValue) {
    return document.createElement("dt").appendChild(document.createTextNode(textValue));
}

function buildDataList() {
    return document.createElement("dl");
}

function buildDataList(anArray, func) {
    callback = new Function(funcName);
    var list = buildDataList();
    $.each(anArray, function(index, value) {
        list.appendChild(callback(value));
    });
}

function generateAFilledDataList(listName, anArray) {
    var out = null;
    if (listName === "donors-list") {
        out = buildADataList(anArray, 'donors');
    } else if (listName === "sources-list") {
        out = buildADataList(anArray, 'sources');
    } else if (listName === "restriction-list") {
        out = buildADataList(anArray, 'restrictions');
    } else if (listName === "physmedia-list") {
        out = buildADataList(anArray, 'physmedia');
    } else {
        console.log("this is not implemented");
    }
    return out;
}

function findInLocalStorage(name) {
    if (localStorage.getItem(name) !== undefined) {
        return [true, JSON.parse(localStorage.getItem(name))];
    } else {
        return [false,null];
    }
}

function ShouldThereBeADataList(listName, localStorageLookup) {
    var answer = findInLocalStorage(localStorageLookup);
    if (answer[0] == true) {
        return [true, generateAFilledDataList(listName, answer[1])];
    } else {
        return [false, null];
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
                    string = dataToLoad[i]["First Name"] + " " + dataToLoad[i]["Last Name"];
                    dt = document.createElement("dt");
                    dt.appendChild(document.createTextNode(string));
                    dl.appendChild(dt);
                } else if (listName === "sources-list") {
                    string = dataToLoad[i]["First Name"] + " " + dataToLoad[i]["Last Name"];
                    dt = document.createElement("dt");
                    dt.appendChild(document.createTextNode(string));
                    dl.appendChild(dt);
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
                }
                var dd = document.createElement("dd");
                var itemNum = i;
                itemNum = itemNum.toString();

                var editButton = document.createElement("a");
                editButton.setAttribute("href", "form.html?action=" + editType + "&item=" + itemNum);
                editButton.setAttribute("class", "btn btn-primary btn-sm");
                editButton.setAttribute("role", "button")
                editButton.setAttribute("id", "edit-" + editType + (i + 1).toString());
                editButton.appendChild(document.createTextNode("Edit"));

                var deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "btn btn-danger btn-sm");
                deleteButton.setAttribute("role", "button")
                deleteButton.setAttribute("id", "delete-" + editType + "-" + i.toString());
                deleteButton.appendChild(document.createTextNode("Delete"));

                dd.appendChild(editButton);
                dd.appendChild(document.createTextNode(" "));
                dd.appendChild(deleteButton);
                dl.appendChild(dt);
                dl.appendChild(dd);
                listDiv.html(dl);
            }
        }
    }

