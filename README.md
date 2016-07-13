# Introduction

The acquisitions interface is a Javascript/Python-Flask application for allowing workers to add acquisitions and accession records into the ldr. In order to facilitate that purpose it has three major sections

1. An acquisition form submission page
2. An accession form submission page
3. A list of accessions

As extra information, there is:

1. an about page describing
    - how each type of user should use the site
    - a FAQ list
2. a list of accession records

# Major Responsibilities

1. Be a location for SPCL users to enter data about new resources about to be added to the LDR
2. Be a location for SPCL users to review data about resource that have been added to the LDR
3. Feed data entered by SPCL users into a central database of information about resources in the LDR


# Types of Forms

## Acquisition Record

### Introduction

The acquisition record is the one that a student worker fills out. It contains 56% of the information record in the accession form.

The main purpose of this form is to provide a rapid means for the student worker to submit new resources to accession into the LDR. This form is then picked up by the Digital Accession Specialist in a list.

It has the following fields:

* accession identifier = must be four numerals followed by a dash followed by three numerals
* collection title = must be a string ending with the word "Collection"
* receipt letter info required = may be True, default is False
* receipt letter info sent = may be an ISO-0601 formatted date
* gift acknowledgement info required = may be True, default is False
* gift acknowledgement info received = may be an ISO-8601 formatted date
* organization = must be a department in the university. Will most commonly be Special Collections Research Center
* origin description = may be 1 or more sentences
* administrative comment = may be 1 or more sentences.
* a list of donors for the material = must be 1 or more individuals,
    a. a first name
    b. a last name
    c. an email address
    d. a phone number
    e. a mailing address
        * street address
        * unit number
        * city
        * state
        * zipcode
* a list of sources for the material = must be 1 or more individuals,
    a. a first name
    b. a last name
    c. an email address
    d. a phone number
    e. a mailing address
        * street address
        * unit number
        * city
        * state
        * zipcode
* a list of restrictions applied to the material = must be 1 or more lines
    a. a formal SPCL restriction code
    b. a description of why that code was applied
* a list of the physical media and how much of each that medium that holds the resource originally = may be 1 or more lines
    a. a descriptor (e.g., floppy disk, cd, thumb drive)
    b. a number reflecting the amount of that descriptor that was in the accession
* whether it is a mixed acquisition = must be Yes or No

### Description of actions performed by the user

1. Select whether this is a mixed acquisition or not
2. Enter an accession identifier
3. Enter a collection title: this should be a close approximation to a formal collection title
4. Check if a receipt letter is required
5. Check if a receipt letter was sent
6. Check if a gift acknowledgement is required
7. Check if a gift acknowledgement was received
8. Enter the name of the organization that is creating this record
9. Enter a description of the origin of the resources. Was this from the Universaty Administration? From IT Services? What are the issues around this origin?
10. Enter any extra information that the user thinks the DAS neesd to know
11. Add 1 or more donors
12. Add 1 or more sources
13. Add 1 or more restrictions
14. Add 1 or more physical media components

## Accession Record

### Introduction

The accession record is the one that the Digital Accession Specialist creates. It is the complete record that is stored in the LDR system for every single deposit of resources.

Its main purpose is to be a historical record of the deposit when it first arrived at the LDR and to provide useful statistics about the LDR's contents.

It has the following fields:

* all of the fields in the acquisition record
* a formal collection title = must be a formal SPCL collection title (e.g. Brainerd, Mary J. Digital Collection.)
* ead identifier = must be a valid SPCL EAD id (e.g. ICU.SPCL.FOO)
* span date for the intellectual content that the resources represent = must be two ISO-8601 formatted dates
* should the public access it = must be True or False
* should the public discover it = must be True or False
* fiscal year = must be a year with four numerals followed by a dash followed by a year with four numerals
* organization = must be a department in the University of Chicago
* prc = must be either "P" or "R" or "C" (may be obsolete)
* type = must be a formal SPCL type designation (may be obsolete)
* origin description = must be 1 or more sentences
* rights = must be 1 or more sentences
* access description = may be 1 or more sentences
* files staged date = must be an ISO-8601 formatted date
* files received date = must be an ISO-8601 formatted date

