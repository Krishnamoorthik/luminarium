#!/home/warlord/www/api/env2/bin/python

import bottle
from bottle import get
from api_handler import LuminariumAPI
from custom_view import view
import json

# setup application with plugins    
app = bottle.Bottle()

# define the API interface
app.config['api'] = LuminariumAPI()

@app.get('/')
@view('home')
def hello():
    return {}
    
@app.get('/exhibit/<id:int>')
@view('exhibit')
def exhibit(id):
    return {'exhibit': json.dumps(app.config['api'].fetch('/exhibit/' + str(id)))}

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2: # production mode, run with apache fast cgi
        from flup.server.fcgi import WSGIServer
        WSGIServer(app).run()
    else: # debug mode (can be used with curl over ssh)
        from bottle import static_file
        
        # route static files for localhost testing
        @app.get('/<filepath:path>')
        def file(filepath):
            return static_file(filepath.replace('v4/','',1), root='')
            
        app.run()
