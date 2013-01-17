import urllib2, json
import bottle

API_BASE = 'http://api.theluminarium.net/'

class LuminariumAPI(object):
    def __init__(self, base = API_BASE):
        self.base = base
        self.opener = urllib2.build_opener()
        self.opener.addheaders.append(('Cookie', bottle.request.environ.get('HTTP_COOKIE','')))
        
    def fetch(self, url):
        return json.loads(self.opener.open(self.base + url).read())
        
    def fetch_str(self,url):
        return self.opener.open(self.base + url).read()