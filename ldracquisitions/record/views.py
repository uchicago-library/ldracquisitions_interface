from flask import abort, Blueprint, request, session
from flask.templating import render_template

__author__ = "Tyler Danstrom"
__email__ = "tdanstrom@uchicago.edu"
__company__ = "The University of Chicago Library"
__copyright__ = "Copyright University of Chicago, 2016"
__publication__ = ""
__version__ = "0.0.1dev"

acquisition = Blueprint('records', __name__, 
                      template_folder='templates')

@acquisition.before_request
def csrf_protect():
    if request.method == "POST":
        token = session.pop('_csrf_token', None)
        if not token or token != request.form.get('_csrf_token'):
            abort(403)
 
def generate_csrf_token():
    from ..__init__ import app
    if '_csrf_token' not in session:
        session['_csrf_token'] = app.config['SECRET_KEY']
    return session['_csrf_token']

@acquisition.route('/')
def frontpage():
    from ..__init__ import app
    app.logger.info("entering landing page of acquisition interface")
    return render_template('front.html', pageTitle='Acquisition Type',
                           pageAction='Selection')

@acquisition.route('/acquisition', methods=['GET', 'POST'])
def makeANewRecord():
    # end point for student workers to fill out an acquisition
    # record for the DAS to review and convert to an accession
    # record
    from ..__init__ import app
    from .forms.AcquisitionForm import AcquisitionForm
    app.logger.info("entering making an acquisition record page")
    
    selected_type = request.args.get('type', '')
    if selected_type == 'phys':
        selected_type = False
    elif selected_type == 'dig':
        selected_type = True
    else:
        return abort(400)
    
    if request.method == 'POST':
        form = AcquisitionForm(request.form)
    else:
        form = AcquisitionForm()
        form.acquisitionType.data = selected_type
    return render_template('record.html', recordform=form,
                           pageTitle='New Acquisition', 
                           pageAction="Making an Acquisition Record") 

@acquisition.route('/accession', methods=['GET', 'POST'])
def makeAnAccession():
    from ..__init__ import app
    from .forms.AccessionForm import AccessionForm
    app.logger.info("entering making an accession page")
    acquisition = request.args.get('id')
    form = AccessionForm(csrf_enabled=False)
    return render_template('record.html', recordform=form,
                           pageTitle='New Accession', 
                           pageAction='Making an Accession Record')
    
@acquisition.route('/list')
def listRecords():
    from ..__init__ import app
    from .controllers.acquisitionretriever import AcquisitionRetriever
    app.logger.info("entering list acquisition records page")
    retriever = AcquisitionRetriever()
    retriever.run_browse()
    return render_template('list.html', result=retriever.result,
                           pageTitle='Un-Accessioned Acquisitions',
                           pageAction='Browsing New Acquisitions')

@acquisition.route('/record/convertToAccession', methods=['GET', 'POST'])
def convertRecordToAccession():
    # end point for the DAS to modify the acquisition record 
    # submitted by a student worker and convert modified record 
    # into an accession record
    from ..__init__ import app
    app.logger.info("entering converstin to record page") 
    return str("DAS form to modify and convert " + 
               "acquisition record into an accession record")
