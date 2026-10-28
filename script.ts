let score: number = 0;
let currentQuestion: Question;
let currentQuestionOrdinal: number = 0;

const MAIN_MENU = document.querySelector(".main-menu") as HTMLDivElement;
const START_BUTTON = document.querySelector(".start-button") as HTMLButtonElement;
const CHANGE_COLORSCHEME_BUTTON = document.querySelector(".change-colorscheme-button") as HTMLButtonElement;
const CHANGELOG_BUTTON = document.querySelector(".changelog-button") as HTMLButtonElement;
const COLORSCHEME_SETTINGS = document.querySelector(".colorscheme-settings") as HTMLDivElement;
const GO_BACK_BUTTON = document.querySelector(".go-back-button") as HTMLButtonElement;
const CHANGE_TO_TRICOLOR_BUTTON = document.querySelector("#change-to-tricolor-button") as HTMLButtonElement;
const CHANGE_TO_TRIUMVIRATE_BUTTON = document.querySelector("#change-to-triumvirate-button") as HTMLButtonElement;
const CHANGE_TO_LIGHT_BUTTON = document.querySelector("#change-to-light-button") as HTMLButtonElement;
const CHANGE_TO_DARK_BUTTON = document.querySelector("#change-to-dark-button") as HTMLButtonElement;
const CHANGELOG = document.querySelector(".changelog") as HTMLDivElement;
const GO_TO_MAIN_MENU_BUTTON = document.querySelector(".go-to-menu-button") as HTMLButtonElement;
const UPDATELOG_TEXT = document.querySelector(".updatelog-text") as HTMLParagraphElement;
const QUESTION = document.querySelector(".question") as HTMLDivElement;
const HEADER = QUESTION.querySelector("header");
const TEXT = document.querySelector(".text") as HTMLHeadingElement;
const COPYRIGHT_HEADER = document.querySelector(".copyright_header") as HTMLParagraphElement;
const MAIN = QUESTION.querySelector("main");
const IMAGE = document.querySelector(".image") as HTMLImageElement;
const FOOTER = QUESTION.querySelector("footer");
const INPUT = document.querySelector(".input") as HTMLInputElement;
const SUBMIT_BUTTON = document.querySelector(".submit-button") as HTMLButtonElement;
const DISPATCHER16 = document.querySelector(".dispatcher16") as HTMLImageElement;
const END_RESULTS = document.querySelector(".end-results") as HTMLDivElement;
const RESULTEXT = document.querySelector("#result") as HTMLHeadingElement;
const SCORE_ACQUIRED = document.querySelector("#score-acquired") as HTMLSpanElement;
const SCORE_MAXIMUM = document.querySelector("#score-maximum") as HTMLSpanElement;
const PERCENTAGE = document.querySelector("#percentage") as HTMLSpanElement;

START_BUTTON.addEventListener("click", startGame);
CHANGE_COLORSCHEME_BUTTON.addEventListener("click", displayColorSchemeSettings);
GO_BACK_BUTTON.addEventListener("click", goBackToStartMenu);
CHANGELOG_BUTTON.addEventListener("click", displayChangelog);
GO_TO_MAIN_MENU_BUTTON.addEventListener("click", goBackToStartMenu); 
CHANGE_TO_TRICOLOR_BUTTON.addEventListener("click", setColorSchemeToTricolor);
CHANGE_TO_TRIUMVIRATE_BUTTON.addEventListener("click", setColorSchemeToTriumvirate);
CHANGE_TO_LIGHT_BUTTON.addEventListener("click", setColorSchemeToLight);
CHANGE_TO_DARK_BUTTON.addEventListener("click", setColorSchemeToDark);
SUBMIT_BUTTON.addEventListener("click", submitAnswer);

function startGame(): void {
    MAIN_MENU.style.display = "none";
    QUESTION.style.display = "flex";
    displayQuestion(pickRandomUliceThatIsYetToBeIterated());
}

function displayColorSchemeSettings(): void {
    MAIN_MENU.style.display = "none";
    COLORSCHEME_SETTINGS.style.display = "flex";
}

function displayChangelog(): void {
    MAIN_MENU.style.display = "none";
    CHANGELOG.style.display = "flex";
}

function goBackToStartMenu(): void {
    COLORSCHEME_SETTINGS.style.display = "none";
    CHANGELOG.style.display = "none";
    MAIN_MENU.style.display = "flex";
}

function setColorSchemeToTricolor(): void {
    if (HEADER && MAIN && FOOTER && TEXT && COPYRIGHT_HEADER){
        TEXT.style.color = "black";
        COPYRIGHT_HEADER.style.color = "black";
        HEADER.style.backgroundColor = "red";
        MAIN.style.backgroundColor = "limegreen";
        FOOTER.style.backgroundColor = "blue";
    } else {
        console.log("ERROR: Question's header, main, footer, and text apparently do not exist.");
    }
}

