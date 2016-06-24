from flask_wtf.form import Form
from wtforms.fields.core import SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired

def possible_restrictions():
    return [('R-X', 'R-X'),
            ('R-30','R-30'),
            ('R-40','R-40'),
            ('R-50','R-50'),
            ('R-80','R-80'),
            ('R-80D','R-80D'),
            ('0U', 'OU'),
            ('O', 'O')]

class RestrictionForm(Form):
    restriction = SelectField('Restriction Code', 
                                   choices=possible_restrictions(),
                                   validators=[DataRequired])
    
    restrictionComment = TextAreaField("Comment about Restriction", 
                                       validators=[DataRequired])