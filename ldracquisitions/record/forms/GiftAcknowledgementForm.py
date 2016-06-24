from flask_wtf.form import Form
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired


class GiftAcknowledgement(Form):
    required = BooleanField('Gift Acknowledgement Required', validators=[DataRequired])
    received = BooleanField('Gift Acknowledgement Received')