function setColorSchemeToTriumvirate(): void {
    if (HEADER && MAIN && FOOTER && TEXT && COPYRIGHT_HEADER){
        TEXT.style.color = "black";
        COPYRIGHT_HEADER.style.color = "black";
        HEADER.style.backgroundColor = "antiquewhite";
        MAIN.style.backgroundColor = "bisque";
        FOOTER.style.backgroundColor = "wheat";
    } else {
        console.log("ERROR: Question's header, main, footer, and text apparently do not exist.");
    }
}

function setColorSchemeToLight(): void {
    if (HEADER && MAIN && FOOTER && TEXT && COPYRIGHT_HEADER){
        TEXT.style.color = "black";
        COPYRIGHT_HEADER.style.color = "black";
        HEADER.style.backgroundColor = "whitesmoke";
        MAIN.style.backgroundColor = "white";
        FOOTER.style.backgroundColor = "whitesmoke";
    } else {
        console.log("ERROR: Question's header, main, footer, and text apparently do not exist.");
    }
}

function setColorSchemeToDark(): void {
    if (HEADER && MAIN && FOOTER && TEXT && COPYRIGHT_HEADER){
        TEXT.style.color = "white";
        COPYRIGHT_HEADER.style.color = "white";
        HEADER.style.backgroundColor = "black";
        MAIN.style.backgroundColor = "dimgray";
        FOOTER.style.backgroundColor = "gray";
    } else {
        console.log("ERROR: Question's header, main, footer, and text apparently do not exist.");
    }
}

const PRELOADED_IMAGES: HTMLImageElement[] = [];

function preloadImages(): void {
    let i = 0;
    TO_BE_ITERATED.forEach(q => {
        if (q.imagePath){
            i++
            const img = new Image();
            img.src = q.imagePath;
            PRELOADED_IMAGES.push(img);
            console.log(i + ". Loading image: " + img.src)
        }
    })
}

function pickRandomUliceThatIsYetToBeIterated(): Question {
    if (TO_BE_ITERATED.length <= 0){
        finishQuiz();
    }
    let roll: number = Math.floor(Math.random() * TO_BE_ITERATED.length);
    currentQuestion = TO_BE_ITERATED[roll];
    currentQuestionOrdinal += 1;
    TO_BE_ITERATED.splice(roll, 1);
    return currentQuestion;
}

function displayQuestion(question: Question): void {
    if (question && TEXT && IMAGE && SUBMIT_BUTTON){
        TEXT.textContent = currentQuestionOrdinal + ". " + question.text;
        if (!question.imagePath){
            TEXT.textContent = "ERROR: Could not load the image. The current question's imagepath is probably null or undefined.";
        } else {
            if (question.imagePath == "images/adamusova_orlova.png" || question.imagePath == "images/na_olmovci.png" || question.imagePath == "images/f_s_tumy.png" || question.imagePath == "images/kratka.png"){
                DISPATCHER16.style.display = "inline";
            } else {
                DISPATCHER16.style.display = "none";
            }
            IMAGE.src = question.imagePath;
        }
    }
}

function submitAnswer(): void {
    if (currentQuestion.answers.includes(INPUT.value.toLowerCase())){
        SUBMIT_BUTTON.style.background = "green";
        score += 1;
        console.log("Good job! Correct answer! Score plus one! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomUliceThatIsYetToBeIterated());
    }
    else {
        SUBMIT_BUTTON.style.background = "red";
        console.log("Wrong! Incorrect answer! No new score added! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomUliceThatIsYetToBeIterated());
    }
}

function finishQuiz(): void {
    QUESTION.style.display = "none";
    END_RESULTS.style.display = "flex";
    SCORE_ACQUIRED.textContent = score.toString();
    SCORE_MAXIMUM.textContent = maxScore.toString();
    PERCENTAGE.textContent = ((score / maxScore) * 100).toString();
}

//-----------------------------------------------------------------------------------

class Question{
    text!: string;
    imagePath!: string;
    answers!: Array<string>;
    result!: boolean;
    constructor(text: string, imagePath: string, answers: Array<string>){
        this.text = text;
        this.imagePath = imagePath;
        this.answers = answers;
    }
    setResult(value: boolean){
        if (value){this.result = true;}
        else {this.result = false;}
    }
}

const TO_BE_ITERATED: Array<Question> = [];

const MASARYKOVA_TRIDA = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/masarykova_trida.png", [
        "masarykova třída", "masarykova trida",
        "masarykova třida", "masarykova trída",
        "masarykova tř.", "masarykova tř",
        "masarykova tr.", "masarykova tr"
    ]
);
TO_BE_ITERATED.push(MASARYKOVA_TRIDA);

