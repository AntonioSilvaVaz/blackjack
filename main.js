let cards = [];
let totalCards;
let totalInCoins = 1000;

let amountReturn = 0;
let otherBetReturn = 0;
let totalReturn = 0;

let computerTotal;
let computerTotalCards = 0;
let hiddenValues = [];

let userTotal;
let userCardsValue = [];

let totalBet = 0;
let coinsUsed = [];

let otherTotalBet = 0;
let otherBets = [];

let doubleDownBet = 0;
let insuranceBet = 0;

// ON CLICK FUNCTIONS START

$('.setting-btn').click(openSettings);
$('.start-btn').click(goBet);
$('.closeSettingsBtn').click(closeSettings);
$('.changeRulesBtn').click(changeRules);
$('.bet-btn').click(startGame);
$('.goBackStart').click(goStart)
$('.doubleDown').click(doubleDown);
$('.surrender').click(surrender);
$('.hitCardBtn').click(hitCard);
$('.passCardBtn').click(passCard);
$('.playAgain-btn').click(goBet);
$('.addCoinToBet500').click(()=>{addCoinToBet(500)});
$('.addCoinToBet200').click(()=>{addCoinToBet(200)});
$('.addCoinToBet100').click(()=>{addCoinToBet(100)});
$('.addCoinToBet50').click(()=>{addCoinToBet(50)});
$('.addCoinToBet20').click(()=>{addCoinToBet(20)});
$('.addCoinToBet10').click(()=>{addCoinToBet(10)});
$('.addCoinToBet5').click(()=>{addCoinToBet(5)});
$('.addCoinToBet1').click(()=>{addCoinToBet(1)});

// ON CLICK FUNCTIONS END

// SETTINGS SCREEN START

function openSettings(){
    $('.rulesText').text('Rules');
    $('.setting').css('display', 'block');
    $('.rules').css('display', 'flex');
    $('.cardsValue').css('display', 'none');
    $('.closeSettingsBtn').css('display', 'none');
    $('.changeRulesBtn').css('display', 'flex');
    $('.setting-btn').click('');
    $('.changeRulesBtn').click(changeRules);
}

function changeRules(){
    $('.rulesText').text('Values');
    $('.rules').css('display', 'none');
    $('.cardsValue').css('display', 'block');
    $('.changeRulesBtn').css('display', 'none');
    $('.closeSettingsBtn').css('display', 'block')
}

function closeSettings(){
    $('.setting').css('display', 'none');
}

// SETTINGS SCREEN END

// BETTING FUNCTIONS START

function goStart(){
    $('.betting').css('display', 'none');
    $('.start').css('display', 'block');
}

function goBet(){
    removeExtraTokens();
    $('.totalBet').text(totalBet)
    $('.totalCoins').text(totalInCoins)
    $('.results').css('display', 'none');
    $('.betting').css('display', 'block');
    $('.start').css('display', 'none');
}

function addCoinToBet(coinValue){
    let colorFolder = 'red';
    totalBet += parseInt(coinValue);
    if(totalBet<=totalInCoins && totalBet<2001){
        if(0<$('.coins-selected-container:last').children('.coin').length % 8 == 0){
            $('<div>', {
                class: 'coins-container coins-selected-container',
            }).appendTo('.middle-bet');
        }

        $('<img>', {
            class: 'img coin coinSelected value'+coinValue,
            src: `imgs/tokens/${colorFolder}/token-${coinValue}.png`,
        }).appendTo('.coins-selected-container:last').click(removeCoinFromBet);

        coinsUsed.push(coinValue);
        $('.coins-selected-container').each(function(){
            if($(this).children().length==0){
                $(this).remove();
            }
        })

        $('.totalBet').text(totalBet);
        $('.possible-1').text(Math.floor(totalBet * 2.5));
        $('.possible-2').text(Math.floor(totalBet * 2));
        $('.possible-3').text(Math.floor(totalBet * 1));
        $('.possible-4').text(Math.floor(totalBet * 0));

        changeTokens(colorFolder);
    } else{
        totalBet -= parseInt(coinValue);
    }
}

