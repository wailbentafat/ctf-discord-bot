def xor_decrypt(encrypted_hex: str, key: str) -> str:
    # Convert hex to bytes
    encrypted_bytes = bytes.fromhex(encrypted_hex)
    # Convert key to bytes (repeating to match length)
    print(f"encrypted bytes: {encrypted_bytes}")
    key_bytes = (key * (len(encrypted_bytes) // len(key) + 1)).encode()[:len(encrypted_bytes)]
    print(f"key bytes: {key_bytes}")
    # XOR each byte
    decrypted = bytes([b ^ k for b, k in zip(encrypted_bytes, key_bytes)])
    return decrypted.decode(errors='ignore')

encrypted = "2c1c011a4244425b1f16171c425d4314001d111c0a5d5355195d5421424359581953071c0d44104d1a065a484f197a1a3a5d"
key = "usthb404"
print(xor_decrypt(encrypted, key))