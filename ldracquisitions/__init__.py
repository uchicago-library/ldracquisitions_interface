
from flask import Flask
from flask_wtf.csrf import CsrfProtect
import logging
from logging.handlers import RotatingFileHandler

from uchicagoldrtoolsuite.core.lib.confreader import ConfReader

from .record.views import acquisition

creader = ConfReader()

app = Flask(__name__)
CsrfProtect(app)

app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = creader.get('WebApp', 'secret_key')

app.register_blueprint(acquisition)

loghandler = RotatingFileHandler('records.log', maxBytes=1024 * 1024 * 100, backupCount=20)
loghandler.setLevel(logging.DEBUG)

logformatter = logging.Formatter("{%(asctime)s -- %(message)s")
loghandler.setFormatter(logformatter)

app.logger.setLevel(logging.DEBUG)
app.logger.addHandler(loghandler)


