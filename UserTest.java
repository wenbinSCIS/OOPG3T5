public class UserTest {
    public static void main(String[] args){
        User user_test = new User("test", "1234");
        System.out.println(user_test.getHashedPassword());
        System.out.println(user_test.comparePassword("1234"));
        System.out.println(user_test.comparePassword("null"));
    }
}
