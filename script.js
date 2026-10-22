
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#bookingForm");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const vehicleCards = document.querySelectorAll("[data-category]");
  const vehicleSelect = document.querySelector("#kendaraan");
  const tanggalInput = document.querySelector("#tanggal");
  const durasiInput = document.querySelector("#durasi");
  const totalElement = document.querySelector("#totalHarga");

  // Harga sewa per hari
  const hargaKendaraan = {
    "Honda Beat": 80000,
    "Honda Vario": 100000,
    "Yamaha NMAX": 150000,
    "Yamaha R15": 200000,
    "Toyota Avanza": 350000,
    "Honda Brio": 300000,
    "Toyota Innova": 500000,
    "Toyota Fortuner": 850000
  };

  // Format harga menjadi Rupiah
  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(angka);
  }

  // Filter kendaraan berdasarkan kategori
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const kategori = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      vehicleCards.forEach((card) => {
        const cocok =
          kategori === "semua" ||
          card.dataset.category === kategori;

        card.style.display = cocok ? "" : "none";
      });
    });
  });

  // Memilih kendaraan dari tombol pada kartu kendaraan
  document.querySelectorAll("[data-select-vehicle]").forEach((button) => {
    button.addEventListener("click", () => {
      const namaKendaraan = button.dataset.selectVehicle;

      if (vehicleSelect) {
        const pilihanAda = Array.from(vehicleSelect.options).some(
          (option) => option.value === namaKendaraan
        );

        if (pilihanAda) {
          vehicleSelect.value = namaKendaraan;
        } else {
          const optionBaru = document.createElement("option");
          optionBaru.value = namaKendaraan;
          optionBaru.textContent = namaKendaraan;
          vehicleSelect.appendChild(optionBaru);
          vehicleSelect.value = namaKendaraan;
        }
      }

      document.querySelector("#booking")?.scrollIntoView({
        behavior: "smooth"
      });

      hitungTotal();
    });
  });

  // Menghitung perkiraan biaya sewa
  function hitungTotal() {
    if (!vehicleSelect || !durasiInput || !totalElement) return;

    const nama = vehicleSelect.value;
    const durasi = Number(durasiInput.value);
    const harga = hargaKendaraan[nama] || 0;

    if (harga > 0 && durasi > 0) {
      totalElement.textContent = formatRupiah(harga * durasi);
    } else {
      totalElement.textContent = formatRupiah(0);
    }
  }

  vehicleSelect?.addEventListener("change", hitungTotal);
  durasiInput?.addEventListener("input", hitungTotal);

  // Tanggal sewa tidak boleh sebelum hari ini
  if (tanggalInput) {
    const hariIni = new Date();
    const tahun = hariIni.getFullYear();
    const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
    const tanggal = String(hariIni.getDate()).padStart(2, "0");

    tanggalInput.min = `${tahun}-${bulan}-${tanggal}`;
  }

  // Simulasi pemesanan tanpa database dan WhatsApp
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const nama =
      data.get("nama") ||
      document.querySelector("#nama")?.value ||
      "-";

    const kendaraan =
      vehicleSelect?.value || "-";

    const tanggal =
      tanggalInput?.value || "-";

    const durasi = Number(durasiInput?.value || 0);
    const harga = hargaKendaraan[kendaraan] || 0;
    const total = harga * durasi;

    if (!harga || durasi < 1) {
      alert("Silakan pilih kendaraan dan durasi sewa yang benar.");
      return;
    }

    const tanggalTampil = tanggal === "-"
      ? "-"
      : new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

    const ringkasan = [
      "SIMULASI PEMESANAN RENTGO",
      "",
      `Nama: ${nama}`,
      `Kendaraan: ${kendaraan}`,
      `Tanggal sewa: ${tanggalTampil}`,
      `Durasi: ${durasi} hari`,
      `Perkiraan total: ${formatRupiah(total)}`,
      "",
      "Pemesanan berhasil disimulasikan!",
      "Ini hanya demonstrasi tugas, bukan transaksi nyata."
    ].join("\n");

    alert(ringkasan);

    const hasil = document.querySelector("#hasilSimulasi");

    if (hasil) {
      hasil.textContent =
        `Simulasi berhasil! ${nama}, Anda memilih ${kendaraan} ` +
        `selama ${durasi} hari dengan perkiraan biaya ${formatRupiah(total)}.`;

      hasil.style.display = "block";
      hasil.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

    form.reset();
    hitungTotal();
  });

  hitungTotal();
});
