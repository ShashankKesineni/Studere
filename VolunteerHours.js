class VolunteerHour {
    constructor(description, date, hours) {
        this.description = description;
        this.date = date;
        this.hours = hours;
    }
}

class VolunteerHoursTracker {
    constructor() {
        this.volunteerHours = [];
    }

    // Adds a new volunteer hour entry
    addVolunteerHour(description, date, hours) {
        if (!description || !date || !hours) {
            console.error("All fields (description, date, hours) are required.");
            return;
        }
        if (isNaN(hours) || hours <= 0) {
            console.error("Hours must be a positive number.");
            return;
        }
        const volunteerHour = new VolunteerHour(description, date, hours);
        this.volunteerHours.push(volunteerHour);
        console.log(`Added: ${description} on ${date} for ${hours} hours.`);
    }

    // Calculates the total number of volunteer hours
    getTotalHours() {
        return this.volunteerHours.reduce((total, hour) => total + hour.hours, 0);
    }

    // Displays all volunteer hours
    displayVolunteerHours() {
        if (this.volunteerHours.length === 0) {
            console.log("No volunteer hours recorded.");
            return;
        }
        console.log("Volunteer Hours:");
        this.volunteerHours.forEach(hour => {
            console.log(`Description: ${hour.description}, Date: ${hour.date}, Hours: ${hour.hours}`);
        });
        console.log(`Total Hours: ${this.getTotalHours()}`);
    }

    // Displays volunteer hours for a specific date
    getVolunteerHoursByDate(date) {
        const hoursOnDate = this.volunteerHours.filter(hour => hour.date === date);
        if (hoursOnDate.length === 0) {
            console.log(`No volunteer hours recorded on ${date}.`);
            return;
        }
        console.log(`Volunteer Hours on ${date}:`);
        hoursOnDate.forEach(hour => {
            console.log(`Description: ${hour.description}, Hours: ${hour.hours}`);
        });
    }
}

// Example usage
const tracker = new VolunteerHoursTracker();
tracker.addVolunteerHour("Beach Cleanup", "2023-10-01", 5);
tracker.addVolunteerHour("Food Bank", "2023-10-05", 3);
tracker.addVolunteerHour("Park Restoration", "2023-10-01", 2);
tracker.displayVolunteerHours();
tracker.getVolunteerHoursByDate("2023-10-01");
tracker.getVolunteerHoursByDate("2023-10-02");
