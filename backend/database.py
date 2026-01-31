

import sqlite3

conn = sqlite3.connect("courses.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  level TEXT,
  content TEXT
)
""")

conn.commit()
