function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  modal.classList.add("active");
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  modal.classList.remove("active");
}

function openUpdateModal() {
  document.getElementById("updateModal").style.display = "block";
}

function closeUpdateModal() {
  document.getElementById("updateModal").style.display = "none";
}

function openViewModal() {
  document.getElementById("viewModal").style.display = "block";
}

function closeViewModal() {
  document.getElementById("viewModal").style.display = "none";
}

// Add Employee function
function addEmployee() {
  var table = document
    .getElementById("employeeTable")
    .getElementsByTagName("tbody")[0];
  var row = table.insertRow();
  var id = Date.now();
  row.setAttribute("data-id", id);

  var nameCell = row.insertCell(0);
  var positionCell = row.insertCell(1);
  var genderCell = row.insertCell(2);
  var payCell = row.insertCell(3);
  var fullTimeCell = row.insertCell(4);
  var photoCell = row.insertCell(5);
  var actionsCell = row.insertCell(6);

  nameCell.innerHTML = document.getElementById("name").value;
  positionCell.innerHTML = document.getElementById("position").value;
  genderCell.innerHTML = document.querySelector(
    'input[name="gender"]:checked'
  ).value;

  payCell.innerHTML = "₱" + document.getElementById("pay").value;

  var fullTimeStatus = document.getElementById("fullTime").checked
    ? "Yes"
    : "No";
  fullTimeCell.innerHTML = fullTimeStatus;

  photoCell.innerHTML =
    '<img src="' +
    document.getElementById("photo").value +
    '" class="employee-image" alt="Employee Photo">';

  actionsCell.innerHTML =
    "<button onclick=\"addToPromotionList('" +
    nameCell.innerHTML +
    "', '" +
    positionCell.innerHTML +
    "', '" +
    genderCell.innerHTML +
    "', '" +
    payCell.innerHTML +
    "', '" +
    fullTimeStatus +
    "', " +
    id +
    ')">Add to Promotion</button>' +
    ' <button onclick="deleteEmployee(this, ' +
    id +
    ')">Delete</button>' +
    ' <button onclick="viewEmployee(this, ' +
    id +
    ')">View</button>' +
    ' <button onclick="populateUpdateForm(this, ' +
    id +
    ')">Update</button>';

  closeModal();
  return false;
}

function deleteEmployee(button) {
  var row = button.parentNode.parentNode;
  var id = row.getAttribute("data-id");

  row.parentNode.removeChild(row);

  var promotionTable = document.getElementById("promotionTable");
  var promotionRows = promotionTable.getElementsByTagName("tr");

  for (var i = 0; i < promotionRows.length; i++) {
    var promotionRowId = promotionRows[i].getAttribute("data-id");
    if (promotionRowId && parseInt(promotionRowId) === parseInt(id)) {
      promotionRows[i].parentNode.removeChild(promotionRows[i]);
      break;
    }
  }
}

function addToPromotionList(name, position, gender, pay, id) {
  var promotionTable = document.getElementById("promotionTable");
  var rows = promotionTable.getElementsByTagName("tr");
  var exists = false;

  for (var i = 0; i < rows.length; i++) {
    var rowId = rows[i].getAttribute("data-id");
    if (rowId && parseInt(rowId) === id) {
      exists = true;
      break;
    }
  }

  if (!exists) {
    var table = document
      .getElementById("promotionTable")
      .getElementsByTagName("tbody")[0];
    var row = table.insertRow();

    var nameCell = row.insertCell(0);
    var positionCell = row.insertCell(1);
    var genderCell = row.insertCell(2);
    var payCell = row.insertCell(3);

    nameCell.innerHTML = name;
    positionCell.innerHTML = position;
    genderCell.innerHTML = gender;
    payCell.innerHTML = pay;

    row.setAttribute("data-id", id);

    alert("Employee added to promotion list");
  } else {
    alert("Employee is already in the promotion list");
  }
}

