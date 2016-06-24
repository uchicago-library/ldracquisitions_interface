
from flask import Flask

app = Flask(__name__)
CsrfProtect(app)
app.config.from_object(config)
app.register_blueprint(acquisition)
loghandler = RotatingFileHandler('records.log', maxBytes=1024 * 1024 * 100, backupCount=20)
loghandler.setLevel(logging.DEBUG)

logformatter = logging.Formatter("{%(asctime)s -- %(message)s")
loghandler.setFormatter(logformatter)
app.logger.setLevel(logging.DEBUG)
app.logger.addHandler(loghandler)


