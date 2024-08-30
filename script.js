document.addEventListener("DOMContentLoaded", function() {
    const addSubjectBtn = document.getElementById("add-subject-btn");
    const modal = document.getElementById("add-subject-modal");
    const closeModalBtn = document.querySelector(".close");
    const addSubjectForm = document.getElementById("add-subject-form");
    const scheduleTableBody = document.querySelector("#schedule tbody");
    const completedTableBody = document.querySelector("#completed tbody");

    addSubjectBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    addSubjectForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const date = document.getElementById("date").value;
        const day = document.getElementById("day").value;
        const activity = document.getElementById("activity").value;
        const platform = document.getElementById("platform").value; // Capturando a plataforma
        const hours = document.getElementById("hours").value;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${date}</td>
            <td>${day}</td>
            <td>${activity}</td>
            <td>${platform}</td> <!-- Exibindo a plataforma -->
            <td>${hours}h</td>
            <td><input type="checkbox"></td>
        `;

        row.querySelector("input[type='checkbox']").addEventListener("change", function() {
            if (this.checked) {
                moveToCompleted(row);
            }
        });

        scheduleTableBody.appendChild(row);
        modal.style.display = "none";
        addSubjectForm.reset();
    });

    function moveToCompleted(row) {
        row.querySelector("td:last-child").remove();
        completedTableBody.appendChild(row);
    }
});