import functools
import bottle
from bottle import DictMixin, template
from api_handler import LuminariumAPI

def view(tpl_name, **defaults):
    ''' Decorator: renders a template for a handler.
        The handler can control its behavior like that:

          - return a dict of template vars to fill out the template
          - return something other than a dict and the view decorator will not
            process the template, but return the handler result as is.
            This includes returning a HTTPResponse(dict) to get,
            for instance, JSON with autojson or other castfilters.
    '''
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            
            # ---------------------------------------------------------------
            # fetch user profile and background image from API for every page and pass
            # them to the templates for rendering (The api is defined in server.fcgi
            # where this function is included)
            
            api = LuminariumAPI()
            
            result['user'] = api.fetch('me')
            result['background_image'] = api.fetch('utils/background')
            
            # ---------------------------------------------------------------
            
            result['template_adapter'] = bottle.Jinja2Template
            
            if isinstance(result, (dict, DictMixin)):
                tplvars = defaults.copy()
                tplvars.update(result)
                return template(tpl_name, **tplvars)
            elif result is None:
                return template(tpl_name, defaults)
            return result
        return wrapper
    return decorator
