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
        if (this.grades.length === 0) return 0;

        // Calculate the total points and divide by the number of classes
        let totalPoints = 0;
        this.grades.forEach(({ grade, type }) => {
            totalPoints += this.convertGradeToPoints(grade, type);
        });

        return totalPoints / this.grades.length;
    }

    // Helper method to convert a grade to points
    convertGradeToPoints(grade, type) {
        let points;
        switch (grade.toUpperCase()) {
            case 'A+': points = 4.3; break;s
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

        return points;
    }

    // Method to input grades from the user
    inputGrades() {
        const numberOfClasses = parseInt(prompt("Enter the number of classes: "), 10);
        for (let i = 0; i < numberOfClasses; i++) {
            const className = prompt(`Enter the name of class ${i + 1}: `);
            const grade = prompt(`Enter the grade for ${className}: `);
            const type = prompt(`Enter the type for ${className} (Regular, Honors, AP, DE): `);
            this.addClassGrade(className, grade, type);
        }
    }
}

// Example usage:
const gpaCalc = new GPACalculator();
gpaCalc.inputGrades();
gpaCalc.calculateGPA();
console.log('Current GPA:', gpaCalc.calculateGPA());