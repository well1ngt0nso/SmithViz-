import http.server
import json
import os

PORT = 8000
JSON_FILE = "points.json"

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Quando o JavaScript mandar salvar, intercepta aqui
        if self.path == '/save':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Valida se o que chegou é um JSON válido
                data = json.loads(post_data)
                
                # Grava de verdade no arquivo points.json na pasta do projeto
                with open(JSON_FILE, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4, ensure_ascii=False)
                
                # Responde para o JavaScript que deu tudo certo
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "sucesso"}).encode('utf-8'))
                print("-> points.json atualizado com sucesso na pasta!")
                
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
        else:
            # Para qualquer outro arquivo (HTML, JS, CSS), roda o comportamento normal
            super().do_POST()

if __name__ == "__main__":
    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, MyHandler)
    print(f"Servidor rodando! Acesse em: http://localhost:{PORT}")
    print("Suporte a gravação de arquivos ativado.")
    httpd.serve_forever()
