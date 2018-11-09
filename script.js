//En variabel med et tal

window.addEventListener("load", sidenVises);

"use strict";
let points = 0;
let life = 3;
let timeLeft = 15;
let random1;
let random2;
let showSettingsEffektSound = true;
let showSettingsMusic = true;
let soundOnOff = true;


function sidenVises() {
    console.log("siden vises");
    //Hvad der skal ske
    showStart();



}

function showStart() {
    console.log("show start");

    document.querySelector("#game").classList.add("hide");
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#start").classList.add("pulse");
    document.querySelector("#start").addEventListener("click", hideMenu);
    document.querySelector("#settings").addEventListener("click", showSettings);
    document.querySelector("#sfx_sprite").addEventListener("click", toggleSounds);
    document.querySelector("#music_sprite").addEventListener("click", toggleMusic);


}



function showSettings() {
    console.log("showSettings");
    document.querySelector("#setting_screen").classList.remove("hide");
    document.querySelector("#kryds").addEventListener("click", settingClose);


}

function toggleSounds() {
    console.log("toggleSounds");
    //    showSettingsEffektSound = !showSettingsEffektSound;

    if (showSettingsEffektSound == false) {
        //her klikker vi lyden på
        showSettingsEffektSound = true;
        document.querySelector("#sfx_sprite").classList.add("off_on");
        document.querySelector("#sfx_sprite").classList.remove("off");
        document.querySelector("#sfx_sprite").addEventListener("animationend", soundsOn);
        soundOnOff = true;

    } else {
        //her kikker vi lyden af - slukker den
        showSettingsEffektSound = false;
        document.querySelector("#sfx_sprite").classList.add("on_off");
        document.querySelector("#sfx_sprite").classList.remove("on");
        document.querySelector("#sfx_sprite").addEventListener("animationend", soundsOff);
        soundOnOff = false;
    }

}

function soundsOff() {
    console.log("soundsOff function værdi er " + showSettingsEffektSound);
    document.querySelector("#sfx_sprite").removeEventListener("animationend", soundsOff);
    document.querySelector("#sfx_sprite").classList.remove("on_off");
    document.querySelector("#sfx_sprite").classList.add("off");
    //    her slukkes for efx


}

function soundsOn() {
    console.log("soundsOn function værdi er " + showSettingsEffektSound);

    document.querySelector("#sfx_sprite").removeEventListener("animationend", soundsOn);
    document.querySelector("#sfx_sprite").classList.remove("off_on");
    document.querySelector("#sfx_sprite").classList.add("on");
    //    her tændes for efx

}

function toggleMusic() {
    console.log("showSettingsMusic function " + showSettingsMusic);
    //    showSettingsMusic = !showSettingsMusic;


    if (showSettingsMusic == false) {
        showSettingsMusic = true;
        document.querySelector("#music_sprite").classList.add("off_on");
        document.querySelector("#music_sprite").classList.remove("off");

        document.querySelector("#music_sprite").addEventListener("animationend", musicOn);

    } else {
        showSettingsMusic = false;
        document.querySelector("#music_sprite").classList.add("on_off");
        document.querySelector("#music_sprite").classList.remove("on");

        document.querySelector("#music_sprite").addEventListener("animationend", musicOff);
    }
}

function musicOff() {
    console.log("musicOff function værdi er " + showSettingsMusic);
    document.querySelector("#music_sprite").removeEventListener("animationend", musicOff);
    document.querySelector("#music_sprite").classList.remove("on_off");
    document.querySelector("#music_sprite").classList.add("off");

    //    her slukkes for musikken

    document.querySelector("#musik").pause();
}

function musicOn() {
    console.log("musicOn function værdi er " + showSettingsMusic);
    document.querySelector("#music_sprite").removeEventListener("animationend", musicOn);
    document.querySelector("#music_sprite").classList.remove("off_on");
    document.querySelector("#music_sprite").classList.add("on");

    //    her tændes for musikken

    document.querySelector("#musik").play();
}


function settingClose() {
    console.log("settingClose");
    document.querySelector("#setting_screen").classList.add("hide");

}

function hideMenu() {
    console.log("hide menu");

    document.querySelector("#start").removeEventListener("click", hideMenu);
    document.querySelector("#start").classList.remove("pulse");
    document.querySelector("#menu_background").classList.add("fade_out");
    document.querySelector("#start").classList.add("fade_out");

    document.querySelector("#start").addEventListener("animationend", startGame);
}