const SEDMNACTEHO_LISTOPADU_ORLOVA = new Question("Co je tohle za ulici v Orlové?",
    "images/17_listopadu_orlova.png", [
        "17.listopadu", "17. listopadu", 
        "sedmnacteho listopadu", "sedmnáctého listopadu",
        "sedmnactého listopadu", "sedmnácteho listopadu"
    ]
);
TO_BE_ITERATED.push(SEDMNACTEHO_LISTOPADU_ORLOVA);

const KPT_JAROSE = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/kpt_jarose.png", [
        "kpt. jaroše", "kpt jaroše", "kpt. jarose", "kpt jarose",
        "kapitána jaroše", "kapitana jaroše",
        "kapitána jarose", "kapitana jarose"
    ]
);
TO_BE_ITERATED.push(KPT_JAROSE);

const OSVOBOZENI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/osvobozeni.png", [
        "osvobození", "osvobozeni"
    ]
);
TO_BE_ITERATED.push(OSVOBOZENI);

const NA_STUCHLIKOVCI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/na_stuchlikovci.png", [
        "na stuchlíkovci", "na stuchlikovci"
    ]
);
TO_BE_ITERATED.push(NA_STUCHLIKOVCI);

const NA_VYHLIDCE = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/na_vyhlidce.png", [
        "na vyhlídce", "na vyhlidce"
    ]
);
TO_BE_ITERATED.push(NA_VYHLIDCE);

const LESNI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/lesni.png", [
        "lesní", "lesni"
    ]
);
TO_BE_ITERATED.push(LESNI);

const KVETINOVA = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/kvetinova.png", [
        "květinová", "květinova", "kvetinova", "kvetinová"
    ]
);
TO_BE_ITERATED.push(KVETINOVA);

const OKRUZNI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/okruzni.png", [
        "okružní", "okruzni", "okružni", "okruzní"
    ]
);
TO_BE_ITERATED.push(OKRUZNI);

const ENERGETIKU = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/energetiku.png", [
        "energetiků", "energetiku"
    ]
);
TO_BE_ITERATED.push(ENERGETIKU);

const SKOLNI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/skolni.png", [
        "školní", "skolni", "školni", "skolní"
    ]
);
TO_BE_ITERATED.push(SKOLNI);

const U_MORAVY = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/u_moravy.png", [
        "u moravy"
    ]
);
TO_BE_ITERATED.push(U_MORAVY);

const POLNI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/polni.png", [
        "polní", "polni"
    ]
);
TO_BE_ITERATED.push(POLNI);

const RYDULTOWSKA = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/rydultowska.png", [
        "rydultowská", "rydultowska"
    ]
);
TO_BE_ITERATED.push(RYDULTOWSKA);

const SLEZSKA = new Question("Co je tohle za ulici v Porembě a Městě?",
    "images/slezska.png", [
        "slezská", "slezska"
    ]
);
TO_BE_ITERATED.push(SLEZSKA);

const ZATISI = new Question("Co je tohle za ulici v Orlové-Lutyni a Porubě?",
    "images/zatisi.png", [
        "zátiší", "zátiši", "zátisí", "zátisi",
        "zatiši", "zatisí", "zatiší"
    ]
);
TO_BE_ITERATED.push(ZATISI);

const K_VENUSI = new Question("Co je tohle za ulici v Orlové-Lutyni?",
    "images/k_venusi.png", [
        "k venuši", "k venusi"
    ]
);
TO_BE_ITERATED.push(K_VENUSI);

const ODLEHLA = new Question("Co je tohle za ulici v Horní Lutyni?",
    "images/odlehla.png", [
        "odlehlá", "odlehla"
    ]
);
TO_BE_ITERATED.push(ODLEHLA);

const U_KAPLICKY = new Question("Co je tohle za ulici v Horní Lutyni?",
    "images/u_kaplicky.png", [
        "u kapličky", "u kaplicky"
    ]
);
TO_BE_ITERATED.push(U_KAPLICKY);

const NA_OLMOVCI = new Question("Co je tohle za ulici v Horní Lutyni??",
    "images/na_olmovci.png", [
        "na olmovci"
    ]
);
TO_BE_ITERATED.push(NA_OLMOVCI);

const F_S_TUMY = new Question("Co je tohle za ulici v Horní Lutyni na 5. etapě?",
    "images/f_s_tumy.png", [
        "f. s. tůmy", "f.s. tůmy", "f s tůmy", "fs tůmy", 
        "f. s. tumy", "f.s. tumy", "f s tumy", "fs tumy",
        "františka sokola tůmy", "františka sokola-tůmy",
        "franty sokola tůmy", "franty sokola-tůmy",
        "františka sokola tumy", "františka sokola-tumy",
        "franty sokola tumy", "franty sokola-tumy",
        "frantiska sokola tůmy", "frantiska sokola-tůmy"
    ]
);
TO_BE_ITERATED.push(F_S_TUMY);

