#!/usr/local/bin/python

import bottle
from bottle import get
from api_handler import LuminariumAPI
from custom_view import view
import json

bottle.TEMPLATE_PATH.insert(0,'/home/jkeech/public/theluminarium.net/v4/views')

# setup application with plugins    
app = bottle.Bottle()

@app.get('/')
@view('home')
def hello():
    return {'exhibits': LuminariumAPI().fetch_str('/exhibits')}
    
@app.get('/privacy')
@view('privacy')
def privacy():
    return {'exhibit': LuminariumAPI().fetch_str('/exhibit/latest')}
    
@app.get('/exhibit/<id:int>')
@view('exhibit')
def exhibit(id):
    return {'exhibit': LuminariumAPI().fetch_str('/exhibit/' + str(id)),
            'id': id}

if __name__ == '__main__':
    #from bottle import static_file
        
    # route static files for localhost testing
    #@app.get('/<filepath:path>')
    #def file(filepath):
    #    return static_file(filepath.replace('v4/','',1), root='')
            
    app.run(server='gunicorn', port=9002)
