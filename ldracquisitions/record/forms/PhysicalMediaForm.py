from flask_wtf.form import Form
from wtforms.fields.core import StringField
from wtforms.validators import DataRequired


class PhysicalMediaForm(Form):
    description = StringField("Description of Physical Media", validators=[DataRequired])
    number = StringField("Amount of The Media", validators=[DataRequired])
