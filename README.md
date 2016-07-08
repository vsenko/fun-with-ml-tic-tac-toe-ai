# fun-with-ml-tic-tac-toe-ai
The goal of this project was to create a Machine Learning based AI for Tic Tac Toe game.

Content:
--------
* lib - game emulation libs
* ai - different AI implementations (random, Minimax, NeuralNetwork)
* ai-utils - utilities for neural network AI training
* ai-models - pretrained neural network for NN AI
* data - data gathered for NN AI training
* stats - utils to produce statistics about different AI combinations
* test - mocha tests for libs and AIs
* manual-tests - some aux tests used durng developement

Check out AIs
---------------
You can easily check out pretrained NN AI using utils in **stats** folder this way:
```bash
node stats/stats-rand-rand.js
node stats/stats-mm-mm.js
node stats/stats-mm-rand.js
node stats/stats-nn-nn.js
node stats/stats-rand-mm.js
node stats/stats-rand-rand.js
node stats/stats-mm-nn.js
node stats/stats-nn-mm.js
node stats/stats-nn-rand.js
node stats/stats-rand-nn.js
```
As you can see Random AI is lame but fast, Minimax AI is good but very slow and NN AI is quite good and quite fast.

Train your own NN AI
--------------------
It is quite simple:
* clean up **data** and **ai-models** folders
* generate data for learning: `node ai-utils/collect-minimax-debug-csv.js`
* prepare data: `./ai-utils/prepare-datasets.sh`
* create and train NN (here you can adjust training parameters): `node ai-utils/create-and-train-nn-brain-js.js`
* test NN: `node ai-utils/test-ai-nn-brain-js.js`

This project uses
-----------------
* NodeJS (https://nodejs.org/en/)
* brain.js (https://github.com/harthur-org/brain.js)
* async (https://github.com/caolan/async)
* mocha (https://github.com/mochajs/mocha)

I used TensorFlow (https://www.tensorflow.org/) to figure out the shape of required NN - it is really fast!

Why callbacks and process.nextTick???
-------------------------------------
The project was designed with idea to allow a human player to play with AI.
