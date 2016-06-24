from flask_wtf.form import Form
from wtforms.fields.core import FormField
from .PersonFields import PersonFields

class DonorForm(Form):
    contact_info = FormField(PersonFields)