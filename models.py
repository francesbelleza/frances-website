# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Post(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(255), nullable=False)
    body        = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=db.func.current_timestamp())


