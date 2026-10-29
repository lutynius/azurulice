let score: number = 0;
let currentQuestion: Question;
let currentQuestionOrdinal: number = 0;

const MAIN_MENU = document.getElementById("main-menu") as HTMLDivElement;
const MAIN_MENU_TITLE = document.getElementById("main-menu-title") as HTMLHeadingElement;
const MAIN_MENU_SUBTITLE = document.getElementById("main-menu-subtitle") as HTMLHeadingElement;
const START_BUTTON = document.getElementById("start-button") as HTMLButtonElement;
const COLORSCHEME_BUTTON = document.getElementById("colorscheme-button") as HTMLButtonElement;
const CHANGELOG_BUTTON = document.getElementById("changelog-button") as HTMLButtonElement;

const COLORSCHEME_SETTINGS = document.getElementById("colorscheme-settings") as HTMLDivElement;
const SET_TRICOLOR_BUTTON = document.getElementById("set-tricolor-button") as HTMLButtonElement;
const SET_TRIUMVIRATE_BUTTON = document.getElementById("set-triumvirate-button") as HTMLButtonElement;
const SET_LIGHT_BUTTON = document.getElementById("set-light-button") as HTMLButtonElement;
const SET_DARK_BUTTON = document.getElementById("set-dark-button") as HTMLButtonElement;
const COLORSCHEME_TITLES = document.querySelectorAll(".colorscheme-titles");
const COLORSCHEME_TO_MAIN_MENU_BUTTON = document.getElementById("colorscheme-to-main-menu-button") as HTMLButtonElement;
const TRICOLOR_TITLE = document.getElementById("tricolor-title") as HTMLHeadingElement;
const TRIUMVIRATE_TITLE = document.getElementById("triumvirate-title") as HTMLHeadingElement;
const LIGHT_TITLE = document.getElementById("light-title") as HTMLHeadingElement;
const DARK_TITLE = document.getElementById("dark-title") as HTMLHeadingElement;

const CHANGELOG = document.getElementById("changelog") as HTMLDivElement;
const UPDATELOG_TEXT = document.getElementById("updatelog-text") as HTMLParagraphElement;
const CHANGELOG_TO_MAIN_MENU_BUTTON = document.getElementById("changelog-to-main-menu-button") as HTMLButtonElement;

const GAME_MENU = document.getElementById("game-menu") as HTMLDivElement;
const HEADER = document.getElementById("header") as HTMLDivElement;
const QUESTION_TEXT = document.getElementById("question-text") as HTMLHeadingElement;
const COPYRIGHT = document.getElementById("copyright") as HTMLParagraphElement;
const MAIN = document.getElementById("main") as HTMLDivElement;
const QUESTION_IMAGE = document.getElementById("question-image") as HTMLImageElement;
const FOOTER = document.getElementById("footer") as HTMLDivElement;
const FOOT_TITLE = document.getElementById("foot-title") as HTMLHeadingElement;
const QUESTION_INPUT = document.getElementById("question-input") as HTMLInputElement;
const SUBMIT_BUTTON = document.getElementById("submit-button") as HTMLButtonElement;

const END_RESULTS = document.getElementById("end-results") as HTMLDivElement;
const END_TITLE = document.getElementById("end-title") as HTMLHeadingElement;
const END_SUBTITLE = document.getElementById("end-subtitle") as HTMLHeadingElement;
const END_LETITLE = document.getElementById("end-letitle") as HTMLHeadingElement;
const SCORE = document.getElementById("score") as HTMLHeadingElement;
const SCORE_ACQUIRED = document.getElementById("score-acquired") as HTMLSpanElement;
const SCORE_MAXIMUM = document.getElementById("score-maximum") as HTMLSpanElement;
const PERCENTAGE = document.getElementById("percentage") as HTMLSpanElement;
const PERCENT = document.getElementById("percent") as HTMLHeadingElement;

//----------------------------------------------------------------//

START_BUTTON.addEventListener("click", startGame);
COLORSCHEME_BUTTON.addEventListener("click", displayColorSchemeSettings);
CHANGELOG_BUTTON.addEventListener("click", displayChangelog);

COLORSCHEME_TO_MAIN_MENU_BUTTON.addEventListener("click", backToMainMenu);
CHANGELOG_TO_MAIN_MENU_BUTTON.addEventListener("click", backToMainMenu);

