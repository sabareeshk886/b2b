import socket

hosts = [
    "google.com",
    "supabase.com",
    "supabase.co",
    "db.rxhpslgjuwdvhbguwnci.supabase.co",
    "rxhpslgjuwdvhbguwnci.supabase.co"
]

for host in hosts:
    try:
        addr = socket.gethostbyname(host)
        print(f"{host}: Success! {addr}")
    except Exception as e:
        print(f"{host}: Failed! {e}")
