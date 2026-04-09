let allJobCards = document.querySelectorAll(".job-card");

let totalCountDisplay = document.getElementById("totalCount");
let interviewCountDisplay = document.getElementById("interviewCount");
let rejectCountDisplay = document.getElementById("rejectCount");

let sectionHeading = document.querySelector(".available-jobs-summary h3");
let sectionCount = document.querySelector(".available-jobs-summary p");

let allBtn = document.getElementById("all-btn");
let interviewBtn = document.getElementById("interview-btn");
let rejectBtn = document.getElementById("reject-btn");

let cardsContainer = document.querySelector(".cards-group-body");

let jobs = [];
allJobCards.forEach(function(card) {
    let jobObject = {
        card: card,
        status: "none"
    };
    jobs.push(jobObject);
});

let placeholder = document.createElement("div");
placeholder.classList.add("placeholder-content");
placeholder.innerHTML = `
    <img src="docs.svg" alt="No content image">
    <h2>No content here</h2>
    <p>There are currently no jobs to show in this tab.</p>
`;

let currentTab = "all";

function updatePage() {

    if (cardsContainer.contains(placeholder)) {
        cardsContainer.removeChild(placeholder);
    }

    let totalJobs = jobs.length;
    let interviewJobs = 0;
    let rejectedJobs  = 0;

    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].status === "interview") {
            interviewJobs = interviewJobs + 1;
        }
        if (jobs[i].status === "rejected") {
            rejectedJobs = rejectedJobs + 1;
        }
    }

    totalCountDisplay.textContent = totalJobs;
    interviewCountDisplay.textContent = interviewJobs;
    rejectCountDisplay.textContent = rejectedJobs;

    if (currentTab === "all") {
        sectionHeading.textContent = "Available Jobs";
    } else if (currentTab === "interview") {
        sectionHeading.textContent = "Interviewed Jobs";
    } else if (currentTab === "rejected") {
        sectionHeading.textContent = "Rejected Jobs";
    }

    let visibleCount = 0;

    for (let i = 0; i < jobs.length; i++) {
        let thisJob    = jobs[i];
        let thisCard   = thisJob.card;
        let thisStatus = thisJob.status;

        if (currentTab === "all") {
            thisCard.style.display = "flex";
            visibleCount = visibleCount + 1;

        } else if (currentTab === "interview") {
            if (thisStatus === "interview") {
                thisCard.style.display = "flex";
                visibleCount = visibleCount + 1;
            } else {
                thisCard.style.display = "none";
            }

        } else if (currentTab === "rejected") {
            if (thisStatus === "rejected") {
                thisCard.style.display = "flex";
                visibleCount = visibleCount + 1;
            } else {
                thisCard.style.display = "none";
            }
        }
    }

    sectionCount.textContent = visibleCount + " Jobs";

    if (visibleCount === 0) {
        cardsContainer.appendChild(placeholder);
    }
}

allBtn.addEventListener("click", function() {
    currentTab = "all";

    allBtn.classList.add("btn-default");
    interviewBtn.classList.remove("btn-default");
    rejectBtn.classList.remove("btn-default");

    updatePage();
});

interviewBtn.addEventListener("click", function() {
    currentTab = "interview";

    allBtn.classList.remove("btn-default");
    interviewBtn.classList.add("btn-default");
    rejectBtn.classList.remove("btn-default");

    updatePage();
});

rejectBtn.addEventListener("click", function() {
    currentTab = "rejected";

    allBtn.classList.remove("btn-default");
    interviewBtn.classList.remove("btn-default");
    rejectBtn.classList.add("btn-default");

    updatePage();
});

cardsContainer.addEventListener("click", function(event) {

    let clickedCard = event.target.closest(".job-card");

    if (!clickedCard) {
        return;
    }

    let matchingJob = null;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].card === clickedCard) {
            matchingJob = jobs[i];
            break;
        }
    }

    if (!matchingJob) {
        return;
    }

    let statusLabel = clickedCard.querySelector(".update-status");

    if (event.target.closest(".dlt-icon")) {
        clickedCard.remove();

        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].card === clickedCard) {
                jobs.splice(i, 1);
                break;
            }
        }

        updatePage();
        return;
    }

    if (event.target.closest(".accept")) {

        if (matchingJob.status === "interview") {
            matchingJob.status = "none";
            statusLabel.textContent = "Not Applied";
            statusLabel.style.backgroundColor = "#eef4ff";
            statusLabel.style.color = "#002C5C";
        } else {
            matchingJob.status = "interview";
            statusLabel.textContent = "Interview";
            statusLabel.style.backgroundColor = "#d1fae5";
            statusLabel.style.color = "#10B981";
        }

        updatePage();
        return;
    }

    if (event.target.closest(".reject")) {

        if (matchingJob.status === "rejected") {
            matchingJob.status = "none";
            statusLabel.textContent = "Not Applied";
            statusLabel.style.backgroundColor = "#eef4ff";
            statusLabel.style.color = "#002C5C";
        } else {
            matchingJob.status = "rejected";
            statusLabel.textContent = "Rejected";
            statusLabel.style.backgroundColor = "#fee2e2";
            statusLabel.style.color = "#EF4444";
        }

        updatePage();
        return;
    }

});

updatePage();