SET_TRICOLOR_BUTTON.addEventListener("click", () => setColorScheme("tricolor"));
SET_TRIUMVIRATE_BUTTON.addEventListener("click", () => setColorScheme("triumvirate"));
SET_LIGHT_BUTTON.addEventListener("click", () => setColorScheme("light"));
SET_DARK_BUTTON.addEventListener("click", () => setColorScheme("dark"));

SUBMIT_BUTTON.addEventListener("click", submitAnswer);

function startGame(): void {
    MAIN_MENU.style.display = "none";
    GAME_MENU.style.display = "flex";
    displayQuestion(pickRandomSquareThatIsYetToBeIterated());
}

function displayColorSchemeSettings(): void {
    MAIN_MENU.style.display = "none";
    COLORSCHEME_SETTINGS.style.display = "flex";
}

function displayChangelog(): void {
    MAIN_MENU.style.display = "none";
    CHANGELOG.style.display = "flex";
}

function backToMainMenu(): void {
    CHANGELOG.style.display = "none";
    COLORSCHEME_SETTINGS.style.display = "none";
    MAIN_MENU.style.display = "flex";
}

function pickRandomSquareThatIsYetToBeIterated(): Question {
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
    if (question && QUESTION_TEXT && QUESTION_IMAGE && SUBMIT_BUTTON){
        QUESTION_TEXT.textContent = currentQuestionOrdinal + ". " + question.text;
        if (!question.imagePath){
            QUESTION_TEXT.textContent = "ERROR: Could not load the image. The current question's imagepath is probably null or undefined.";
        } else {
            QUESTION_IMAGE.src = question.imagePath;
        }
    }
}

