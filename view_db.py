import sqlite3

# ✅ Step 1: Replace with your actual .db filename
conn = sqlite3.connect('food_donation.db')  # Make sure this file exists in the same folder
cursor = conn.cursor()

# ✅ Step 2: Get all table names
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

if not tables:
    print("❌ No tables found in the database.")
else:
    print("📋 Tables in the database:")
    for table in tables:
        print("-", table[0])

    # ✅ Step 3: Show rows from each table
    for table in tables:
        print(f"\n🔍 Data from table: {table[0]}")
        cursor.execute(f"SELECT * FROM {table[0]}")
        rows = cursor.fetchall()

        if rows:
            for row in rows:
                print(row)
        else:
            print("   (No data in this table)")

conn.close()
