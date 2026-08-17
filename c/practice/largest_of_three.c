#include <stdio.h>
int main(){
int arr[5];
    printf("Enter 5 numbers: \n");
    int size = sizeof(arr) / sizeof(arr[0]); // 20 / 4 = 5
    for (int i = 0; i < size; i++){
        scanf("%d", &arr[i]);
    }
    int max, min;
    max = min = arr[0];
    for (int i = 0; i < size; i++){
        if (arr[i] > max)
            max=arr[i];
        if (arr[i] < min)
            min=arr[i];
    }
    printf("max is %d & min is %d\n", max, min);
}