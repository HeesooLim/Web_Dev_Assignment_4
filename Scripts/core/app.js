/*
      Author: Heesoo Lim
      Date: August 14, 2020
      File Name: app.js
      File Description: core jsfile for slot machine game page
*/

(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    let playerMoney = 1000;
    let winnings = 0;
    let jackpot = 5000;
    let turn = 0;
    let playerBet = 0;
    let winNumber = 0;
    let lossNumber = 0;
    let spinResult;
    let fruits = "";
    let winRatio = 0;
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and 'Preloads' all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on('complete', Start);
        assets.loadManifest(manifest);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started . . .");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667ms
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }

    // called every frame
    function Update() {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds------ */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }

    function Reels() {
        let betLine = [" ", " ", " "];
        let outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }

    function betMoney(betAmount) {
        if (playerMoney >= betAmount) {
            playerMoney -= betAmount;
            playerBet += betAmount;
            betLabel.setText(playerBet.toString());
            creditLabel.setText(playerMoney.toString());
        }
    }

    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject('background', Config.Screen.CENTER_X, Config.Screen.CERTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button('spinButton', Config.Screen.CENTER_X + 135, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button('bet1Button', Config.Screen.CENTER_X - 135, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button('bet10Button', Config.Screen.CENTER_X - 67, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button('bet100Button', Config.Screen.CENTER_X, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button('betMaxButton', Config.Screen.CENTER_X + 68, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(betMaxButton);
        // Labels
        jackPotLabel = new UIObjects.Label(jackpot, '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label(playerMoney.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X - 95, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label(winnings, '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X + 94, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(playerBet.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject('bell', Config.Screen.CENTER_X - 79, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject('bar', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject('banana', Config.Screen.CENTER_X + 78, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject('bet_line', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 11, true);
        stage.addChild(betLine);
    }

    function interfaceLogic() {
        spinButton.on('click', () => {
            // reel test
            let reels = Reels();
            if (playerBet > 0) {
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                playerBet = 0;
                betLabel.setText(playerBet.toString());
            }
        });
        bet1Button.on('click', () => {
            console.log('Bet 1 Button Button Clicked');
            betMoney(1);
        });
        bet10Button.on('click', () => {
            console.log('Bet 10 Button Button Clicked');
            betMoney(10);
        });
        bet100Button.on('click', () => {
            console.log('Bet 100 Button Button Clicked');
            betMoney(100);
        });
        betMaxButton.on('click', () => {
            console.log('Bet max Button Button Clicked');
            betMoney(playerMoney);
        });
    }

    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
}());
//# sourceMappingURL=app.js.map