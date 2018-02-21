var tabbalony = [];
var bnumber = 5;
var containerwidth = 1024;
var containerheight = 658;
var pierwszebalony;
var maxkrok = 5;
var eksplozja2 = "gfx/explosion2.gif";
var trafienie = 5;
var ucieczka = 10;
var start = 100;
var nastepnebalony;

function mapa(){
    var container = document.createElement('div');
    container.id = "kontener";   
    container.setAttribute("onclick", "strzal(event)");
    container.style.margin = "0px";
    container.style.padding = "0px";
    container.style.height = containerheight + "px";
    container.style.width =  containerwidth + "px";
    container.style.position = "relative";
    container.style.backgroundImage = "url('gfx/niebo.jpg')"; 
    container.style.cursor = "crosshair";
    var parentbody = document.getElementsByTagName("body")[0]; 
    parentbody.appendChild(container);
} 
function balony() { 
    var balonik = document.createElement('img');
    var krok = wylosujLiczbe(1, maxkrok);
    var szerokosc = wylosujLiczbe(30, 70);
    var polozenie = wylosujLiczbe(0, containerwidth - szerokosc);
    var id = "balon" + wylosujLiczbe(0, 10000000);
    if (polozenie >= containerheight){
        usuwanie(id);
    }
    balonik.id = id;
    balonik.style.width = szerokosc + "px";
    balonik.style.height = "70px";
    balonik.style.borderRadius = "50%";
    balonik.style.border = "1px solid black";
    balonik.style.backgroundColor = "rgb(0,"+wylosujLiczbe(1,250)+","+wylosujLiczbe(1,250)+")";
    balonik.style.position = 'absolute';
    balonik.style.bottom = "0px";
    balonik.style.left = polozenie + "px";
    tabbalony[id] = [polozenie, krok]; 

    var containerparent = document.querySelector("#kontener");
    containerparent.appendChild(balonik); 
}

function game() {
    var baloons = wylosujLiczbe(1, bnumber);

    mapa ();
    tablica();
    for (var i = 0; i < baloons; i++) {
        balony();
    }
    wyswietlanie();
    pierwszebalony = setInterval('animacjabalonow()', 30);
    nastepnebalony = setInterval('nowebalony()',2000);
}

function animacjabalonow() {
    for (var id in tabbalony) { 
        var balonik = document.querySelector("#" + id); 
        var balonszerokosc = balonik.style.width; 
        balonszerokosc = parseInt(balonszerokosc);
        tabbalony[id][0] += tabbalony[id][1]; 
        if (tabbalony[id][0] >= (containerwidth - balonszerokosc) || tabbalony[id][0] <= 0) {
            tabbalony[id][0] -= tabbalony[id][1]; 
        } else if (tabbalony[id][0]>=containerheight){
        start = start - ucieczka;
        usuwanie(id);
        }
        balonik.style.bottom = tabbalony[id][0] + "px"; 
    }// koniec petli for
    wyswietlanie();
}

function strzal(x) { 
    var obj = x.target; 
    var expl = obj.getAttribute("expl");
    if (obj.tagName == "IMG" && expl == undefined) { 
        start = start + trafienie;
        obj.setAttribute("expl", "tak"); 
        tabbalony[obj.id][1] = 0; 
        obj.src = eksplozja2; 
        setTimeout(function () {
                usuwanie(obj.id);
            }, 450);
    } 
    wyswietlanie();
}
function usuwanie(id) {
    var rodzic = document.querySelector("#kontener");
    var balony = document.querySelector("#" + id);
    rodzic.removeChild(balony);
    delete tabbalony[id]; 
}

function tablica() { // funkcja do tworzenia tablicy wynikowej
    var wyniki = document.createElement('div');
    wyniki.id = "tabela";
    wyniki.style.border = "3px solid black";
    wyniki.style.backgroundColor = "rgb(100,255,100)";
    wyniki.style.fontSize = "25px";
    wyniki.style.color = "white";
    wyniki.style.fontFamily = "Century Gothic";
    wyniki.style.width = "250px";
    wyniki.style.position = "absolute";
    wyniki.style.bottom = "0px";

    var rodzicKontener = document.querySelector("#kontener");
    rodzicKontener.appendChild(wyniki);// dodanie wyświetlacza do diva-kontener
}
function wyswietlanie() {
    var wynik= document.querySelector("#tabela");
    wynik.innerHTML = "Start:" + start + "<br>";
}
function nowebalony() {
    balony();
    wyswietlanie();
}
