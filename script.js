
:root {
  --navy: #14233b;
  --navy-light: #203552;
  --gold: #d9b36c;
  --background: #f7f7f5;
  --muted: #737d8e;
  --white: #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: var(--background);
  color: var(--navy);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--navy);
  color: white;
  min-height: 72px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo span {
  color: var(--gold);
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 25px;
  font-size: 14px;
}

.navbar nav a:hover {
  color: var(--gold);
}

.nav-button {
  background: var(--gold);
  color: var(--navy) !important;
  padding: 10px 15px;
  border-radius: 7px;
  font-weight: 700;
}

.hero {
  min-height: 490px;
  display: flex;
  align-items: center;
  padding: 65px 8%;
  color: white;
  background:
    linear-gradient(90deg, #101b32 5%, #101b32e8 48%, #101b3245),
    url("https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=85")
    center / cover;
}

.hero-content {
  max-width: 660px;
}

.eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--gold);
  margin-bottom: 13px;
}

.hero h1 {
  font-size: clamp(35px, 5vw, 58px);
  line-height: 1.15;
  letter-spacing: -1.8px;
  margin-bottom: 18px;
}

.hero h1 span {
  color: var(--gold);
}

.hero p {
  max-width: 520px;
  color: #e0e5ed;
  margin-bottom: 25px;
}

.button {
  display: inline-block;
  background: var(--gold);
  color: var(--navy);
  border: none;
  border-radius: 7px;
  padding: 13px 20px;
  font-weight: 800;
  transition: transform .2s, filter .2s;
}

.button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.hero-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  color: #e0e5ed;
  font-size: 12px;
}

.section {
  padding: 75px 5%;
}

.section-heading {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 30px;
}

.section-heading h2,
.booking-description h2 {
  font-size: clamp(28px, 4vw, 38px);
  line-height: 1.2;
  margin-bottom: 12px;
}

.section-heading p,
.booking-description > p {
  color: var(--muted);
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.filter {
  padding: 10px 20px;
  border: 1px solid #e1e2e4;
  background: white;
  color: var(--navy);
  border-radius: 30px;
  transition: .2s;
}

.filter:hover,
.filter.active {
  background: var(--navy);
  border-color: var(--navy);
  color: white;
}

.vehicle-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 23px;
}

.vehicle-card {
  background: white;
  border: 1px solid #e9e9e6;
  border-radius: 12px;
  overflow: hidden;
  transition: transform .25s, box-shadow .25s;
}

.vehicle-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px #14233b13;
}

.image-wrap {
  position: relative;
  height: 220px;
  background: #e7e8eb;
  overflow: hidden;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform .4s;
}

.vehicle-card:hover img {
  transform: scale(1.04);
}

.image-label {
  position: absolute;
  top: 13px;
  left: 13px;
  padding: 6px 10px;
  border-radius: 5px;
  background: #14233be8;
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.vehicle-info {
  padding: 19px;
}

.vehicle-info h3 {
  font-size: 21px;
  margin: 4px 0;
}

.vehicle-info > p {
  font-size: 13px;
  color: var(--muted);
  min-height: 42px;
  margin-bottom: 16px;
}

.vehicle-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #eeeeec;
  padding-top: 15px;
}

.price {
  font-size: 16px;
  font-weight: 800;
}

.price small {
  display: block;
  color: var(--muted);
  font-size: 11px;
  font-weight: 400;
}

.choose {
  border: none;
  background: var(--navy);
  color: white;
  padding: 10px 13px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
}

.choose:hover {
  background: var(--navy-light);
}

.booking-section {
  padding: 75px 6%;
  background: #eeece5;
}

.booking-layout {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 45px;
  align-items: start;
}

.booking-description h2 {
  margin-bottom: 15px;
}

.booking-description > p {
  margin-bottom: 20px;
}

.notice {
  background: white;
  border-left: 3px solid var(--gold);
  border-radius: 0 7px 7px 0;
  padding: 17px;
  font-size: 13px;
}

.notice p {
  color: var(--muted);
  margin-top: 5px;
}

.booking-form {
  padding: 28px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px #14233b0c;
}

.booking-form h3 {
  font-size: 23px;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 17px;
  min-width: 0;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 7px;
}

.field input,
.field select {
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #dfe2e8;
  border-radius: 7px;
  background: white;
  color: var(--navy);
}

.field input:focus,
.field select:focus {
  outline: 2px solid #d9b36c55;
  border-color: var(--gold);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.total-box {
  background: var(--navy);
  color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.total-box span {
  font-size: 13px;
}

.total-box strong {
  color: var(--gold);
  font-size: 20px;
}

.submit-button {
  width: 100%;
  text-align: center;
  font-size: 14px;
}

.form-note {
  margin-top: 12px;
  text-align: center;
  font-size: 11px;
  color: var(--muted);
}

footer {
  background: #0d1728;
  color: white;
  padding: 25px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

footer p {
  font-size: 12px;
  color: #c0c8d5;
}

@media (max-width: 850px) {
  .vehicle-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .booking-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .navbar {
    padding: 13px 4%;
    min-height: 65px;
  }

  .navbar nav {
    gap: 12px;
    font-size: 12px;
  }

  .navbar nav a:nth-child(2) {
    display: none;
  }

  .logo {
    font-size: 23px;
  }

  .nav-button {
    padding: 9px 10px;
  }

  .hero {
    padding: 55px 6%;
    min-height: 440px;
  }

  .hero-info {
    gap: 10px;
  }

  .section,
  .booking-section {
    padding: 55px 5%;
  }

  .vehicle-grid {
    grid-template-columns: 1fr;
  }

  .image-wrap {
    height: 240px;
  }

  .booking-form {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
