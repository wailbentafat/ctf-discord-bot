s = "==VVNCIHJlYWR5LiBUb25pZ2h0LCBpdCBlbmRzLg"

reversed_s = s[::-1]
print(reversed_s)


reversed = "gLzRmblBCdpBCL0h2Zp52bUBiL5RWYlJHICNVV=="


reversed_with_special = ""

for i in range(0, len(reversed), 5):
    chunk = reversed[i:i+5]
    if i // 5 % 2 == 0:
        chunk += "~"
    else:
        chunk += "@"
    reversed_with_special += chunk

print(reversed_with_special)
Hint = "Strip the noise, invert the sequence, then decode the language of machines twice."