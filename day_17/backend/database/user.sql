-- User khusus aplikasi (jangan pakai root di aplikasi)
CREATE USER IF NOT EXISTS 'kasirku'@'localhost' IDENTIFIED BY 'password123';
GRANT SELECT, INSERT, UPDATE, DELETE ON kasirku.* TO 'kasirku'@'localhost';