function startGame() {
    console.log("start game");

    document.querySelector("#start").removeEventListener("animationend", startGame);
    document.querySelector("#menu_background").classList.remove("fade_out");
    document.querySelector("#start").classList.remove("fade_out");
    document.querySelector("#start").classList.add("hide");
    document.querySelector("#menu_background").classList.add("hide");
    document.querySelector("#game").classList.remove("hide");
    document.querySelector("#game_ui").classList.remove("hide");

    document.querySelector("#position1").addEventListener("click", clickHandler);
    document.querySelector("#position2").addEventListener("click", clickHandler);
    document.querySelector("#position3").addEventListener("click", clickHandler);
    document.querySelector("#position4").addEventListener("click", clickHandler);
    document.querySelector("#position5").addEventListener("click", clickHandler);
    document.querySelector("#position6").addEventListener("click", clickHandler);
    document.querySelector("#position7").addEventListener("click", clickHandler);
    document.querySelector("#position8").addEventListener("click", clickHandler);
    document.querySelector("#position9").addEventListener("click", clickHandler);

    document.querySelector("#time").classList.remove("hide");


    timeLeftFc();
    document.querySelector("#musik").play();
}

function clickHandler() {
    console.log("clickHandler");

    if (this.classList.contains("type1")) {
        console.log("type1");
        document.querySelector("#bumslyd").currentTime = 0;

        if (soundOnOff) {
            document.querySelector("#bumslyd").play();
        }

        this.classList = "";
        this.classList.add("dissappear");
        points++;
        document.querySelector("#points").innerHTML = points;
    } else if (this.classList.contains("type2")) {
        console.log("type2");
        document.querySelector("#hudormlyd").currentTime = 0;
        if (soundOnOff) {
            document.querySelector("#hudormlyd").play();
        }
        this.classList = "";
        this.classList.add("dissappear");
        timeLeft += 3;

        console.log("ekstatid")
        document.querySelector("#timer").innerHTML = timeLeft;
    } else if (this.classList.contains("type3")) {
        console.log("type3");
        document.querySelector("#vortelyd").currentTime = 0;
        if (soundOnOff) {
            document.querySelector("#vortelyd").play();
        }

        this.classList = "";
        this.classList.add("dissappear");
        document.querySelector("#heart" + life).classList.add("dissappear");

        life--;
    }
    this.classList.add("dissappear");

    this.addEventListener("animationend", nytElement);

    if (life === 0) {
        gameOver();
    } else if (points === 10) {
        levelComplete();
    }


}

function nytElement() {
    console.log("nytElement");
    this.className = "";
    this.classList.add("type" + Math.floor((Math.random() * 3) + 1));
    //    this.classList.add("position" + Math.floor((Math.random() * 9) + 1));
}


function timeLeftFc() {
    console.log("timeLeftFc timeLeft er" + timeLeft);

    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(timeLeftFc, 1500);
    } else if (points == 10) {
        levelComplete();
    } else if (life == 0) {
        gameOver();
    } else if (timeLeft == 0) {
        gameOver();
    }

    document.querySelector("#timer").innerHTML = +timeLeft;

}


function gameOver() {
    console.log("gameOver");
    document.querySelector("#position1").removeEventListener("click", clickHandler);
    document.querySelector("#position2").removeEventListener("click", clickHandler);
    document.querySelector("#position3").removeEventListener("click", clickHandler);
    document.querySelector("#position4").removeEventListener("click", clickHandler);
    document.querySelector("#position5").removeEventListener("click", clickHandler);
    document.querySelector("#position6").removeEventListener("click", clickHandler);
    document.querySelector("#position7").removeEventListener("click", clickHandler);
    document.querySelector("#position8").removeEventListener("click", clickHandler);
    document.querySelector("#position9").removeEventListener("click", clickHandler);

    document.querySelector("#time").classList.add("hide");
    document.querySelector("#timer").classList.add("hide");

    document.querySelector("#gameover").classList.remove("hide");
    document.querySelector("#replayknap").classList.remove("hide");
    document.querySelector("#replayknap").addEventListener("click", showStart)


}

function levelComplete() {
    console.log("levelComplete");
    document.querySelector("#position1").removeEventListener("click", clickHandler);
    document.querySelector("#position2").removeEventListener("click", clickHandler);
    document.querySelector("#position3").removeEventListener("click", clickHandler);
    document.querySelector("#position4").removeEventListener("click", clickHandler);
    document.querySelector("#position5").removeEventListener("click", clickHandler);
    document.querySelector("#position6").removeEventListener("click", clickHandler);
    document.querySelector("#position7").removeEventListener("click", clickHandler);
    document.querySelector("#position8").removeEventListener("click", clickHandler);
    document.querySelector("#position9").removeEventListener("click", clickHandler);
    document.querySelector("#time").classList.add("hide");
    document.querySelector("#timer").classList.add("hide");

    document.querySelector("#levelcomplete").classList.remove("hide");
    document.querySelector("#replayknap").classList.remove("hide");
    document.querySelector("#replayknap").addEventListener("click", showStart)
}
