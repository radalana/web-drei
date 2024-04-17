# Web Application Customers 
#### Customers Dashboard App 
web skill test Drei Österreich 2024 

### Description
Customers Dashboard App is a web-based application designed to interactively manage and display customer sales data. It uses a SQLite database to store customer information and sales figures for 2021 and 2022. The application provides dynamic sorting, filtering, and visual presentation of sales data through pie charts and line graphs, enabling users to effectively analyze sales trends and customer engagement.

### Preview
![Screenshot of Customer Sales Application interface showing a detailed view of a selected customer. The left side of the screen lists customer attributes such as Name, Surname, Company, Country, City, sales figures for 2021 and 2022, contact numbers, email, subscription date, and website. The right side displays two pie charts: the first showing the sales distribution for 2021 and the second for 2022, with the selected company's sales highlighted against others.](company_view.png)

![Screenshot showing the list view of a customer management web application with options to sort by country or company name. Two buttons, 'sort by country' and 'sort by company', are visible at the top, with an 'Apply' button next to a dropdown menu titled 'Choose the country'. Below, a two-column table displays company names on the left and corresponding countries on the right, ranging from Albania to Austria, indicating a multi-national client base](list_view.png)
### Features

- Sort alphabetically by country or company name
- Filter by country
- View additional information, including contact pie and line charts for 2021-2022

#### Technologies used

- **Backend**
- Python 3.10.2
- Flask 
- SQLlite
- pandas
- **Frontend**
- JavaScript
- Chart.js
- HTML/CSS(Bootstrap)
- **Tools**
- pytest
- git

### Getting Started
#### Installation
1. Clone the repository:
```sh
git clone git@github.com:radalana/web-drei.git
```
2. Install the required Python packages:
```sh
pip install flask sqlite3
```
```sh
pip install pytest
```
```sh
pip install pandas
```
3. Run
```sh
python app.py
```
#### Testing
```sh
make test
```
