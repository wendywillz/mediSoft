// Fetch doctors from the backend
fetch("/admin/reports")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const reportList = document.getElementById("reportList");

    data.reports.forEach((report) => {
        console.log(report);
      const reportElement = document.createElement("div");
      reportElement.className = "doctorCard";

      reportElement.innerHTML = `
        <p><strong>Patients Name:</strong> ${report.patientsName}</p>
        <p><strong>Patients Age:</strong> ${report.Age}</p>
        <p><strong>Hospital Name:</strong> ${report.hospitalName}</p>
        <p><strong>Patients Weight:</strong> ${report.weight}</p>
        <p><strong>Patients Height:</strong> ${report.height}</p>
        <p><strong>Patients Blood Group:</strong> ${report.bloodGroup}</p>
        <p><strong>Patients Genotype:</strong> ${report.genotype}</p>
        <p><strong>Patients Blood Pressure:</strong> ${report.bloodPressure}</p>
        <p><strong>Hiv Status:</strong> ${report.HIV_status}</p>
        <p><strong>Patients Hepatitis:</strong> ${report.hepatitis}</p>

        <!-- Edit and Delete buttons with styles -->
        <button class="editButton" onclick="editReport('${report._id}')">Edit</button>
        <button class="deleteButton" onclick="deleteReport('${report._id}')">Delete</button>
      `;

      reportList.appendChild(reportElement);
    });
  })
  .catch((error) => console.error("Error fetching reports:", error));

  function deleteReport(reportId) {
    openDeleteReportModal(reportId);
  }

  // Delete report modal functions
  function openDeleteReportModal(reportId) {
    document.getElementById("confirmDeleteReportBtn").onclick = () =>
      confirmDeleteReport(reportId);
    document.getElementById("closeDeleteReportModalBtn").onclick = closeDeleteReportModal;

    document.getElementById("deleteReportModal").style.display = "block";
  }

  function confirmDeleteReport(reportId) {
    fetch(`/admin/reports/${reportId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        closeDeleteReportModal();

        location.reload();
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  }

  function closeDeleteReportModal() {
    document.getElementById("deleteReportModal").style.display = "none";
  }

    function editReport(reportId) {
        openEditReportModal(reportId);
    }

    function openEditReportModal(reportId) {
        document.getElementById("editReportModal").style.display = "block";
        fetch(`/admin/reports/${reportId}`, {
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
                document.getElementById("editWeight").value = report.weight;
                document.getElementById("editHeight").value = report.height;
                document.getElementById("editBloodGroup").value = report.bloodGroup;
                document.getElementById("editGenotype").value = report.genotype;
                document.getElementById("editBloodPressure").value = report.bloodPressure;
                document.getElementById("editHIV_status").value = report.HIV_status;
                document.getElementById("editHepatitis").value = report.hepatitis;

                document.getElementById("saveEditReportBtn").onclick = () => saveEditReport(reportId);
                document.getElementById("closeEditReportModalBtn").onclick = closeEditReportModal;
            })
            .catch((error) => console.error("Error fetching report:", error));
    }

    function saveEditReport(reportId) {
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

        fetch(`/admin/reports/${reportId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                closeEditReportModal();

                location.reload();
            })
            .catch((error) => console.error("Error updating report:", error));
    }

    function closeEditReportModal() {
        document.getElementById("editReportModal").style.display = "none";
    }
