# Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
# SoftDev
# P02 -- Run for Your Life
# 2022-03-06

from os import urandom
from flask import Flask, render_template, request, session, redirect, url_for
import random
import sqlite3
from database import *

app = Flask(__name__)
app.secret_key = urandom(32)

DB_FILE = "discobandit.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

@app.route("/")
def hello_world():
    return render_template('game.html', msg="I don't speak cheese!")

@app.route("/auth", methods=['GET', 'POST'])
def authenticate():
    ''' Checks whether method is get, post. If get method, then redirect to
       loginpage. If post, then authenticate the username and password, rendering
       the error page if incorrect and the response.html if correct username/pass. '''

    # Variables
    method = request.method
    username = request.form.get('username')
    password = request.form.get('password')
    # Get vs Post
    if method == 'GET':
        return redirect(url_for('hello_world'))

    auth_state = auth_user(username, password)
    if auth_state == True:
        session['username'] = username
        return redirect(url_for('hello_world'))
    elif auth_state == "bad_pass":
        return render_template('login.html', input="bad_pass")
    elif auth_state == "bad_user":
        return render_template('login.html', input="bad_user")


@app.route("/register")
def register():
    ''' Displays register page '''

    return render_template('register.html')


@app.route("/login")
def login():
    ''' Displays login page '''

    return render_template('login.html')


@app.route("/rAuth", methods=['GET', 'POST'])
def rAuthenticate():
    ''' Authentication of username and passwords given in register page from user '''

    method = request.method
    username = request.form.get('username')
    password0 = request.form.get('password0')
    password1 = request.form.get('password1')

    if method == 'GET':
        return redirect(url_for('register'))

    if method == 'POST':
        # error when no username is inputted
        if len(username) == 0:
            return render_template('register.html', given="username")
        # error when no password is inputted
        elif len(password0) == 0:
            return render_template('register.html', given="password")
        # elif len(password0) < 8:
        #     return render_template('register.html', given="password greater than 8 characters")
        # # a username and password is inputted
        # # a username and password is inputted
        else:
            # if the 2 passwords given don't match, will display error saying so
            if password0 != password1:
                return render_template('register.html', mismatch=True)
            else:
                # creates user account b/c no fails
                if create_user(username, password0):
                    return render_template('login.html', input='success')
                # does not create account because create_user failed (username is taken)
                else:
                    return render_template('register.html', taken=True)


@app.route("/logout")
def logout():
    ''' Logout user by deleting user from session dict. Redirects to loginpage '''
    # Delete user. This try... except... block prevent an error from ocurring when the logout page is accessed from the login page
    try:
        session.pop('username')
    except KeyError:
        return redirect(url_for('hello_world'))
    # Redirect to login page
    return redirect(url_for('hello_world'))


@app.route("/leaderboard")
def leaderboard():
    pass

@app.route("/store")
def store():
    powerups = []
    query = "SELECT item FROM store WHERE item_type = 'powerup;'"
    c.execute(query)
    rows = c.fetchall()
    for row in rows:
        powerups.append(row[0])
    return render_template('store.html', powerups = powerups)

@app.route("/profile")
def profile():
    return render_template('profile.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
