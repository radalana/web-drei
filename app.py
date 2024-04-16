from flask import Flask, render_template
import sqlite3

app = Flask(__name__)
#flask --app app run --port 8000 server startet
@app.get("/")
def customers():
    conn = sqlite3.connect('customer_data.db')
    cursor = conn.cursor()

    # Получение данных из базы данных
    cursor.execute('SELECT "Last Name" as Surname, Company, Country FROM customers')
    customers = cursor.fetchall()

    # Преобразование данных в список словарей для JSON ответа
    columns = [column[0] for column in cursor.description]
    customers = [dict(zip(columns, customer)) for customer in customers]

    #for filter by country
    countries = sorted(set([customer['Country'] for customer in customers]))
    conn.close()
    return render_template('index.html', customers=customers, countries=countries)

if __name__ == "__main__":
  app.run()

