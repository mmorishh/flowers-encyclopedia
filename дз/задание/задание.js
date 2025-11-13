document.getElementById('calculate').addEventListener('click', function() {
    const showDialog = new Function('return confirm("Показать результат?");');
const showResult = showDialog();
    
    for (let i = 1; i <= 3; i++) {
        const length = parseInt(document.getElementById('length' + i).value);
        const isMechanized = document.getElementById('mechanized' + i).checked;
        const resultDiv = document.getElementById('result' + i);
        
        if (showResult) {
            const metersPerWorker = isMechanized ? 4 : 3;
            const workers = Math.ceil(length / metersPerWorker);
            const image = isMechanized ? 'img/землекоп2.png' : 'img/землекоп1.png';
            
            resultDiv.innerHTML = 
                'Канава ' + i + ': Землекопов: ' + workers + 
                '<br><img src="' + image + '" alt="землекопы" style="display: margin-top:10px;">';
        } else {
            resultDiv.innerHTML = 
                'Канава ' + i + ': Бригада в отпуске<br><img src="img/землекоп3.png" alt="отпуск" style="display: margin-top:10px;">';
        }
    }
});


/* Нет возможости записать звук, поэтому оставлю комментарий с объяснением кода. 

1. Сначала обрабатывем нажатие на кнопку расчета. В результате ажатия появляется всплывающее окно с вопросом. Мы можем выбрать да или нет 
(подтверждение или отмена). Дальше будем использовать этот результат для рассчетов и вывода картинок.
2.Используем new Function. Чтобы создать функцию через строку
3. Чтобы не писать один и тот же код для каждой канавы, я сделала цикл. В цикле для каждой канавы достается длина, переводится в число, 
после проверяется потметка чекбокса и находится блок, в который будет выводиться результат.
 4. Дальше в цикле происходят рассчеты в зависимости от того, что выбрали (подтвердить ил отмена). проверяется чекбокс, если бригада миханизированная, 
 то получаем 4 (м), если нет, то 3.*/