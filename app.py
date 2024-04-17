from flask import Flask, render_template, request, redirect
import pandas as pd
import sqlite3

def get_customers_data():
  conn = sqlite3.connect('customer_data.db')
  cursor = conn.cursor()

    #LIMIT 100 for tests! delete!!!
  cursor.execute('SELECT "Customer id" as id, "First Name" as Name, "Last Name" as Surname, Company, Country, City, "SALES 2021" as sales21, "Sales 2022" as sales22, "Phone 1", "Phone 2", Email, "Subscriprion Date", Website FROM customers LIMIT 50')
  customers = cursor.fetchall()
    
  conn.close()
  columns = [column[0] for column in cursor.description]
  customers = [dict(zip(columns, customer)) for customer in customers]
  return customers

app = Flask(__name__)
customers = get_customers_data()
@app.route('/')
def home():
    return redirect('/customers/')

@app.get("/customers/")
def index():
    sortBy = request.args.get('sortBy')
    sortedCustomers = customers
    if sortBy is not None:
        sortedCustomers.sort(key=lambda x: x.get(sortBy, ''))
    #for filter by country
    countries = sorted(set([customer['Country'] for customer in customers]))
    return render_template('index.html', customers=sortedCustomers, countries=countries, sorted=sortBy)


@app.get("/customers/<id>")
def showCustomer(id):
   df_customers = pd.DataFrame(customers)
   df_customers.set_index('id', inplace=True)
   customer = df_customers.loc[id] if id in df_customers.index else None
   total_sales_2021 = sum(customer['sales21'] for customer in customers if customer['sales21'] is not None)
   total_sales_2022 = sum(customer['sales22'] for customer in customers if customer['sales22'] is not None)
   return render_template('show.html', id=id, customer=customer, total_sales_2021=total_sales_2021, total_sales_2022=total_sales_2022)
if __name__ == "__main__":
  app.run()