function viewEmployee(button) {
  var row = button.parentNode.parentNode;
  var id = row.getAttribute("data-id");
  var name = row.cells[0].innerHTML;
  var position = row.cells[1].innerHTML;
  var gender = row.cells[2].innerHTML;
  var pay = row.cells[3].innerHTML;
  var photo = row.cells[5].getElementsByTagName("img")[0].src;

  var profileDiv = document.getElementById("employeeProfile");
  profileDiv.innerHTML =
    '<img src="' +
    photo +
    '" class="employee-image" alt="Employee Photo" style = "border-radius: 25px;">' +
    "<p><strong>Name:</strong> " +
    name +
    "</p>" +
    "<p><strong>Position:</strong> " +
    position +
    "</p>" +
    "<p><strong>Gender:</strong> " +
    gender +
    "</p>" +
    "<p><strong>Pay:</strong> " +
    pay +
    "</p>";
  openViewModal();
}

function populateUpdateForm(button) {
  var row = button.parentNode.parentNode;
  var id = row.getAttribute("data-id");
  var name = row.cells[0].innerHTML;
  var position = row.cells[1].innerHTML;
  var gender = row.cells[2].innerHTML;
  var pay = row.cells[3].innerHTML.substring(1);
  var photo = row.cells[5].getElementsByTagName("img")[0].src;

  document.getElementById("updateId").value = id;
  document.getElementById("updateName").value = name;
  document.getElementById("updatePosition").value = position;
  document.getElementById("updatePay").value = pay;
  document.getElementById("updatePhoto").value = photo;

  if (gender === "Male") {
    document.getElementById("updateMale").checked = true;
  } else {
    document.getElementById("updateFemale").checked = true;
  }

  openUpdateModal();
}

function searchEmployee() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function updateEmployee() {
  var form = document.getElementById("updateEmployeeForm");

  var id = form.elements["id"].value;
  var name = form.elements["name"].value;
  var position = form.elements["position"].value;
  var gender = form.elements["gender"].value;
  var pay = form.elements["pay"].value;
  var fullTime = form.elements["fullTime"].checked ? "Yes" : "No";
  var photo = form.elements["photo"].value;

  var row = document.querySelector('tr[data-id="' + id + '"]');

  if (row) {
    row.cells[0].innerHTML = name;
    row.cells[1].innerHTML = position;
    row.cells[2].innerHTML = gender;
    row.cells[3].innerHTML = "₱" + pay;
    row.cells[4].innerHTML = fullTime;
    row.cells[5].innerHTML =
      '<img src="' + photo + '" class="employee-image" alt="Employee Photo">';

    var promotionTable = document.getElementById("promotionTable");
    var promotionRows = promotionTable.getElementsByTagName("tr");

    for (var i = 0; i < promotionRows.length; i++) {
      var promotionRowId = promotionRows[i].getAttribute("data-id");
      if (promotionRowId && parseInt(promotionRowId) === parseInt(id)) {
        promotionRows[i].cells[0].innerHTML = name;
        promotionRows[i].cells[1].innerHTML = position;
        promotionRows[i].cells[2].innerHTML = gender;
        promotionRows[i].cells[3].innerHTML = "₱" + pay;
        break;
      }
    }

    alert("Employee updated successfully!");

    closeUpdateModal();
  } else {
    alert("Employee ID not found!");
  }

  return false;
}

function filterEmployee() {
  var positionFilter, genderFilter, table, tr, position, gender, i;
  positionFilter = document
    .getElementById("filterPosition")
    .value.toUpperCase();
  genderFilter = document.getElementById("filterGender").value.toUpperCase();
  table = document.getElementById("employeeTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    position = tr[i].getElementsByTagName("td")[1];
    gender = tr[i].getElementsByTagName("td")[2];
    if (position && gender) {
      if (
        (position.textContent.toUpperCase().indexOf(positionFilter) > -1 ||
          positionFilter === "") &&
        (gender.textContent.toUpperCase().indexOf(genderFilter) > -1 ||
          genderFilter === "")
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
