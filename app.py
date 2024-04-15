from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)
#flask --app app run --port 8000 server startet
@app.get("/customers")
def index():
    conn = sqlite3.connect('customer_data.db')
    cursor = conn.cursor()

    # Получение данных из базы данных
    cursor.execute("SELECT \"Last Name\", Company, Country FROM customers")
    customers = cursor.fetchall()
    print(customers)

    # Преобразование данных в список словарей для JSON ответа
    columns = [column[0] for column in cursor.description]
    result = [dict(zip(columns, customer)) for customer in customers]

    conn.close()
    return render_template('index.html', list=result)


if __name__ == "__main__":
  app.run()