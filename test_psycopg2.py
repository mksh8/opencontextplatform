import psycopg2
try:
    conn = psycopg2.connect("dbname=opencontext user=root password=opencontext host=localhost port=5432")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    print(cur.fetchall())
except Exception as e:
    print("Error:", e)
