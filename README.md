# Run for Your Life by Optimistic Dinosaurs
Our project is an infinite runner game, similar to the offline dinosaur game. It features a keyboard-controlled character that will duck and jump to avoid obstacles as well as a store and a leaderboard.

### Devos:
Hebe Huang (PM)  
Yuqing Wu  
Roshani Shrestha  
Justin Zou

### Task Division:
Frontend/Templates:
- Game.html (Everyone)
- Login.html (Justin)
- Register.html (Justin)
- Leaderboard.html (Justin, Hebe)
- Store.html (Hebe)
- Profile.html (Justin)
- Results.html (Hebe)

Flask/Python:
- Buy things (Justin)
- Rendering pages (Everyone)

Leaderboard/backend database:
- Login + score database (Justin)
- Store database (Hebe)
- Items owned database (Roshani, Hebe, Justin)
	
Game Tasks:
- Updating score based on distance (Hebe)
- Implementing backgrounds/sprites/skins (Roshani)
- Generating, collecting, updating coins (Yuqing)
- Generate Obstacles (Yuqing)
- Making the character jump/duck (Roshani)
- Detect game ends (Roshani)
- Power-ups/skills (Yuqing, Roshani)
- Setting skins the user selects from game page (Roshani)

## API Cards:
None used.

## Launch Codes
- Install and activate virtual environment <br>
$ ```python3 -m venv ~/tyrunt``` <br>
Linux: $ ```source ~/tyrunt/bin/activate``` <br>
Windows: $ ```source ~/tyrunt/Scripts/activate``` <br><br>
- Clone the Repository <br>
(tyrunt)$ ```git clone https://github.com/Hebe3834/P02.git ``` <br><br>
- Install Dependencies <br>
(tyrunt)$ ```cd P02 ``` <br>
(tyrunt)$ ```pip install -r requirements.txt``` <br><br> 
- Upload API keys into the `keys` directory (found inside `app` directory) <br><br> 
- Run the app <br>
(tyrunt)$ ```cd app``` <br>
(tyrunt)$ ```python3 __init__.py``` <br><br>
- Open the website at http://127.0.0.1:5000/
