from http.server import HTTPServer, SimpleHTTPRequestHandler

def run_server():
    server_address = ('localhost', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print('Server avviato su http://localhost:8000')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server() 