function submitAnswer(): void {
    if (currentQuestion.answers.includes(QUESTION_INPUT.value.toLowerCase())){
        SUBMIT_BUTTON.style.background = "green";
        score += 1;
        console.log("Good job! Correct answer! Score plus one! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomSquareThatIsYetToBeIterated());
    }
    else {
        SUBMIT_BUTTON.style.background = "red";
        console.log("Wrong! Incorrect answer! No new score added! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomSquareThatIsYetToBeIterated());
    }
}

function finishQuiz(): void {
    GAME_MENU.style.display = "none";
    END_RESULTS.style.display = "flex";
    SCORE_ACQUIRED.textContent = score.toString();
    SCORE_MAXIMUM.textContent = maxScore.toString();
    PERCENTAGE.textContent = ((score / maxScore) * 100).toString();
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

function setColorScheme(colorScheme: string): void {
    if (colorScheme == "tricolor"){
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "white";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "red";
        COLORSCHEME_BUTTON.style.backgroundColor = "limegreen";
        CHANGELOG_BUTTON.style.backgroundColor = "blue";
        SET_TRIUMVIRATE_BUTTON.disabled = true;
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "red";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "limegreen";
        FOOTER.style.backgroundColor = "blue";
        FOOT_TITLE.style.color = "white";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else if (colorScheme == "triumvirate"){
        SET_TRIUMVIRATE_BUTTON.disabled = true;
    }
    else if (colorScheme == "light"){
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "white";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "whitesmoke";
        COLORSCHEME_BUTTON.style.backgroundColor = "whitesmoke";
        CHANGELOG_BUTTON.style.backgroundColor = "whitesmoke";
        SET_TRIUMVIRATE_BUTTON.disabled = true;
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "whitesmoke";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "white";
        FOOTER.style.backgroundColor = "whitesmoke";
        FOOT_TITLE.style.color = "black";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else if (colorScheme == "dark"){
        MAIN_MENU.style.backgroundColor = "black";
        MAIN_MENU_TITLE.style.color = "white";
        MAIN_MENU_SUBTITLE.style.color = "white";
        COLORSCHEME_SETTINGS.style.backgroundColor = "black";
        CHANGELOG.style.backgroundColor = "black";
        START_BUTTON.style.backgroundColor = "dimgray";
        COLORSCHEME_BUTTON.style.backgroundColor = "dimgray";
        CHANGELOG_BUTTON.style.backgroundColor = "dimgray";
        SET_TRIUMVIRATE_BUTTON.disabled = true;
        TRICOLOR_TITLE.style.color = "white";
        TRIUMVIRATE_TITLE.style.color = "white";
        LIGHT_TITLE.style.color = "white";
        DARK_TITLE.style.color = "white";
        HEADER.style.backgroundColor = "black";
        QUESTION_TEXT.style.color = "white";
        COPYRIGHT.style.color = "white";
        MAIN.style.backgroundColor = "dimgray";
        FOOTER.style.backgroundColor = "gray";
        FOOT_TITLE.style.color = "white";
        END_RESULTS.style.backgroundColor = "black";
        END_TITLE.style.color = "white";
        END_SUBTITLE.style.color = "white";
        END_LETITLE.style.color = "white"; 
        SCORE.style.color = "white";
        PERCENT.style.color = "white";
    }
    else {
        console.log("ERROR: String argument in setColorScheme(string) method not valid.")
    }
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

//here cum the questions!

const MASARYKOVO_OSTRAVA = new Question("Co je tohle za náměstí v Ostravě?",
    "images/masarykovo_ostrava.png", [
        "masarykovo"
    ]
);
TO_BE_ITERATED.push(MASARYKOVO_OSTRAVA);

const MASARYKOVO_KARVINA = new Question("Co je tohle za náměstí v Karviné?",
    "images/masarykovo_karvina.png", [
        "masarykovo"
    ]
);
TO_BE_ITERATED.push(MASARYKOVO_KARVINA);

const DVACATEHOOSMEHO_RIJNA = new Question("Co je tohle za náměstí v Orlové?",
    "images/28_rijna.png", [
        "28r", "28 r", "28.r", "28r.", "28 .r", "28 r.", "28. r", "28.r.", "28 . r", "28 .r.", "28. r.", "28 . r.", "28. . r", "28rijen", "28rijna", "28říjen", "28října", "28 rijen", "28 rijna", "28 říjen", "28 října", "28. . r.", "28.rijen", "28.rijna", "28.říjen", "28.října", "28 .rijen", "28 .rijna", "28 .říjen", "28 .října", "28. rijen", "28. rijna", "28. říjen", "28. října", "28 . rijen", "28 . rijna", "28 . říjen", "28 . října", "28ho rijna", "28ho října", "28. . rijen", "28. . rijna", "28. . říjen", "28. . října", "dvacateho osmehor", "dvacateho osméhor", "dvacátého osmehor", "dvacátého osméhor", "dvacateho osmeho r", "dvacateho osmehor.", "dvacateho osmého r", "dvacateho osméhor.", "dvacátého osmeho r", "dvacátého osmehor.", "dvacátého osmého r", "dvacátého osméhor.", "dvacateho osmeho r.", "dvacateho osmeho. r", "dvacateho osmého r.", "dvacateho osmého. r", "dvacátého osmeho r.", "dvacátého osmeho. r", "dvacátého osmého r.", "dvacátého osmého. r", "dvacateho osmeho. r.", "dvacateho osmého. r.", "dvacátého osmeho. r.", "dvacátého osmého. r.", "dvacateho osmehorijen", "dvacateho osmehorijna", "dvacateho osmehoříjen", "dvacateho osmehoříjna", "dvacateho osméhorijen", "dvacateho osméhorijna", "dvacateho osméhoříjen", "dvacateho osméhoříjna", "dvacátého osmehorijen", "dvacátého osmehorijna", "dvacátého osmehoříjen", "dvacátého osmehoříjna", "dvacátého osméhorijen", "dvacátého osméhorijna", "dvacátého osméhoříjen", "dvacátého osméhoříjna", "dvacateho osmeho rijen", "dvacateho osmeho rijna", "dvacateho osmeho říjen", "dvacateho osmeho října", "dvacateho osmého rijen", "dvacateho osmého rijna", "dvacateho osmého říjen", "dvacateho osmého října", "dvacátého osmeho rijen", "dvacátého osmeho rijna", "dvacátého osmeho říjen", "dvacátého osmeho října", "dvacátého osmého rijen", "dvacátého osmého rijna", "dvacátého osmého říjen", "dvacátého osmého října", "dvacateho osmeho. rijen", "dvacateho osmeho. rijna", "dvacateho osmeho. říjen", "dvacateho osmeho. října", "dvacateho osmého. rijen", "dvacateho osmého. rijna", "dvacateho osmého. říjen", "dvacateho osmého. října", "dvacátého osmeho. rijen", "dvacátého osmeho. rijna", "dvacátého osmeho. říjen", "dvacátého osmeho. října", "dvacátého osmého. rijen", "dvacátého osmého. rijna", "dvacátého osmého. říjen", "dvacátého osmého. října"
    ]
);
TO_BE_ITERATED.push(DVACATEHOOSMEHO_RIJNA);

const ALSOVO = new Question("Co je tohle za náměstí?",
    "images/alsovo.png", [
        "alšovo", "alsovo"
    ]
);
TO_BE_ITERATED.push(ALSOVO);

const NEZVALOVO = new Question("Co je tohle za náměstí?",
    "images/nezvalovo.png", [
        "nezvalovo"
    ]
);
TO_BE_ITERATED.push(NEZVALOVO);

const BOZENY_NEMCOVE = new Question("Co je tohle za náměstí?",
    "images/bozeny_nemcove.png", [
        "b n", "b n.", "b. n", "b. n.", "boz. n", "bož. n", "b nemc.", "b němc.", "boz. n.", "bozky n", "bož. n.", "božky n", "b. nemc.", "b. němc.", "bozeny n", "bozky n.", "boženy n", "božky n.", "b nemcove", "b němcové", "b.nemcove", "b.němcové", "bozeny n.", "boženy n.", "b. nemcove", "b. němcové", "boz. nemc.", "boz. němc.", "bož. nemc.", "bož. němc.", "bozky nemc.", "bozky němc.", "božky nemc.", "božky němc.", "boz. nemcove", "boz. němcové", "bozeny nemc.", "bozeny němc.", "bož. nemcove", "bož. němcové", "boženy nemc.", "boženy němc.", "bozky nemcove", "bozky němcové", "božky nemcove", "božky němcové", "bozeny nemcove", "bozeny němcové", "boženy nemcove", "boženy němcové", "božky. němcové", "boženy. němcové"
    ]
);
TO_BE_ITERATED.push(BOZENY_NEMCOVE);

const HAVLICKOVO = new Question("Co je tohle za náměstí?",
    "images/havlickovo.png", [
        "havlíčkovo", "havlíckovo", "havličkovo", "havlickovo"
    ]
);
TO_BE_ITERATED.push(HAVLICKOVO);

const MARIANSKE = new Question("Co je tohle za náměstí?",
    "images/marianske.png", [
        "mariánské", "marianske", "mariánske", "marianské"
    ]
);
TO_BE_ITERATED.push(MARIANSKE);

const MIROVE = new Question("Co je tohle za náměstí?",
    "images/mirove.png", [
        "mírové", "mírove", "mirové", "mirove"
    ]
);
TO_BE_ITERATED.push(MIROVE);

const JIRIHO_Z_PODEBRAD = new Question("Co je tohle za náměstí?",
    "images/jiriho_z_podebrad.png", [
        "jir z podeb", "jir z poděb", "jiriho z p.", "jiř z podeb", "jiř z poděb", "jiřího z p.", "jir z podeb.", "jir z poděb.", "jir z. podeb", "jir z. poděb", "jir. z podeb", "jir. z poděb", "jiř z podeb.", "jiř z poděb.", "jiř z. podeb", "jiř z. poděb", "jiř. z podeb", "jiř. z poděb", "j. z podebrad", "j. z poděbrad", "jir z. podeb.", "jir z. poděb.", "jir. z podeb.", "jir. z poděb.", "jir. z. podeb", "jir. z. poděb", "jiř z. podeb.", "jiř z. poděb.", "jiř. z podeb.", "jiř. z poděb.", "jiř. z. podeb", "jiř. z. poděb", "jir z podebrad", "jir z poděbrad", "jir. z. podeb.", "jir. z. poděb.", "jiriho z podeb", "jiriho z poděb", "jiř z podebrad", "jiř z poděbrad", "jiř. z. podeb.", "jiř. z. poděb.", "jiřího z podeb", "jiřího z poděb", "jir z. podebrad", "jir z. poděbrad", "jir. z podebrad", "jir. z poděbrad", "jiriho z podeb.", "jiriho z poděb.", "jiriho z. podeb", "jiriho z. poděb", "jiř z. podebrad", "jiř z. poděbrad", "jiř. z podebrad", "jiř. z poděbrad", "jiřího z podeb.", "jiřího z poděb.", "jiřího z. podeb", "jiřího z. poděb", "jir. z. podebrad", "jir. z. poděbrad", "jiriho z. podeb.", "jiriho z. poděb.", "jiř. z. podebrad", "jiř. z. poděbrad", "jiřího z. podeb.", "jiřího z. poděb.", "jiriho z podebrad", "jiriho z poděbrad", "jiřího z podebrad", "jiřího z poděbrad", "jiriho z. podebrad", "jiriho z. poděbrad", "jiřího z. podebrad", "jiřího z. poděbrad"
    ]
);
TO_BE_ITERATED.push(JIRIHO_Z_PODEBRAD);

const SNP = new Question("Co je tohle za náměstí?",
    "images/snp.png", [
        "snp", "snp.", "s n p", "s.n.p", "s.n.p.", "slov národ p.", "slov narod. p.", "slov národ. p.", "slov. národ p.", "slovenskeho np", "slovenského np", "slov n povstani", "slov. narod. p.", "slov. národ. p.", "slov národ povst", "slov narod. povst", "slov narodniho p.", "slov narodního p.", "slov národ povst.", "slov národ. povst", "slov národniho p.", "slov národního p.", "slov. n. povstání", "slov. národ povst", "slovens. národ p.", "slovenskeho n. p.", "slovenského n. p.", "slov narod. povst.", "slov národ. povst.", "slov. narod. povst", "slov. narodniho p.", "slov. narodního p.", "slov. národ povst.", "slov. národ. povst", "slov. národniho p.", "slov. národního p.", "slovens. narod. p.", "slovens. národ. p.", "slov narod povstani", "slov národ povstani", "slov národ povstání", "slov. narod. povst.", "slov. národ. povst.", "slov narod. povstani", "slov narod. povstání", "slov narodniho povst", "slov narodního povst", "slov národ. povstani", "slov národ. povstání", "slov národniho povst", "slov národního povst", "slov. národ povstani", "slov. národ povstání", "slovens. národ povst", "slovenskeho národ p.", "slovenského národ p.", "s. narodniho povstani", "s. národního povstání", "slov narodniho povst.", "slov narodního povst.", "slov národniho povst.", "slov národního povst.", "slov. narod. povstani", "slov. narod. povstání", "slov. narodniho povst", "slov. narodního povst", "slov. národ. povstani", "slov. národ. povstání", "slov. národniho povst", "slov. národního povst", "slovens. narod. povst", "slovens. narodniho p.", "slovens. narodního p.", "slovens. národ povst.", "slovens. národ. povst", "slovens. národniho p.", "slovens. národního p.", "slovenskeho narod. p.", "slovenskeho národ. p.", "slovenského narod. p.", "slovenského národ. p.", "slov. narodniho povst.", "slov. narodního povst.", "slov. národniho povst.", "slov. národního povst.", "slovens. narod. povst.", "slovens. národ. povst.", "slov narodniho povstani", "slov narodniho povstání", "slov narodního povstani", "slov narodního povstání", "slov národniho povstani", "slov národniho povstání", "slov národního povstani", "slov národního povstání", "slovens. národ povstani", "slovens. národ povstání", "slovenskeho národ povst", "slovenského národ povst", "slov. narodniho povstani", "slov. narodniho povstání", "slov. narodního povstani", "slov. narodního povstání", "slov. národniho povstani", "slov. národniho povstání", "slov. národního povstani", "slov. národního povstání", "slovens. narod. povstani", "slovens. narod. povstání", "slovens. narodniho povst", "slovens. narodního povst", "slovens. národ. povstani", "slovens. národ. povstání", "slovens. národniho povst", "slovens. národního povst", "slovenskeho narod. povst", "slovenskeho narodniho p.", "slovenskeho narodního p.", "slovenskeho národ povst.", "slovenskeho národ. povst", "slovenskeho národniho p.", "slovenskeho národního p.", "slovenského narod. povst", "slovenského narodniho p.", "slovenského narodního p.", "slovenského národ povst.", "slovenského národ. povst", "slovenského národniho p.", "slovenského národního p.", "slovens. narodniho povst.", "slovens. narodního povst.", "slovens. národniho povst.", "slovens. národního povst.", "slovenskeho narod. povst.", "slovenskeho národ. povst.", "slovenského narod. povst.", "slovenského národ. povst.", "slovenskeho národ povstani", "slovenskeho národ povstání", "slovenského národ povstani", "slovenského národ povstání", "slovens. narodniho povstani", "slovens. narodniho povstání", "slovens. narodního povstani", "slovens. narodního povstání", "slovens. národniho povstani", "slovens. národniho povstání", "slovens. národního povstani", "slovens. národního povstání", "slovenskeho narod. povstani", "slovenskeho narod. povstání", "slovenskeho narodniho povst", "slovenskeho narodního povst", "slovenskeho národ. povstani", "slovenskeho národ. povstání", "slovenskeho národniho povst", "slovenskeho národního povst", "slovenského narod. povstani", "slovenského narod. povstání", "slovenského narodniho povst", "slovenského narodního povst", "slovenského národ. povstani", "slovenského národ. povstání", "slovenského národniho povst", "slovenského národního povst", "slovenskeho narodniho povst.", "slovenskeho narodního povst.", "slovenskeho národniho povst.", "slovenskeho národního povst.", "slovenského narodniho povst.", "slovenského narodního povst.", "slovenského národniho povst.", "slovenského národního povst.", "slovenskeho narodniho povstani", "slovenskeho narodniho povstání", "slovenskeho narodního povstani", "slovenskeho narodního povstání", "slovenskeho národniho povstani", "slovenskeho národniho povstání", "slovenskeho národního povstani", "slovenskeho národního povstání", "slovenského narodniho povstani", "slovenského narodniho povstání", "slovenského narodního povstani", "slovenského narodního povstání", "slovenského národniho povstani", "slovenského národniho povstání", "slovenského národního povstani", "slovenského národního povstání"
    ]
);
TO_BE_ITERATED.push(SNP);

const STARE = new Question("Co je tohle za náměstí?",
    "images/stare.png", [
        "staré", "stare"
    ]
);
TO_BE_ITERATED.push(STARE);

const MICHALSKE = new Question("Co je tohle za náměstí?",
    "images/michalske.png", [
        "michálské", "michalske", "michálske", "michalské"
    ]
);
TO_BE_ITERATED.push(MICHALSKE);

const MIRU = new Question("Co je tohle za náměstí?",
    "images/miru.png", [
        "míru", "miru"
    ]
);
TO_BE_ITERATED.push(MIRU);

const SMETANOVO = new Question("Co je tohle za náměstí?",
    "images/smetanovo.png", [
        "smetanovo"
    ]
);
TO_BE_ITERATED.push(SMETANOVO);

const PARTYZANSKE = new Question("Co je tohle za náměstí?",
    "images/partyzanske.png", [
        "partyzánské", "partyzanske", "partyzánske", "partyzanské",
        "partzyánské", "partzyanske", "partzyánske", "partzyanské"
    ]
);
TO_BE_ITERATED.push(PARTYZANSKE);

const SVATOPLUKA_CECHA = new Question("Co je tohle za náměstí?",
    "images/svatopluka_cecha.png", [
        "s č", "s. č", "s. č.", "svat č", "svat č.", "svat. č", "s. cech.", "s. cecha", "s. čech.", "s. čecha", "svat. č.", "svatopl č", "svat cech.", "svat cecha", "svat čech.", "svat čecha", "svatopl č.", "svatopl. č", "svat. cech.", "svat. cecha", "svat. čech.", "svat. čecha", "svatopl. č.", "svatopluka č", "svatopl cech.", "svatopl cecha", "svatopl čech.", "svatopl čecha", "svatopl.cecha", "svatopl.čecha", "svatopluka č.", "svatopl. cech.", "svatopl. cecha", "svatopl. čech.", "svatopl. čecha", "svatopluka cech.", "svatopluka cecha", "svatopluka čech.", "svatopluka čecha", "svatopluka. cecha", "svatopluka. čecha"
    ]
);
TO_BE_ITERATED.push(SVATOPLUKA_CECHA);

const DR_EDVARDA_BENESE = new Question("Co je tohle za náměstí?",
    "images/dr_edvarda_benese.png", [
        "eb", "deb", "e.b", "e.b.", "dr eb", "dr.eb", "dre b", "dr e b", "dr.e b", "dre b.", "dre. b", "dr e b.", "dr e. b", "dr. e b", "dr.e b.", "dr.e. b", "dr.e.b.", "dre. b.", "dredv b", "dr e. b.", "dr edv b", "dr. e b.", "dr. e. b", "dr. e.b.", "dr.e. b.", "dr.edv b", "dredv b.", "dredv. b", "e beneše", "dokt. e b", "dr beneše", "dr edv b.", "dr edv. b", "dr. e. b.", "dr. edv b", "dr.edv b.", "dr.edv. b", "dre benes", "dre beneš", "dredv. b.", "e. benese", "e. beneše", "dokt. e b.", "dokt. e. b", "doktor e b", "dr e benes", "dr e beneš", "dr edv. b.", "dr. edv b.", "dr. edv. b", "dr.e benes", "dr.e beneš", "dr.edv. b.", "dre benese", "dre beneše", "dre. benes", "dre. beneš", "dredvard b", "edvarda b.", "dokt. e. b.", "dokt. edv b", "doktor e b.", "doktor e. b", "dr e benese", "dr e beneše", "dr e. benes", "dr e. beneš", "dr e.beneše", "dr edvard b", "dr. e benes", "dr. e beneš", "dr. edv. b.", "dr. edvarda", "dr.e benese", "dr.e beneše", "dr.e. benes", "dr.e. beneš", "dr.e.benese", "dr.e.beneše", "dr.edvard b", "dre. benese", "dre. beneše", "dredv benes", "dredv beneš", "dredvard b.", "dredvarda b", "edv. benese", "edv. beneše", "dokt. edv b.", "dokt. edv. b", "doktor e. b.", "doktor edv b", "dr e. benese", "dr e. beneše", "dr edv benes", "dr edv beneš", "dr edvard b.", "dr edvarda b", "dr. e benese", "dr. e beneše", "dr. e. benes", "dr. e. beneš", "dr. edvard b", "dr.e. benese", "dr.e. beneše", "dr.edv benes", "dr.edv beneš", "dr.edvard b.", "dr.edvarda b", "dredv benese", "dredv beneše", "dredv. benes", "dredv. beneš", "dredvard a b", "dredvarda b.", "dokt. e benes", "dokt. e beneš", "dokt. edv. b.", "doktor edv b.", "doktor edv. b", "dr edv benese", "dr edv beneše", "dr edv. benes", "dr edv. beneš", "dr edvard a b", "dr edvarda b.", "dr. e. benese", "dr. e. beneše", "dr. edv benes", "dr. edv beneš", "dr. edvard b.", "dr. edvarda b", "dr.edv benese", "dr.edv beneše", "dr.edv. benes", "dr.edv. beneš", "dr.edv.benese", "dr.edv.beneše", "dr.edvard a b", "dr.edvarda b.", "dredv. benese", "dredv. beneše", "dredvard a b.", "dokt. e benese", "dokt. e beneše", "dokt. e. benes", "dokt. e. beneš", "dokt. edvard b", "doktor e benes", "doktor e beneš", "doktor edv. b.", "dr edv. benese", "dr edv. beneše", "dr edvard a b.", "dr. edv benese", "dr. edv beneše", "dr. edv. benes", "dr. edv. beneš", "dr. edvard a b", "dr. edvarda b.", "dr.edv. benese", "dr.edv. beneše", "dr.edvard a b.", "dredvard benes", "dredvard beneš", "edvarda benese", "edvarda beneše", "dokt. e. benese", "dokt. e. beneše", "dokt. edv benes", "dokt. edv beneš", "dokt. edvard b.", "dokt. edvarda b", "doktor e benese", "doktor e beneše", "doktor e. benes", "doktor e. beneš", "doktor edvard b", "dr edvard benes", "dr edvard beneš", "dr. edv. benese", "dr. edv. beneše", "dr. edvard a b.", "dr.edvard benes", "dr.edvard beneš", "dredvard benese", "dredvard beneše", "dredvarda benes", "dredvarda beneš", "edvard a benese", "edvard a beneše", "dokt. edv benese", "dokt. edv beneše", "dokt. edv. benes", "dokt. edv. beneš", "dokt. edvard a b", "dokt. edvarda b.", "doktor e. benese", "doktor e. beneše", "doktor edv benes", "doktor edv beneš", "doktor edvard b.", "doktor edvarda b", "dr edvard benese", "dr edvard beneše", "dr edvarda benes", "dr edvarda beneš", "dr. edvard benes", "dr. edvard beneš", "dr.edvard benese", "dr.edvard beneše", "dr.edvarda benes", "dr.edvarda beneš", "dredvard a benes", "dredvard a beneš", "dredvarda benese", "dredvarda beneše", "dokt. edv. benese", "dokt. edv. beneše", "dokt. edvard a b.", "doktor edv benese", "doktor edv beneše", "doktor edv. benes", "doktor edv. beneš", "doktor edvard a b", "doktor edvarda b.", "dr edvard a benes", "dr edvard a beneš", "dr edvarda benese", "dr edvarda beneše", "dr. edvard benese", "dr. edvard beneše", "dr. edvarda benes", "dr. edvarda beneš", "dr.edvard a benes", "dr.edvard a beneš", "dr.edvarda benese", "dr.edvarda beneše", "dredvard a benese", "dredvard a beneše", "dokt. edvard benes", "dokt. edvard beneš", "doktor edv. benese", "doktor edv. beneše", "doktor edvard a b.", "dr edvard a benese", "dr edvard a beneše", "dr. edvard a benes", "dr. edvard a beneš", "dr. edvarda benese", "dr. edvarda beneše", "dr.edvard a benese", "dr.edvard a beneše", "dokt. edvard benese", "dokt. edvard beneše", "dokt. edvarda benes", "dokt. edvarda beneš", "doktor edvard benes", "doktor edvard beneš", "dr. edvard a benese", "dr. edvard a beneše", "dokt. edvard a benes", "dokt. edvard a beneš", "dokt. edvarda benese", "dokt. edvarda beneše", "doktor edvard benese", "doktor edvard beneše", "doktor edvarda benes", "doktor edvarda beneš", "dokt. edvard a benese", "dokt. edvard a beneše", "doktor edvard a benes", "doktor edvard a beneš", "doktor edvarda benese", "doktor edvarda beneše", "doktor edvard a benese", "doktor edvard a beneše"
    ]
);
TO_BE_ITERATED.push(DR_EDVARDA_BENESE);

const PROKESOVO = new Question("Co je tohle za náměstí?",
    "images/prokesovo.png", [
        "prokešovo", "prokesovo"
    ]
);
TO_BE_ITERATED.push(PROKESOVO);

const HUSOVO = new Question("Co je tohle za náměstí?",
    "images/husovo.png", [
        "husovo", "husové", "husove"
    ]
);
TO_BE_ITERATED.push(HUSOVO);

const JURIJE_GAGARINA = new Question("Co je tohle za náměstí?",
    "images/jurije_gagarina.png", [
        "jg", "j g", "j.g", "jg.", "j g.", "j. g", "j.g.", "jurg", "j. g.", "jur g", "jur.g", "jurg.", "jur g.", "jur. g", "jur.g.", "jur. g.", "jurijeg", "jurije g", "jurijeg.", "jgagarina", "jurije g.", "j gagarina", "j.gagarina", "j. gagarina", "jurgagarina", "jur gagarina", "jur.gagarina", "jur. gagarina", "jurijegagarina", "jurije gagarina", "jurije. gagarina" , "yuriho gagarina", "yuri gagarina", "yurije gagarina", "yuriye gagarina"
    ]
);
TO_BE_ITERATED.push(JURIJE_GAGARINA);

const KOSTELNI = new Question("Co je tohle za náměstí?",
    "images/kostelni.png", [
        "kostelní", "kostelni"
    ]
);
TO_BE_ITERATED.push(KOSTELNI);

const maxScore: number = TO_BE_ITERATED.length;

console.log(TO_BE_ITERATED)
console.log("Max score constant: " + maxScore)

const ITERATED: Array<Question> = [];

//***********************************************************/

const BUNCH_OF_DASHES: string = "-------------------------------------------------------------------------------------------------------";

const VERSION_1_0: string = BUNCH_OF_DASHES + `
Verze 1.0 "Release" - čtvrtek 29.10.2026
    - vývoj začal pondělí 26.10.2026
    - 21 náměstí, ve všech jsem byl anebo je znám ((až na pár výjimek mrk ;) mrk ;)
    - 4 barevná schémata:
        - trikolóra, triumvirát, světelno, temno
` + BUNCH_OF_DASHES;

const LOG: string =
    VERSION_1_0;

UPDATELOG_TEXT.textContent = LOG;

preloadImages();

export {}