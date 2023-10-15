// 랜덤한 4자리 숫자 빈 리스트에 저장
let ranNum = num =>{
    let ran = [];

    for (let i = 0; i < num; i++) {
        ran[i] = (parseInt(Math.random() * 10));
    }

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            if (i != j && ran[i] === ran[j]) {
                ran[i] = (parseInt(Math.random() * 10));
                i--;
            }
        }
    }
    console.log(ran);
    return ran;
};

let ranList = ranNum(4);

// 접근할 객체 설정
const user = document.getElementsByClassName("user");
const btn = document.getElementsByTagName("button");
const strike = document.getElementById("strike");
const ball = document.getElementById("ball");
const out = document.getElementById("out");
const chanceArea = document.getElementById("chance-area");
const resultArea = document.getElementById("result-area");
const statusArea = document.getElementById("status-area");
const mBtn = document.getElementById("mBtn")
const memoTable = document.getElementsByTagName("td")
const userMemo = document.getElementsByClassName("userMemo")

// 사용자가 입력한 수를 저장할 빈 리스트 초기화
let userList = [];
let chance = 10;
let s = 0;
let b =0;
let outCount = 0;
let same = null;
let tableNum = 0; // 메모 테이블 위치 번호
let colorNum = [0,0,0,0,0,0,0,0,0,0]; // 메모패드 버튼

// 확인 버튼을 눌렀을 때, 사용자가 입력한 값을 불러오는 로직 구현
btn[0].addEventListener("click", ()=>{

    // 유저리스트 초기화
    for (let i = 0; i < 4; i++) {
        userList = [];
    };

    //outcount초기화
    outCount = 0;

    //strike, ball 초기화
    s = 0;
    b = 0;
    strike.innerHTML = `Strike : ${s}`;
    ball.innerHTML = `Ball : ${b}`;

    // 사용자가 입력한 수 리스트에 저장
    for(let i=0; i<4; i++){
        userList.push(parseInt(user[i].value));
    };

    // 공백여부 판단
    for(let i=0; i<4; i++){
        let userNum = user[i].value;
        if(!userNum){
            statusArea.innerText = "공백없이 입력해주세요."
            return;
        }
    }

    // 문자열 입력 판단
    for(let i=0; i<4; i++){
        let userNum = user[i].value;
        if(userNum*0 !=0){
            statusArea.innerText = "문자가 아닌 숫자를 입력해주세요."
            // 공백으로 변환
            for (let i = 0; i < 4; i++) {
                user[i].value = '';
            }
            return;
        }
    }

    // 중복숫자 판단
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(i!=j && userList[i]===userList[j]){
                same = "중복";
                statusArea.innerText = "중복된 숫자가 있습니다. 다시 입력해주세요."
                for (let i = 0; i < 4; i++) {
                    user[i].value = '';
                }
            }
        }
    }

    if(same === "중복"){
        same = null;
        return;
    }

    // 유저리스트 출력
    console.log(userList);

    // 랜덤 숫자와 사용자가 입력한 수 비교
    for(let i=0; i<4; i++){
        
        if(ranList[i]===userList[i]){
            s +=1;
            strike.innerHTML = `Strike : ${s}`;
        }else if(ranList.includes(userList[i])){
            b +=1;
            ball.innerHTML = `Ball : ${b}`;
        }else{
            outCount +=1;
        }
    }

    // 결과 메모테이블에 출력
    tableNum += 1;
    for (let i=1; i <=10; i++) {
        if(tableNum === i && outCount === 4){
            memoTable[i-1].innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} <span style="color:red">OUT</span>`
        }else if(tableNum === i && b===0 && s != 0){
            memoTable[i-1].innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} <span style="color:yellow">${s}S</span>`
        }else if(tableNum === i && b != 0 && s===0){
            memoTable[i-1].innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} <span style="color:green">${b}B</span>`
        }else if (tableNum === i) {
            memoTable[i-1].innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} <span style="color:yellow">${s}S</span> <span style="color:green">${b}B</span>`
        }
    }
    
    //OUT!!!
    if(outCount === 4){
        statusArea.innerText ="OUT!! 운이 좋으시네요!"
        chance-=1;
        chanceArea.innerHTML = `남은 기회:${chance}번`
        for (let i = 0; i < 4; i++) {
            user[i].value = '';
        };
        return;
    }

    // 정답시 출력문
    if(s === 4){
        statusArea.innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} 정답!! 축하드립니다!`
        btn[0].disabled = true;
    }else{
        // 정답이 아닐때 출력문
        statusArea.innerHTML = `${userList[0]} ${userList[1]} ${userList[2]} ${userList[3]} 오답!! 다시 시도해보세요!`
    }
    
    // 남은 기회 차감
    chance-=1;
    chanceArea.innerHTML = `남은 기회:${chance}번`

    //게임오버
    if(chance === 0){
        statusArea.innerText = "Game Over!"
        btn[0].disabled = true;
    }
    
    //공백으로 변환
    for (let i = 0; i < 4; i++) {
        user[i].value = '';
    };
});

// 초기화버튼
btn[1].addEventListener("click", () => {
    ranList = ranNum(4);

    statusArea.innerText = "4자리 숫자를 입력해주세요!"

    //strike, ball 초기화
    s = 0;
    b = 0;
    strike.innerHTML = `Strike : ${s}`;
    ball.innerHTML = `Ball : ${b}`;

    // 공백으로 변환
    for(let i=0; i<4; i++){
        user[i].value = '';
    };

    // 기회 아웃카운트 초기화
    chance = 10;
    outCount = 0;
    chanceArea.innerHTML = `남은 기회:${chance}번`

    //확인버튼 활성화
    btn[0].disabled = false;

    //메모패드 초기화
    for(let i=0; i<10; i++){
        memoTable[i].innerText = '';
    }
    tableNum = 0;

    //메모 버튼 초기화
    for(let i =2; i<12; i++)
        btn[i].setAttribute("class", "memoBtn white")
        colorNum[i-2] = 0;
});

// 메모패드 버튼 색변환
// 0번
for(let i=2; i<12; i++){btn[i].addEventListener("click", () => {    
    if(colorNum[i-2] === 0){
        btn[i].setAttribute("class", "memoBtn green")
        colorNum[i-2] = 1;
    }else if(colorNum[i-2] === 1){
        btn[i].setAttribute("class", "memoBtn red")
        colorNum[i-2] = 2;
    }else if(colorNum[i-2] === 2){
        btn[i].setAttribute("class", "memoBtn white")
        colorNum[i-2] = 0;
    }  
});}

//메모 초기화
btn[12].addEventListener("click", ()=>{
    for (let i = 0; i < 4; i++) {
        userMemo[i].value = '';
    }
});