const NADRAZNI_ORLOVA = new Question("Co je tohle za ulici v Orlové-Porubě a starém městě?",
    "images/nadrazni_orlova.png", [
        "nádražní", "nádražni", "nádrazni", "nadrazni",
        "nadražní", "nadražni", "nadrazní"
    ]
);
TO_BE_ITERATED.push(NADRAZNI_ORLOVA);

const TESINSKA = new Question("Co je tohle za ulici v Orlové-Porubě?",
    "images/tesinska_orlova.png", [
        "těšínská", "těšínska", "těšinska", "těsinska", "tesinska",
        "těsinska", "tešinska", "tesínska", "tesinská", "těsinská",
        "tešínska", "těšinska"
    ]
);
TO_BE_ITERATED.push(TESINSKA);

const NADRAZNI_OSTRAVA = new Question("Co je tohle za ulici v Ostravě?",
    "images/nadrazni_ostrava.png", [
        "nádražní", "nádražni", "nádrazni", "nadrazni",
        "nadražní", "nadražni", "nadrazní"
    ]
);
TO_BE_ITERATED.push(NADRAZNI_OSTRAVA);

const DVACATEHOOSMEHO_RIJNA = new Question("Co je tohle za ulici v Ostravě?",
    "images/28_rijna.png", [
        "28.října", "28 října", "28října",
        "28.řijna", "28 řijna", "28řijna",
        "28.rijna", "28 rijna", "28rijna",
        "28.ríjna", "28 ríjna", "28ríjna",
        "dvacatehoosmeho října", "dvacátéhoosmého října",
        "dvacatehoosmeho řijna", "dvacátéhoosmého řijna",
        "dvacatehoosmeho rijna", "dvacátéhoosmého rijna",
        "dvacatehoosmeho ríjna", "dvacátéhoosmého ríjna",
        "28. rijna"
    ]
);
TO_BE_ITERATED.push(DVACATEHOOSMEHO_RIJNA);

const OPAVSKA = new Question("Co je tohle za ulici v západní Ostravě?",
    "images/opavska.png", [
        "opavská", "opavska"
    ]
);
TO_BE_ITERATED.push(OPAVSKA);

const PUSTKOVECKA = new Question("Co je tohle za ulici v Pustkovci?",
    "images/pustkovecka.png", [
        "pustkovecká", "pustkovecka"
    ]
);
TO_BE_ITERATED.push(PUSTKOVECKA);

