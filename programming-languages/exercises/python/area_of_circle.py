PI=3.14
radius=float(input("Enter Radius of circle :"))
def area_of_circle(r):
    print(f"area of cirle: {PI*r**2:.1f}")
    # or use round()
area_of_circle(radius)
