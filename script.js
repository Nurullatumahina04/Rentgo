
/*
  MAISON CAKE
  Ganti nomor WhatsApp di bawah dengan nomor WhatsApp toko.
  Gunakan kode negara tanpa tanda +, spasi, atau angka 0 di awal.
  Contoh Indonesia: 6281234567890
*/

const NOMOR_WHATSAPP = "6281234567890";

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const toast = document.getElementById("toast");

document.getElementById("year").textContent = new Date().getFullYear();

// Menu navigasi untuk layar HP
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Tutup menu setelah tautan navigasi dipilih
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    menuToggle.textContent = "☰";
  });
});

// Filter produk berdasarkan kategori
const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    productCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.classList.toggle("hidden", !matches);
    });
  });
});

// Notifikasi singkat
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Membuat pesan pemesanan WhatsApp
function pesanWhatsApp(namaProduk = "") {
  const nomor = NOMOR_WHATSAPP.trim();

  if (!/^\d{8,15}$/.test(nomor) || nomor === "6282293690530") {
    showToast("Atur nomor WhatsApp toko terlebih dahulu di script.js.");
    return;
  }

  let pesan;

  if (namaProduk) {
    pesan =
      `Halo Maison Cake! Saya ingin memesan ${namaProduk}. ` +
      "Mohon informasi ketersediaan dan cara pemesanannya.";
  } else {
    pesan =
      "Halo Maison Cake! Saya ingin bertanya tentang menu kue " +
      "dan cara pemesanan. Terima kasih.";
  }

  const url =
    "https://wa.me/" +
    nomor +
    "?text=" +
    encodeURIComponent(pesan);

  window.open(url, "_blank", "noopener,noreferrer");
}

// Tombol pesan pada setiap produk
document.querySelectorAll(".order-button").forEach((button) => {
  button.addEventListener("click", () => {
    const namaProduk = button.dataset.product;
    pesanWhatsApp(namaProduk);
  });
});

// Tombol kontak utama
document.getElementById("contactOrder").addEventListener("click", () => {
  pesanWhatsApp();
});
