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
sortBtn.addEventListener('click', () => {
    sortByLastName(customersData);
    const rows = document.querySelectorAll('#list > tr');

   const tableBodyEl = document.getElementById('list');
   let sortTableContent = '';
   customersData.forEach(custom => {
        const {Surname, Company, Country} = custom;
        const rowConstext = `<tr><td>${Surname}</td><td>${Company}</td><td>${Country}</td></tr>`;
        sortTableContent+=rowConstext;
   });
   tableBodyEl.innerHTML = sortTableContent;
   
});
    const selectEl = document.getElementById('filter');
    
selectEl.addEventListener('input', (event) => {
    const selectedCountry = event.target.value;
    const filteredCustomers = customersData.filter((customer) => customer.Country === selectedCountry);

    const tableBodyEl = document.getElementById('list');
    let filteredContent = '';
    filteredCustomers.forEach(custom => {
        const {Surname, Company, Country} = custom;
        const rowConstext = `<tr><td>${Surname}</td><td>${Company}</td><td>${Country}</td></tr>`;
        filteredContent+=rowConstext;
   });
   tableBodyEl.innerHTML = filteredContent;
});