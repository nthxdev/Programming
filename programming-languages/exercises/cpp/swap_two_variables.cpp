#include <iostream>
using namespace std;
int main(){
    int a=1,b=2,temp=0;
    cout << "before swap " << a << " " << b << endl;
    temp=a;a=b;b=temp;
    cout << "after swap " << a << " " << b << endl;
}