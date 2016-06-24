from flask_wtf.form import Form
from wtforms.fields.core import FormField
from .PersonFields import PersonFields

class SourceForm(Form):
    contact_info = FormField(PersonFields)