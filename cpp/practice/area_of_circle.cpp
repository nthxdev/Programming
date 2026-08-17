#include <iostream>
using namespace std;
const int PI=3.14;
void area_of_square(int r){
    cout << (PI*(r*r)) << endl;
}
int main(){
    int radius;
    cout << "Enter Radius: ";
    cin >> radius;
    area_of_square(radius);
}
