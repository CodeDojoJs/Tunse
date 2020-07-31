export const radioPlayerInit = () => {
    // Получаем все объекты со страницы
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');

    // Создаем конструктор
    const audio = new Audio();
    audio.type = 'audio/aac';

    // Блокируем главную кнопку Play
    radioStop.disabled = true;

    // Смена иконки при нажатии на play
    const changeIconPlay = () => {
        if (audio.paused) {
            // Когда будет играть музыка , для для radio будем дабовлять play
            radio.classList.remove('play');

            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'))
        elem.classList.add('select');
    }

    // Прописываем путь, src радиостанции чтобы ее запустить
    radioNavigation.addEventListener('change', event => {
        // Прописываем путь до радиостанции
        const target = event.target;

        // Отображение название и картинку радиостанции которая воспроизводится
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        // Ставим лого радиостанции
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        // Разблокируем главную кнопку Play
        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    // Остановка радио
    radioStop.addEventListener('click', () => {
       if (audio.paused) {
           audio.play();
       } else {
           audio.pause();
       }
        changeIconPlay();
    });

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};