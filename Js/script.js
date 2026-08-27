 function updateDateTime() {
    const dateTime = document.getElementById("dateTime");

    if (dateTime) {
        const now = new Date();

        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        dateTime.textContent = now.toLocaleString("en-BD", options);
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);




function updateDateTime() {
    const dateTime = document.getElementById("dateTime");

    if (dateTime) {
        const now = new Date();

        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        dateTime.textContent = now.toLocaleString("en-BD", options);
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Thank you! Your message has been submitted successfully.");

        contactForm.reset();
    });
}





const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active", "btn-primary");
            btn.classList.add("btn-outline-primary");
        });

        this.classList.remove("btn-outline-primary");
        this.classList.add("active", "btn-primary");

        const filter = this.getAttribute("data-filter");

        projectItems.forEach(function(item) {
            if (filter === "all" || item.classList.contains(filter)) {
                item.classList.remove("d-none");
            } else {
                item.classList.add("d-none");
            }
        });
    });
});