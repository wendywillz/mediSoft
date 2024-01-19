document.addEventListener("DOMContentLoaded", function () {
  const openReportModalBtn = document.getElementById("openReportModalBtn");
  const closeReportModalBtn = document.getElementById("closeReportModalBtn");
  const reportModal = document.getElementById("reportModal");

  // Open the report modal
  openReportModalBtn.addEventListener("click", function () {
    reportModal.style.display = "block";
  });

  // Close the report modal
  closeReportModalBtn.addEventListener("click", function () {
    reportModal.style.display = "none";
  });

  // Close the report modal if the overlay is clicked
  window.addEventListener("click", function (event) {
    if (event.target === reportModal) {
      reportModal.style.display = "none";
    }
  });
});



// document.addEventListener("DOMContentLoaded", function () {
  // Fetch doctor's reports from the backend
  fetch("/doctor/reports")
    .then((response) => response.json())
    .then((data) => {
      const reportList = document.getElementById("reportList");

      data.reports.forEach((report) => {
        const reportElement = document.createElement("div");
        reportElement.className = "reportCard";

        reportElement.innerHTML = `
          <p><strong>Patient's Name:</strong> ${report.patientsName}</p>
          <p><strong>Age:</strong> ${report.Age}</p>
          <p><strong>Hospital Name:</strong> ${report.hospitalName}</p>
          <p><strong>Weight:</strong> ${report.weight}</p>
          <p><strong>Height:</strong> ${report.height}</p>
          <p><strong>Blood Group:</strong> ${report.bloodGroup}</p>
          <p><strong>Genotype:</strong> ${report.genotype}</p>
          <p><strong>Blood Pressure:</strong> ${report.bloodPressure}</p>
          <p><strong>HIV Status:</strong> ${report.HIV_status}</p>

          <p><strong>Hepatitis:</strong> ${report.hepatitis}</p>

          <!-- Edit and Delete buttons with styles -->
          <button class="editButton" onclick="editDoctorReport('${report._id}')">Edit</button>
          <button class="deleteButton" onclick="deleteDoctorReport('${report._id}')">Delete</button>
        `;

        reportList.appendChild(reportElement);
      });
    })
    .catch((error) => console.error("Error fetching reports:", error));
// });


function deleteDoctorReport(reportId) {
    openDeleteModal(reportId)
}

// Delete doctor modal functions
function openDeleteModal(reportId) {
  document.getElementById("confirmDeleteBtn").onclick = () =>
    confirmDelete(reportId);
  document.getElementById("closeDeleteModalBtn").onclick =
    closeDeleteModal;

  document.getElementById("deleteModal").style.display = "block";
}

function confirmDelete(reportId) {
  fetch(`/doctor/reports/${reportId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      closeDeleteModal();

      location.reload();
    })
    .catch((error) => console.error("Error deleting report:", error));
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
}


function editDoctorReport(reportId) {
  openEditModal(reportId);
}

function openEditModal(reportId) {
  document.getElementById("editModal").style.display = "block";
  fetch(`/doctor/reports/${reportId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((report) => {
      console.log(reportId);
      document.getElementById("editPatientsName").value = report.patientsName;
      document.getElementById("editAge").value = report.Age;
      document.getElementById("editHospitalName").value = report.hospitalName;
      document.getElementById("editWeight").value = report.weight;document.getElementById("editHeight").value = report.height;document.getElementById("editBloodGroup").value = report.bloodGroup;
      document.getElementById("editGenotype").value = report.genotype;
      document.getElementById("editBloodPressure").value = report.bloodPressure;
      document.getElementById("editHIV_status").value = report.HIV_status;
      document.getElementById("editHepatitis").value = report.hepatitis;

      document.getElementById("saveEditBtn").onclick = () => saveEdit(reportId);
      document.getElementById("closeEditModalBtn").onclick = closeEditModal;
    })
    .catch((error) => console.error("Error fetching doctor:", error));
}

function saveEdit(reportId) {
  const updatedData = {
    patientsName: document.getElementById("editPatientsName").value,
    Age: document.getElementById("editAge").value,
    hospitalName: document.getElementById("editHospitalName").value,
    weight: document.getElementById("editWeight").value,
    height: document.getElementById("editHeight").value,
    bloodGroup: document.getElementById("editBloodGroup").value,
    genotype: document.getElementById("editGenotype").value,
    bloodPressure: document.getElementById("editBloodPressure").value,
    HIV_status: document.getElementById("editHIV_status").value,
    hepatitis: document.getElementById("editHepatitis").value,
  };

  fetch(`/doctor/reports/${reportId}`, {
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
    .catch((error) => console.error("Error updating report:", error));
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}