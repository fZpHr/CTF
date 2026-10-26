#!/usr/bin/env python3
"""Mini backend d'authentification de la console d'administration Datalys.
Les bons identifiants (ceux que l'agent de telemetrie envoie en clair) donnent le flag.
Aucun flag n'est expose cote client : seule une reponse 200 le contient."""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs

USER = "admin"
PASSWORD = "Datalys_Pr0d!2026"
FLAG = "FLAG{Mais_oui_c'est_clair!}"


class Handler(BaseHTTPRequestHandler):
    server_version = "datalys-admin/1.0"

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path.split("?")[0] != "/api/login":
            return self._json(404, {"ok": False})
        try:
            length = int(self.headers.get("Content-Length", 0) or 0)
        except ValueError:
            length = 0
        raw = self.rfile.read(length).decode("utf-8", "replace") if length else ""
        user = password = ""
        if "application/json" in self.headers.get("Content-Type", ""):
            try:
                data = json.loads(raw)
                user = str(data.get("username", ""))
                password = str(data.get("password", ""))
            except Exception:
                pass
        else:
            q = parse_qs(raw)
            user = (q.get("username") or [""])[0]
            password = (q.get("password") or [""])[0]

        if user == USER and password == PASSWORD:
            self._json(200, {"ok": True, "user": user, "flag": FLAG,
                             "message": "Accès administrateur accordé. Bienvenue, " + user + "."})
        else:
            self._json(401, {"ok": False, "message": "Identifiants invalides."})

    def do_GET(self):
        if self.path.split("?")[0] in ("/api/health", "/healthz"):
            return self._json(200, {"ok": True, "service": "datalys-admin-auth"})
        return self._json(405, {"ok": False})

    def log_message(self, *args):
        return


if __name__ == "__main__":
    ThreadingHTTPServer(("0.0.0.0", 5000), Handler).serve_forever()
