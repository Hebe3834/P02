# Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
# SoftDev
# P02 -- Run for Your Life
# 2022-03-06

from os import urandom
from turtle import update
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
    '''Displays the main game'''
    userHighScore = 0
    userCoins = 0
    powers = []
    skins = []
    if 'username' in session:
        user = session["username"]
        userHighScore = getScore(user)
        userCoins = getCoins(user)
        try:
            userSkin = get_stuff(user, 'skin')[0]
        except:
            userSkin = "Default"
        powers = get_stuff(user, 'powerup')
        skins = get_stuff(user, 'skin')
        return render_template('game.html', coins= userCoins, user = user, high = userHighScore, skin = userSkin, powers=powers, skins=skins, shortcut=get_shortcuts(powers))
    return render_template('game.html')

def get_shortcuts(powers):
    '''Returns a list of shortcuts based on powerups list'''
    all_keys = {}
    all_keys['INVINCIBILITY'] = 1
    all_keys['COIN_DOUBLER'] = 2
    all_keys['MAGNET'] = 3
    all_keys['REVIVAL'] = 'passive'
    sel_keys = []
    for p in powers:
        sel_keys.append(all_keys[p])
    return sel_keys

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
        high_score = getScore(username)
        return redirect("/")
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

def demo():
    create_user("Demo", "superDemo123", 0, 10000)

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
                if create_user(username, password0, 0, 500):
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
    leaderboard = get_leaderboard()
    return render_template('leaderboard.html', sortedUsers = leaderboard)


@app.route("/store")
def store():
    '''Displays the store page where users can buy powerups and skins'''
    powerups = get_store_stuff("powerup")
    power_prices = get_store_price(powerups)
    skins = get_store_stuff("skin")
    skin_prices = get_store_price(skins)
    userCoins = getCoins(session['username'])
    return render_template('store.html',  coins= userCoins,powerups = powerups, power_prices=power_prices, skins = skins, skin_prices=skin_prices)


@app.route("/power", methods=['GET', 'POST'])
def buyPower():
    '''Adds powerup that user selected from the store to user db then redirects to user profile page'''
    power = request.form['powerups']
    powerups = get_store_stuff("powerup")
    skins = get_store_stuff("skin")
    if (getCoins(session['username']) >= 500):
        updateCoins((getCoins(session['username']) - cost(power)), session['username'])
        insert_item(session['username'], "powerup", power)
    else:
        return render_template('store.html', powerups = powerups, skins = skins, msg='You are too poor!')
    return redirect("/profile")
        


@app.route("/skin", methods=['GET', 'POST'])
def buySkin():
    '''Adds skin that user selected from the store to user db then redirects to user profile page'''
    skin = request.form['skins']
    powerups = get_store_stuff("powerup")
    skins = get_store_stuff("skin")
    if (getCoins(session['username']) >= 500):
        updateCoins((getCoins(session['username']) - cost(skin)), session['username'])
        insert_item(session['username'], "skin", skin)
        print('bought successfully')
    else:
        return render_template('store.html', powerups = powerups, skins = skins, msg='You are too poor!')
    return redirect("/profile")


@app.route("/profile")
def profile():
    '''Displays user profile page with all the items owned'''
    user = session['username']
    powerups = get_stuff(user,'powerup')
    skins = get_stuff(user,'skin')
    print(skins)
    return render_template('profile.html', powerups = powerups, skins = skins)


@app.route("/game_results", methods=['GET', 'POST'])
def results():
    '''Displays results of game after losing and updates user account info'''
    score = int(request.form.get('score'))
    coins = int(request.form.get('coins'))
    dist_from_hi = 0
    if "username" in session:
        user = session["username"]
        prev_score = getScore(user)
        prev_coins = getCoins(user)
        if score > prev_score:
            updateScore(score, user)
        else:
            dist_from_hi = prev_score - score
        updateCoins(prev_coins+coins, user)
    leaderboard = get_leaderboard()
    return render_template('results.html', score=score, dist_from_hi=dist_from_hi, coins=coins, sortedUsers=leaderboard)


if __name__ == "__main__":
    app.debug = True
    demo()
    app.run()
