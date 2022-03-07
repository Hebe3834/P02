# Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
# SoftDev
# P02 -- Run for Your Life
# 2022-03-06

from os import urandom
from flask import Flask, render_template, request, session, redirect, url_for
import random
import sqlite3

app = Flask(__name__)
app.secret_key = urandom(32)

@app.route("/")
def hello_world():
    return render_template('game.html', msg="I don't speak cheese!")

@app.route("/login")
def login():
    pass

@app.route("/register")
def register():
    pass

@app.route("/create")
def create():
    pass

@app.route("/leaderboard")
def leaderboard():
    pass

@app.route("/store")
def store():
    pass

@app.route("/profile")
def profile():
    pass

if __name__ == "__main__":
    app.debug = True
    app.run()
