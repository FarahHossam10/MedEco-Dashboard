function filterTable() {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;
  const fromId = document.getElementById('id-from').value;
  const toId = document.getElementById('id-to').value;
  const nameVal = document.getElementById("name").value.toLowerCase();
  const warningDiv = document.getElementById('warning');

  if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
    warningDiv.style.display = "block";
    warningDiv.textContent = "From Date cannot be after To Date.";
    return;
  }

  if (fromId && toId && parseInt(fromId) > parseInt(toId)) {
    warningDiv.style.display = "block";
    warningDiv.textContent = "From ID cannot be greater than To ID.";
    return;
  }

  warningDiv.style.display = "none";
  const rows = document.querySelectorAll(".data-table-container .table tbody tr");

  rows.forEach(row => {
    const rowId = parseInt(row.cells[0].textContent.trim()); 
    const dateText = row.cells[3].textContent.trim(); 
    const dateParts = dateText.split(" "); // Assuming format is "14 Feb 2019"
    const formattedDate = new Date(`${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`);
    const rowName = row.cells[1].textContent.trim().toLowerCase();
    const fromIdNum = parseInt(fromId) || 0;
    const toIdNum = parseInt(toId) || Infinity;

    let matchesId = true;
    let matchesDate = true;
    let matchesName = true;
    if (!isNaN(rowId)) {
      matchesId = rowId >= fromIdNum && rowId <= toIdNum;
    }

    if (fromDate) {
      matchesDate = matchesDate && formattedDate >= new Date(fromDate);
    }

    if (toDate) {
      matchesDate = matchesDate && formattedDate <= new Date(toDate);
    }

    if(nameVal){
      matchesName = rowName.includes(nameVal);
    }

    row.style.display = (matchesId && matchesDate && matchesName) ? '' : 'none';
  });
}


function resetFilter() {
  document.getElementById('date-from').value = "";
  document.getElementById('date-to').value = "";
  document.getElementById('id-from').value = "";
  document.getElementById('id-to').value = "";
  document.getElementById('warning').style.display = "none";
  document.getElementById("name").value = "";
  filterTable();
}



let dropdownFilters = document.querySelectorAll(".dropdown-filter");
dropdownFilters.forEach(filter => {
  filter.addEventListener("click", function (e) {
    e.stopPropagation();
    document.querySelectorAll(".dropdown-filter-list").forEach(list => {
        if (list !== filter.parentElement.querySelector(".dropdown-filter-list")) {
          list.style.display = "none";
        }
      });
    let dropdownList = filter.parentElement.querySelector(".dropdown-filter-list");
    if(dropdownList){
      dropdownList.style.display = (dropdownList.style.display == "block")? "none" : "block";
    }
  })
})


document.addEventListener("click", function (e) {
  // Check if the clicked element is inside a .dropdown-filter or .dropdown-filter-list
  if (!e.target.closest('.dropdown-filter') && !e.target.closest('.dropdown-filter-list')) {
    document.querySelectorAll(".dropdown-filter-list").forEach(list => {
      list.style.display = "none";
    });
  }
});

const filterContainerInputs = document.querySelector('.filter-container').querySelectorAll("input");
console.log(filterContainerInputs)
filterContainerInputs.forEach(input => {
  input.addEventListener('input', filterTable);
  input.addEventListener('change', filterTable);
})


