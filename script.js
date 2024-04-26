// script.js
// script.js

const studentDataUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
const studentTable = document.getElementById('studentTable');
const studentDataContainer = document.getElementById('studentData');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let students = [];

// Fetch student data from URL
fetch(studentDataUrl)
  .then(response => response.json())
  .then(data => {
    students = data;
    renderStudents(students);
  });

// Function to render students in the table
function renderStudents(students) {
  studentDataContainer.innerHTML = '';
  students.forEach(student => {
    const fullName = `${student.first_name} ${student.last_name}`;
    const passingStatus = student.passing ? 'Passing' : 'Failed';
    const gender = student.gender === 'male' ? 'Male' : 'Female';
    const row = `
      <tr>
        <td>${student.id}</td>
        <td><img  width = "20px" height="20px" border-radius ="20px" src="data:image/jpeg;base64,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" alt="Student Image">${fullName}</td>
        <td>${gender}</td>
        <td>${student.class}</td>
        <td>${student.marks}</td>
        <td>${passingStatus}</td>
        <td>${student.email}</td>
        
      </tr>
    `;
    studentDataContainer.innerHTML += row;
  });
}

// Function to filter students based on search input
function searchStudents(query) {
  const filteredStudents = students.filter(student => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const email = student.email.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });
  renderStudents(filteredStudents);
}

// Event listener for search button click
searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.toLowerCase();
  searchStudents(searchQuery);
});
// Event listener for sort A->Z button click
document.getElementById('sortAZ').addEventListener('click', () => {
    students.sort((a, b) => a.first_name.localeCompare(b.first_name));
    renderStudents(students);
  });
  
  // Event listener for sort Z->A button click
  document.getElementById('sortZA').addEventListener('click', () => {
    students.sort((a, b) => b.first_name.localeCompare(a.first_name));
    renderStudents(students);
  });
  
  // Event listener for sort by marks button click
  document.getElementById('sortByMarks').addEventListener('click', () => {
    students.sort((a, b) => a.marks - b.marks);
    renderStudents(students);
  });
  
  // Event listener for sort by passing button click
  document.getElementById('sortByPassing').addEventListener('click', () => {
    const passingStudents = students.filter(student => student.passing);
    renderStudents(passingStudents);
  });
  
  // Event listener for sort by class button click
  
  document.getElementById('sortByClass').addEventListener('click', () => {
    students.sort((a, b) => a.class.localeCompare(b.class));
    renderStudents(students);
  });
  
  
  document.getElementById('sortByGender').addEventListener('click', () => {
    const maleStudents = students.filter(student => student.gender === 'Male');
    const femaleStudents = students.filter(student => student.gender === 'Female');
    const sortedStudents = [...femaleStudents, ...maleStudents];
    renderStudentsByGender(sortedStudents);
  });
  
 
  
  
  

