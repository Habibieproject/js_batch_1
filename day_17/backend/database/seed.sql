-- Data awal: 10 produk dan 2 pengguna
USE kasirku;

INSERT INTO produk (nama, harga, stok) VALUES
  ('Beras 5kg', 75000, 8),
  ('Minyak Goreng 1L', 18000, 3),
  ('Gula 1kg', 16000, 0),
  ('Kopi Sachet', 2500, 40),
  ('Teh Celup', 2000, 15),
  ('Telur 1kg', 28000, 12),
  ('Mi Instan', 3500, 60),
  ('Susu UHT 1L', 19000, 4),
  ('Garam 500g', 5000, 20),
  ('Kecap Manis', 12000, 0);

-- Password: rahasia123 (Sari) dan budi12345 (Budi), disimpan sebagai hash bcrypt
INSERT INTO pengguna (nama, email, password, peran) VALUES
  ('Sari', 'sari@kasirku.id',
   '$2b$10$zklIzGMjNnDMx68X/xEFS.Lfk7WEQtDeUNdNcjpZyHa6EHxa1RSya', 'admin'),
  ('Budi', 'budi@kasirku.id',
   '$2b$10$Cm2m.Zo09fUbVDdO4imrGOYNV3drT.tMEzzn1NCNRfWhKqJH66/w6', 'kasir');
