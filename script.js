const studentDataUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
const studentDataContainer = document.getElementById('studentData');
const searchInput = document.getElementById('searchInput');

let students = [];

// Fetch the JSON data
fetch(studentDataUrl)
  .then(response => response.json())
  .then(data => {
    students = data;
    renderStudents(students); // Initial rendering
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to render students in the table
function renderStudents(studentList) {
  studentDataContainer.innerHTML = studentList.map(student => {
    const fullName = `${student.first_name} ${student.last_name}`;
    const passingStatus = student.passing ? 'Passing' : 'Failed';
    const gender = student.gender === 'male' ? 'Male' : 'Female';

    return `
      <tr>
        <td>${student.id}</td>
        <td>
          <img width="30px" height="30px" 
               src="https://images.unsplash.com/photo-1645349286356-52b1ed83376a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5pY2UlMjBmYWNlfGVufDB8fDB8fHww" 
               alt="Profile picture of ${fullName}">
          ${fullName}
        </td>
        <td>${gender}</td>
        <td>${student.class}</td>
        <td>${student.marks}</td>
        <td>${passingStatus}</td>
        <td>${student.email}</td>
      </tr>
    `;
  }).join('');
}

// Search functionality (case-insensitive)
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredStudents = students.filter(student => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const email = student.email.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });
  renderStudents(filteredStudents);
});

// Sorting functionality
document.getElementById('sortAZ').addEventListener('click', () => {
  students.sort((a, b) => a.first_name.localeCompare(b.first_name));
  renderStudents(students);
});

document.getElementById('sortZA').addEventListener('click', () => {
  students.sort((a, b) => b.first_name.localeCompare(a.first_name));
  renderStudents(students);
});

document.getElementById('sortByMarks').addEventListener('click', () => {
  students.sort((a, b) => b.marks - a.marks);
  renderStudents(students);
});

document.getElementById('sortByPassing').addEventListener('click', () => {
  students.sort((a, b) => Number(b.passing) - Number(a.passing));
  renderStudents(students);
});

document.getElementById('sortByClass').addEventListener('click', () => {
  students.sort((a, b) => a.class - b.class);
  renderStudents(students);
});

document.getElementById('sortByGender').addEventListener('click', () => {
  students.sort((a, b) => a.gender.localeCompare(b.gender));
  renderStudents(students);
});
