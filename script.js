/* =========================================
   RENTGO - SCRIPT.JS
   ========================================= */

// Ganti dengan nomor WhatsApp admin aktif.
// Format: kode negara + nomor, tanpa tanda + atau spasi.
const NOMOR_WHATSAPP = "6281234567890";

// Harga kendaraan per hari
const HARGA_KENDARAAN = {
  "Motor Matic": 100000,
  "Motor Sport": 200000,
  "Mobil Keluarga": 500000,
  "Mobil Premium": 800000
};

// Format harga menjadi Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(angka);
}

// =========================================
// NOTIFIKASI
// =========================================

let toastTimer;

function tampilkanToast(pesan) {
  const toast = document.getElementById("toast");

  if (!toast) {
    alert(pesan);
    return;
  }

  toast.textContent = pesan;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// =========================================
// VALIDASI NOMOR WHATSAPP
// =========================================

function nomorWhatsAppValid() {
  const nomor = NOMOR_WHATSAPP.replace(/\D/g, "");

  if (
    !/^\d{10,15}$/.test(nomor) ||
    nomor === "6281234567890"
  ) {
    tampilkanToast(
      "Nomor WhatsApp admin belum diatur. Silakan periksa script.js."
    );
    return false;
  }

  return true;
}

// =========================================
// BUKA WHATSAPP
// =========================================

function bukaWhatsApp(pesan) {
  if (!nomorWhatsAppValid()) {
    return;
  }

  const nomor = NOMOR_WHATSAPP.replace(/\D/g, "");

  const url =
    "https://wa.me/" +
    nomor +
    "?text=" +
    encodeURIComponent(pesan);

  const jendelaWhatsApp = window.open(url, "_blank");

  if (!jendelaWhatsApp) {
    tampilkanToast(
      "WhatsApp tidak terbuka. Izinkan pop-up browser, lalu coba lagi."
    );
    return;
  }

  jendelaWhatsApp.opener = null;

  tampilkanToast(
    "Pesanan siap dikirim! Tekan tombol Kirim di WhatsApp untuk menyelesaikan pesanan."
  );
}

// =========================================
// FILTER KENDARAAN
// =========================================

const tombolFilter = document.querySelectorAll(".filter-btn");
const kartuKendaraan = document.querySelectorAll(".vehicle-card");

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const filter = tombol.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("active");
    });

    tombol.classList.add("active");

    kartuKendaraan.forEach((kartu) => {
      const cocok =
        filter === "semua" ||
        kartu.dataset.type === filter;

      kartu.classList.toggle("hidden", !cocok);
    });
  });
});

// =========================================
// MENU NAVIGASI MOBILE
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const terbuka = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(terbuka)
    );

    menuToggle.setAttribute(
      "aria-label",
      terbuka ? "Tutup menu" : "Buka menu"
    );

    menuToggle.textContent = terbuka ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((tautan) => {
    tautan.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
      menuToggle.textContent = "☰";
    });
  });
}

// =========================================
// FORMULIR DAN ESTIMASI HARGA
// =========================================

const bookingForm = document.getElementById("bookingForm");
const kendaraanSelect = document.getElementById("kendaraanSelect");
const tanggalInput = document.getElementById("tanggal");
const durasiInput = document.getElementById("durasi");
const estimasiHarga = document.getElementById("estimasiHarga");

// Mendapatkan tanggal hari ini
function tanggalHariIni() {
  const sekarang = new Date();

  const tahun = sekarang.getFullYear();
  const bulan = String(
    sekarang.getMonth() + 1
  ).padStart(2, "0");

  const tanggal = String(
    sekarang.getDate()
  ).padStart(2, "0");

  return `${tahun}-${bulan}-${tanggal}`;
}

// Mencegah pemilihan tanggal yang sudah lewat
if (tanggalInput) {
  tanggalInput.min = tanggalHariIni();
}

// =========================================
// HITUNG ESTIMASI HARGA
// =========================================

function hitungEstimasi() {
  if (!kendaraanSelect || !durasiInput || !estimasiHarga) {
    return 0;
  }

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
    return 0;
  }

  const total = HARGA_KENDARAAN[kendaraan] * durasi;

  estimasiHarga.textContent = formatRupiah(total);

  return total;
}

