#!/usr/local/bin/python

import sys
path = '/home/jkeech/public/theluminarium.net/public/v4'
if path not in sys.path:
    sys.path.append(path)

import server
application = server.app
