function fetchTeam() {
    let container = document.getElementById('tableContainer')
    let status = document.getElementById('status')
    let btn = document.getElementById('fetchBtn')

    container.innerHTML = ''
    status.textContent = 'Fetching...'
    btn.disabled = true

    fetch('http://localhost:4000/api/team')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status)
            }
            return response.json()
        })
        .then(function (members) {
            status.textContent = 'Loaded ' + members.length + ' team members'
            btn.textContent = 'Refresh'
            btn.disabled = false

            let table = document.createElement('table')
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                    </tr>
                </thead>
            `

            let tbody = document.createElement('tbody')
            for (let i = 0; i < members.length; i++) {
                let row = document.createElement('tr')
                row.innerHTML = `
                    <td>${members[i].id}</td>
                    <td><strong>${members[i].name}</strong></td>
                    <td>${members[i].role}</td>
                    <td><span class="dept-badge dept-${members[i].department}">${members[i].department}</span></td>
                `
                tbody.appendChild(row)
            }

            table.appendChild(tbody)
            container.appendChild(table)
        })
        .catch(function (err) {
            status.textContent = 'Error: ' + err.message + ' — Make sure the server is running (npm start)'
            btn.disabled = false
        })
}