if (kendaraanSelect) {
  kendaraanSelect.addEventListener(
    "change",
    hitungEstimasi
  );
}

if (durasiInput) {
  durasiInput.addEventListener(
    "input",
    hitungEstimasi
  );
}

// =========================================
// TOMBOL SEWA DI KARTU KENDARAAN
// =========================================

document.querySelectorAll(".rent-button").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const kendaraan = tombol.dataset.vehicle;

    if (kendaraanSelect && kendaraan) {
      kendaraanSelect.value = kendaraan;
      hitungEstimasi();
    }

    const bagianPemesanan =
      document.getElementById("pemesanan");

    if (bagianPemesanan) {
      bagianPemesanan.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// =========================================
// KIRIM PESANAN KE WHATSAPP
// =========================================

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const namaInput = document.getElementById("nama");
    const teleponInput = document.getElementById("telepon");
    const catatanInput = document.getElementById("catatan");

    const nama = namaInput?.value.trim() || "";
    const telepon = teleponInput?.value.trim() || "";
    const kendaraan = kendaraanSelect?.value || "";
    const tanggal = tanggalInput?.value || "";
    const durasi = Number(durasiInput?.value);
    const catatan = catatanInput?.value.trim() || "";

    // Validasi nama
    if (!nama) {
      tampilkanToast(
        "Silakan masukkan nama lengkap Anda."
      );

      namaInput?.focus();
      return;
    }

    // Validasi nomor telepon
    if (!/^[0-9+\s()-]{8,20}$/.test(telepon)) {
      tampilkanToast(
        "Silakan masukkan nomor telepon yang valid."
      );

      teleponInput?.focus();
      return;
    }

    // Validasi kendaraan
    if (!kendaraan || !HARGA_KENDARAAN[kendaraan]) {
      tampilkanToast(
        "Silakan pilih kendaraan terlebih dahulu."
      );

      kendaraanSelect?.focus();
      return;
    }

    // Validasi tanggal
    if (!tanggal || tanggal < tanggalHariIni()) {
      tampilkanToast(
        "Silakan pilih tanggal sewa hari ini atau tanggal berikutnya."
      );

      tanggalInput?.focus();
      return;
    }

    // Validasi durasi
    if (
      !Number.isInteger(durasi) ||
      durasi < 1 ||
      durasi > 30
    ) {
      tampilkanToast(
        "Durasi sewa harus antara 1 sampai 30 hari."
      );

      durasiInput?.focus();
      return;
    }

    // Hitung biaya sewa
    const hargaPerHari = HARGA_KENDARAAN[kendaraan];
    const totalHarga = hargaPerHari * durasi;

    // Format tanggal
    const tanggalFormat = new Date(
      `${tanggal}T00:00:00`
    ).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    // Susun pesan WhatsApp
    const pesan = [
      "🔔 *PESANAN RENTAL KENDARAAN - RENTGO*",
      "",
      "Halo Admin RentGo, saya ingin mengajukan pemesanan kendaraan.",
      "",
      "📋 *DETAIL PEMESANAN*",
      "Nama: " + nama,
      "Nomor Telepon: " + telepon,
      "Kendaraan: " + kendaraan,
      "Tanggal Sewa: " + tanggalFormat,
      "Durasi Sewa: " + durasi + " hari",
      "Harga per Hari: " + formatRupiah(hargaPerHari),
      "Total Estimasi: " + formatRupiah(totalHarga),
      "",
      "Catatan: " + (catatan || "Tidak ada"),
      "",
      "Mohon konfirmasi ketersediaan kendaraan dan detail pembayaran.",
      "",
      "Terima kasih.",
      "— Pemesanan melalui website RentGo"
    ].join("\n");

    // Buka WhatsApp dengan detail pesanan
    bukaWhatsApp(pesan);
  });
}

// =========================================
// TOMBOL HUBUNGI WHATSAPP
// =========================================

const contactButton =
  document.getElementById("contactButton");

if (contactButton) {
  contactButton.addEventListener("click", () => {
    const pesan =
      "Halo Admin RentGo, saya ingin bertanya tentang layanan rental kendaraan.";

    bukaWhatsApp(pesan);
  });
}

// =========================================
// TAHUN OTOMATIS PADA FOOTER
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
