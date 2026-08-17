#include <stdio.h>
int main(){
int num1, num2, temp=0;
num1=2;
num2=3;
printf("Before swap: %d %d\n", num1, num2);
temp=num2;
num2=num1;
num1=temp;
printf("After swap: %d %d\n", num1, num2);
}