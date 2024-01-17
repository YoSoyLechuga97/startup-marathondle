# startup-marathondle

## Specification Deliverable

### Elevator Pitch
For my startup I would like to bring a little more of a competitive edge to a game that I know many people enjoy: Wordle. I think that wordle is an entertaining game that has merit through the brain teasing quality it has. In my startup I would like to make a wordle game that allows you to log in and play until you lose, adding to your overall score the longer that you can go this game will be updating live for them. The more words you get correct the more points you will accumulate, there will be bonuses for getting the word sooner as well. Once you lose a game of wordle your run will end and your score will be saved. Your high score will be on display alongside your username so that you can see how other friends and players have done in comparison to you. I think it could also be fun to make the program reset the weekly high scores so that every week there could be a new top dog. The page would center around the game, with you and your friends scores on the right, and the weekly and global scores on the left. There would also be a current score displayed which showed the score currently earned in the current game.

Honestly this is my first time doing anything like this, and the idea excites me. However if it does not fit the class parameters or is not a good workload for a project please let me know!

### Design
![Mock](marathondle_mock.png)

### Key Features
The game will include:
Athentication: User will sign into their account
Database Data: user high scores
WebSocket data: when a user starts or ends a new game

### Technologies

I am going to use the required technologies in the following ways.
- **HTML** - Uses correct HTML structure for application. Two pages, one to log in and one for playing.
- **CSS** - Style my game so that it looks good and performs well on different screens, including making visible scoreboards.
- **JavaScript** - Create a login, and the wordle-esque game
- **Service** - Backend service with endpoints for:
- login
- retrieving words
- submitting answers
- retrieving scores
- **DB/Login** - Store users and their scores in database. Register and login users, credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - After a user finishes their game, their score is broadcast to all other users.
- **React** - Application ported to use the React web framework.

