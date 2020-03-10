(function ($) {

    // Score variable
    var score = {
        "keep": {
            "games": 0,
            "wins": 0,
        },
        "swap": {
            "games": 0,
            "wins": 0,
        },
        "random": {
            "games": 0,
            "wins": 0,
        },
        "player": {
            "games": 0,
            "wins": 0,
        }
    };

    // Functions

    /**
     * Clears the score
     */
    function clearScore () {
        score.keep.games = 0;
        score.keep.wins = 0;
        score.swap.games = 0;
        score.swap.wins = 0;
        score.random.games = 0;
        score.random.wins = 0;
        score.player.games = 0;
        score.player.wins = 0;
    }

    /**
     * Draws the score
     */
    function drawScore () {
        $("#Keep .Games").text("Games: " + score.keep.games);
        $("#Keep .Wins").text("Wins: " + score.keep.wins);
        if (score.keep.wins > 0) {
            $("#Keep .Percentage").text("Percentage: " + Math.round(100 * score.keep.wins / score.keep.games) + "%");
        } else {
            $("#Keep .Percentage").text("Percentage: N/A");
        }
        $("#Swap .Games").text("Games: " + score.swap.games);
        $("#Swap .Wins").text("Wins: " + score.swap.wins);
        if (score.swap.wins > 0) {
            $("#Swap .Percentage").text("Percentage: " + Math.round(100 * score.swap.wins / score.swap.games) + "%");
        } else {
            $("#Swap .Percentage").text("Percentage: N/A");
        }
        $("#Random .Games").text("Games: " + score.random.games);
        $("#Random .Wins").text("Wins: " + score.random.wins);
        if (score.random.wins > 0) {
            $("#Random .Percentage").text("Percentage: " + Math.round(100 * score.random.wins / score.random.games) + "%");
        } else {
            $("#Random .Percentage").text("Percentage: N/A");
        }
        $("#Player .Games").text("Games: " + score.player.games);
        $("#Player .Wins").text("Wins: " + score.player.wins);
        if (score.player.wins > 0) {
            $("#Player .Percentage").text("Percentage: " + Math.round(100 * score.player.wins / score.player.games) + "%");
        } else {
            $("#Player .Percentage").text("Percentage: N/A");
        }
    }

    /**
     * Simulate keep game.
     * 
     * @param {integer} games The number of games to simulate.
     */
    function simKeep (games) {
        for (var game = 0; game < games; game++) {
            var winningDoor = Math.floor(Math.random() * 3);
            var chosenDoor = Math.floor(Math.random() * 3);
            if (chosenDoor === winningDoor) {
                score.keep.games = score.keep.games + 1;
                score.keep.wins = score.keep.wins + 1;
            } else {
                score.keep.games = score.keep.games + 1;
            }
        }
    }

    /**
     * Simulates a swap game.
     * 
     * @param {integer} games The number of games to simulate.
     */
    function simSwap (games) {
        for (var game = 0; game < games; game++) {
            var winningDoor = Math.floor(Math.random() * 3);
            var chosenDoor = Math.floor(Math.random() * 3);
            if (chosenDoor === winningDoor) {
                score.swap.games = score.swap.games + 1;
            } else {
                score.swap.games = score.swap.games + 1;
                score.swap.wins = score.swap.wins + 1;
            }
        }
    }

    /**
     * Simulates a random game.
     * 
     * @param {integer} games The number of games to simulate.
     */
    function simRandom (games) {
        for (var game = 0; game < games; game++) {
            var winningDoor = Math.floor(Math.random() * 3);
            var chosenDoor = Math.floor(Math.random() * 3);
            if (Math.random() > 0.5) {
                if (chosenDoor === winningDoor) {
                    score.random.games = score.random.games + 1;
                } else {
                    score.random.games = score.random.games + 1;
                    score.random.wins = score.random.wins + 1;
                }
            } else {
                if (chosenDoor === winningDoor) {
                    score.random.wins = score.random.wins + 1;
                    score.random.games = score.random.games + 1;
                } else {
                    score.random.games = score.random.games + 1;
                }
            }
        }
    }

    /**
     * Resets the game board.
     */
    function resetGame () {
        $(".Game-Message").text("Choose a door");
        $(".Disabled").removeClass("Disabled");
        $(".Selected").removeClass("Selected");
        var winningDoor = Math.floor(Math.random() * 3) + 1;
        $(".Door").off("click").on("click", function (e) {
            revealDoor(e, winningDoor);
        });
    }

    /**
     * Reveals one door and ends game if second time.
     * 
     * @param {event} event The click event on a door.
     * @param {integer} winningDoor The winning door.
     */
    function revealDoor (event, winningDoor) {
        $(".Selected").removeClass("Selected");
        $(event.target).addClass("Selected");
        if ($(".Disabled").length > 0) {
            $(".Door").not("[door-number='" + winningDoor + "']").addClass("Disabled");
            if (parseInt($(event.target).attr("door-number")) === winningDoor) {
                score.player.wins = score.player.wins + 1;
                $(".Game-Message").text("You won!");
            } else {
                $(".Game-Message").text("You loss");
            }
            score.player.games = score.player.games + 1;
            $(".Door").off("click");
            drawScore();
        } else {
            $(".Game-Message").text("Do you swap?");
            if (Math.random() > 0.5) {
                $(".Door").not("[door-number='" + winningDoor + "']").not(".Selected").first().addClass("Disabled").off("click");
            } else {
                $(".Door").not("[door-number='" + winningDoor + "']").not(".Selected").last().addClass("Disabled").off("click");
            }
        }
    }

    // Bindings
    $(".Scoreboard .Button").on("click", function (e) {
        e.preventDefault();
        clearScore();
        drawScore();
    });

    $(".Simulation .Button").on("click", function (e) {
        e.preventDefault();
        simKeep($("#Keep-Number").val());
        simSwap($("#Swap-Number").val());
        simRandom($("#Random-Number").val());
        drawScore()
    });

    $(".Game .Button").on("click", resetGame);

    resetGame();

}(jQuery));