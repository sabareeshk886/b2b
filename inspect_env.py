with open('.env', 'rb') as f:
    content = f.read()
    print(f"Bytes: {content}")
    print(f"String representation: {content.decode('utf-8', errors='replace')}")
