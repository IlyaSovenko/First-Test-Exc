"use strict";
var numOfRow = document.querySelector('.row:last-child').className.split('-')[1];
var numOfCol = document.querySelector('.col:last-child').className.split('-')[1];
var leftMargin = 56;
var topMargin = 56;
function renderApp(isNeed) {
    if(!isNeed){
        let delBtns = document.querySelectorAll('.btn-del');
        delBtns.forEach((btn,i,delBtns) => btn.style.display = 'none');
        document.querySelector('.app').style.top = window.innerHeight*0.3 + 'px';
        document.querySelector('.app').style.left = window.innerWidth*0.4 + 'px';
        document.querySelector('.btn-add-row').style.marginLeft = '6px';
    }else{
        var numOfColAtTime;
        var delColBtnMargin;
        switch (true) {
            case numOfCol > 1 && numOfRow > 1:
                leftMargin = 56;
                topMargin = 56;
                let delBtns = document.querySelectorAll('.btn-del');
                delBtns.forEach((btn, i, delBtns) => btn.style.display = 'block');
                // numOfColAtTime = document.querySelector('.btn-del-col').classList[3] ? document.querySelector('.btn-del-col').classList[3].split('-')[3] : 1;
                // delColBtnMargin = leftMargin + 6*numOfColAtTime + 48*(numOfColAtTime - 1);
                // document.querySelector('.btn-del-col').style.margin = '3px 0 3px ' + delColBtnMargin + 'px';
                break;
            case numOfCol > 1 && numOfRow <= 1:
                leftMargin = 0;
                topMargin = 56;
                document.querySelector('.btn-del-row').style.display = 'none';
                document.querySelector('.btn-del-col').style.display = 'block';
                numOfColAtTime = document.querySelector('.btn-del-col').classList[3].split('-')[3] || 1;
                delColBtnMargin = leftMargin + 6*numOfColAtTime + 48*(numOfColAtTime - 1);
                document.querySelector('.btn-del-col').style.margin = '3px 0 3px ' + delColBtnMargin + 'px';
                break;
            case numOfCol <= 1 && numOfRow > 1:
                leftMargin = 56;
                topMargin = 0;
                document.querySelector('.btn-del-row').style.display = 'block';
                document.querySelector('.btn-del-col').style.display = 'none';
                break;
            default:
                topMargin = 0;
                leftMargin = 0;
                document.querySelector('.btn-del-row').style.display = 'none';
                document.querySelector('.btn-del-col').style.display = 'none';

        }
        document.querySelector('.app').style.top = window.innerHeight * 0.3 - topMargin + 'px';
        document.querySelector('.app').style.left = window.innerWidth * 0.4 - leftMargin + 'px';
        document.querySelector('.btn-add-row').style.marginLeft = Number(leftMargin + 6) + 'px';
    }
}

document.querySelector('.app').onmouseover = handler;
function handler(event) {
    let elem = event.target;
    renderApp(true);
    if(elem.className.indexOf('col') >= 0 && elem.className.indexOf('btn') < 0){
        let numOfRow = elem.parentNode.className.split('-')[1];
        let delRowBtnMarginTop = 6*numOfRow + 48*(numOfRow - 1) + 'px';
        document.querySelector('.btn-del-row').style.marginTop = delRowBtnMarginTop;
        let numOfCol = elem.className.split('-')[1];
        document.querySelector('.btn-del-row').classList.remove(document.querySelector('.btn-del-row').classList[3]);
        document.querySelector('.btn-del-row').classList.add('btn-del-row-' + numOfRow);
        let delColBtnMargin = leftMargin + 6*numOfCol + 48*(numOfCol - 1);
        document.querySelector('.btn-del-col').style.margin = '3px 0 3px ' + delColBtnMargin + 'px';
        document.querySelector('.btn-del-col').classList.remove(document.querySelector('.btn-del-col').classList[3]);
        document.querySelector('.btn-del-col').classList.add('btn-del-col-' + numOfCol);

    }

}
document.querySelector('.app').onmouseout = handlerOut;
function handlerOut() {
    renderApp(true);
}
document.querySelector('.btn-add-col').onclick = () => {
    let rows = document.querySelectorAll('.row');
    let cols = document.querySelectorAll('.col');

    for(let i = 0;i < rows.length;i++){
        let newCol = document.createElement('div');
        let nextNumOfCol = 1 +  Number(cols[cols.length-1].className.split('-')[1]);
        newCol.classList.add('col','col-' + nextNumOfCol);
        rows[i].appendChild(newCol);
    }
    numOfCol++;
    renderApp(true);
}
document.querySelector('.btn-add-row').onclick = () => {
    let rows = document.querySelectorAll('.row');
    let newRow = document.createElement('div');
    let nextNumOfRow = ++numOfRow;
    newRow.classList.add('row','row-' + nextNumOfRow);
    for(let i = 0;i < rows[0].childNodes.length;i++){
        if(rows[0].childNodes[i].nodeName === '#text') continue;
        let newChild = document.createElement('div');
        newChild.classList = rows[0].childNodes[i].classList
        newRow.appendChild(newChild)
    }
    document.querySelector('.table').appendChild(newRow);
    renderApp(true);
}

document.querySelector('.btn-del-col').onclick = () =>
{
    let condidats = document.querySelectorAll('.col-' + numOfCol);
    for (let i = 0; i < condidats.length; i++) {
        condidats[i].parentNode.removeChild(condidats[i]);
    }
    if (document.querySelector('.btn-del-col').classList[3].split('-')[3] === numOfCol){
        numOfCol--;
        let delColBtnMargin = 56 + 6 * numOfCol + 48 * (numOfCol - 1);
        document.querySelector('.btn-del-col').style.margin = '3px 0 3px ' + delColBtnMargin + 'px';
        document.querySelector('.btn-del-col').classList.remove(document.querySelector('.btn-del-col').classList[3]);
        document.querySelector('.btn-del-col').classList.add('btn-del-col-' + numOfCol);
    }else{
        numOfCol--;
    }

    renderApp(true);
}

document.querySelector('.btn-del-row').onclick = () => {
    let condidat = document.querySelector('.row-' + numOfRow);
    condidat.parentNode.removeChild(condidat);
    if (document.querySelector('.btn-del-row').classList[3].split('-')[3] == numOfRow) {
        numOfRow--;
        let delRowBtnMarginTop = 6 * numOfRow + 48 * (numOfRow - 1) + 'px';
        document.querySelector('.btn-del-row').style.marginTop = delRowBtnMarginTop;
        document.querySelector('.btn-del-row').classList.remove(document.querySelector('.btn-del-row').classList[3]);
        document.querySelector('.btn-del-row').classList.add('btn-del-row-' + numOfRow);
    }else{
        numOfRow--;
    }

    renderApp(true);
}