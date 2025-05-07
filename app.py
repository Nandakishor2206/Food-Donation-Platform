from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3
import os
from database import init_db, get_db

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Initialize database
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user_type = request.form['user_type']
        
        db = get_db()
        cursor = db.cursor()
        
        if user_type == 'user':
            cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
        else:
            cursor.execute("SELECT * FROM ngos WHERE email = ? AND password = ?", (email, password))
            
        user = cursor.fetchone()
        
        if user:
            session['logged_in'] = True
            session['email'] = email
            session['user_type'] = user_type
            session['name'] = user[1]  # Assuming name is at index 1
            
            if user_type == 'user':
                return redirect(url_for('user_dashboard'))
            else:
                return redirect(url_for('ngo_dashboard'))
        else:
            flash('Invalid login credentials')
            
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        user_type = request.form['user_type']
        
        db = get_db()
        cursor = db.cursor()
        
        try:
            if user_type == 'user':
                cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                            (name, email, password))
            else:
                cursor.execute("INSERT INTO ngos (name, email, password) VALUES (?, ?, ?)", 
                            (name, email, password))
                
            db.commit()
            flash('Registration successful! Please login.')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Email already exists!')
            
    return render_template('signup.html')

@app.route('/user_dashboard')
def user_dashboard():
    if not session.get('logged_in') or session.get('user_type') != 'user':
        return redirect(url_for('login'))
    
    return render_template('user_dashboard.html', name=session.get('name'))

@app.route('/donate_food', methods=['GET', 'POST'])
def donate_food():
    if not session.get('logged_in') or session.get('user_type') != 'user':
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        food_name = request.form['food_name']
        quantity = request.form['quantity']
        location = request.form['location']
        mobile = request.form['mobile']
        
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute("""
            INSERT INTO donations (user_email, food_name, quantity, location, mobile, status)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (session.get('email'), food_name, quantity, location, mobile, 'pending'))
        
        db.commit()
        flash('Thank you for donating food! Our volunteers will shortly collect your food.')
        return redirect(url_for('user_dashboard'))
    
    return render_template('donate_food.html')

@app.route('/ngo_dashboard')
def ngo_dashboard():
    if not session.get('logged_in') or session.get('user_type') != 'ngo':
        return redirect(url_for('login'))
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("""
        SELECT d.id, u.name, d.food_name, d.quantity, d.location, d.mobile, d.status
        FROM donations d
        JOIN users u ON d.user_email = u.email
        WHERE d.status = 'pending'
    """)
    
    donations = cursor.fetchall()
    
    return render_template('ngo_dashboard.html', donations=donations, name=session.get('name'))

@app.route('/accept_donation/<int:donation_id>')
def accept_donation(donation_id):
    if not session.get('logged_in') or session.get('user_type') != 'ngo':
        return redirect(url_for('login'))
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("UPDATE donations SET status = 'accepted', ngo_email = ? WHERE id = ?", 
                (session.get('email'), donation_id))
    
    db.commit()
    flash('Donation accepted! You can now collect the food.')
    
    return redirect(url_for('ngo_dashboard'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=10000)
