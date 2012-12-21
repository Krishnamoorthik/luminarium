from bottle import route, run, static_file

@route('/')
def hello():
    return static_file('index.html', root='')
    
@route('/<filepath:path>')
def file(filepath):
    return static_file(filepath, root='')

run(host='localhost', port=8080, debug=True, reloader=True)
