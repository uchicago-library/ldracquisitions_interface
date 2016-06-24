
from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired
from wtforms.fields.simple import TextAreaField
from wtforms.fields.core import  BooleanField

class AcquisitionForm(Form):
    accessionID = StringField("Accession Identifier", 
                              validators=[DataRequired])
    collection = StringField("Collection that this belongs in", validators=[DataRequired])
    organization_name = StringField("Organization Name",validators=[DataRequired])
    summary = TextAreaField("Description", validators=[DataRequired])
    origin = StringField("Origin")
    admin_comment = TextAreaField("Administrative Comment")
    mixed_acquisition = BooleanField("Is this acquisition all digital?")

    