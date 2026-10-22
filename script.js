
document.addEventListener("DOMContentLoaded", () => {
  // Ganti dengan nomor WhatsApp pengelola.
  // Gunakan kode negara 62 tanpa tanda + atau angka 0 di awal.
  const NOMOR_WHATSAPP = "6281234567890";

  const hargaKendaraan = {
    "Honda Beat": 80000,
    "Honda Vario": 100000,
    "Yamaha NMAX": 150000,
    "Toyota Avanza": 350000,
    "Toyota Fortuner": 850000
  };

  const form = document.getElementById("bookingForm");
  const namaInput = document.getElementById("nama");
  const kendaraanInput = document.getElementById("kendaraan");
  const tanggalInput = document.getElementById("tanggal");
  const durasiInput = document.getElementById("durasi");
  const totalHarga = document.getElementById("totalHarga");

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(angka);
  }

  // Menghitung perkiraan harga sewa.
  function hitungTotal() {
    const harga = hargaKendaraan[kendaraanInput.value] || 0;
    const durasi = Number(durasiInput.value) || 0;

    totalHarga.textContent = formatRupiah(
      harga > 0 && durasi > 0 ? harga * durasi : 0
    );
  }

  // Filter motor matic dan mobil.
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      document.querySelectorAll(".vehicle-card").forEach(card => {
        const filter = button.dataset.filter;

        card.style.display =
          filter === "semua" || card.dataset.category === filter
            ? ""
            : "none";
      });
    });
  });

  // Tombol pilih kendaraan mengisi formulir secara otomatis.
  document.querySelectorAll("[data-vehicle]").forEach(button => {
    button.addEventListener("click", () => {
      kendaraanInput.value = button.dataset.vehicle;
      hitungTotal();

      document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Tanggal sewa minimal hari ini.
  const hariIni = new Date();
  tanggalInput.min = [
    hariIni.getFullYear(),
    String(hariIni.getMonth() + 1).padStart(2, "0"),
    String(hariIni.getDate()).padStart(2, "0")
  ].join("-");

  kendaraanInput.addEventListener("change", hitungTotal);
  durasiInput.addEventListener("input", hitungTotal);

  // Mengirim detail pesanan ke WhatsApp.
  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const nama = namaInput.value.trim();
    const kendaraan = kendaraanInput.value;
    const tanggal = tanggalInput.value;
    const durasi = Number(durasiInput.value);
    const harga = hargaKendaraan[kendaraan];

    if (!harga || durasi < 1 || durasi > 30) {
      alert("Silakan periksa pilihan kendaraan dan durasi sewa.");
      return;
    }

    if (!tanggal || tanggal < tanggalInput.min) {
      alert("Silakan pilih tanggal sewa yang benar.");
      return;
    }

    const tanggalFormat = new Date(tanggal + "T00:00:00")
      .toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

    const total = harga * durasi;

    const pesan = [
      "Halo, saya ingin memesan kendaraan dari RentGo.",
      "",
      "Nama: " + nama,
      "Kendaraan: " + kendaraan,
      "Tanggal sewa: " + tanggalFormat,
      "Durasi: " + durasi + " hari",
      "Perkiraan total: " + formatRupiah(total),
      "",
      "Mohon informasi lebih lanjut. Terima kasih."
    ].join("\n");

    // Jangan mengarahkan pesanan ke nomor contoh.
    if (
      !NOMOR_WHATSAPP ||
      NOMOR_WHATSAPP === "6281234567890"
    ) {
      alert(
        "Website siap digunakan. Untuk mengirim pesanan, " +
        "ganti NOMOR_WHATSAPP di file script.js dengan nomor pengelola."
      );
      return;
    }

    const url =
      "https://wa.me/" +
      NOMOR_WHATSAPP +
      "?text=" +
      encodeURIComponent(pesan);

    window.open(url, "_blank", "noopener,noreferrer");
  });

  hitungTotal();
});
