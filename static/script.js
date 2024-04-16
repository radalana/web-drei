const sortBtn = document.getElementById("sort");
const sortByLastName = (customers) => {
    customers.sort((customA, customB) => {
        if (customA.Surname < customB.Surname) {
            return -1; 
        } else if (customA.Surname > customB.Surname) {
            return 1; 
        } else {
            return 0; 
        }
        
    });
}
const updateTable = (customList) => {
    const tableBodyEl = document.getElementById('list');
    let newContent = '';
    customList.forEach(custom => {
        const {id, Surname, Company, Country} = custom;
        const rowConstext = `<tr><td>${Surname}</td><td>${Company}</td><td>${Country}</td>`;
        //fix!!! modal after sorting and filtering!
        const modalPieCharContext = `<td><button type="button" data-bs-toggle="modal" data-bs-target="#Modal_${id}">show pie chart</button></td></tr>`;
        const row = rowConstext + modalPieCharContext;
        newContent+=(row);
   });
   tableBodyEl.innerHTML = newContent;
}


sortBtn.addEventListener('click', () => {
    sortByLastName(customersData);
    updateTable(customersData);
  
});


const selectEl = document.getElementById('filter');
selectEl.addEventListener('input', (event) => {
    const selectedCountry = event.target.value;
    const filteredCustomers = customersData.filter((customer) => customer.Country === selectedCountry);
    updateTable(filteredCustomers);
});