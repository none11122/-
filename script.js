// =========================================================
// 💌 ЛИЧНЫЙ ТЕКСТ
// =========================================================
// МЕНЯЙ ТЕКСТ ВОТ ЗДЕСЬ:
const myLoveLetter = `Азалина,

ты — самое прекрасное,
что есть в моей жизни.

Я бесконечно благодарен
за то, что ты рядом.

Спасибо тебе за каждый
момент, который мы проживаем вместе.

Я люблю тебя. ♡`;


// =========================================================
// 🔐 СЕКРЕТНОЕ СЛОВО
// =========================================================

const secretWord = "Матурым";


// =========================================================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// =========================================================

const screenPassword = document.getElementById("screenPassword");
const screenCard = document.getElementById("screenCard");

const passwordInput = document.getElementById("passwordInput");
const openBtn = document.getElementById("openBtn");

const toast = document.getElementById("toast");

const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const hint = document.getElementById("hint");

const letterText = document.getElementById("letterText");
const afterText = document.getElementById("afterText");

const floatingPetals = document.getElementById("floatingPetals");


// =========================================================
// 💌 ВСТАВЛЯЕМ ТЕКСТ В ПИСЬМО
// =========================================================

letterText.textContent = myLoveLetter;


// =========================================================
// ❌ ОШИБКА ПРИ НЕПРАВИЛЬНОМ СЛОВЕ
// =========================================================

let toastTimer;

function showError() {

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// =========================================================
// 🔑 ПРОВЕРКА СЕКРЕТНОГО СЛОВА
// =========================================================

function checkWord() {

    // Убираем пробелы и делаем всё маленькими буквами
    const entered = passwordInput.value.trim().toLowerCase();
    const correct = secretWord.trim().toLowerCase();


    // Если слово неправильное
    if (entered !== correct) {

        showError();


        // Маленькая анимация тряски поля
        passwordInput.animate(
            [
                {
                    transform: "translateX(0)"
                },
                {
                    transform: "translateX(-7px)"
                },
                {
                    transform: "translateX(7px)"
                },
                {
                    transform: "translateX(-4px)"
                },
                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 360,
                easing: "ease-out"
            }
        );

        return;
    }


    // =====================================================
    // ПРАВИЛЬНОЕ СЛОВО
    // =====================================================

    screenPassword.classList.add("leaving");


    // Ждём окончания анимации первого экрана
    setTimeout(() => {

        screenPassword.classList.remove("active");

        screenCard.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 700);
}


// Кнопка "Открыть"
openBtn.addEventListener("click", checkWord);


// Можно нажать Enter
passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkWord();
    }

});


// =========================================================
// 💌 ОТКРЫТИЕ КОНВЕРТА
// =========================================================

let opened = false;


function openLetter() {

    // Если уже открывали — ничего не делаем
    if (opened) {
        return;
    }

    opened = true;


    // =====================================================
    // 1. УБИРАЕМ "ЖМИ, ТАМ СЮРПРИЗ"
    // =====================================================

    hint.classList.add("hidden");


    // =====================================================
    // 2. НАЧИНАЕМ ОТКРЫТИЕ
    // =====================================================

    envelope.classList.add("opening");


    // =====================================================
    // 3. ЧЕРЕЗ НЕБОЛЬШУЮ ПАУЗУ
    // ЛИСТ ВЫДВИГАЕТСЯ ИЗ КОНВЕРТА
    // =====================================================

    setTimeout(() => {

        envelope.classList.add("opened");

        createPetals();

    }, 850);


    // =====================================================
    // 4. ПОСЛЕ ОТКРЫТИЯ ПОКАЗЫВАЕМ ПОДПИСЬ
    // =====================================================

    setTimeout(() => {

        afterText.classList.add("visible");

    }, 1850);
}


// Нажатие на сургуч
seal.addEventListener("click", openLetter);


// Можно также нажать на "Жми, там сюрприз"
hint.addEventListener("click", openLetter);


// =========================================================
// 🌸 СОЗДАНИЕ ЛЕПЕСТКОВ
// =========================================================

function createPetals() {

    const count = 18;


    for (let i = 0; i < count; i++) {

        const petal = document.createElement("i");


        // Случайная позиция
        petal.style.left = `${Math.random() * 100}%`;

        petal.style.top = `${-10 - Math.random() * 20}%`;


        // Случайное движение в сторону
        petal.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 260}px`
        );


        // Случайная задержка
        petal.style.animationDelay =
            `${Math.random() * 0.8}s`;


        // Случайный поворот
        petal.style.transform =
            `rotate(${Math.random() * 180}deg)`;


        floatingPetals.appendChild(petal);
    }


    // Удаляем лепестки после завершения
    setTimeout(() => {

        floatingPetals.innerHTML = "";

    }, 5000);
}


// =========================================================
// ⌨️ УПРАВЛЕНИЕ КЛАВИАТУРОЙ
// =========================================================

seal.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        openLetter();
    }

});