function removeCoinFromBet(){
    let value = this.getAttribute('src').split("/")[3].match(/\d+/)[0];
    totalBet-=parseInt(value);
    $('.totalBet').text(totalBet);
    $('.possible-1').text(Math.floor(totalBet * 2.5));
    $('.possible-2').text(Math.floor(totalBet * 2));
    $('.possible-3').text(Math.floor(totalBet * 1));
    $('.possible-4').text(Math.floor(totalBet * 0));
    coinsUsed.splice(coinsUsed.indexOf(value), 1);
    $(this).remove();
}

function changeTokens(colorFolder){
    let repeated = [];
    let repeated1 = [];

    coinsUsed.forEach(coinNow=>{
        if(repeated.indexOf(coinNow)>=0 && coinNow!=1){
            repeated[repeated.indexOf(coinNow) + 1] +=1;
        } else if(coinNow==1){
            if(repeated1.indexOf(coinNow)>=0){
                repeated1[1] +=1;
            } else{
                repeated1.push(coinNow, 1);
            }
        } else{
            repeated.push(coinNow, 1);
        }
    })

    function removeAndAddToken(coinNow, coinToAdd){
        if(coinNow==20){
            $(`.value10:last`).remove();
            coinsUsed.splice(coinsUsed.indexOf(10), 1);
        } else if(coinNow==200){
            $(`.value100:last`).remove();
            coinsUsed.splice(coinsUsed.indexOf(100), 1);
        } else if(coinNow==1){
            $(`.value1:last`).remove();
            $(`.value1:last`).remove();
            $(`.value1:last`).remove();
            coinsUsed.splice(coinsUsed.indexOf(1), 1);
            coinsUsed.splice(coinsUsed.indexOf(1), 1);
            coinsUsed.splice(coinsUsed.indexOf(1), 1);
        }

        for (let times = 0; times < 2; times++) {
            $(`.value${coinNow}:last`).remove();
            coinsUsed.splice(coinsUsed.indexOf(coinNow), 1);
        }

        $('<img>', {
            class: 'img coin coinSelected value'+coinToAdd,
            src: `imgs/tokens/${colorFolder}/token-${coinToAdd}.png`,
        }).appendTo('.coins-selected-container:last').click(removeCoinFromBet);
        coinsUsed.push(coinToAdd);
        changeTokens(colorFolder);
    }

    for (let index = 1; index < repeated.length; index+=2) {
        let amount = repeated[index];
        let coinNow = repeated[index-1];

        if(amount==2 && coinNow==5 || amount==2 && coinNow==10 ||amount==2 && coinNow==50 ||amount==2 && coinNow==100){
            removeAndAddToken(coinNow, coinNow * 2);
        } else if(amount==2 && coinNow==20 && coinsUsed.indexOf(10)>=0){
            removeAndAddToken(coinNow, 50);
        } else if(amount==2 && coinNow==200 && coinsUsed.indexOf(100)>=0){
            removeAndAddToken(coinNow, 500);
        }
    }

    for (let index = 1; index < repeated1.length; index+=2) {
        let amount = repeated1[index];
        let coinNow = repeated1[index-1];
        if(amount==5 && coinNow==1){
            removeAndAddToken(coinNow, 5)
        }
    }
}

function removeExtraTokens(){
    if(totalBet>totalInCoins){
        let coinsUsedSorted =   [...coinsUsed];
        coinsUsedSorted.sort((a,b)=>a-b);
        while (totalBet>totalInCoins) {
            let valueCoinRemove = coinsUsed[coinsUsed.length - 1];
            $(`.value${valueCoinRemove}:last`).remove();
            totalBet-=parseInt(valueCoinRemove);
            coinsUsed.splice(coinsUsed.indexOf(valueCoinRemove), 1);
        }
    }
}

// BETTING FUNCTIONS END

