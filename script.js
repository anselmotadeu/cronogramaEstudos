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

    updateDashboard()
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
        updateDashboard()
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
            updateDashboard()
        });

        if (isCompleted) {
            completedTableBody.appendChild(row);
        } else {
            scheduleTableBody.appendChild(row);
        }

        updateDashboard()
    }

    function saveActivity(activityData) {
        const activities = getActivitiesFromStorage();
        activities.push(activityData);
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    function getActivitiesFromStorage() {
        return JSON.parse(localStorage.getItem('activities')) || [];
        updateDashboard(); // Atualiza o dashboard após carregar as atividades
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
        updateDashboard(); // Atualiza o dashboard após carregar as atividades
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
        updateDashboard(); // Atualiza o dashboard após atualizar o localStorage
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

    function updateDashboard() {
        const activities = getActivitiesFromStorage();
        let totalMinutes = 0;
        let completedTasks = 0;
        let pendingTasks = 0;
        const platformTime = {};
    
        activities.forEach(activity => {
            const [hours, minutes] = parseTime(activity.hours);
            const totalTimeInMinutes = (hours * 60) + minutes;
            totalMinutes += totalTimeInMinutes;
    
            if (activity.completed) {
                completedTasks++;
            } else {
                pendingTasks++;
            }
    
            // Unificar o tempo por plataforma
            if (!platformTime[activity.platform]) {
                platformTime[activity.platform] = 0;
            }
            platformTime[activity.platform] += totalTimeInMinutes;
        });
    
        document.getElementById('total-hours').textContent = formatTotalTime(totalMinutes);
        document.getElementById('completed-tasks').textContent = completedTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
    
        const platformTimeList = document.getElementById('platform-time');
        platformTimeList.innerHTML = '';
    
        for (const platform in platformTime) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${platform}:</span> <span>${formatTotalTime(platformTime[platform])}</span>`;
            platformTimeList.appendChild(li);
        }
    }
    
    function parseTime(timeString) {
        const parts = timeString.split(' ');
        const hours = parseFloat(parts[0]) || 0;
        const minutes = (parts.length > 3) ? parseFloat(parts[3]) || 0 : 0;
        return [hours, minutes];
    }
    
    function formatTotalTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        let hourText = hours === 1 ? `${hours} hora` : `${hours} horas`;
        let minuteText = minutes === 1 ? `${minutes} minuto` : `${minutes} minutos`;
    
        if (hours === 0) hourText = '';
        if (minutes === 0) minuteText = '';
    
        if (hourText && minuteText) {
            return `${hourText} e ${minuteText}`;
        } else if (hourText) {
            return hourText;
        } else {
            return minuteText;
        }
    }               
});