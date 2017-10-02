"use strict";
const TABLE_BLOCK_SIZE = 38;
const TABLE_BORDER_SIZE = 2;
class SuperTable {
    constructor() {
        this.app = document.querySelector('.app');
        this.table = document.querySelector('.table');
        this.btnDelRow = document.querySelector('.table__btn_position-left');
        this.btnDelCol = document.querySelector('.table__btn_position-top');
        this.btnAddCol = document.querySelector('.table__btn_position-right');
        this.isVisibleBtnDelCol = 1;
    }
    findNumOfChild(element){
        let parentArr = [].slice.apply(element.parentNode.children);
        return parentArr.indexOf(element);
    }
    moveBtnDelRow(element){
        let marginTop = (this.findNumOfChild(element) + this.isVisibleBtnDelCol)*TABLE_BLOCK_SIZE + TABLE_BORDER_SIZE;
        this.btnDelRow.style.marginTop = marginTop + 'px';
    }
    moveBtnDelCol(element){
        let marginLeft = this.findNumOfChild(element)*TABLE_BLOCK_SIZE + TABLE_BORDER_SIZE;
        this.btnDelCol.style.marginLeft = marginLeft + 'px';
    }
    hideBtnDelCol(val){
        if(!val && this.table.children[0].children.length <= 1){
            return;
        }
        this.btnDelCol.hidden = val;
        this.btnAddCol.style.marginTop = (TABLE_BLOCK_SIZE)*(!val) + TABLE_BORDER_SIZE + 'px';
        this.app.style.marginTop = (TABLE_BLOCK_SIZE)*val + 'px';
    }
    hideBtnDelRow(val){
        if(!val && this.table.children.length <= 1){
            return;
        }
        this.btnDelRow.hidden = val;
        this.app.style.marginLeft = (TABLE_BLOCK_SIZE)*val + 'px'
    }
    moveBtns(element){
        if(element.className !== 'table__col') return;
        this.moveBtnDelCol(element);
        this.moveBtnDelRow(element.parentNode);
    }
    hideBtns (val) {
        this.hideBtnDelCol(val);
        this.hideBtnDelRow(val);
    }
    deleteRow (element){
        let marginTop = element.style.marginTop.split('px')[0];
        let rowNum = (marginTop - (TABLE_BORDER_SIZE + TABLE_BLOCK_SIZE))/TABLE_BLOCK_SIZE;
        if(this.table.children.length - 1 === rowNum){
            element.style.marginTop = marginTop - TABLE_BLOCK_SIZE + 'px';
        }
        rowNum = rowNum >= 1 ? rowNum : 0;
        this.table.removeChild(this.table.children[rowNum]);
        if(this.table.children.length - 1 <= 0){
            this.hideBtnDelRow(true);
        }
    }
    deleteCol (element){
        let marginLeft = element.style.marginLeft.split('px')[0];
        let colNum = (marginLeft - (TABLE_BORDER_SIZE))/TABLE_BLOCK_SIZE;
        if(this.table.children[0].children.length - 1 === colNum){
            element.style.marginLeft = marginLeft - TABLE_BLOCK_SIZE + 'px';
        }
        colNum = colNum >= 1 ? colNum : 0;
        for(let i = 0;i < this.table.children.length;i++) {
            this.table.children[i].removeChild(this.table.children[i].children[colNum])
        }
        if(this.table.children[0].children.length <= 1){
            let marginTop = this.btnDelRow.style.marginTop.split('px')[0];
            marginTop -= TABLE_BLOCK_SIZE;
            this.btnDelRow.style.marginTop = marginTop + 'px';
            this.hideBtnDelCol(true);
            this.isVisibleBtnDelCol = 0;
        }
    }
    addRow(){
        let newRow = this.table.children[0].cloneNode(true);
        for(let i = 0;i < newRow.children.length;i++){
            newRow.children[i].innerHTML = '';
        }
        this.table.appendChild(newRow);
        this.hideBtnDelRow(false);
    }
    addCol(){
        console.log(this.table.children[0].children.length);
        let sampleNewCol = this.table.children[0].children[0].cloneNode(false);
        sampleNewCol.innerHTML = "";
        for(let i = 0; i < this.table.children.length;i++){
            let newCol = sampleNewCol.cloneNode(false);
            this.table.children[i].appendChild(newCol);
        }
        if(this.table.children[0].children.length <= 2) {
            let marginTop = Number(this.btnDelRow.style.marginTop.split('px')[0]);
            marginTop += TABLE_BLOCK_SIZE;
            this.btnDelRow.style.marginTop = marginTop + 'px';
            this.hideBtnDelCol(false);
            this.isVisibleBtnDelCol = 1;
        }
    }


}

let table = new SuperTable();
document.querySelector('.table').onmouseover = (e) => table.moveBtns(e.target);
document.querySelector('.app').onmouseleave = () => table.hideBtns(true);
document.querySelector('.app').onmouseenter = () => table.hideBtns(false);
document.querySelector('.btn-del-row').onclick = (e)=> table.deleteRow(e.target);
document.querySelector('.btn-del-col').onclick = (e)=> table.deleteCol(e.target);
document.querySelector('.btn-add-row').onclick = () => table.addRow();
document.querySelector('.btn-add-col').onclick = () => table.addCol();
