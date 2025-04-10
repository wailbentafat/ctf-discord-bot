from flask import Flask, request, make_response, render_template_string

app = Flask(__name__)

HIDDEN_DRAFT = "=~=z@dm#Vp~cC@Bp#dC@,s#dG~hn@iW#5v@VC@.e#Zh~FX#ci@gQ#lN~VV"

HIDDEN_DRAFT = "==zdmVpcCBpdCsdGhniW5vVCeZhFXcigQlNVV"

BLOG_TEMPLATE = """
<html>
<head>
    <title>Rayane's Blog</title>
    <style>
        .stego-hint {
            font-style: italic;
            color: #666;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <h1>Rayane's Blog</h1>
    {% if role == 'admin' %}
        <div class="draft" style="background-color: #ffe6e6; padding: 10px;">
            <h2>Draft Post (Unpublished)</h2>
            <img src="/static/secret.png" alt="Hidden message" width="400">
            <p class="stego-hint">Sometimes things are not what they seem. Look deeper into the pixels...</p>
            <p>{{ draft }}</p>
        </div>
    {% endif %}
    <div class="posts">
        <h2>Public Posts</h2>
        <p>April 4: "Working on something big. Hope it pays off."</p>
    </div>
</body>
</html>
"""

@app.route('/')
def blog():
    # Set default cookie: role=guest
    resp = make_response(render_template_string(BLOG_TEMPLATE, role=request.cookies.get('role', 'guest'), draft=HIDDEN_DRAFT))
    resp.set_cookie('role', 'guest')  # Default cookie visible in DevTools
    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)