// GAME FUNCTIONS START

function addCoinsToGame(color){
    let colorFolder = 'red';
    if (color!=undefined){colorFolder=color};

    for (let i = 0; i < coinsUsed.length; i++) {
        const coinNow = coinsUsed[i];
        if(i%4==0 && i>0){
            $('<div>', {
                class: 'bettingCoins',
            }).appendTo('.gameBetPlaced');

            $('<img>', {
                class: 'img coin gameCoins gameCoins'+i,
                src: `imgs/tokens/${colorFolder}/token-${coinNow}.png`
            }).appendTo('.bettingCoins:last');
        } else{
            $('<img>', {
                class: 'img coin gameCoins gameCoins'+i,
                src: `imgs/tokens/${colorFolder}/token-${coinNow}.png`
            }).appendTo('.bettingCoins:last');
        }
    }
}

function startGame(){ 
    totalInCoins-=totalBet;
    resetGame();
    addCoinsToGame();

    $('.btn-play').attr('disabled', true);
    $('.doubleDown').attr('disabled', true);
    $('.surrender').attr('disabled', true);

    $('.betting').css('display', 'none');
    $('.game').css('display', 'block');

    setTimeout(hitCard, 500);
    setTimeout(computerHit, 1300);
    setTimeout(hitCard, 2100);
    setTimeout(computerHit, 2900);
    setTimeout(() => {
        $('.btn-play').attr('disabled', false);
        $('.doubleDown').attr('disabled', false);
        $('.surrender').attr('disabled', false);
    }, 3100);
}

function endGame(decision){
    $('.game').css('display', 'none');
    $('.results').css('display', 'block');
    $('.decision').text(decision);
    $('.amountBet').text(totalBet);
    $('.amountReturn').text(amountReturn);
    $('.otherBetsAmount').text(otherTotalBet);
    $('.otherBetsReturn').text(otherBetReturn);
    $('.totalReturn').text(totalReturn);

    otherBets.forEach(otherBetNow=>{
        $('<div>', {
            class: 'otherBet',
            text: otherBetNow,
        }).appendTo('.otherBetsDiv');
        // $('.otherBet').append(otherBetNow);
    })
}

function getCardValue(cardSelected, total){
    let valueOfCard = 0;

    if(cardSelected[0]=='a' && total+11<=21){
        valueOfCard = 11;
    } else if (cardSelected[0]=='a' && total+11>21){
        valueOfCard = 1;
    } else if(cardSelected[0]=='1' || cardSelected[0]=='j' || cardSelected[0]=='q' || cardSelected[0]=='k'){
        valueOfCard = 10;
    } else{
        valueOfCard = parseInt(cardSelected[0]);
    }
    return valueOfCard;
}

function discoverWinner(blackjack, surrender){
    let result = '';

    if(insuranceBet>0 && computerTotal==21 && computerTotalCards==2){
        otherBetReturn += Math.floor(insuranceBet * 2);
    }

    if(blackjack==true && computerTotal!=21){
        result = 'Blackjack';
        totalInCoins += totalBet;
        amountReturn +=  Math.round(totalBet * 2.5);
    } else if(surrender==true){
        result = 'Surrender';
        otherBetReturn += Math.floor(totalBet / 2);
    } else if(userTotal>computerTotal && userTotal<=21 || computerTotal>21){
        result = 'Win';
        amountReturn += Math.floor(totalBet * 2);
        otherBetReturn += Math.floor(doubleDownBet * 2);
    } else if(computerTotal>userTotal && computerTotal<=21 || userTotal>21){
        result = 'Lose';
    } else if(computerTotal==userTotal){
        result = 'Push';
        amountReturn += Math.floor(totalBet);
        otherBetReturn += Math.floor(doubleDownBet)
    }
    
    totalReturn += otherBetReturn + amountReturn;
    totalInCoins += otherBetReturn + amountReturn;

    return result;
}