### Description of actions performed by the user

1. Modify or leave as-is accession identifier entered by the acquisition record maker
2. Add an EAD identifier
3. Enter the formal collection title that this record belongs to
4. Enter the intellectual date range of the material in this accession
5. Write a description of the contents of the accession. What is the intellectual content? Who created it? Why is it useful to the scholarly record?
6. Check if the public should access it
7. Check if the public should discover it
8. Modify or leave as-is if a the reciept letter was required
9. Modify or leave as-is if a receipt letter was sent
10. Modify or leave as-is if a gift acknowledgement is required
11. Modify or leave as-is if a gift acknowledgement was received
12. Enter the fiscal year that this accession belongs in
13. Modify or leave as-is the organization that created this record
14. Enter a P if this collection is a Papers collection, an R if it is a Records collection, or a C if it is a general collection
15. Enter the SPCL type that this accessoin belongs to
16. Modify or leave as-is the origin description
17. Enter the legal rights associated with the material in this accession
18. Enter the access description for the material in this accessoin
18. Enter any information that is not otherwise in the form that you believe a future DAS might need to know about the contents of this accession
19. Enter the date that the files in this accession were staged
20. Enter the date that the files in this accession were received by SPCL
21. Modify or leave as-is the donors for this accessoin
22. Modify or leave as-is the sources for this accession
23. Modify or leave as-is the restrictions for this accesion
24. Modify or leave as-is the physical media associated with this accession

## Donor and Source Forms

### Introduction

Either of these forms are reached from the accession or acquisition form. Clicking on the link for a new donor or a new source from either of those pages opens up a new window with the appropriate form.

They have the following fields

* first name 
* last name
* phone number
* email address
* mailing street number and name
* unit number
* city
* state
* zipcode

### Description of actions performed by user

1. Enter the donor/source's first name
2. Enter the donor/source's last name
3. Enter the donor/source's phone number
4. If ther donor/source has more than one phone number, click on the "add" button next to the label for "Phone number" and fill in the form field that appears
4. Enter the donor/source's email address
5. If ther donor/source has more than one email, click on the "add" button next to the label for "Email address" and fill in the form field that appears
6. Fill in the mailing address including street number and name, if there is a unit number, the city, state and zip code.
7. If there is more than one mailing address, click on the "add button" next to "Address" and fill in the form fields that appear
8. Click "Save"
9. If the form is complete, the window will close and the Accession/Acquisition Form Page from which you temporarily were navigated away will reload the appropriate data list for Donor or Source.

## Physical Media Form

### Introduction

This form is reached from the accession or acquisition form. Clicking on the link will open a new window with the appropriate form.

It has the following fields

* media descriptor
* quantity of the media

### Description of actions performed by user

1. Enter the descriptor label
3. Enter the quanity of the physical media present
8. Click "Save"
9. If the form is complete, the window will close and the Accession/Acquisition Form Page from which you temporarily were navigated away will reload the physical media data list.

# Research on implementing this interface in Wagtail

Possibility to install this interface into Wagtail. This would require

- developing a custom wagtail page type for the accession and acquisition forms
- develop a streamfield for listing ajax items
    * would have to be able to list acquisitions with the required data
    * would have to be able to list accessions with the required data
- all custom page types and streamfields be useable by everyone who has write access to the library website [see wagtail doc for streamfileds and block types](http://docs.wagtail.io/en/v1.5.2/topics/streamfield.html?highlight=streamfield)
- a wagtail page type would need to be developed to hold the form and various data lists that need to be on the page for each form (see [wagtail doc for page blocks](http://docs.wagtail.io/en/v1.5.2/topics/pages.html?highlight=page%20type)
- would need to develop a form for the acquisition and accession in wagtail [see wagtail doc for forms](http://docs.wagtail.io/en/v1.5.2/reference/contrib/forms.html?highlight=form)
- wagtail has an api that can be extended [see api doc](http://docs.wagtail.io/en/v1.5.2/reference/contrib/api/usage.html)

Of potential use, though I don't see the immediate use case right now, is that wagtail has a read-onlyAPI [see the api doc](http://docs.wagtail.io/en/v1.5.2/reference/contrib/api/usage.html)