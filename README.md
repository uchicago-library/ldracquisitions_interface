# Introduction

The acquisitions interface is a Javascript/Python-Flask application for allowing workers to add acquisitions and accession records into the ldr. In order to facilitate that purpose it has three major sections

1. An acquisition form submission page
2. An accession form submission page
3. A list of accessions

As extra information, there is:

1. an about page describing 
  1a. how each type of user should use the site
  1b.  a FAQ list
2. a list of accession records

# Types of Forms
## Acquisition Record

The acquisition record is the one that a student worker fills out. It contains 56% of the information record in the accession form.

The main purpose of this form is to provide a rapid means for the student worker to submit new resources to accession into the LDR. This form is then picked up by the Digital Accession Specialist in a list.

It has the following fields:

* accession identifier
* collection title
* receipt letter info required
* receipt letter info sent
* gift acknowledgement info required
* gift acknowledgement info received
* organization
* origin description
* administrative comment
* a list of donors for the material
* a list of sources for the material
* a list of restrictions applied to the material
* a list of the physical media and how much of each that medium that holds the resource originally
* whether it is a mixed acquisition

## Accession Record

The accession record is the one that the Digital Accession Specialist creates. It is the complete record that is stored in the LDR system for every single deposit of resources. 

Its main purpose is to be a historical record of the deposit when it first arrived at the LDR and to provide useful statistics about the LDR's contents.

It has the following fields:

* all of the fields in the acquisition record
* a formal collection title
* ead identifier
* span date for the intellectual content that the resources represent
* should the public access it
* should the public discover it
* fiscal year
* organization
* prc
* type
* origin description
* rights
* access description
* files staged date
* files received date