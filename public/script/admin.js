// //Error Messages
// function showSuccessModal(message) {
//   const successModal = document.getElementById("errorModal");
//   const successMessage = document.getElementById("errorMessage");

//   successMessage.innerText = message;
//   successModal.style.display = "block";

//   setTimeout(function () {
//     successModal.style.display = "none";
//   }, 3000);
// }

// document.addEventListener('DOMContentLoaded', function () {
//     const signupForm = document.querySelector('.signupForm');

//     signupForm.addEventListener('submit', async function (event) {
//         event.preventDefault();

//         try {
//             const formData = {
//                 doctorsName: document.getElementById('doctotsName').value,
//                 email: document.getElementById('email').value,
//                 password: document.getElementById('password').value,
//                 specialization: document.getElementById('specialization').value,
//                 gender: document.getElementById('gender').value,
//                 phonenumber: document.getElementById('phonenumber').value,
//             };

//             const response = await fetch('/admin/reg', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (data.success) {
//                 // Success
//                 showSuccessModal(data.message);
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             alert('Internal Server Error');
//         }
//     });
// });

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

// Fetch doctors from the backend
fetch("/admin/doctors")
  .then((response) => response.json())
  .then((data) => {
    const doctorList = document.getElementById("doctorList");

    data.doctors.forEach((doctor) => {
      const doctorElement = document.createElement("div");
      doctorElement.className = "doctorCard";

      doctorElement.innerHTML = `
        <p><strong>Name:</strong> ${doctor.doctorsName}</p>
        <p><strong>Email:</strong> ${doctor.email}</p>
        <p><strong>Specialization:</strong> ${doctor.specialization}</p>
        <p><strong>Gender:</strong> ${doctor.gender}</p>
        <p><strong>Phone Number:</strong> ${doctor.phonenumber}</p>
        
        <!-- Edit and Delete buttons with styles -->
        <button class="editButton" onclick="editDoctor('${doctor._id}')">Edit</button>
        <button class="deleteButton" onclick="deleteDoctor('${doctor._id}')">Delete</button>
      `;

      doctorList.appendChild(doctorElement);
    });
  })
  .catch((error) => console.error("Error fetching doctors:", error));

function deleteDoctor(doctorId) {
  openDeleteModal(doctorId);
}

// Delete doctor modal functions
function openDeleteModal(doctorId) {
  document.getElementById("confirmDeleteBtn").onclick = () =>
    confirmDelete(doctorId);
  document.getElementById("closeDeleteModalBtn").onclick =
    closeDeleteModal;

  document.getElementById("deleteModal").style.display = "block";
}

function confirmDelete(doctorId) {
  fetch(`/admin/doctors/${doctorId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      closeDeleteModal();

      location.reload();
    })
    .catch((error) => console.error("Error deleting doctor:", error));
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
}

function editDoctor(doctorId) {
  openEditModal(doctorId);
}

function openEditModal(doctorId) {
    document.getElementById("editModal").style.display = "block";
  fetch(`/admin/doctors/${doctorId}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((doctor) => {
        console.log(doctorId);
      document.getElementById("editDoctorsName").value = doctor.doctorsName;
      document.getElementById("editPhoneNumber").value = doctor.phonenumber;
      document.getElementById("editEmail").value = doctor.email;
      document.getElementById("editSpecialization").value = doctor.specialization;


      document.getElementById("saveEditBtn").onclick = () => saveEdit(doctorId);
      document.getElementById("closeEditModalBtn").onclick = closeEditModal;
    
    })
    .catch((error) => console.error("Error fetching doctor:", error));
}

function saveEdit(doctorId) {
  const updatedData = {
    doctorsName: document.getElementById("editDoctorsName").value,
    phonenumber: document.getElementById("editPhoneNumber").value,
    email: document.getElementById("editEmail").value,
    specialization: document.getElementById("editSpecialization").value,
  };

  fetch(`/admin/doctors/${doctorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      closeEditModal();

      location.reload();

    })
    .catch((error) => console.error("Error updating doctor:", error));
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// REPORTS


