from flask import Flask, Response
from werkzeug.middleware.dispatcher import DispatcherMiddleware

app = Flask(__name__)

def xor_encrypt(message: str, key: str) -> str:
    """Encrypt message using repeating XOR key, returning hex string"""
    extended_key = (key * ((len(message) // len(key)) + 1))[:len(message)]
    return ''.join(f"{ord(m) ^ ord(k):02x}" for m, k in zip(message, extended_key))

# Professor's threat
message = "Your project is unethical. I will stop you. --J.O. HACKIWHA{h1dd3n_4dm1n_p4n3l_f0und}"
key = "usthb404"  # Key hint hidden in HTTP headers
encrypted_msg = xor_encrypt(message, key)

@app.route('/')
def home():
    return '''
    <html>
        <head><title>USTHB Faculty Portal</title></head>
        <body>
            <h1>USTHB Faculty Portal</h1>
            <p>Authorized personnel only.</p>
        </body>
    </html>
    '''

@app.route('/j0_secure_audit')
def admin_panel():
    response = Response(f'''
    <html>
        <body>
            <h2>Ethics Committee Access</h2>
            <pre>Encrypted Note: {encrypted_msg}</pre>
            <i>Seek what whispers in the unseen veins of the request.<br />
                What flows in hidden channels bears the lock's teeth.<br />
                Convert machine blood to its raw pulse,<br />
                Then let the twin tongues speak in XOR's embrace.</i>
        </body>
    </html>
    ''')
    # Hide the key in response headers
    response.headers['X-Secret-Key'] = key
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
