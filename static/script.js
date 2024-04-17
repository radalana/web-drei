const sortBtn = document.getElementById("sort");
const sortByCompanyName = (customers) => {
    customers.sort((customA, customB) => {
        if (customA.Company < customB.Company) {
            return -1; 
        } else if (customA.Company > customB.Company) {
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
        const {id, Company, Country} = custom;
        const rowConstext = `<tr><td><a href="/customers/${id}">${Company}</a></td><td>${Country}</td>`;
        //fix!!! modal after sorting and filtering!
        newContent+=(rowConstext);
   });
   tableBodyEl.innerHTML = newContent;
}

const selectEl = document.getElementById('filter');
selectEl.addEventListener('input', (event) => {
    const selectedCountry = event.target.value;
    const filteredCustomers = customersData.filter((customer) => customer.Country === selectedCountry);
    updateTable(filteredCustomers);
});