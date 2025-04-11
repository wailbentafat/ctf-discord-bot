def xor_encrypt(input_str, key=0x42):
    encrypted = ''.join(chr(ord(char) ^ key) for char in input_str)
    return encrypted

def xor_encrypt_hex(input_str, key=0x42):
    return ' '.join(hex(ord(char) ^ key)[2:].zfill(2) for char in input_str)

# Example usage
plaintext = "HACKIWHA"
encrypted = xor_encrypt(plaintext)
encrypted_hex = xor_encrypt_hex(plaintext)

print(f"Original:            {plaintext}")
print(f"Encrypted (ASCII):   {encrypted}")
print(f"Encrypted (hex):     {encrypted_hex}")