import sqlite3

DB_FILE = "discobandit.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

def create_db():
    ''' Creates / Connects to DB File '''

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("CREATE TABLE IF NOT EXISTS users (usernames TEXT, passwords TEXT, score INTEGER, coins INTEGER);")
    c.execute("CREATE TABLE IF NOT EXISTS items (player TEXT, item_type TEXT, item_owned TEXT);")
    c.execute("CREATE TABLE IF NOT EXISTS store (item TEXT, item_type TEXT, price INTEGER, UNIQUE(item));")


    db.close()


def auth_user(username, password):
    ''' Validates a username + password when person logs in '''

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    # Create List of Users
    c.execute("SELECT usernames FROM users")
    users = []
    for a_tuple in c.fetchall():
        users.append(a_tuple[0])

    if username in users:
        c.execute("SELECT passwords FROM users WHERE usernames = '" + username + "'")
        if c.fetchall()[0][0] == password:
            return True
        else:
            return "bad_pass"
    else:
        return "bad_user"


def create_user(username, password, score, coins):
    ''' Adds user to database if right username and password are given when a
        person registers '''

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    # Create List of Users
    c.execute("SELECT usernames FROM users")
    users = []
    for a_tuple in c.fetchall():
        users.append(a_tuple[0])

    # username is not taken, creates account with given username and password
    if username in users:
        return False
    else:
        c.execute("INSERT INTO users VALUES (?, ?, ?, ?);", (username, password, score,coins))
        db.commit()
        return True


def updateScore(value, user):
    '''
    Update the score value of the user
    '''
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("UPDATE users SET score = (?) WHERE usernames = (?);",(value, user))
    db.commit()


def updateCoins(value, user):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("UPDATE users SET coins = (?) WHERE usernames = (?);",(value, user))
    db.commit()

def getCoins(user):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("SELECT coins FROM users WHERE usernames = (?);",(user))
    d = c.fetchall()[0][0]
    return d

def cost(powerup):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("SELECT price FROM store WHERE item = (?);",(powerup))
    return c.fetchall()[0][0]

def insert_item(user, itemType, item):
    '''Adds item type and item to database.'''

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("INSERT INTO items VALUES (?, ?, ?);", (user, itemType, item))
    db.commit()

def restock_store():
    '''Adds initial items to the store.'''
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("MAGNET", "powerup", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("SLOW", "powerup", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("REVIVAL", "powerup", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("COIN_DOUBLER", "powerup", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("INVINCIBILITY", "powerup", 500))

    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("S1", "skin", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ("S2", "skin", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ('S3', "skin", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ('S4', "skin", 500))
    c.execute("INSERT OR IGNORE INTO store VALUES (?, ?, ?);", ('S5', "skin", 500))

    db.commit()

def get_stuff(user, type):
    '''Gets list of items the user owns. Takes a username and an item type.'''
    items = []
    query = "SELECT item_owned FROM items WHERE player = \'" + user + "\' AND item_type = \'" + type +"\';"
    c.execute(query)
    rows = c.fetchall()
    for row in rows:
        items.append(row[0])
    return items

def get_store_stuff(type):
    '''Gets list of items in the store. Takes an item type.'''
    items = []
    query = "SELECT item FROM store WHERE item_type = \'" + type +"\';"
    c.execute(query)
    rows = c.fetchall()
    for row in rows:
        items.append(row[0])
    return items

def get_usr_info(user, selector):
    '''Gets a user's password, high score, or coin count from the database.
    Takes a username and the selector'''
    info = []
    query = "SELECT \'" + selector + "\' FROM users WHERE usernames = \'" + user +"\';"
    c.execute(query)
    rows = c.fetchall()
    for row in rows:
        info.append(row[0])
    return info[0]

create_db()
restock_store()
