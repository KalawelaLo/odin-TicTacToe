let MyGame =  {
    board: [],
    turn: 0,
    game: true,
    player_V_player: true,
    init: function() {
        this.restart_board();
        console.log(this.board.length);
        const parent_of_selected = document.getElementsByClassName("Board");
        console.log(parent_of_selected.length)
        for (let i = 0 ; i < this.board.length; i++){
            let new_div_ = this.new_div(i); 
            parent_of_selected[0].appendChild(new_div_);
        }
        console.log(this.board.length , " is may equal " , document.getElementsByClassName("Space").length)
    },
    new_div: function(num){
        var new_div = document.createElement("div");
        new_div.classList.add("Space");
        new_div.id = num;
        new_div.textContent = this.board[num];
        new_div.onclick = this.checkinput(new_div.id)
        return ;
    },
    draw: function() {
        const sel = document.getElementById("Board");
        const childs = sel.children;
        for (let i = 0 ; i < this.board.length; i++) {
            let elem = childs.item(i)
            elem.textContent = this.board[i];
        }
    },
    checkinput: function(input_number) {
        if(this.checkValidMove(input_number) && this.player_V_player == true){
            this.turn += 1;
            let char_player = this.getPlayer();
            this.setMove(input_number, char_player);
            this.draw();
        }
    },
    setMove: function(num, char) {
        this.board[num] = char;
    },
    getPlayer: function() {
        let j = this.turn % 2;
        if (j == 0){
            return "X";
        }
        return "O";
    },
    restart_board: function () {
        this.board = [".",".","." ,".",".","." ,".",".","."]
        this.turn = 0;
        return "Success";
    },
    checkValidMove: function(move_position) {
        if (this.board[move_position] == "." ){
            return true;
        }
        return false;
    }

};

MyGame.init();
MyGame.draw();