function resetGame(){
    cards = [
        "ace-clubs", "2-clubs", "3-clubs", "4-clubs", "5-clubs", "6-clubs", "7-clubs", 
        "8-clubs", "9-clubs", "10-clubs", "jack-clubs" ,"queen-clubs", "king-clubs",
    
        "ace-spades", "2-spades", "3-spades", "4-spades", "5-spades", "6-spades", "7-spades", 
        "8-spades", "9-spades", "10-spades", "jack-spades" ,"queen-spades", "king-spades",
    
        "ace-diamonds", "2-diamonds", "3-diamonds", "4-diamonds", "5-diamonds", "6-diamonds", "7-diamonds", 
        "8-diamonds", "9-diamonds", "10-diamonds", "jack-diamonds" ,"queen-diamonds", "king-diamonds",
    
        "ace-hearts", "2-hearts", "3-hearts", "4-hearts", "5-hearts", "6-hearts", "7-hearts", 
        "8-hearts", "9-hearts", "10-hearts", "jack-hearts" ,"queen-hearts", "king-hearts"
    ];

    totalCards = 0;
    computerTotal = 0;
    computerTotalCards = 0;

    userTotal = 0;
    userCardsValue = [];

    amountReturn = 0;
    totalReturn = 0;

    otherBets = [];
    otherTotalBet = 0;
    otherBetReturn = 0;

    insuranceBet = 0;
    doubleDownBet = 0;

    if(totalBet*2<=totalInCoins+totalBet && totalBet!=0){
        $('.doubleDown').css('display', 'block');
    } else{
        $('.doubleDown').css('display', 'none');
    }

    if(totalBet>0){
        $('.surrender').css('display', 'block');
    }


    $('.card').remove();
    $('.gameCoins').remove();
    $('.userTotal').text('0');
    $('.computerTotal').text('0');
    $('.otherBet').remove();
}

// GAME FUNCTIONS END

// IN GAME DESCISIONS START

function doubleDown(){
    if(totalBet*2 <= totalInCoins+totalBet){
        totalInCoins-=totalBet;
        doubleDownBet = totalBet;
        otherTotalBet += doubleDownBet;
        otherBets.push('Double Down');
        $('.doubleDown').css('display', 'none');
        addCoinsToGame('blue');
        hitCard(true);
    }
}

function surrender(){
    passCard(true);
    otherTotalBet += Math.floor(totalBet/2);
    otherBets.push(' Surrender ');
}

function insurance(){
    if(totalBet*2 <= totalInCoins+totalBet && insuranceBet==0){
        totalInCoins-=totalBet;
        insuranceBet = totalBet;
        otherTotalBet += insuranceBet;
        $('.suprise-btn').css('display', 'none');
        $('.gameCoins').remove();
        addCoinsToGame();
        addCoinsToGame('pink');
        otherBets.push(' Insurance ');
    }
}

// IN GAME DECISIONS END

// CARDS FUNCTIONS START

function computerHit(){

    function discoverCard(){
        let indexOfCard = Math.round(Math.random() * cards.length - 1);
        if(indexOfCard==-1)indexOfCard++;
        let cardSelected = cards[indexOfCard];
        cards.splice(indexOfCard, 1);
        if(totalCards==3){
            hiddenValues.push(cardSelected, getCardValue(cardSelected, computerTotal) ,totalCards);
            cardSelected = 'back';
        } else{
            computerTotal += getCardValue(cardSelected, computerTotal);
        }

        return cardSelected;
    }

    function changeScreen(cardSelected){
        $('<div>', {
            class: 'card cardNumber'+totalCards
        }).appendTo('.computerCards').css('opacity', '0');
    
        $('<img>', {
            class: 'img img'+totalCards,
            src: `imgs/deck/${cardSelected}.png`
        }).appendTo('.cardNumber'+totalCards);

        $('<div>', {
            class: 'animateComputerCard'
        }).appendTo('.deckCards');

        $('<img>', {
            class: 'img',
            src: `imgs/deck/back.png`,
            alt: 'CARD'
        }).appendTo('.animateComputerCard');

        $('.animateComputerCard').animate({
            top: $('.cardNumber'+totalCards).position().top + 'px', 
            left: $('.cardNumber'+totalCards).position().left + 'px'}, 
            {duration: 500,}).fadeOut(500);
            
        $('.cardNumber'+totalCards).delay(500).animate({opacity: '1'}, {duration: 500});

        setTimeout(() => {
            $('.computerTotal').text(computerTotal);
        }, 700);
        
        setTimeout(() => {
            if(computerTotal==10  && computerTotalCards==1 && totalBet!=0 && totalBet*2 <= totalInCoins + totalBet || computerTotal==11 && computerTotalCards==1 && totalBet!=0 && totalBet*2 <= totalInCoins + totalBet){
                $('.suprise-btn').css('display', 'block').click(insurance);
            }
        }, 1200);
        totalCards+=1;
        computerTotalCards+=1;
    }

    changeScreen(discoverCard());
}

