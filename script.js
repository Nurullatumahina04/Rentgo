
const NOMOR_WHATSAPP = "6281234567890";
// Ganti dengan nomor WhatsApp tujuan, gunakan kode negara 62 tanpa tanda +.

const kendaraan = document.getElementById("kendaraan");
const tanggal = document.getElementById("tanggal");
const durasi = document.getElementById("durasi");
const totalHarga = document.getElementById("totalHarga");
const bookingForm = document.getElementById("bookingForm");

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function hitungTotal() {
    const pilihan = kendaraan.options[kendaraan.selectedIndex];
    const harga = Number(pilihan.dataset.harga || 0);
    const jumlahHari = Math.max(1, Number(durasi.value) || 1);

    totalHarga.textContent = formatRupiah(harga * jumlahHari);
}

kendaraan.addEventListener("change", hitungTotal);
durasi.addEventListener("input", hitungTotal);

// Tombol pada setiap kartu akan memilih kendaraan di formulir.
document.querySelectorAll(".pilih").forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        kendaraan.value = tombol.dataset.nama;
        hitungTotal();

        document.getElementById("pesan").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Atur tanggal paling awal ke hari ini.
const hariIni = new Date();
const tahun = hariIni.getFullYear();
const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
const hari = String(hariIni.getDate()).padStart(2, "0");

tanggal.min = `${tahun}-${bulan}-${hari}`;

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const pilihan = kendaraan.options[kendaraan.selectedIndex];
    const namaKendaraan = kendaraan.value;
    const harga = Number(pilihan.dataset.harga || 0);
    const jumlahHari = Number(durasi.value);
    const tanggalSewa = tanggal.value;

    if (!nama || !namaKendaraan || !tanggalSewa || jumlahHari < 1) {
        alert("Mohon lengkapi semua data pemesanan.");
        return;
    }

    if (NOMOR_WHATSAPP === "6281234567890") {
        alert("Silakan ganti NOMOR_WHATSAPP di script.js dengan nomor tujuan yang benar.");
        return;
    }

    const total = harga * jumlahHari;

    const pesan =
        `Halo RentGo, saya ingin memesan kendaraan.\n\n` +
        `Nama: ${nama}\n` +
        `Kendaraan: ${namaKendaraan}\n` +
        `Tanggal sewa: ${tanggalSewa}\n` +
        `Durasi: ${jumlahHari} hari\n` +
        `Harga per hari: ${formatRupiah(harga)}\n` +
        `Total biaya: ${formatRupiah(total)}\n\n` +
        `Mohon informasi ketersediaan kendaraan. Terima kasih.`;

    const url = `https://wa.me/${NOMOR_WHATSAPP}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
});

hitungTotal();
