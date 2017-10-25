"use strict";
class SuperTable extends HTMLElement {
    constructor() {
        super();

        let localDocument = document.currentScript.ownerDocument;
        let tmpl = localDocument.getElementById('tmpl');
        let root = this.createShadowRoot();
        root.appendChild(tmpl.content.cloneNode(true));

        this.table = root.querySelector('.st__table').firstElementChild;
        this.btnDelRow = root.querySelector('.st__btn-del_row');
        this.btnDelCol = root.querySelector('.st__btn-del_col');

        this.initTableJS(root);

        this.cellNum = 0;
        this.rowNum = 0;
    }
    initTableJS(element){
        this.table.addEventListener('mouseover',(event) => this.moveBtns(event.target));
        element.querySelector('.st').addEventListener('mouseleave',this.hideBtns.bind(this,true));
        this.table.parentNode.addEventListener('mouseenter',this.hideBtns.bind(this,false));
        this.btnDelRow.addEventListener('click',this.deleteRow.bind(this));
        this.btnDelCol.addEventListener('click',this.deleteCol.bind(this));
        element.querySelector('.st__btn-add_row').addEventListener('click',this.addRow.bind(this));
        element.querySelector('.st__btn-add_col').addEventListener('click',this.addCol.bind(this));

    }

    moveBtns(element){
        if(element.className !== 'st__cell') return;
        this.btnDelCol.style.marginLeft = `${element.offsetLeft + 1}px`;
        this.btnDelRow.style.marginTop = `${element.offsetTop + 1}px`;
        this.cellNum = element.cellIndex;
        this.rowNum = element.parentNode.rowIndex;
    }
    hideBtnDelCol(val){
        if(!val && this.table.firstElementChild.children.length <= 1){
            return;
        }
        this.btnDelCol.hidden = val;
    }
    hideBtnDelRow(val){
        if(!val && this.table.children.length <= 1){
            return;
        }
        this.btnDelRow.hidden = val;
    }
    hideBtns (val) {
        this.hideBtnDelCol(val);
        this.hideBtnDelRow(val);
    }
    deleteRow (){
        if(this.table.children.length - 1 === this.rowNum) {
            this.hideBtnDelRow(true);
        }
        this.table.removeChild(this.table.children[this.rowNum]);
        if(!(this.table.children.length - 1 === 1)) {
            this.hideBtnDelRow(true);
        }
    }
    deleteCol (){
        if(this.table.firstElementChild.children.length - 1 === this.cellNum){
            this.hideBtnDelCol(true)
        }
        for(let i = 0;i < this.table.children.length;i++) {
            this.table.children[i].removeChild(this.table.children[i].children[this.cellNum])
        }
        if(!(this.table.firstElementChild.children.length - 1 === 1)){
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
        sampleNewCol.innerHTML = '';
        for(let i = 0; i < this.table.children.length;i++){
            let newCol = sampleNewCol.cloneNode(false);
            this.table.children[i].appendChild(newCol);
        }
        this.hideBtnDelCol(false);
    }


}

customElements.define('supertable-component', SuperTable);
