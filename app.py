from flask import Flask, render_template
import sqlite3

app = Flask(__name__)
#flask --app app run --port 8000 server startet
@app.get("/")
def customers():
    conn = sqlite3.connect('customer_data.db')
    cursor = conn.cursor()

    #LIMIT 100 for tests! delete!!!
    cursor.execute('SELECT "Customer id" as id, "Last Name" as Surname, Company, Country, "SALES 2021" as sales21, "Sales 2022" as sales22 FROM customers LIMIT 50')
    customers = cursor.fetchall()
    
    conn.close()
    columns = [column[0] for column in cursor.description]
    customers = [dict(zip(columns, customer)) for customer in customers]

    #for filter by country
    countries = sorted(set([customer['Country'] for customer in customers]))

    total_sales_2021 = sum(customer['sales21'] for customer in customers if customer['sales21'] is not None)
    total_sales_2022 = sum(customer['sales22'] for customer in customers if customer['sales22'] is not None)

    
    
    return render_template('index.html', customers=customers, countries=countries, total_sales_2021=total_sales_2021, total_sales_2022=total_sales_2022)

if __name__ == "__main__":
  app.run()

