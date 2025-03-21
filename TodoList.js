class TodoItem {
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = new Date(dueDate);

        // Check if the due date is valid
        if (isNaN(this.dueDate.getTime())) {
            throw new Error(`Invalid date format for task: ${title}`);
        }

        this.completed = false;
    }

    markCompleted() {
        this.completed = true;
    }
}

// Class representing a list of to-do items.
class TodoList {
    // Create a to-do list.
    constructor() {
        this.items = [];
    }

    // Add a new item to the to-do list.
    addItem(title, description, priority, dueDate) {
        const newItem = new TodoItem(title, description, priority, dueDate);
        this.items.push(newItem);
    }

    // Remove an item from the to-do list by title.
    removeItem(title) {
        this.items = this.items.filter(item => item.title !== title);
    }

    // Get items from the to-do list, optionally sorted by a specified field.
    getItems(sortBy) {
        if (sortBy === 'priority') {
            return this.items.slice().sort((a, b) => a.priority - b.priority);
        } else if (sortBy === 'due_date') {
            return this.items.slice().sort((a, b) => a.dueDate - b.dueDate);
        }
        return this.items;
    }

    // Get items that are due soon (within the next 24 hours).
    getDueSoon() {
        const now = new Date();
        const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        return this.items.filter(item => !item.completed && item.dueDate > now && item.dueDate < soon);
    }

    // Display a reminder for items due soon.
    displayDueSoonReminder() {
        const dueSoonItems = this.getDueSoon();
        if (dueSoonItems.length > 0) {
            console.log("You have items due soon:");
            dueSoonItems.forEach(item => {
                console.log(`- ${item.title} (Due: ${item.dueDate})`);
            });
        } else {
            console.log("No items due soon.");
        }
    }
}

// Example usage
const todoList = new TodoList();

todoList.addItem("Finish project", "Complete the project by end of the week", 1, "2023-10-15T00:00:00");
todoList.addItem("Buy groceries", "Milk, Bread, Eggs", 2, "2023-10-12T00:00:00");

// Display reminder for due soon items when the app starts
todoList.displayDueSoonReminder();

// Print all items sorted by priority
console.log("All items sorted by priority:");
todoList.getItems('priority').forEach(item => {
    console.log(`- ${item.title} (Priority: ${item.priority}, Due: ${item.dueDate})`);
});
