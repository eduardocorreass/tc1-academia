function addStudent() {
    const name = document.getElementById("name").value
    const age = document.getElementById("age").value
    const address = document.getElementById("address").value
    const email = document.getElementById("email").value

    if (!validateName(name)) {
        alert("Por favor, insira um nome válido.")
        return
    }

    if (!validateAge(age)) {
        alert("Por favor, insira uma idade válida entre 1 e 100.")
        return
    }

    if (!validateAddress(address)) {
        alert("Por favor, insira um endereço válido.")
        return
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um endereço de email válido.")
        return
    }

    const student = {
        name,
        age,
        address,
        email
    }

    const students = JSON.parse(localStorage.getItem("students")) || []

    students.push(student)

    localStorage.setItem("students", JSON.stringify(students))

    alert("Aluno cadastrado com sucesso!")
}

function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem("students")) || []
    if (index >= 0 && index < students.length) {
        students.splice(index, 1)
        localStorage.setItem("students", JSON.stringify(students))
        alert("Aluno excluído com sucesso!")
        listStudents()
    } else {
        alert("Índice inválido. Por favor, selecione um aluno válido para excluir.")
    }
}

function listStudents() {
    const studentsData = JSON.parse(localStorage.getItem('students'))
    const tableBody = document.querySelector('tbody')

    tableBody.innerHTML = ''

    if (studentsData && studentsData.length > 0) {
        studentsData.forEach((student, index) => {
            const row = document.createElement('tr')
            row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.address}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-primary" onclick="openEditModal(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteStudent(${index})">Excluir</button>
            </td>
            `
            tableBody.appendChild(row)
        })
    }
}

function openEditModal(index){
    const studentsData = JSON.parse(localStorage.getItem('students'))
    if (studentsData && studentsData.length > index) {
        const student = studentsData[index]
        document.getElementById('editIndex').value = index
        document.getElementById('editName').value = student.name
        document.getElementById('editAge').value = student.age
        document.getElementById('editAddress').value = student.address
        document.getElementById('editEmail').value = student.email
        $('#editModal').modal('show')
    }
}

function saveEditedStudent() {
    const index = document.getElementById('editIndex').value
    const name = document.getElementById('editName').value
    const age = document.getElementById('editAge').value
    const address = document.getElementById('editAddress').value
    const email = document.getElementById('editEmail').value

    if (!validateName(name)) {
        alert("Por favor, insira um nome válido.")
        return
    }

    if (!validateAge(age)) {
        alert("Por favor, insira uma idade válida entre 1 e 100.")
        return
    }

    if (!validateAddress(address)) {
        alert("Por favor, insira um endereço válido.")
        return
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um endereço de email válido.")
        return
    }

    const studentsData = JSON.parse(localStorage.getItem('students'))
    if (studentsData && studentsData.length > index) {
        studentsData[index] = { name, age, address, email }
        localStorage.setItem('students', JSON.stringify(studentsData))
        $('#editModal').modal('hide')
        alert("Aluno editado com sucesso!")
        listStudents()
    }
}

function validateName(name) {
    return name.trim() !== ''
}

function validateAge(age) {
    const ageNumber = parseInt(age, 10)
    return !isNaN(ageNumber) && ageNumber >= 1 && ageNumber <= 100
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return email.match(emailPattern)
}

function validateAddress(address) {
    return address.trim() !== ''
}

