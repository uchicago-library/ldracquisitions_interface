from flask import Flask
from flask_wtf.csrf import CsrfProtect
import logging
from logging.handlers import RotatingFileHandler

from uchicagoldrtoolsuite.core.lib.confreader import ConfReader

from .record.views import acquisition

__author__ = "Tyler Danstrom"
__email__ = "tdanstrom@uchicago.edu"
__company__ = "The University of Chicago Library"
__copyright__ = "Copyright University of Chicago, 2016"
__publication__ = ""
__version__ = "0.0.1dev"

creader = ConfReader()

app = Flask(__name__)
CsrfProtect(app)

app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DATABASE_NAME'] = creader.get('Database', 'db_name')
app.config['DATABASE_HOST'] = creader.get('Database', 'db_host')
app.config['DATABASE_USER'] = creader.get('Database', 'db_user')
app.config['DATABASE_PASS'] = creader.get('Database', 'db_pass')


app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://{}:{}@{}/{}".\
format(app.config['DATABASE_USER'],
       app.config['DATABASE_PASS'],
       app.config['DATABASE_HOST'],
       app.config['DATABASE_NAME'])

app.config['SECRET_KEY'] = creader.get('WebApp', 'secret_key')

app.register_blueprint(acquisition)

loghandler = RotatingFileHandler('records.log', maxBytes=1024 * 1024 * 100, backupCount=20)
loghandler.setLevel(logging.DEBUG)

logformatter = logging.Formatter("{%(asctime)s -- %(message)s")
loghandler.setFormatter(logformatter)

app.logger.setLevel(logging.DEBUG)
app.logger.addHandler(loghandler)

@app.template_filter('strfdate')
def format_date(date, fmt=None):
    date_format = '%b %d, %Y'
    return date.strftime(date_format)

@app.template_filter('capfirst')
def capfirst(s):
    return s[0].upper()+s[1:]

@app.template_filter('makePretty')
def makePretty(s):
    if '_' in s:
        parts = s.split('_')
        parts = [x[0].upper()+x[1:].lower() for x in parts]
        return ' '.join(parts)
    else:
        return s[0].upper()+s[1:].lower()

