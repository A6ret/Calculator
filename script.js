'use strict';

const answerArea = document.querySelector('.answer-area');
const calculator = document.querySelector('.main-body');
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
let firstNum = '';
let secNum = '';
let result = '0';
let countHistory = 0;

const calculation = {
    fNum: null,
    sNum: null,
    operator: null,
    res: null,
    symbol: '-',
    calc: function () {
        let fnumNew = parseInt(this.fNum);
        let sNumNew = parseInt(this.sNum);

        if (this.operator == '+') this.res = fnumNew + sNumNew;
        if (this.operator == '-') this.res = fnumNew - sNumNew;
    },
};

window.addEventListener('load', () => renderHistory());

const updateValue = () => {
    answerArea.textContent = result;
    firstNum = '';
};

const condition = () => {
    if (result == '0') result = firstNum;
    else result += firstNum;
};

const saveData = () => {
    const count = Object.keys(localStorage);
    const data = JSON.stringify(calculation);

    localStorage.setItem(`history${count.length + 1}`, data);
};

const renderHistory = () => {
    //retrieve data from localstorage
    let data = { history: [] };
    for (let i = 1; i <= Object.keys(localStorage).length; i++) {
        data.history.push(JSON.parse(localStorage.getItem(`history${i}`)));
    }

    //rendering data to html
    for (countHistory; countHistory < data.history.length; countHistory++) {
        thead.insertAdjacentHTML(
            'afterend',
            `
            <tr>
                <td>${data.history[countHistory].fNum}</td>
                <td>${data.history[countHistory].operator}</td>
                <td>${data.history[countHistory].sNum}</td>
                <td>${data.history[countHistory].res}</td>
            </tr>
        `
        );
    }
};

document.querySelector('.clearHistory-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});

calculator.addEventListener('click', (e) => {
    if (e.target.classList.contains('num0')) {
        if (answerArea.textContent == '0') return;
        firstNum += 0;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num1')) {
        firstNum += 1;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num2')) {
        firstNum += 2;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num3')) {
        firstNum += 3;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num4')) {
        firstNum += 4;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num5')) {
        firstNum += 5;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num6')) {
        firstNum += 6;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num7')) {
        firstNum += 7;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num8')) {
        firstNum += 8;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('num9')) {
        firstNum += 9;
        condition();
        updateValue();
    }

    if (e.target.classList.contains('addition')) {
        calculation.fNum = result;
        calculation.operator = '+';
        result = '0';
    }

    if (e.target.classList.contains('substraction')) {
        calculation.fNum = result;
        calculation.operator = '-';
        result = '0';
    }

    if (e.target.classList.contains('result')) {
        calculation.sNum = result;
        calculation.calc();
        result = calculation.res;
        updateValue();
        //save data to local storage
        saveData();
        //retrieve data from local storage & render it
        renderHistory();
    }

    if (e.target.classList.contains('clear')) {
        result = '0';
        updateValue();
    }

    if (e.target.classList.contains('negate')) {
        result = parseInt(result) * -1;
        updateValue();
    }
});
