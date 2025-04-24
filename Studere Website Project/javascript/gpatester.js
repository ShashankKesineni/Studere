class GPACalculator {
    constructor() {
        this.grades = [];
    }

    addClassGrade(className="Null", grade, type = 'Regular') {
        this.grades.push({ className, grade, type });
    }

    calculateWeightedGPA() {
        if (this.grades.length === 0) return 0;

        let totalPoints = 0;
        this.grades.forEach(({ grade, type }) => {
            totalPoints += this.convertGradeToPoints(grade, type);
        });

        return totalPoints / this.grades.length;
    }

    calculateUnweightedGPA(scale) {
        if (this.grades.length === 0) return 0;
        let totalPoints = 0;
        this.grades.forEach(({ grade }) => {
            let initialPoints = this.convertGradeToPoints(grade, 'Regular')
            totalPoints += Math.min(initialPoints, scale); 
        });

        return totalPoints / this.grades.length;
    }

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

        if (type === 'honors') points += 0.5;
        if (type === 'ap' || type === 'de') points += 1.0;

        return points;
    }
}

//user interface for gpa calculator
const container = document.querySelector(".container-data");
const addButton = document.getElementById("add-button");
const subtractButton = document.getElementById("subtract-button");
const calculateButton = document.getElementById("calculate-button");
const removeAllButton = document.getElementById("remove-all-button");

addCourse();

removeAllButton.addEventListener("click", () => {
    removeAll();
});

addButton.addEventListener("click", ()=> {
    addCourse();
});

subtractButton.addEventListener("click", ()=> {
    subtractCourse();
});

calculateButton.addEventListener("click", () => {
    const gpaCalc = new GPACalculator();
    const scaleVal = document.getElementById("scale-selector").value;

    const allCourses = document.querySelectorAll(".courseData");
    allCourses.forEach(courseDiv => {
        const courseNameInput = courseDiv.querySelector(".courseName");
        const letterGradeInput = courseDiv.querySelector(".grade");
        const classTypeInput = courseDiv.querySelector(".classType");

        const name = courseNameInput.value.trim();
        const grade = letterGradeInput.value.toUpperCase();
        const type = classTypeInput.value.trim().toLowerCase();

        if (grade) {
            gpaCalc.addClassGrade(name, grade, type);
        }
    });

    const Weightedgpa = gpaCalc.calculateWeightedGPA().toFixed(2);
    const Unweightedgpa = gpaCalc.calculateUnweightedGPA(scaleVal).toFixed(2);
    const wgpaOutput = document.querySelector(".w");
    const uwgpaOutput = document.querySelector(".uw");
    uwgpaOutput.textContent = `\nUnweighted GPA: ${Unweightedgpa}`;
    wgpaOutput.textContent = `Weighted GPA: ${Weightedgpa}`; 
});

function removeAll() {
    const allBoxes = document.querySelectorAll(".courseData");
    allBoxes.forEach(box => {
        box.remove();
    });
}

function subtractCourse() {
    const allBoxes = document.querySelectorAll(".courseData");
    allBoxes[allBoxes.length - 1].remove();
}

function addCourse() {
    const course = document.createElement("div");
    course.className = "courseData";
    container.appendChild(course);
    addDetails(course);
}

function addDetails(aCourse) {
    //course name
    const courseName = document.createElement("input");
    courseName.className = "courseName";
    courseName.type = "text";
    courseName.placeholder = "Course Name";

    //letter grade option select
    const letters = ["", "A+", "A", "A-", "B+", 'B', 'B-', 'C+', "C", "C-", 'D+', "D", 'D-', 'F'];
    const grade = document.createElement("select");
    grade.className = 'grade';
    letters.forEach((letter) => {
        let opt = document.createElement("option");
        opt.value = `${letter.toLowerCase()}`;
        opt.textContent = letter;
        grade.appendChild(opt);

    });

    //type of class level
    const classTypes = ["", "Regular", "Honors", "AP", "DE"];
    const classType = document.createElement("select");
    classType.className = "classType";
    classTypes.forEach((type) => {
        let copt = document.createElement("option");
        copt.value = `${type.toLowerCase()}`;
        copt.textContent = type;
        classType.appendChild(copt);
    });

    aCourse.appendChild(courseName);
    aCourse.appendChild(grade);
    aCourse.append(classType);

    // Save GPA data to local storage
function saveGPAData() {
    const allCourses = [];
    document.querySelectorAll(".courseData").forEach(courseDiv => {
        const courseName = courseDiv.querySelector(".courseName").value.trim();
        const grade = courseDiv.querySelector(".grade").value.trim();
        const classType = courseDiv.querySelector(".classType").value.trim();
        if (courseName && grade && classType) {
            allCourses.push({ courseName, grade, classType });
        }
    });
    localStorage.setItem('gpaData', JSON.stringify(allCourses));
}

// Load GPA data from local storage
function loadGPAData() {
    const savedCourses = JSON.parse(localStorage.getItem('gpaData')) || [];
    savedCourses.forEach(course => {
        addCourse();
        const lastCourse = document.querySelectorAll(".courseData").item(-1);
        lastCourse.querySelector(".courseName").value = course.courseName;
        lastCourse.querySelector(".grade").value = course.grade;
        lastCourse.querySelector(".classType").value = course.classType;
    });
}

// Call loadGPAData when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadGPAData();
});

// Save data whenever a course is added, removed, or calculated
addButton.addEventListener("click", saveGPAData);
subtractButton.addEventListener("click", saveGPAData);
calculateButton.addEventListener("click", saveGPAData);
removeAllButton.addEventListener("click", () => {
    removeAll();
    saveGPAData();
});
}