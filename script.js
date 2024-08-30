document.addEventListener("DOMContentLoaded", function() {
    const addSubjectBtn = document.getElementById("add-subject-btn");
    const modal = document.getElementById("add-subject-modal");
    const closeModalBtn = document.querySelector(".close");
    const addSubjectForm = document.getElementById("add-subject-form");
    const scheduleTableBody = document.querySelector("#schedule tbody");
    const completedTableBody = document.querySelector("#completed tbody");

    const dateInput = document.getElementById("date");
    const dayInput = document.getElementById("day");

    // Atualizar o campo "Dia" automaticamente quando o usuário escolher uma data
    dateInput.addEventListener("change", function() {
        const selectedDate = new Date(dateInput.value + 'T00:00:00');
        const options = { weekday: 'long' };
        const dayOfWeek = selectedDate.toLocaleDateString('pt-BR', options);
        dayInput.value = capitalizeFirstLetter(dayOfWeek);
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Carregar as atividades salvas ao iniciar a aplicação
    loadActivities();

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
        const platform = document.getElementById("platform").value; 
        const hours = document.getElementById("hours").value;

        // Formatar a data para o formato DD/MM/AAAA
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const formattedHours = formatHours(hours);

        const activityData = {
            date: formattedDate,
            day: day,
            activity: activity,
            platform: platform,
            hours: formattedHours,
            completed: false
        };

        addActivityToTable(activityData);
        saveActivity(activityData);

        modal.style.display = "none";
        addSubjectForm.reset();
    });

    function addActivityToTable(activityData, isCompleted = false) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${activityData.date}</td>
            <td>${activityData.day}</td>
            <td>${activityData.activity}</td>
            <td>${activityData.platform}</td>
            <td>${activityData.hours}</td>
            <td><input type="checkbox" ${activityData.completed ? "checked" : ""}></td>
        `;

        row.querySelector("input[type='checkbox']").addEventListener("change", function() {
            activityData.completed = this.checked;
            updateActivityInStorage();
            if (this.checked) {
                moveToCompleted(row);
            } else {
                moveToSchedule(row);
            }
        });

        if (isCompleted) {
            completedTableBody.appendChild(row);
        } else {
            scheduleTableBody.appendChild(row);
        }
    }

    function saveActivity(activityData) {
        const activities = getActivitiesFromStorage();
        activities.push(activityData);
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    function getActivitiesFromStorage() {
        return JSON.parse(localStorage.getItem('activities')) || [];
    }

    function loadActivities() {
        const activities = getActivitiesFromStorage();
        activities.forEach(activityData => {
            if (activityData.completed) {
                addActivityToTable(activityData, true);
            } else {
                addActivityToTable(activityData);
            }
        });
    }

    function updateActivityInStorage() {
        const allActivities = [];
        const rows = document.querySelectorAll("#schedule tbody tr, #completed tbody tr");

        rows.forEach(row => {
            const activityData = {
                date: row.children[0].textContent,
                day: row.children[1].textContent,
                activity: row.children[2].textContent,
                platform: row.children[3].textContent,
                hours: row.children[4].textContent,
                completed: row.children[5] ? row.children[5].querySelector("input").checked : true
            };
            allActivities.push(activityData);
        });

        localStorage.setItem('activities', JSON.stringify(allActivities));
    }

    function moveToCompleted(row) {
        row.querySelector("td:last-child").remove();
        completedTableBody.appendChild(row);
        updateActivityInStorage();
    }

    function moveToSchedule(row) {
        scheduleTableBody.appendChild(row);
        updateActivityInStorage();
    }

    function formatHours(hours) {
        const totalMinutes = parseFloat(hours) * 60;
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
    
        let hourText = h === 1 ? `${h} hora` : `${h} horas`;
        let minuteText = m === 1 ? `${m} minuto` : `${m} minutos`;
    
        if (h === 0) hourText = '';
        if (m === 0) minuteText = '';
    
        if (hourText && minuteText) {
            return `${hourText} e ${minuteText}`;
        } else if (hourText) {
            return hourText;
        } else {
            return minuteText;
        }
    }
});