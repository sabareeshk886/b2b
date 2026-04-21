import socket
import os

host = "db.rxhpslgjuwdvhbguwnci.supabase.co"
print(f"Resolving {host}...")
try:
    addr = socket.getaddrinfo(host, 5432)
    print(f"Success! Addresses: {addr}")
except Exception as e:
    print(f"Failed: {e}")

# Also check env var
url = os.environ.get("DATABASE_URL", "NOT_SET")
print(f"DATABASE_URL length: {len(url)}")
if "db.rxhpslgjuwdvhbguwnci.supabase.co" in url:
    print("Hostname found in URL")
else:
    print("Hostname NOT found in URL or mangled")