const NABREZI_SPB = new Question("Co je tohle za ulici v Ostravě-Porubě?",
    "images/nabrezi_spb.png", [
        "nspb", "n spb", "n.spb", "n. spb", "n s p b", "n.s.p.b", "n s p b.", "n s p. b", "n s. p b", "n. s p b", "n.s.p.b.", "n s p. b.", "n s. p b.", "n s. p. b", "n sv. p b", "n. s p b.", "n. s p. b", "n. s. p b", "n s p boj.", "n s. p. b.", "n sv. p b.", "n sv. p. b", "n svazu pb", "n. s p. b.", "n. s. p b.", "n. s. p. b", "n. sv. p b", "nabrezi pb", "nábřezi pb", "nábřezí pb", "nábřeží pb", "n s p. boj.", "n s prot. b", "n s. p boj.", "n sv. p. b.", "n svazu p b", "n. s p boj.", "n. s. p. b.", "n. sv. p b.", "n. sv. p. b", "n. svazu pb", "nabrezi p b", "nabrezi spb", "nábřezi p b", "nábřezi spb", "nábřezí p b", "nábřezí spb", "nábřeží p b", "nábřeží spb", "n s prot. b.", "n s. p. boj.", "n s. prot. b", "n sv. p boj.", "n svazu p b.", "n svazu p. b", "n. s p. boj.", "n. s prot. b", "n. s. p boj.", "n. sv. p. b.", "n. svazu p b", "n.svazu p.b.", "nabrezi p.b.", "nábřezi p.b.", "nábřezí p.b.", "nábřeží p.b.", "n s. prot. b.", "n sv. p. boj.", "n sv. prot. b", "n svazu p. b.", "n. s prot. b.", "n. s. p. boj.", "n. s. prot. b", "n. sv. p boj.", "n. svazu p b.", "n. svazu p. b", "n. svazu p.b.", "nabrezi s p b", "nábřezi s p b", "nábřezí s p b", "nábřeží s p b", "n s prot. boj.", "n sv. prot. b.", "n svazu p boj.", "n. s. prot. b.", "n. sv. p. boj.", "n. sv. prot. b", "n. svazu p. b.", "nabrezi s.p.b.", "nábřezi s.p.b.", "nábřezí s.p.b.", "nábřeží s.p.b.", "n s p bojovniku", "n s p bojovníků", "n s. prot. boj.", "n svazu p. boj.", "n svazu prot. b", "n. s prot. boj.", "n. sv. prot. b.", "n. svazu p boj.", "n s p. bojovniku", "n s p. bojovníků", "n s. p bojovniku", "n s. p bojovníků", "n sv. prot. boj.", "n svazu prot. b.", "n. s p bojovniku", "n. s p bojovníků", "n. s. prot. boj.", "n. svazu p. boj.", "n. svazu prot. b", "nabrezi svazu pb", "nábřezi svazu pb", "nábřezí svazu pb", "nábřeží svazu pb", "n s. p. bojovniku", "n s. p. bojovníků", "n sv. p bojovniku", "n sv. p bojovníků", "n. s p. bojovniku", "n. s p. bojovníků", "n. s. p bojovniku", "n. s. p bojovníků", "n. sv. prot. boj.", "n. svazu prot. b.", "nabrezi svazu p b", "nábřezi svazu p b", "nábřezí svazu p b", "nábřeží svazu p b", "n sv. p. bojovniku", "n sv. p. bojovníků", "n svazu prot. boj.", "n. s. p. bojovniku", "n. s. p. bojovníků", "n. sv. p bojovniku", "n. sv. p bojovníků", "nabrezi svazu p.b.", "nábřezi svazu p.b.", "nábřezí svazu p.b.", "nábřeží svazu p.b.", "n s prot. bojovniku", "n s prot. bojovníků", "n svazu p bojovniku", "n svazu p bojovníků", "n. sv. p. bojovniku", "n. sv. p. bojovníků", "n. svazu p bojovniku", "n. svazu p bojovníků", "n. sv. p. bojovniku", "n. sv. p. bojovníků", "n. svazu p. bojovniku", "n. svazu p. bojovníků", "nabrezi svazu s p b", "nábřezi svazu s p b", "nábřezí svazu s p b", "nábřeží svazu s p b", "n s. prot. bojovniku", "n s. prot. bojovníků", "n sv. prot. bojovniku", "n sv. prot. bojovníků", "n svazu prot. bojovniku", "n svazu prot. bojovníků", "n. s. prot. bojovniku", "n. s. prot. bojovníků", "n. sv. prot. bojovniku", "n. sv. prot. bojovníků", "n. svazu prot. bojovniku", "n. svazu prot. bojovníků", "nabrezi svazu s.p.b.", "nábřezi svazu s.p.b.", "nábřezí svazu s.p.b.", "nábřeží svazu s.p.b.", "n sv. prot. bojovniku", "n sv. prot. bojovníků", "n. sv. prot. bojovniku", "n. sv. prot. bojovníků", "n. svazu prot. bojovniku", "n. svazu prot. bojovníků", "nabrezi svazu protifašistických bojovníků", "nabrezi svazu protifašistických bojovniku", "nabrezi svazu protifašistických bojovniků", "nabrezi svazu protifašistických bojovníku", "nabrezi svazu protifasistickych bojovniku", "nabrezi svazu protifasistickych bojovniků", "nabrezi svazu protifasistickych bojovníku", "nabrezi svazu protifasistickych bojovníků", "nabrezi svazu protifasistických bojovniku", "nabrezi svazu protifasistických bojovniků", "nabrezi svazu protifasistických bojovníku", "nabrezi svazu protifasistických bojovníků", "nabrezi svazu protifašistickych bojovniku", "nabrezi svazu protifašistickych bojovniků", "nabrezi svazu protifašistickych bojovníku", "nabrezi svazu protifašistickych bojovníků", "nábřezi svazu protifašistických bojovníků", "nábřezi svazu protifašistických bojovniku", "nábřezi svazu protifašistických bojovniků", "nábřezi svazu protifašistických bojovníku", "nábřezi svazu protifasistickych bojovniku", "nábřezi svazu protifasistickych bojovniků", "nábřezi svazu protifasistickych bojovníku", "nábřezi svazu protifasistickych bojovníků", "nábřezi svazu protifasistických bojovniku", "nábřezi svazu protifasistických bojovniků", "nábřezi svazu protifasistických bojovníku", "nábřezi svazu protifasistických bojovníků", "nábřezi svazu protifašistickych bojovniku", "nábřezi svazu protifašistickych bojovniků", "nábřezi svazu protifašistickych bojovníku", "nábřezi svazu protifašistickych bojovníků", "nábřezí svazu protifašistických bojovníků", "nábřezí svazu protifašistických bojovniku", "nábřezí svazu protifašistických bojovniků", "nábřezí svazu protifašistických bojovníku", "nábřezí svazu protifasistickych bojovniku", "nábřezí svazu protifasistickych bojovniků", "nábřezí svazu protifasistickych bojovníku", "nábřezí svazu protifasistickych bojovníků", "nábřezí svazu protifasistických bojovniku", "nábřezí svazu protifasistických bojovniků", "nábřezí svazu protifasistických bojovníku", "nábřezí svazu protifasistických bojovníků", "nábřezí svazu protifašistickych bojovniku", "nábřezí svazu protifašistickych bojovniků", "nábřezí svazu protifašistickych bojovníku", "nábřezí svazu protifašistickych bojovníků", "nábřeži svazu protifašistických bojovníků", "nábřeži svazu protifašistických bojovniku", "nábřeži svazu protifašistických bojovniků", "nábřeži svazu protifašistických bojovníku", "nábřeži svazu protifasistickych bojovniku", "nábřeži svazu protifasistickych bojovniků", "nábřeži svazu protifasistickych bojovníku", "nábřeži svazu protifasistickych bojovníků", "nábřeži svazu protifasistických bojovniku", "nábřeži svazu protifasistických bojovniků", "nábřeži svazu protifasistických bojovníku", "nábřeži svazu protifasistických bojovníků", "nábřeži svazu protifašistickych bojovniku", "nábřeži svazu protifašistickych bojovniků", "nábřeži svazu protifašistickych bojovníku", "nábřeži svazu protifašistickych bojovníků", "nábřeží svazu protifašistických bojovníků", "nábřeží svazu protifašistických bojovniku", "nábřeží svazu protifašistických bojovniků", "nábřeží svazu protifašistických bojovníku", "nábřeží svazu protifasistickych bojovniku", "nábřeží svazu protifasistickych bojovniků", "nábřeží svazu protifasistickych bojovníku", "nábřeží svazu protifasistickych bojovníků", "nábřeží svazu protifasistických bojovniku", "nábřeží svazu protifasistických bojovniků", "nábřeží svazu protifasistických bojovníku", "nábřeží svazu protifasistických bojovníků", "nábřeží svazu protifašistickych bojovniku", "nábřeží svazu protifašistickych bojovniků", "nábřeží svazu protifašistickych bojovníku", "nábřeží svazu protifašistickych bojovníků"
    ]
);
TO_BE_ITERATED.push(NABREZI_SPB);

