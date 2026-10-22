
const NOMOR_WHATSAPP = "6281234567890";
// Ganti dengan nomor WhatsApp tujuan, kode negara 62 tanpa tanda +.

const daftarHarga = {
    "Honda BeAT": 80000,
    "Yamaha NMAX": 150000,
    "Toyota Avanza": 350000,
    "Toyota Fortuner": 850000
};

const namaInput = document.getElementById("nama");
const kendaraanInput = document.getElementById("kendaraan");
const tanggalInput = document.getElementById("tanggal");
const durasiInput = document.getElementById("durasi");
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
    const harga = daftarHarga[kendaraanInput.value] || 0;
    const durasi = Math.max(1, Number(durasiInput.value) || 1);

    totalHarga.textContent = formatRupiah(harga * durasi);
}

kendaraanInput.addEventListener("change", hitungTotal);
durasiInput.addEventListener("input", hitungTotal);

document.querySelectorAll(".pilih").forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        kendaraanInput.value = tombol.dataset.nama;
        hitungTotal();

        document.getElementById("pesan").scrollIntoView({
            behavior: "smooth"
        });
    });
});

const sekarang = new Date();
sekarang.setMinutes(
    sekarang.getMinutes() - sekarang.getTimezoneOffset()
);
tanggalInput.min = sekarang.toISOString().split("T")[0];

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = namaInput.value.trim();
    const namaKendaraan = kendaraanInput.value;
    const tanggal = tanggalInput.value;
    const durasi = Number(durasiInput.value);
    const harga = daftarHarga[namaKendaraan];

    if (!nama || !namaKendaraan || !tanggal || !harga || durasi < 1) {
        alert("Mohon periksa kembali data pemesanan.");
        return;
    }

    if (NOMOR_WHATSAPP === "6281234567890") {
        alert("Ganti NOMOR_WHATSAPP di script.js dengan nomor WhatsApp tujuan.");
        return;
    }

    const total = harga * durasi;

    const pesan =
        "Halo RentGo, saya ingin memesan kendaraan.\n\n" +
        "Nama: " + nama + "\n" +
        "Kendaraan: " + namaKendaraan + "\n" +
        "Tanggal sewa: " + tanggal + "\n" +
        "Durasi: " + durasi + " hari\n" +
        "Harga per hari: " + formatRupiah(harga) + "\n" +
        "Total biaya: " + formatRupiah(total) + "\n\n" +
        "Mohon informasi ketersediaan kendaraan. Terima kasih.";

    const url =
        "https://wa.me/" + NOMOR_WHATSAPP +
        "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank");
});

hitungTotal();
