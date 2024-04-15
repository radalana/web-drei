import pandas as pd
import sqlite3

# Чтение данных из CSV
df = pd.read_csv('customer_sales_2021_2022.csv')

# Подключение к базе данных SQLite
conn = sqlite3.connect('customer_data.db')

# Создание таблицы и импорт данных из DataFrame в SQLite
df.to_sql('customers', conn, if_exists='replace', index=False)

# Закрытие соединения с базой данных
conn.close()