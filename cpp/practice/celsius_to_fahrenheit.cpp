#include <iostream>
using namespace std;

void cel_to_fah(int cel){
    cout << ((cel*9/5)+32) << endl;
}
void fah_to_cel(int fah){
    cout << ((fah-32)*5/9) << endl;
}
int main(){
    int fah, cel;
    int choice;
    cout << "Enter Your choice: \n 1 for Celsius to Fahrenheit \n 2 for Fahrenheit to Celsius: " << endl;
    cin >> choice;
    cout << "Enter Celsius and Fahrenheit: ";
    cin >> fah >> cel;
    switch (choice){
    case 1:
        cel_to_fah(cel);
        break;
    case 2:
        fah_to_cel(fah);
        break;
    default:
        cout << "Enter a valid choice plz.";
        break;
    }

}