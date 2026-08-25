#!/usr/bin/env python3
"""Serveur local avec URLs propres, comme Cloudflare Pages / Netlify :
/tarifs → tarifs.html, / → index.html. Usage : python3 serve.py [port]"""
import http.server
import os
import sys


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.exists(p + '.html'):
            return p + '.html'
        return p


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    print(f'→ http://localhost:{port}/  (URLs propres actives : /tarifs, /contact…)')
    http.server.ThreadingHTTPServer(('', port), CleanURLHandler).serve_forever()
