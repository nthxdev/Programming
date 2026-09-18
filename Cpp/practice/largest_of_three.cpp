#include <iostream>
using namespace std;
int main(){
    int arr[3];
    int max,min;
    cout << "Enter Numbers: " << endl;
    for (int i=0; i < 3; i++){
        cin >> arr[i];
    }
    max=arr[0];
    min=arr[0];
    for (int i=0; i < 3; i++){
        if(arr[i]>max)
            max=arr[i];
        if(arr[i]<min)
            min=arr[i];
    }
    cout << "Max is " << max << " & Min is " << min << endl;
}