const HLAVNI_TRIDA = new Question("Co je tohle za ulici v Ostravě-Porubě?",
    "images/hlavni_trida.png", [
        "hlavní třída", "hlavni trida", "hlavní třida",
        "hlavni třída", "hlavní trída", "hlavni třida"
    ]
);
TO_BE_ITERATED.push(HLAVNI_TRIDA);

const HORNI = new Question("Co je tohle za ulici v Ostravě???",
    "images/horni.png", [
        "horní", "horni"
    ]
);
TO_BE_ITERATED.push(HORNI);

const AVIATIKU = new Question("Co je tohle za ulici v jížní Hrabůvce?",
    "images/aviatiku.png", [
        "aviatiků", "aviatiku"
    ]
);
TO_BE_ITERATED.push(AVIATIKU);

const KRESTOVA = new Question("Co je tohle za ulici v jížní Hrabůvce??",
    "images/krestova.png", [
        "krestova", "krestova"
    ]
);
TO_BE_ITERATED.push(KRESTOVA);

const DR_MARTINKA = new Question("Co je tohle za ulici v Ostravě-Hrabůvce?",
    "images/dr_martinka.png", [
        "dr martínka", "dr martinka", "doktora martínka",
        "doktora martinka", "dr.martínka", "dr.martinka",
        "dr. martínka", "dr. martinka"
    ]
);
TO_BE_ITERATED.push(DR_MARTINKA);

const KLEGOVA = new Question("Co je tohle za ulici ve střední Hrabůvce?",
    "images/klegova.png", [
        "klegova"
    ]
);
TO_BE_ITERATED.push(KLEGOVA);

const MUGLINOVSKA = new Question("Co je tohle za ulici v Ostravě?",
    "images/muglinovska.png", [
        "muglinovská", "muglinovska"
    ]
);
TO_BE_ITERATED.push(MUGLINOVSKA);

const ORLOVSKA_OSTRAVA = new Question("Co je tohle za ulici v Ostravě?",
    "images/orlovska_ostrava.png", [
        "orlovská", "orlovska"
    ]
);
TO_BE_ITERATED.push(ORLOVSKA_OSTRAVA);

const ORLOVSKA_RYCHVALD = new Question("Co je tohle za ulici v Rychvaldě?",
    "images/orlovska_rychvald.png", [
        "orlovská", "orlovska"
    ]
);
TO_BE_ITERATED.push(ORLOVSKA_RYCHVALD);

const PROVAZNICKA = new Question("Co je tohle za ulici v Hrabůvce?",
    "images/provaznicka.png", [
        "provaznická", "provaznicka"
    ]
);
TO_BE_ITERATED.push(PROVAZNICKA);

const ORACOVA = new Question("Co je tohle za ulici v jížní Hrabůvce??",
    "images/oracova.png", [
        "oráčova", "oracova", "orácova", "oračova"
    ]
);
TO_BE_ITERATED.push(ORACOVA);

