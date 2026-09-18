#include <iostream>
#include <string>
using namespace std;
int main(){
    int num1, num2;
    char op;
    while(1){
        cout << "Enter operator (q to quit): " << endl;
        cin >> op;
        if(op == 'q')break;
        cout << "Enter num1 num2: \n";
        cin >> num1 >> num2;
        switch(op){
            case '+':
                printf("%d\n", (num1+num2));
                break;
            case '-':
                printf("%d\n", (num1-num2));
                break;
            case '*':
                printf("%d\n", (num1*num2));
                break;
            case '/':
                if (num2==0){
                    printf("cannot divide by zero \n");
                }else{
                    printf("%d\n", (num1/num2));
                }
                break;
            case '%':
                printf("%d\n", (num1%num2));
                break;
        }
    }
}