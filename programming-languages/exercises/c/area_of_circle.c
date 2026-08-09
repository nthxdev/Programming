#include <stdio.h>
#define PI 3.14
void area_of_circle( double r){
    printf("Area of circle: %.2f\n", PI*(r*r));
}
int main(){
    int radius;
    printf("Enter Radius: ");
    scanf("%d", &radius);
    area_of_circle(radius);
}
