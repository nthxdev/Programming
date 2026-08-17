#include <stdio.h>
int main(){
    int num1, num2;
    char op;
    while (1) {
        printf("Enter operator (q to quit): ");
        scanf(" %c", &op);
        if (op == 'q')
            break;
        printf("Enter num1 num2: \n");
        scanf("%d %d", &num1, &num2);
        switch (op) {
            // can't write "+" string doesn't work
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