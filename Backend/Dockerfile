# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:16

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 3000 để truy cập từ bên ngoài
EXPOSE 3000

# Lệnh để chạy ứng dụng khi container khởi động
CMD ["node", "main.js"]