const VARENSKA = new Question("Co je tohle za ulici v Moravské Ostravě??",
    "images/varenska.png", [
        "varenská", "varenska"
    ]
);
TO_BE_ITERATED.push(VARENSKA);

const CESKOBRATRSKA = new Question("Co je tohle za ulici v centru Ostravy??",
    "images/ceskobratrska.png", [
        "českobratrská", "ceskobratrska", "českobratrska",
        "ceskobratrská"
    ]
);
TO_BE_ITERATED.push(CESKOBRATRSKA);

const U_PRODEJNY = new Question("Co je tohle za ulici ve střední Hrabůvce??",
    "images/u_prodejny.png", [
        "u prodejny"
    ]
);
TO_BE_ITERATED.push(U_PRODEJNY);

const NA_MYTE = new Question("Co je tohle za mini ulici ve střední Hrabůvce??",
    "images/na_myte.png", [
        "na mýtě", "na mýte", "na mytě", "na myte"
    ]
);
TO_BE_ITERATED.push(NA_MYTE);

const NA_FOJTSTVI = new Question("Co je tohle za mini ulici ve střední Hrabůvce?",
    "images/na_fojtstvi.png", [
        "na fojtství", "na fojtstvi", "na fojctvi", "na fojctví",
        "na foictví", "na foictvi"
    ]
);
TO_BE_ITERATED.push(NA_FOJTSTVI);

const MITUSOVA = new Question("Co je tohle za ulici v západní Hrabůvce?",
    "images/mitusova.png", [
        "mitušova", "mitusova"
    ]
);
TO_BE_ITERATED.push(MITUSOVA);

const U_LESA = new Question("Co je tohle za ulici v západní Hrabůvce??",
    "images/u_lesa.png", [
        "u lesa"
    ]
);
TO_BE_ITERATED.push(U_LESA);

const KRAKOVSKA = new Question("Co je tohle za ulici v západní Hrabůvce???",
    "images/krakovska.png", [
        "krakovská", "krakovska"
    ]
);
TO_BE_ITERATED.push(KRAKOVSKA);

const SEDMNACTEHO_LISTOPADU_OSTRAVA = new Question("Co je tohle za ulici v Porubě, Pustkovci, a Martinově?",
    "images/17_listopadu_ostrava.png", [
        "17.listopadu", "17. listopadu", 
        "sedmnacteho listopadu", "sedmnáctého listopadu",
        "sedmnactého listopadu", "sedmnácteho listopadu"
    ]
);
TO_BE_ITERATED.push(SEDMNACTEHO_LISTOPADU_OSTRAVA);

const BEDRICHA_NIKODEMA = new Question("Co je tohle za ulici v Porubě a Pustkovci?",
    "images/bedricha_nikodema.png", [
        "bedřicha nikodéma", "bedřicha nikodema", "bedricha nikodéma",
        "bedricha nikodema"
    ]
);
TO_BE_ITERATED.push(BEDRICHA_NIKODEMA);

const MARTINOVSKA = new Question("Co je tohle za ulici v Porubě, Třebovicích, Pustkovci, a Martinově?",
    "images/martinovska.png", [
        "martinovská", "martinovska"
    ]
);
TO_BE_ITERATED.push(MARTINOVSKA);

const EDEN = new Question("Co je tohle za mikro ulici v Rychvaldě?",
    "images/eden.png", [
        "eden"
    ]
);
TO_BE_ITERATED.push(EDEN);

const MODRINOVA = new Question("Co je tohle za ulici v Lutyni?",
    "images/modrinova.png", [
        "modřinová", "modrinova", "modřinova", "modrinová"
    ]
);
TO_BE_ITERATED.push(MODRINOVA);

const JIZNI = new Question("Co je tohle za ulici v Lutyni??",
    "images/jizni.png", [
        "jížní", "jízní", "jizni", "jižní", "jižni", "jizní", "jízní", "jížni"
    ]
);
TO_BE_ITERATED.push(JIZNI);

const ZELENA = new Question("Co je tohle za ulici v Lutyni???",
    "images/zelena.png", [
        "zelená", "zelena"
    ]
);
TO_BE_ITERATED.push(ZELENA);

const NA_KOPECKU = new Question("Co je tohle za ulici v Lutyni????",
    "images/na_kopecku.png", [
        "na kopečku", "na kopecku"
    ]
);
TO_BE_ITERATED.push(NA_KOPECKU);

const BOZDECHOVA = new Question("Co je tohle za mikro ulici v Moravské Ostravě?",
    "images/bozdechova.png", [
        "bozděchova", "bozdechova"
    ]
);
TO_BE_ITERATED.push(BOZDECHOVA);

const ADAMUSOVA_ORLOVA = new Question("Co je tohle za ulici na 5. etapě v Lutyni?",
    "images/adamusova_orlova.png", [
        "adamusova"
    ]
);
TO_BE_ITERATED.push(ADAMUSOVA_ORLOVA);

