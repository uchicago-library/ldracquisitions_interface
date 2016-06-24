from flask_wtf.form import Form
from wtforms.fields.core import StringField

class OriginFields(Form):
    description = StringField("Description of the origin")