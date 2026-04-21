with open('.env', 'rb') as f:
    content = f.read()
    print(f"Hex: {content.hex()}")
