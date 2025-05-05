from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
from models import Post

@app.route('/')
def home():
    featured_projects = [
        {
            'title': 'My First Game Demo',
            'description': 'A Frieren-style puzzle.',
            'link': url_for('home')
        }
    ]
    return render_template('home.html',
                           title='Home',
                           featured_projects=featured_projects)

@app.route('/blog')
def blog():
    # later you’ll pull real posts from your DB
    return render_template('blog.html', title='Blog', posts=[])

@app.route('/portfolio')
def portfolio():
    # later: pull real projects
    return render_template('portfolio.html', title='Portfolio', projects=[])

@app.route('/contact')
def contact():
    return render_template('contact.html', title='Contact')

if __name__ == '__main__':
    app.run(debug=True)