function hitCard(){

    function discoverCard(){
        let indexOfCard = Math.round(Math.random() * cards.length - 1);
        if(indexOfCard==-1){indexOfCard++};
        let cardSelected = cards[indexOfCard];
        cards.splice(indexOfCard, 1);
        userCardsValue.push(getCardValue(cardSelected, userTotal));
        userTotal += userCardsValue[userCardsValue.length - 1];
        return cardSelected;
    }

    function changeScreen(cardSelected){
        $('<div>', {
            class: 'card cardNumber'+totalCards
        }).appendTo('.userCards').css('opacity', '0');
    
        $('<img>', {
            class: 'img',
            src: `imgs/deck/${cardSelected}.png`
        }).appendTo('.cardNumber'+totalCards);

        $('<div>', {
            class: 'animateCard'
        }).appendTo('.deckCards');

        $('<img>', {
            class: 'img',
            src: `imgs/deck/back.png`,
            alt: 'CARD'
        }).appendTo('.animateCard');

        $('.animateCard').animate({
            top: $('.cardNumber'+totalCards).position().top + 'px', 
            left: $('.cardNumber'+totalCards).position().left + 'px'}, 
            {duration: 500}).fadeOut(500);
            
        $('.cardNumber'+totalCards).delay(500).animate({opacity: '1'}, {duration: 500});

        if(totalCards>=4){
            $('.suprise-btn').css('display', 'none');
            $('.doubleDown').css('display', 'none');
        }

        setTimeout(() => {
            $('.userTotal').text(userTotal);
        }, 700);

        setTimeout(() => {
            if(userTotal>21 || totalCards==4 && userTotal==21 || doubleDownBet>0){
                passCard();
                $('.btn-play').attr('disabled', true);
            }
        }, 1200);
        
        totalCards+=1;
    }

    changeScreen(discoverCard());
}

function passCard(surrender){
    $('.suprise-btn').css('display', 'none');
    function unhideCard(){
        computerTotal += hiddenValues[1];
        $('.img'+hiddenValues[2]).attr('src', `imgs/deck/${hiddenValues[0]}.png`)
        $('.computerTotal').text(computerTotal);
        hiddenValues = [];
        clearInterval(unhideCardInterval);
    }

    let unhideCardInterval = setInterval(unhideCard, 500);

    if(surrender==true){
        unhideCard();
        setTimeout(() => {
            endGame(discoverWinner(false, true));
        }, 800);
    } else{
        let getComputerCardInterval = setInterval(() => {
            if(totalCards==4 && userTotal==21){
                clearInterval(getComputerCardInterval);
                endGame(discoverWinner(true))
            } else if(computerTotal<17 && userTotal<=21 && totalCards>3 && computerTotal<userTotal){
                computerHit();
            } else{
                clearInterval(getComputerCardInterval);
                setTimeout(() => {
                    endGame(discoverWinner())
                }, 500);
            }
        }, 1000);
    }
}

// CARD FUNCTIONS END