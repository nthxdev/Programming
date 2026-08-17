#include <stdio.h>
void cel_to_fah(float c){
    printf("celsius %.2f -> fahrenheit %.2f\n", c, ((c*9/5)+32));
}
void fah_to_cel(float f){
    printf("fahrenheit %.2f -> celsius %.2f\n", f, ((f-32)*5/9));
}
int main(){
    int choice;
    float cel, fah;
    printf("Enter celsius & fahrenheit: ");
    scanf("%f %f", &cel, &fah);
    printf("Enter Your choice: \n 1 for Celsius to Fahrenheit \n 2 for Fahrenheit to Celsius: ");
    scanf("%d", &choice);
    switch (choice) {
        case 1:
            cel_to_fah(cel);
            break;
        case 2:
            fah_to_cel(fah);
            break;
        default:
            printf("Enter valid choice: ");
            break;
    }
}