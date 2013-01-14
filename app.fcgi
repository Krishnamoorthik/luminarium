#!/home/warlord/www/api/env2/bin/python

import bottle
from bottle import get, run, error, abort, static_file

# setup application with plugins    
app = bottle.Bottle()

@app.get('/')
def hello():
    return static_file('views/index.html', root='')

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2: # production mode, run with apache fast cgi
        from flup.server.fcgi import WSGIServer
        WSGIServer(app).run()
    else: # debug mode (can be used with curl over ssh)
    
        # route static files for localhost testing
        @app.get('/<filepath:path>')
        def file(filepath):
            return static_file(filepath, root='')
            
        app.run()