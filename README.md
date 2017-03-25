# SooperTeam

Aplikasi Sistem Keamanan Sepeda Motor Berbasis Android.

# Features

  - Menghidupkan dan mematikan sepeda motor menggunakan aplikasi berbasis Android melalui koneksi bluetooth.
  - Alarm berbasis sensor getar. Sensitivitas sensor dapat dikonfigurasi.
  - Search Mode, fitur ini untuk mengetahui keberadaan sepeda motor. Berguna jika kita lupa posisi parkir, mall, kantor, dan sebagainya. Jarak terjauh adalah 10 meter.

# Teknologi yang digunakan

  - Arduino
  - Cordova

# Deploy Source Code

Persiapan
  - Install [Arduino IDE](https://www.arduino.cc/en/Main/Software)
  - Install [Cordova](https://cordova.apache.org/)
  - Install [Android Studio](https://developer.android.com/studio/index.html)

Kompilasi Program Microcontroller
  - Buka file gohek.ino
  - Koneksikan Arduino pada komputer menggunakan usb (arduino yang sudah di tes adalah Arduino Uno dan Nano)
  - Compile dan upload

Kompilasi Program Android Dengan Cordova
  - Masuk ke direktori cordova pada repository ini
  - Jalankan perintah pada terminal "cordova platform add android --save"
  - Jalankan perintah "cordova plugin add cordova-plugin-bluetooth-serial"
  - Lalu jalankan perintah "cordova build android"
  - File .apk ada pada direktori platforms/android/build/outputs/apk/android-debug.apk

(apk yang dihasilkan adalah versi debug, bukan release, jadi belum bisa dimasukan ke play store. Silahkan googling untuk generate versi release nya ya)
