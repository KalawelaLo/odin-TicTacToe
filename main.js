 /*jshint esversion: 6 */

const DOC = document;


let MyGame =  {
    board: [],
    turn: 0,
    game: true,
    player_V_player: true,
    wins: {
        X: 0,
        O: 0
    },
    ties: 0,
    empty: "-_-",
    init() {
        this.restart_board();
        var parent_of_selected = DOC.body.querySelector(".Board");
        for(let i = 0 ; i < this.board.length; i++){          
            let new_div_ = this.new_div(i);       
            parent_of_selected.appendChild(new_div_);
        }
    }, new_div(num){
        let new_div = DOC.createElement("div");
        new_div.classList.add("Space");
        new_div.id = num;
        new_div.textContent = this.empty;
        new_div.addEventListener("click", function() {
            MyGame.checkinput(new_div.id);
        });
        
        return new_div;
    }, draw() {
        const sel = DOC.querySelector(".Board");
        var childs = sel.childNodes;
        for (let i = 0 ; i < this.board.length; i++) {
            let elem = childs.item(i);
            elem.textContent = this.board[i];
        }
        const score_sel = DOC.querySelector("#Score");
        score_sel.textContent = ("O: " + this.wins.O + " X: " + this.wins.X);
    }, checkinput(input_number) {
        if(this.checkValidMove(input_number)){
            this.turn += 1;
            let char_player = this.getPlayer();
            this.setMove(input_number, char_player);
            this.checkWin();
            this.draw();
        }
    }, setMove(num, char) {
        this.board[num] = char;
    }, getPlayer() {
        let j = this.turn % 2;
        if (j == 1){
            return "X";
        }
        return "O";
    }, restart_board() {
        this.board = [this.empty,this.empty,this.empty ,this.empty,this.empty,this.empty ,this.empty,this.empty,this.empty];
        this.turn = 0;  
        return "Success";
    }, checkValidMove(move_position) {
        if (this.board[move_position] == this.empty ){
            return true;
        }
        return false;
    }, checkWin(){
        const wins_states = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let i = 0; i < wins_states.length; i++){
            if((this.board[wins_states[i][0]] == this.board[wins_states[i][1]]) &&
                (this.board[wins_states[i][0]] == this.board[wins_states[i][2]]) &&
                (this.board[wins_states[i][0]] != this.empty) ){
                    let key = this.board[wins_states[i][0]];
                    this.restart_board();
                    return this.wins[key] += 1;
            }
        }
        if(this.turn == 8){
            this.restart_board();
            this.ties += 1;
        }
         return;
    }
};

MyGame.init();
MyGame.draw();