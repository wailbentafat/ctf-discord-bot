from flask import Flask, render_template_string, send_file, request
import io
from datetime import datetime, timedelta

app = Flask(__name__)

# Challenge Configuration
FLAG = "HACKIWAH{ALI_WAS_IN_BOUIRA_7:45AM}"
ALIBI_LOCATION = (36.3750, 4.9000)
ALIBI_TIME = "2025-04-05 07:45"
CRIME_TIME = datetime(2025, 4, 5, 8, 0)

# Hidden route name (obfuscated)
HIDDEN_GPX_ROUTE = "xM7f9E_travel_log"  # Appears random but can be found via hint

def generate_detailed_gpx():
    """Generates a GPX file with rich metadata for clear visualization"""
    gpx = f"""<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"
     version="1.1"
     creator="Ali's Phone - Forensic Export">
     
  <metadata>
    <name>Ali's Location Timeline</name>
    <desc>Last known location</desc>
    <time>{(CRIME_TIME - timedelta(minutes=15)).isoformat()}Z</time>
  </metadata>
  
  <wpt lat="{ALIBI_LOCATION[0]}" lon="{ALIBI_LOCATION[1]}">
    <ele>512</ele>
    <time>{(CRIME_TIME - timedelta(minutes=15)).isoformat()}Z</time>
    <name>Bouira Center</name>
    <desc>Wi-Fi hotspot connection recorded</desc>
    <sym>City</sym>
    <type>Waypoint</type>
  </wpt>
  
  <trk>
    <name>Movement Pattern</name>
    <trkseg>
      <trkpt lat="{ALIBI_LOCATION[0]}" lon="{ALIBI_LOCATION[1]}">
        <time>{(CRIME_TIME - timedelta(minutes=15)).isoformat()}Z</time>
        <ele>512</ele>
        <course>142</course>
        <speed>0.0</speed>
      </trkpt>
    </trkseg>
  </trk>
</gpx>"""
    return gpx

@app.route('/')
def index():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Ali's Alibi Investigation</title>
        <style>
            .hint {
                color: #888;
                font-size: 0.9em;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h1>Ali's Suspicious Message</h1>
        <blockquote>
            "Meet me at the lab in Algiers at 8:00 AM. Don't be late."<br>
            <small>Received 2025-04-05 07:30 AM</small>
        </blockquote>

        <div class="hint">
            <!-- Hidden hint: The truth lies in a couple of hidden routes -->
            Note: All digital evidence should be thoroughly examined, 
            especially <u>alternate travel records</u>.
            <br>
            <small>Forensic Tip: Check all API endpoints</small>
        </div>

        <p>No files available for download.</p>
    </body>
    </html>
    ''')

@app.route(f'/{HIDDEN_GPX_ROUTE}')
def download_gpx():
    gpx_data = generate_detailed_gpx()
    response = send_file(
        io.BytesIO(gpx_data.encode()),
        mimetype='application/gpx+xml',
        as_attachment=True,
        download_name='ali_movement_evidence.gpx'
    )
    # Force download and prevent caching
    response.headers['Cache-Control'] = 'no-store'
    response.headers['Content-Disposition'] = 'attachment; filename=ali_movement_evidence.gpx'
    return response

@app.route('/verify', methods=['GET', 'POST'])
def verify():
    if request.method == 'POST':
        location = request.form.get('location', '').lower()
        time = request.form.get('time', '')
        
        # Convert tuple coordinates to string for comparison
        location_str = "Bouira Center".lower()
        
        if location_str == location and time == ALIBI_TIME:
            return f'''
            <h1>Alibi Verified!</h1>
            <p>At crime time (8:00 AM), Ali was in Bouira.</p>
            <p>Flag: {FLAG}</p>
            '''
        else:
            return '''
            <h1>Incorrect Evidence</h1>
            <p>Re-examine the GPS data carefully.</p>
            <a href="/">Try again</a>
            '''
    
    return '''
    <form method="POST">
        <h2>Submit Evidence</h2>
        <label>Location Name from GPX: <input type="text" name="location" required></label><br>
        <label>Exact Time (YYYY-MM-DD HH:MM): 
            <input type="text" name="time" required>
        </label><br>
        <button type="submit">Verify</button>
    </form>
    '''

if __name__ == '__main__':
    app.run(debug=True)