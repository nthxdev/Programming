import java.util.Scanner;
class add_two_numbers{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter numbers");
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();
        System.out.printf("%d\n", (num1+num2)); 
    }  
}
