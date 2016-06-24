from flask.ext.sqlalchemy import SQLAlchemy
from ..__init__ import app
from sqlalchemy.exc import OperationalError

try: 
    db = SQLAlchemy(app)
    db.Model.metadata.reflect(db.engine)
except OperationalError:
    db = SQLAlchemy()