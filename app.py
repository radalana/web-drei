from flask import Flask, jsonify
import pandas as pd
import sqlite3
from flask_cors import CORS

# Создаем экземпляр Flask только один раз
app = Flask(__name__)
CORS(app)  # Включаем CORS для всего приложения

# Инициализация базы данных и загрузка данных из CSV
def init_db():
    # Чтение данных из CSV с указанием разделителя
    df = pd.read_csv('customers_sales_2021_2022.csv', delimiter=';')
    
    # Подключение к базе данных SQLite
    with sqlite3.connect('customer_data.db') as conn:
        df.to_sql('customers', conn, if_exists='replace', index=False)

@app.route('/')
def index():
    # Возвращаем HTML страницу из папки static
    return app.send_from_directory('static', 'index.html')

@app.route('/get_customers', methods=['GET'])
def get_customers():
    # Получение данных о клиентах из базы данных
    with sqlite3.connect('customer_data.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM customers")
        customers = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, customer)) for customer in customers]
    return jsonify(result)

if __name__ == '__main__':
    init_db()  # Инициализация базы данных при старте приложения
    app.run(debug=True)
