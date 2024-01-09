# Topics

    > giống như 1 table trong databse
    > có thể có nhiều topic
    > 1 Topic có thể có nhiều partition
    > kafka Topic are immutable: một khi dữ liệu được ghi vào 1 partition, nó không thể thay đổi
    > ==> không thể xóa dữ liệu trong kafka, không thể update chỉ có thể write tiếp vào

# Partitions

    > message trong mỗi partition được sắp xếp

# Offsets

    > mỗi message trong 1 partition được cấp 1 id tăng dần ==> gọi là  Offset

### Topics, partition and offsets - important notes

    > Một khi data được ghi vào 1 partition thì nó không thể bị thay đổi (immutability)
    > Dữ liệu trong kafka chỉ được giữ trong 1 khoảng thời gian có hạn (mặc định là 1 tuần), sau thời gian này dữ liệu biến mất
    > Offset chỉ có ý nghĩa cho 1 partition cụ thể
        - ví dụ: offset 3 trên partition 0 không = offset 3 trên partition 1
    > Offset không thể re-use dù cho message trước đó đã bị xóa
    > Thứ tự thông báo được đảm bảo trong 1 partition không phải trên các partition
    > Message sẽ được chỉ định vào partition ngẫu nhiên nếu không chỉ định KEY
    > có thể có nhiều Partition / Topic

# Producer

    > Producer write data to Topics
    > Producer quyết đinh message được ghi vào partition nào và broken nào của kafka đang nắm giữ partition đó
    > In case kafka broken failures, Producer will automatically recover

# Message key

    > Producer can chose 1 KEY to sent message with this KEY
    > Key === null, message được gửi theo vòng (round robin) (partition 0 -> 1 -> 2)
    > Key !== null, tất cả message có cùng KEY sẽ luôn đi đến chung 1 partition (hashing)
    > ordering cho 1 field cụ thể
        - ví dụ: car_123

# Kafka Message Serializer

    > Kafka chỉ nhận input từ Producer ỏ dạng byte, và sẽ trả về data cho consumer cũng là dạng byte
    > message serialization có mục đích là transforming object / data ==> byte
    > Được sử dụng cho value và key
    > kafka dùng thuật toán để hashing key và chỉ định vào phân vùng tương ứng

# Consumer

    > Consumer read data from a topic - pull model
    > Consumer biết khi nào broken down and recover
    > Message được đọc có thú tự trong mỗi partition, không phải trên từng partition

# Deserialization

    > Deserialization transforming message type byte => object/ data
    > Được sử dụng cho value và key

### Serializer & Deserialization

    > không được thay đổi type trong vòng đời của 1 Topic, nếu muốn làm tạo Topic mới

# Consumer group

    > chứa các consumer đọc message từ 1 topic
    > số lượng consumer không nên > số lượng partition của 1 topic (consumer dư ko làm gì cả)
    > 1 Topic có thế có nhiều consumer group

# Consumer Offset

    > là 1 giá trị số, để  theo dõi tiến trình đọc của consumer từ 1 topic cụ thể
    > giúp duy trì tính toàn vẹn dữ liệu và cho phép các consumer biết vị trí cần đọc kể từ lúc nó bị down

# Brokers And Topics

    > Lưu trữ dữ liêu và xử lý yêu cầu cho producer và consumer
    > kết hợp nhiều broker tạo thành 1 cluster kafka
    > gần giống như là Exchange của RabbitMQ

# Topic Replication

    > sao chép các partition lên các broker khác nhau
    > chống chịu lỗi, tính sẵn sàng cao và dễ mở rộng
    > replicate factor: hệ số sao chép => nếu hệ số sao chép = n thì sẽ có tối đa (n-1) broker die mà hệ thống vẫn hoạt động được

# Producer ACK

    > xác nhận về việc tin nhắn đã được gửi thành công đên broker chưa
    > ack = 0: không cần xác nhận từ broker
    > ack = 1: chờ xác nhận từ leader
    > ack =-1: chờ tất cả xác nhận (leader + các replicate)

# Topic Durable

    > quy định thời gian tồn tại của 1 message trong Topic
    > tính bền vững của message khi server gặp sự cố

# Zookeeper

    > dùng để quản lý broker

# KRaft

    > thay thế cho zookeeper trong tương lại
    > phiên bản 3.0 bắt đầu sử dụng
    > phiên bản 4.0 sẽ được sử dụng luôn cho production
