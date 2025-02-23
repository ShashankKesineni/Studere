class GPACalculator {
    // Constructor to initialize the grades array
    constructor() {
        this.grades = [];
    }

    // Method to add a class grade to the grades array
    addClassGrade(className, grade, type = 'Regular') {
        this.grades.push({ className, grade, type });
    }

    // Method to calculate the GPA based on the grades array
    calculateGPA() {
        if (this.grades.length === 0) return 0; // Return 0 if there are no grades

        // Calculate the total points and divide by the number of classes
        let totalPoints = 0;
        this.grades.forEach(({ grade, type }) => {
            totalPoints += this.convertGradeToPoints(grade, type);
        });

        return totalPoints / this.grades.length; // Return the average points
    }

    // Helper method to convert a grade to points
    convertGradeToPoints(grade, type) {
        let points;
        switch (grade.toUpperCase()) {
            case 'A+': points = 4.3; break;
            case 'A': points = 4.0; break;
            case 'A-': points = 3.7; break;
            case 'B+': points = 3.3; break;
            case 'B': points = 3.0; break;
            case 'B-': points = 2.7; break;
            case 'C+': points = 2.3; break;
            case 'C': points = 2.0; break;
            case 'C-': points = 1.7; break;
            case 'D+': points = 1.3; break;
            case 'D': points = 1.0; break;
            case 'F': points = 0.0; break;
            default: points = 0.0; break;
        }

        // Add extra points for Honors, AP, and DE classes
        if (type === 'Honors') points += 0.5;
        if (type === 'AP' || type === 'DE') points += 1.0;

        return points; // Return the calculated points
    }
}

// Example usage:
const gpaCalc = new GPACalculator();
gpaCalc.addClassGrade('Math', 'A', 'Regular'); // Add Math grade
gpaCalc.addClassGrade('Science', 'B+', 'Honors'); // Add Science grade
gpaCalc.addClassGrade('History', 'A-', 'AP'); // Add History grade
gpaCalc.addClassGrade('English', 'C', 'Regular'); // Add English grade
gpaCalc.addClassGrade('Art', 'A', 'Regular'); // Add Art grade

// Print each class grade
gpaCalc.grades.forEach(({ className, grade, type }) => {
    console.log(`${className}: ${grade} (${type})`);
});

// Calculate and print the current GPA
console.log('Current GPA:', gpaCalc.calculateGPA());