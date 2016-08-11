
function makeAccessionDataItemButtons(category, idString) {
    "use strict";
    var editButton = document.createElement('a');
    var deleteButton = document.createElement('button');

    editButton.setAttribute("href", category + ".html?n=" + idString);
    editButton.setAttribute("type", "button");
    editButton.setAttribute("role", "button");
    editButton.setAttribute("class", "btn btn-warning btn-xs");
    editButton.appendChild(document.createTextNode("edit"));
    deleteButton.setAttribute("type","button");
    deleteButton.setAttribute("role","button");
    deleteButton.setAttribute("class", "btn btn-danger btn-xs");
    deleteButton.appendChild(document.createTextNode("delete"));
    return {deleter:deleteButton, editer:editButton};
}

function addASubElement(topElement, childElement) {
    "use strict";
    topElement.appendChild(childElement);
}

