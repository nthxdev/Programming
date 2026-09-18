# Reassigning
def f(lst):
    lst = [9, 9]
nums = [1, 2]
f(nums)
print(nums)
# Original list is unchanged. coz we just changed the reference of lst earlier it was pointing to same object as nums
# if did -> lst.append(9) 
# then nums would have been changed as well. coz we modified the object lst was pointing to.

# Default arguments are evaluated once when the function is created, not each call.
# Same list reused every time.
# def add(item, lst=[]):

#  A new list is created for each call.
# def add(item, lst=None):
#     if lst is None:
#         lst = []
#     lst.append(item)
# None is immutable and acts as a sentinel value.