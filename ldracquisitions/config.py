from os.path import abspath, join, exists
from uchicagoldrtoolsuite.core.lib.confreader import ConfReader

creader = ConfReader()

DEBUG = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = creader.get('WebApp', 'secret_key')
