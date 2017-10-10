"use strict";
class SuperTable {
    constructor(elem) {
        this.table = elem.querySelector('.ST-table').firstElementChild;
        this.btnDelRow = elem.querySelector('.ST-table__btn_position-left');
        this.btnDelCol = elem.querySelector('.ST-table__btn_position-top');
        this.tableBlockSize = 53;
        this.tableBorderSize = 4;
        this.initTableJS(elem);
    }
    initTableJS(element){
        element.querySelector('.ST-table').addEventListener('mouseover',(event) => this.moveBtns(event.target));
        element.addEventListener('mouseleave',() => this.hideBtns(true));
        element.addEventListener('mouseenter',() => this.hideBtns(false));
        element.querySelector('.ST-btn_del-row').addEventListener('click',(event) => this.deleteRow(event.target.parentNode));
        element.querySelector('.ST-btn_del-col').addEventListener('click',(event) => this.deleteCol(event.target.parentNode));
        element.querySelector('.ST-btn_add-row').addEventListener('click',this.addRow.bind(this));
        element.querySelector('.ST-btn_add-col').addEventListener('click',this.addCol.bind(this));

    }
    findNumOfChild(element){
        let parentArr = [].slice.apply(element.parentNode.children);
        return parentArr.indexOf(element);
    }
    moveBtnDelRow(element){
        let marginTop = (this.findNumOfChild(element) + 1)*this.tableBlockSize + this.tableBorderSize;
        this.btnDelRow.style.marginTop = marginTop + 'px';
    }
    moveBtnDelCol(element){
        let marginLeft = this.findNumOfChild(element)*this.tableBlockSize + this.tableBorderSize;
        this.btnDelCol.style.marginLeft = marginLeft + 'px';
    }
    hideBtnDelCol(val){
        if(!val && this.table.firstElementChild.children.length <= 1){
            return;
        }
        this.btnDelCol.firstElementChild.hidden = val;
    }
    hideBtnDelRow(val){
        if(!val && this.table.children.length <= 1){
            return;
        }
        this.btnDelRow.firstElementChild.hidden = val;
    }
    moveBtns(element){
        if(element.className !== 'ST-table__col') return;
        this.moveBtnDelCol(element);
        this.moveBtnDelRow(element.parentNode);
    }
    hideBtns (val) {
        this.hideBtnDelCol(val);
        this.hideBtnDelRow(val);
    }
    deleteRow (element){
        let marginTop = element.style.marginTop.split('px')[0];
        let rowNum = (marginTop - (this.tableBorderSize + this.tableBlockSize))/this.tableBlockSize;
        if(this.table.children.length - 1 === rowNum){
            element.style.marginTop = marginTop - this.tableBlockSize + 'px';
        }
        rowNum = rowNum >= 1 ? rowNum : 0;
        this.table.removeChild(this.table.children[rowNum]);
        if(this.table.children.length - 1 <= 0){
            this.hideBtnDelRow(true);
        }
    }
    deleteCol (element){
        let marginLeft = element.style.marginLeft.split('px')[0];
        let colNum = (marginLeft - (this.tableBorderSize))/this.tableBlockSize;
        if(this.table.firstElementChild.children.length - 1 === colNum){
            element.style.marginLeft = marginLeft - this.tableBlockSize + 'px';
        }
        colNum = colNum >= 1 ? colNum : 0;
        for(let i = 0;i < this.table.children.length;i++) {
            this.table.children[i].removeChild(this.table.children[i].children[colNum])
        }
        if(this.table.firstElementChild.children.length <= 1){
            this.hideBtnDelCol(true)
        }
    }
    addRow(){
        let newRow = this.table.firstElementChild.cloneNode(true);
        for(let i = 0;i < newRow.children.length;i++){
            newRow.children[i].innerHTML = '';
        }
        this.table.appendChild(newRow);
        this.hideBtnDelRow(false);
    }
    addCol(){
        let sampleNewCol = this.table.firstElementChild.firstElementChild.cloneNode(false);
        sampleNewCol.innerHTML = "";
        for(let i = 0; i < this.table.children.length;i++){
            let newCol = sampleNewCol.cloneNode(false);
            this.table.children[i].appendChild(newCol);
        }
        if(this.table.firstElementChild.children.length <= 2) {
            this.hideBtnDelCol(false);
        }
    }


}

let supertables = document.querySelectorAll('.supertable-app');
for(let i = 0;i < supertables.length; i++){
    new SuperTable(supertables[i]);
}
