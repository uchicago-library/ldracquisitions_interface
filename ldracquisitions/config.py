from uchicagoldrtoolsuite.core.lib.confreader import ConfReader

__author__ = "Tyler Danstrom"
__email__ = "tdanstrom@uchicago.edu"
__company__ = "The University of Chicago Library"
__copyright__ = "Copyright University of Chicago, 2016"
__publication__ = ""
__version__ = "0.0.1dev"

creader = ConfReader()
DEBUG = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = creader.get('WebApp', 'secret_key')
