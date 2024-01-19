// JavaScript to handle modal visibility
document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("doctorRegistrationModal");

  // Open the modal
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Close the modal
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
