class eventHandler {
    constructor() {
        this.events = [];
    }

    addEvent(eventTitle, eventDate, eventLocation, eventDetails) {
        this.events.push({
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            details: eventDetails
        });
    }

    removeEvent(eventIndex) {
        if (eventIndex >= 0 && eventIndex < this.events.length) {
            this.events.splice(eventIndex, 1);
        } else {
            console.error("Invalid event index");
        }
    }

    viewEventDetails(eventIndex) {
        if (eventIndex >= 0 && eventIndex < this.events.length) {
            const event = this.events[eventIndex];
            return `Title: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}\nDetails: ${event.details}`;
        } else {
            console.error("Invalid event index");
            return null;
        }
    }
}

const eventHandlerInstance = new eventHandler();

const eventContainer = document.querySelector(".event-container");
const eventAdderContainer = document.querySelector(".event-adder-container");
const addEventButton = document.getElementById("add-event-button");

addEventButton.addEventListener("click", () => {
    //only one add event at a time
    const existingEvents = document.querySelectorAll(".preEvent");
    if (existingEvents.length > 0) {
        existingEvents.forEach(event => event.remove());
    }
    addEventAdder();
});

function addEventAdder() {
    const preEvent = document.createElement("div")
    preEvent.className = "preEvent";
    eventContainer.appendChild(preEvent);
    addEventInformation(preEvent);
}

function addRealEvent() {
    const realEvent = document.createElement("div");
    realEvent.className = "real-event";
    addRealEventInformation(realEvent);
    eventContainer.appendChild(realEvent);
}

function addRealEventInformation(realEvent) {
    const realEventTitle = document.createElement("h3");
    const realEventDate = document.createElement("p");
    const realEventLocation = document.createElement("p");
    const realEventDetails = document.createElement("p");
    const deleteEventButton = document.createElement("button");

    //create event classes
    realEventTitle.className = "real-event-title";
    realEventDate.className = "real-event-date";
    realEventLocation.className = "real-event-location";
    realEventDetails.className = "real-event-details";

    //button ids and classes
    deleteEventButton.className = "delete-event-button";
    deleteEventButton.id = `${eventHandlerInstance.events.length - 1}`;
    deleteEventButton.addEventListener("click", () => {
        const eventIndex = parseInt(deleteEventButton.id, 10);
        eventHandlerInstance.removeEvent(eventIndex);
        realEvent.remove();
        const allRealEvents = document.querySelectorAll(".real-event");
        allRealEvents.forEach((event, index) => {
            const button = event.querySelector(".delete-event-button");
            button.id = index; // Update the ID of the delete button
        });
    })

    //include event information text
    realEventTitle.textContent = eventHandlerInstance.events[eventHandlerInstance.events.length - 1].title;
    realEventDate.textContent = "Date:\n" + eventHandlerInstance.events[eventHandlerInstance.events.length - 1].date;
    realEventLocation.textContent = "Location:\n" + eventHandlerInstance.events[eventHandlerInstance.events.length - 1].location;
    realEventDetails.textContent = "Details:\n" + eventHandlerInstance.events[eventHandlerInstance.events.length - 1].details;
    deleteEventButton.textContent = "Delete Event";

    realEvent.appendChild(realEventTitle);
    realEvent.appendChild(realEventDate);
    realEvent.appendChild(realEventLocation);
    realEvent.appendChild(realEventDetails);
    realEvent.appendChild(deleteEventButton);
}

function addEventInformation(preEvent) {
    //create elements in html
    const addEventTitle = document.createElement("input");
    const addEventDate = document.createElement("input");
    const addEventLocation = document.createElement("input");
    const addEventDetails = document.createElement("textarea");
    const addEventSubmit = document.createElement("button");
    const addEventCancel = document.createElement("button");

    addEventCancel.addEventListener("click", () => {
        const existingEvents = document.querySelectorAll(".preEvent");
        if (existingEvents.length > 0) {
            existingEvents.forEach(preEvent => preEvent.remove());
        }
    });

    addEventSubmit.addEventListener("click", () => {
        const title = addEventTitle.value.trim();
        const date = addEventDate.value.trim();
        const location = addEventLocation.value.trim();
        const details = addEventDetails.value.trim();

        if (title && date && location && details) {
            eventHandlerInstance.addEvent(title, date, location, details);
            addRealEvent();
            preEvent.remove();
        }
    })

    //create event classes
    addEventTitle.className = "add-event-title";
    addEventDate.className = "add-event-date";
    addEventLocation.className = "add-event-location";
    addEventDetails.className = "add-event-details";
    addEventSubmit.className = "add-event-submit";
    addEventCancel.className = "add-event-cancel";

    //event placeholders
    addEventTitle.placeholder = "Event Title";
    addEventDate.placeholder = "(YYYY-MM-DD)";
    addEventLocation.placeholder = "Location";
    addEventDetails.placeholder = "Details";
    addEventSubmit.textContent = "Submit";
    addEventCancel.textContent = "Cancel";

    preEvent.appendChild(addEventTitle);
    preEvent.appendChild(addEventDate);
    preEvent.appendChild(addEventLocation);
    preEvent.appendChild(addEventDetails);
    preEvent.appendChild(addEventSubmit);
    preEvent.appendChild(addEventCancel);
}


// eventHandlerInstance.addEvent("Meeting", "2023-10-01", "10:00 AM", "Conference Room", "Discuss project updates");
// eventHandlerInstance.addEvent("Workshop", "2023-10-05", "2:00 PM", "Auditorium", "Hands-on coding session");


// console.log(eventHandlerInstance.viewEventDetails(1));
// console.log(eventHandlerInstance.events[1].date)

