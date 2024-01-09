# 1 Topic có nhiều partition và có nhiều consumer trong 1 consumer-group subscribe đến topic đó

    > Nếu 1 topic có 3 partition thì dữ liệu sẽ được gửi đều vào các partition dự vào chiến lược (RoundRobin)
    > nếu có 1 consumer-group listen đến topic đó
    > và consumer-group đó có
    > 1 consumer thì consumer này sẽ listen tất cả các message trên tất cả các partition
    > 2 consumer thì consumer-group sẽ tự động cần bằng tải cho 2 consumer này đến các partition
    > 3 consumer thì consumer-group sẽ tự động cần bằng tải cho 3 conssumer, mỗi thằng sẽ listen trên 1 partition
    > 4 consumer thì sẽ có 1 thằng thừa
    > vậy nên số lượng consumer <= số lượng partition của 1 topic mà nó subscribe
    > mặc định nếu chỉ tạo consumer mà không chỉ định group thì nó sẽ tự tạo 1 group nặc danh rồi chui vào đó (1 mình nó)
    > và group nặc danh này sẽ bị xóa sau 1 khoảng thời gian mà consumer stop, còn group tự tạo thì không bị xóa
    > vậy là sao để 1 consumer listen đúng partition mà nó mong muốn ==> đối với kafkajs có thể dùng assign thay cho subscribe
    > và nếu dùng assign thì vấn đề cần bằng consumer trong consumer-group không còn tự động mà do người dùng config
