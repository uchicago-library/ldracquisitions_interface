from flask_wtf.form import Form
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired

class ReceiptLetter(Form):
    required = BooleanField("Receipt Letter Required", validators=[DataRequired])
    sent = BooleanField("Receipt Letter Sent")