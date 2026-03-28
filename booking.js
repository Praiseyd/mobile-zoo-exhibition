// DATE PICKER: block past dates
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);
//CHARACTER COUNTER
const messageField = document.getElementById("message");
const charNum = document.getElementById("char-num");
const charCount = document.querySelector(".char-count");
messageField.addEventListener("input", function () {
  const len = this.value.length;
  charNum.textContent = len;
  if (len > 450) {
    charCount.classList.add("warn");
  } else {
    charCount.classList.remove("warn");
  }
});
// FIELD VALIDATION ON BLUR
function showError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "block";
  }
}
function hideError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
  }
}
document.getElementById("name").addEventListener("blur", function () {
  if (this.value.trim().length < 2) {
    this.classList.add("error");
    showError("name-error");
  } else {
    this.classList.remove("error");
    hideError("name-error");
  }
});
document.getElementById("email").addEventListener("blur", function () {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(this.value.trim())) {
    this.classList.add("error");
    showError("email-error");
  } else {
    this.classList.remove("error");
    hideError("email-error");
  }
});
document.getElementById("phone").addEventListener("blur", function () {
  if (this.value.trim().length < 7) {
    this.classList.add("error");
    showError("phone-error");
  } else {
    this.classList.remove("error");
    hideError("phone-error");
  }
});
document.getElementById("location").addEventListener("blur", function () {
  if (this.value.trim().length < 3) {
    this.classList.add("error");
    showError("location-error");
  } else {
    this.classList.remove("error");
    hideError("location-error");
  }
});
document.getElementById("date").addEventListener("change", function () {
  if (this.value < today) {
    this.classList.add("error");
    showError("date-error");
  } else {
    this.classList.remove("error");
    hideError("date-error");
  }
});
// GET SELECTED SERVICES
function getSelectedServices() {
  const checked = document.querySelectorAll("#services-group input:checked");
  return Array.from(checked).map((cb) => cb.value);
}
// FORM SUBMISSION
const form = document.getElementById("booking-form");
const submitBtn = document.getElementById("submit-btn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btn-text");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Validate required fields
  let valid = true;
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const date = document.getElementById("date");
  const location = document.getElementById("location");
  const services = getSelectedServices();
  if (name.value.trim().length < 2) {
    name.classList.add("error");
    showError("name-error");
    valid = false;
  }
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email.value.trim())) {
    email.classList.add("error");
    showError("email-error");
    valid = false;
  }
  if (phone.value.trim().length < 7) {
    phone.classList.add("error");
    showError("phone-error");
    valid = false;
  }
  if (!date.value || date.value < today) {
    date.classList.add("error");
    showError("date-error");
    valid = false;
  }
  if (location.value.trim().length < 3) {
    location.classList.add("error");
    showError("location-error");
    valid = false;
  }
  if (services.length === 0) {
    showError("service-error");
    valid = false;
  } else {
    hideError("service-error");
  }
  if (!valid) return;
  // Show loading
  submitBtn.disabled = true;
  spinner.style.display = "block";
  btnText.textContent = "Sending...";
  // Build form data
  const formData = new FormData(form);
  // Replace multiple Service fields with joined string
  formData.delete("Service");
  formData.append("Service", services.join(", "));
  // Send via FormSubmit AJAX
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Show success popup
      document.getElementById("success-overlay").classList.add("show");
      form.reset();
      charNum.textContent = "0";
    })
    .catch((error) => {
      alert(
        "Something went wrong. Please try calling us at 08036482942 or use WhatsApp.",
      );
    })
    .finally(() => {
      submitBtn.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Submit Booking Request";
    });
});
//CLOSE SUCCESS POPUP
function closeSuccess() {
  document.getElementById("success-overlay").classList.remove("show");
}
document
  .getElementById("success-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeSuccess();
  });
//  WHATSAPP BOOKING
document
  .getElementById("whatsapp-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim() || "Not provided";
    const email =
      document.getElementById("email").value.trim() || "Not provided";
    const phone =
      document.getElementById("phone").value.trim() || "Not provided";
    const date = document.getElementById("date").value || "Not provided";
    const eventType =
      document.getElementById("event-type").value || "Not selected";
    const location =
      document.getElementById("location").value.trim() || "Not provided";
    const guests = document.getElementById("guests").value || "Not specified";
    const message = document.getElementById("message").value.trim() || "None";
    const services = getSelectedServices();
    const serviceText =
      services.length > 0 ? services.join(", ") : "Not selected";
    const text = `Hello! I'd like to book a Mobile Zoo Exhibition.
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Service:* ${serviceText}
*Date:* ${date}
*Event Type:* ${eventType}
*Location:* ${location}
*Guests:* ${guests}
*Message:* ${message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2348036482942?text=${encoded}`, "_blank");
  });
//FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach(function (question) {
  question.addEventListener("click", function () {
    const card = this.closest(".faq-card");
    // Close all other open cards
    document.querySelectorAll(".faq-card.open").forEach(function (openCard) {
      if (openCard !== card) {
        openCard.classList.remove("open");
      }
    });
    card.classList.toggle("open");
  });
});
// MOBILE MENU CLOSE ON LINK CLICK
const menuCheckbox = document.getElementById("menu-toggle");
document.querySelectorAll(".item").forEach(function (link) {
  link.addEventListener("click", function () {
    if (menuCheckbox) menuCheckbox.checked = false;
  });
});
