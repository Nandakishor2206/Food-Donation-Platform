import sqlite3
import os
from flask import g

DATABASE = 'food_donation.db'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    """Initialize the database with schema"""
    with open('schema.sql', 'r') as f:
        schema = f.read()
    
    db = sqlite3.connect(DATABASE)
    db.executescript(schema)
    db.close()