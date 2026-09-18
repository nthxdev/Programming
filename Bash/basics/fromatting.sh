# escape sequence character
# -e flag to enable escape characters
echo -e "New line:\nSecond line"
echo -e "Tab:\tHello"
echo -e "Carriage return:\rABC"
echo -e "Backspace:ABC\bD"
echo -e "Bell:\a"
echo -e "Form feed:\fHello"
echo -e "Vertical tab:\vHello"
echo -e "Backslash:\\"
echo -e "Double quote:\"Hello\""
echo -e "Single quote:\'Hello\'"
echo -e "Octal:\101"      # A
echo -e "Hex:\x41"        # A
echo -e "Unicode:\u2764"  # ❤
echo -e "Unicode:\U0001F600"  # 😀

# printf format specifiers:
# %s  String
# %d  Signed decimal integer
# %i  Signed integer
# %u  Unsigned integer
# %f  Floating-point
# %e  Scientific notation (e.g. 1.23e+03)
# %E  Scientific notation (uppercase)
# %g  Shortest of %f or %e
# %G  Shortest of %F or %E
# %o  Octal
# %x  Hexadecimal (lowercase)
# %X  Hexadecimal (uppercase)
# %c  Single character
# %%  Literal '%'
#
# Common modifiers
# %10s   Right-align in width 10
# %-10s  Left-align in width 10
# %.2f   2 decimal places
# %05d   Pad integer with leading zeros

