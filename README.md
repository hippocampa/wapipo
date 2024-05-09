# Wapipo

Wapipo adalah program berbasis CLI (*Command Line Tool*) yang digunakan untuk mengirim pesan whatsapp ke banyak orang sekaligus (*broadcast*).
This documentation is written in Indonesian. Click [here](docs/en) to switch to the english version.

## Daftar Isi

1. [Instalasi](#instalasi)
2. [Cara Penggunaan](#cara-penggunaan)
3. [Informasi Penulis](#informasi-penulis)

## Instalasi

**Persyaratan**

Wapipo memerlukan [firefox](https://www.mozilla.org/id/firefox/new/) dan [geckodriver](https://github.com/mozilla/geckodriver/releases) untuk dapat berfungsi.
Maka Anda perlu terlebih dahulu mendownload kedua *software* tersebut sesuai dengan platform Anda (linux/mac/windows).

**Panduan Instalasi**

Panduan instalasi dibagi berdasarkan *platform* yang didukung oleh wapipo:

1. [Linux](#instalasi-pada-platform-linux) (segera hadir)
2. [Mac](#instalasi-pada-platform-mac) (segera hadir)
3. [Windows](#instalasi-pada-platform-windows)

### Instalasi pada platform Windows

1. Buatlah sebuah folder baru pada alamat `C:`, yaitu `C:\WebDriver\bin` dan letakkan `geckodriver.exe` pada direktori tersebut.
2. Unduh file biner wapipo, yaitu `wapipo.exe`, pada halaman [release](https://github.com/hippocampa/wapipo/releases/tag/v1.1)
3. Letakkan file `wapipo.exe` pada *PATH*. Anda dapat membaca artikel [ini](https://medium.com/@kevinmarkvi/how-to-add-executables-to-your-path-in-windows-5ffa4ce61a53). Atau Anda dapat langsung saja pindahkan `wapipo-win.exe` ke direktori `C:\Windows`
4. Bukalah windows terminal/powershell dan ketik `wapipo-win --version`. Anda akan mendapatkan informasi tentang wapipo. Jika perintah ini berhasil, maka Anda telah sukses melakukan instalasi wapipo.

## Cara Penggunaan

### Panggil wapipo

Karena wapipo saat ini hanya tersedia dalam bentuk CLI, Anda dapat menggunakan terminal/windows terminal/powershell untuk berinteraksi dengan wapipo.

Anda dapat memanggil wapipo dengan menggunakan perintah:

```bash
wapipo-linux
```
atau

```bash
wapipo-win.exe
```

atau

```bash
wapipo-mac
```

Maka akan muncul output seperti berikut:

```bash
➜  ~ wapipo-linux
Usage: wapipo [options] [command]

Wapipo: A CLI tool for broadcasting whatsapp messages to a list of participants. Author: I Gede Teguh Satya Dharma

Options:
-V, --version    output the version number
-h, --help       display help for command

Commands:
blast [options]  Blast (broadcast) a message to a list of participants
help [command]   display help for command
```

Untuk mempermudah dokumentasi, wapipo-linux/wapipo-win.exe/wapipo-mac akan ditulis sebagai **wapipo**.

### Melihat menu yang tersedia

Untuk melihat menu yang tersedia, Anda dapat menggunakan perintah:

```bash
wapipo --help
```

atau 
```bash
wapipo -h

```

### Mengirimkan pesan

Untuk mengirimkan pesan, Anda harus terlebih dahulu membuat daftar kontak berupa nomor telepon yang Anda ingin kirimkan. Anda boleh namakan filenya menjadi apa saja, yang penting ekstensinya adalah `.txt`. Anda juga perlu untuk menuliskan pesan anda dalam file `.txt` dengan nama bebas.

Kemudian, jalankan perintah:

```bash
wapipo blast --participant <lokasi file nomor telepon> --message <lokasi file pesan>

```

atau


```bash
wapipo blast -p <lokasi file nomor telepon> -m <lokasi file pesan>

```

**Contoh**

Semisal saya memiliki sebuah file `phoneNum.txt` untuk menyimpan nomor telepon, dan `msg.txt` untuk menyimpan pesan.

Asumsikan `phoneNum.txt` berisi seperti berikut:

```txt
08221231421
08138123001
08234201230

```

dan file `msg.txt` adalah sebagai berikut:

```txt
Hello, world.
```

Asumsikan pula, bahwa saya menyimpan `phoneNum.txt` dan `msg.txt` pada direktori `C:\Documents`.

Maka untuk mengirim pesan, saya dapat mengetikkan perintah berikut:

```bash
wapipo blast -m C:\Documents\msg.txt -p C:\Documents\phoneNum.txt

```

### Kemunculan Browser

Setelah Anda mengetikkan perintah untuk mengirimkan pesan, sebuah browser dengan URL whatsapp akan muncul. Tugas Anda adalah menautkan perangkat whatsapp pada QR Code yang muncul di layar.

**Wapipo akan mendeteksi secara automatis jika Anda berhasil login**. 

Setelah login, tugas Anda hanyalah menunggu, sampai wapipo selesai menjalankan tugasnya, browser akan ditutup secara automatis dan laporan pengiriman akan tampak pada windows terminal/terminal/powershell.


### Bagaimana jika saya ingin menggunakan versi geckodriver yang berbeda?

Untuk menggunakan geckodriver yang berbeda, wapipo memiliki fitur `--driver` atau `-d` yang memberikan Anda fleksibilitas untuk menentukan lokasi geckodriver Anda.

### Meminta bantuan

Anda dapat meminta bantuan saya dengan mengirimkan [email](mailto:tsdhrm@outlook.com) atau dengan mengajukan diskusi pada [repositori wapipo](https://github.com/hippocampa/wapipo/).

## Informasi Penulis

Proyek wapipo ditulis oleh I Gede Teguh Satya Dharma, dan merupakan proyek dengan lisensi MIT.
