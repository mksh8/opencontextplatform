import urllib.request
import urllib.error

try:
    response = urllib.request.urlopen("http://127.0.0.1:8000/api/v1/graph/org_alpha_123/explorer")
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except urllib.error.HTTPError as e:
    print("ERROR STATUS:", e.code)
    print("ERROR BODY:", e.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
