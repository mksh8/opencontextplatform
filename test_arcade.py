import httpx
import json

response = httpx.post(
    "http://localhost:2480/api/v1/command/opencontext",
    auth=("root", "opencontext"),
    json={"language": "sql", "command": "SELECT * FROM ContextNode"}
)
print("Status:", response.status_code)
try:
    data = response.json()
    print(json.dumps(data, indent=2))
except Exception as e:
    print(response.text)
