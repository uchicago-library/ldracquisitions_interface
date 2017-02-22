/*global window*/
/*global alert*/
/*global $*/
/*global confirm*/

var ajaxURL = "http://127.0.0.1:5000/";
$(document).ready(function () {
    "use strict";

    var id = localStorage.getItem("New Record");
    localStorage.removeItem("Donor");
    localStorage.removeItem("Source");
    localStorage.removeItem("Physical Media Information");
    localStorage.removeItem("Restriction Information");
    localStorage.removeItem("Major Form");
    var header = $("#receipt-header");
    var headerText = document.createTextNode("Receipt for new Acquisition");
    header.html(headerText);
    var div = $("#receipt-div");
    var p = document.createElement("p");
    var pText = document.createTextNode("You have created a new acquisition record. If you want to verify with the DAS, please give him this identifier:  " + id + ". Otherwise, you can review the record you just created by clicking on the List Acquisitions link at the top of the screen and finding the identifier in the list that will be displayed. Thank you for your submission.");
    p.appendChild(pText);
    div.html(p);
});
