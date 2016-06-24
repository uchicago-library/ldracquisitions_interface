from flask_wtf.form import Form
from wtforms.fields.core import StringField
from wtforms.validators import DataRequired


class PersonFields(Form):
    first_name = StringField('First Name', validators=[DataRequired])
    last_name = StringField('Last Name', validators=[DataRequired])
    email = StringField('Email Address', validators=[DataRequired])
    phone_number = StringField('Phone Number', validators=[DataRequired])