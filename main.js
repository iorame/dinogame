/* 캔버스 그리기 */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); // getContext()는 캔버스 그리기 기능 제공

canvas.width = window.innerWidth - 100; 
canvas.height = window.innerHeight - 100;

cactusImg = new Image();
cactusImg.src ='img/cactus.png'
dinoImg = new Image();
dinoImg.src ='img/dino.png'


/* 공룡 유닛 만들기 */

// object data type
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        //ctx.fillStyle = 'green'; // 초록색을 네모 만들건데
        //ctx.fillRect(this.x, this.y, this.width, this.height); 
        ctx.drawImage(dinoImg,this.x, this.y);
    }
}

// dino.draw()


class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    
    draw(){
        //ctx.fillStyle = 'red'
        //ctx.fillRect(this.x, this.y, this.width, this.height); 
        ctx.drawImage(cactusImg,this.x, this.y);
    }
}

var cactus = new Cactus();
// cactus.draw()


timer = 0; // timer의 단위는 초가 아니라 프레임
jumpTimer = 0; // 점프와 관련된 타이머
var cactuses = []; // 장애물 여러개 관리
var animation;

// 프레임마다 실행할 코드를 적을 것
// 초당 몇 프레임인지는 당연히 컴퓨터마다 다름
function action(){
    animation = requestAnimationFrame(action) // 프레임마다 실행하도록 만들어주는 기능

    ctx.clearRect(0, 0, canvas.width, canvas.height) // 화면 지우기
    
    // dino.draw()
    // dino.x++;

    if(timer % 120 === 0)
    {
        var cactus = new Cactus();
        cactuses.push(cactus);
    }

    // for c in catuses:
    // i : 인덱스, o는 배열 그 자체
    cactuses.forEach((c, i, o) => {
        // console.log(i, o)
        if(c.x < 10)
        {
            o.slice(i, 1) // 제거
        }
        else
        {
            // 각 요소마다 공룡과 충돌하는지 체크해야
            collision_detection(dino, c); // 충돌 체크
        }
        c.x = c.x - 3;

        c.draw();
    })

    if(jump === true){
        dino.y =dino.y-3;
        jumpTimer++;
    }
    else{
        if(dino.y < 200){
            dino.y = dino.y + 3;
        }
    }
    if(jumpTimer > 50){
        jump = false;
        jumpTimer = 0;
    }


    dino.draw()
    timer++;
}

action();

var jump = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jump =true;
    }
})

// 충돌 확인
// 두 파라미터가 충돌하고 있는지 판단
function collision_detection(dino, cactus){
    var x_diff = cactus.x - (dino.x + dino.width); // x 충돌 체크
    var y_diff = cactus.y - (dino.y + dino.height);

    if(x_diff < 0 && y_diff < 0){
        cancelAnimationFrame(animation); // 프레임마다 실행되는 거 중지
    }
}