const ADAMUSOVA_OSTRAVA = new Question("Co je tohle za ulici ve střední Hrabůvce?",
    "images/adamusova_ostrava.png", [
        "adamusova"
    ]
);
TO_BE_ITERATED.push(ADAMUSOVA_OSTRAVA);

const MIROVA = new Question("Co je tohle za ulici v Orlové?",
    "images/mirova.png", [
        "mírová", "mirova", "mírova", "mirová"
    ]
);
TO_BE_ITERATED.push(MIROVA);

const DOUBRAVSKA = new Question("Co je tohle za ulici v Orlové?",
    "images/doubravska.png", [
        "doubravská", "doubravska"
    ]
);
TO_BE_ITERATED.push(DOUBRAVSKA);

const NA_STRANI = new Question("Co je tohle za ulici v Orlové?",
    "images/na_strani.png", [
        "na stráni", "na strani"
    ]
);
TO_BE_ITERATED.push(NA_STRANI);

const U_VODOJEMU = new Question("Co je tohle za ulici v Orlové?",
    "images/u_vodojemu.png", [
        "u vodojemu"
    ]
);
TO_BE_ITERATED.push(U_VODOJEMU);

const K_ZIMOVUDCE = new Question("Co je tohle za ulici v Orlové?",
    "images/k_zimovudce.png", [
        "k zimovudce", "k zimovůdce"
    ]
);
TO_BE_ITERATED.push(K_ZIMOVUDCE);

const KRATKA = new Question("Co je tohle za ulici na 5. etapě?",
    "images/kratka.png", [
        "krátká", "krátka", "kratká", "kratka"
    ]
);
TO_BE_ITERATED.push(KRATKA);

const ELDORADO = new Question("Co je tohle za ulici v Rychvaldě?",
    "images/eldorado.png", [
        "eldorádo", "eldorado"
    ]
);
TO_BE_ITERATED.push(ELDORADO);

const U_DZUNGLE = new Question("Co je tohle za uličku v Rychvaldě?",
    "images/u_dzungle.png", [
        "u džungle", "u dzungle", "u jungle"
    ]
);
TO_BE_ITERATED.push(U_DZUNGLE);

preloadImages();

const maxScore: number = TO_BE_ITERATED.length;

console.log(TO_BE_ITERATED)
console.log("Max score constant: " + maxScore)

const ITERATED: Array<Question> = [];

//***********************************************************/

const VERSION_1_0: string = `Verze 1.0 "Release" - sobota 24.10.2026
    - vývoj začal pondělí 19.10.2026
    - 63 ulic - ve všech jsem byl anebo je znám
    - Grafické schémata trikolóra, triumvirát, světlo, temno
    - Prostor na chyby = jiné platné zápisy a malé gramatické chyby se počítají
`;

const VERSION_1_1: string = `Verze 1.1 "Hotfix" - neděle 25.10.2026
    - vývoj začal a skončil 25.10.2026
    - oprava obrázkové latence:
        - ve verzi 1.0 se obrázky načetly v moment co byly potřeba, což způsobilo drtivou latenci
        - nyní se obrázky načtou hned co se otevře stránka
    - přidal jsem html head title "Azurulice (Azurové Ulice)" (v Releasu jsem to zapomněl změnit)
`;

const VERSION_1_2: string = `Verze 1.2 "Tweak" - pondělí 26.10.2026
    - vývoj začal 25.10.2026 a skončil 26.10.2026
    - Změnil jsem otázku o Edenu z "Co je tohle za ulici v Rychvaldě?" na "Co je tohle za mikro ulici v Rychvaldě?"
    - Přidal jsem 3 nové ulice, které zas tak moc dobře neznám, ale teď si je určitě budu stopro pamatovat:
        1. Krátká (Orlová-Lutyně)
        2. Eldorádo (Rychvald)
        3. U Džungle (Rychvald)
`;

const VERSION_1_3: string = `Verze 1.3 "Minor" - středa 28.10.2026 svátek
    - vývoj začal a skončil 28.10.2026
    - Přidal jsem tuto hru na itch.io (https://lutynius.itch.io/azurulice):
        - v minulých verzí neměl html body a end-results dané pozadí, a tak se v itch.io načetly černě, což způsobilo, že nešlo text přečíst
        - přidal jsem html body a end-results bílé pozadí
    - Spravil jsem stackování schémat:
        - v minulých verzí jste mohli např. nastavit světlé a černé schéma a to způsobilo že text měl stejnou barvu jako pozadí a nešlo text přečíst
        - nyní nemůžete stackovat barevná schémata
`

const LOG: string =
    VERSION_1_3 + "\n" +
    VERSION_1_2 + "\n" +
    VERSION_1_1 + "\n"
    + VERSION_1_0;

UPDATELOG_TEXT.textContent = LOG;

export {};
