
"use strict";

// GANTI dengan nomor WhatsApp pengelola rental.
// Gunakan kode negara 62, tanpa tanda + atau angka 0 di depan.
// Contoh: 6281234567890
const NOMOR_WHATSAPP = "6282133714451";

// Harga sewa per hari
const HARGA_KENDARAAN = {
  "Motor Matic": 100000,
  "Motor Sport": 200000,
  "Mobil Keluarga": 500000,
  "Mobil Premium": 800000
};

// Format angka menjadi Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

// Menampilkan notifikasi
let toastTimer;

function tampilkanToast(pesan) {
  const toast = document.getElementById("toast");

  toast.textContent = pesan;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Memeriksa dan membuka WhatsApp
function bukaWhatsApp(pesan) {
  const nomorValid = /^\d{10,15}$/.test(NOMOR_WHATSAPP);

  if (!nomorValid || NOMOR_WHATSAPP === "6282133714451") {
    tampilkanToast(
      "Atur nomor WhatsApp pengelola terlebih dahulu di script.js."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    NOMOR_WHATSAPP +
    "?text=" +
    encodeURIComponent(pesan);

  window.open(url, "_blank", "noopener,noreferrer");
}

// Filter kendaraan: semua, motor, atau mobil
const filterButtons = document.querySelectorAll(".filter-btn");
const vehicleCards = document.querySelectorAll(".vehicle-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    vehicleCards.forEach((card) => {
      const cocok =
        filter === "semua" || card.dataset.type === filter;

      card.classList.toggle("hidden", !cocok);
    });
  });
});

// Menu navigasi untuk layar HP
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const terbuka = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(terbuka));
  menuToggle.setAttribute(
    "aria-label",
    terbuka ? "Tutup menu" : "Buka menu"
  );

  menuToggle.textContent = terbuka ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Elemen formulir
const bookingForm = document.getElementById("bookingForm");
const kendaraanSelect = document.getElementById("kendaraanSelect");
const tanggalInput = document.getElementById("tanggal");
const durasiInput = document.getElementById("durasi");
const estimasiHarga = document.getElementById("estimasiHarga");

// Mengatur tanggal minimum ke hari ini
function tanggalHariIni() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const hari = String(sekarang.getDate()).padStart(2, "0");

  return `${tahun}-${bulan}-${hari}`;
}

tanggalInput.min = tanggalHariIni();

// Menghitung total biaya berdasarkan kendaraan dan durasi
function hitungEstimasi() {
  const kendaraan = kendaraanSelect.value;
  const durasi = Number(durasiInput.value);

  if (
    !kendaraan ||
    !HARGA_KENDARAAN[kendaraan] ||
    !Number.isInteger(durasi) ||
    durasi < 1 ||
    durasi > 30
  ) {
    estimasiHarga.textContent = "Pilih kendaraan";
    return;
  }

  const total = HARGA_KENDARAAN[kendaraan] * durasi;
  estimasiHarga.textContent = formatRupiah(total);
}

kendaraanSelect.addEventListener("change", hitungEstimasi);
durasiInput.addEventListener("input", hitungEstimasi);

// Tombol sewa pada setiap kartu kendaraan
document.querySelectorAll(".rent-button").forEach((button) => {
  button.addEventListener("click", () => {
    kendaraanSelect.value = button.dataset.vehicle;
    hitungEstimasi();

    document.getElementById("pemesanan").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Mengirim pesanan melalui WhatsApp
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const kendaraan = kendaraanSelect.value;
  const tanggal = tanggalInput.value;
  const durasi = Number(durasiInput.value);
  const catatan = document.getElementById("catatan").value.trim();

  if (!nama || !telepon || !kendaraan || !tanggal) {
    tampilkanToast("Mohon lengkapi data pemesanan.");
    return;
  }

  if (!/^[0-9+\s()-]{8,20}$/.test(telepon)) {
    tampilkanToast("Periksa kembali nomor WhatsApp kamu.");
    return;
  }

  if (tanggal < tanggalHariIni()) {
    tampilkanToast("Tanggal sewa tidak boleh di masa lalu.");
    return;
  }

  if (!Number.isInteger(durasi) || durasi < 1 || durasi > 30) {
    tampilkanToast("Durasi sewa harus antara 1 sampai 30 hari.");
    return;
  }

  const total = HARGA_KENDARAAN[kendaraan] * durasi;

  const pesan = [
    "Halo RentGo, saya ingin memesan kendaraan.",
    "",
    "Nama: " + nama,
    "Nomor WhatsApp penyewa: " + telepon,
    "Kendaraan: " + kendaraan,
    "Tanggal mulai sewa: " + tanggal,
    "Durasi sewa: " + durasi + " hari",
    "Harga per hari: " + formatRupiah(HARGA_KENDARAAN[kendaraan]),
    "Estimasi total: " + formatRupiah(total),
    "Catatan: " + (catatan || "-"),
    "",
    "Mohon konfirmasi ketersediaan kendaraan, harga, dan persyaratan sewa. Terima kasih."
  ].join("\n");

  bukaWhatsApp(pesan);
});

// Tombol kontak WhatsApp
document.getElementById("contactButton").addEventListener("click", () => {
  bukaWhatsApp(
    "Halo RentGo, saya ingin bertanya tentang layanan rental motor dan mobil."
  );
});

// Tahun otomatis pada footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Inisialisasi harga saat halaman dibuka
hitungEstimasi();
