import React from 'react';

class Supertable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            btnDelColMarginLeft: '',
            btnDelRowMarginTop: '',
            isHideBtnDelRow: true,
            isHideBtnDelCol: true,
            rowArr: [],
            cellArr: [],
        };
    }

    componentWillMount (){
        let rowArr = [];
        for(let i = 0; i < this.props.rowsNum; i++){
            rowArr[i] = i;
        }

        let cellArr = [];
        for(let i = 0; i < this.props.colsNum; i++){
            cellArr[i] = i;
        }

        this.setState({rowArr:rowArr,cellArr:cellArr});
    }

    cellIndex = 0;
    rowIndex = 0;

    moveBtns(element){
        if(element.className !== 'st__cell') return;
        this.setState({
            btnDelColMarginLeft: element.offsetLeft,
            btnDelRowMarginTop: element.offsetTop,
        });
        this.cellIndex = element.cellIndex;
        this.rowIndex = element.parentNode.rowIndex;

    }

    hideBtns(val){
        if(!val){

        }
        this.setState((prevState)=>({
            //Проверяем, если строка или столбец остались в 1 екземпляре - не отображаем кнопку
            isHideBtnDelCol: !Boolean(prevState.cellArr.length - 1)||val,
            isHideBtnDelRow: !Boolean(prevState.rowArr.length - 1)||val,
        }))
    }

    addRow(){
        let newEl = this.state.rowArr[this.state.rowArr.length - 1] + 1;
        this.setState((prevSt)=>({rowArr: [...prevSt.rowArr,newEl]}));
    }

    addCol(){
        let newEl = this.state.cellArr[this.state.cellArr.length - 1] + 1;
        this.setState((prevSt)=>({cellArr: [...prevSt.cellArr,newEl]}));
    }

    delRow(){
        this.setState((prevSt)=>({rowArr: [...prevSt.rowArr.slice(0,this.rowIndex),...prevSt.rowArr.slice(this.rowIndex + 1)]}));
        if(this.state.rowArr.length === 2 || this.rowIndex === this.state.rowArr.length - 1){
            this.setState({isHideBtnDelRow: true})
        }
    }

    delCol(){
        this.setState((prevSt)=>({cellArr: [...prevSt.cellArr.slice(0,this.cellIndex),...prevSt.cellArr.slice(this.cellIndex + 1)]}));
        if(this.state.cellArr.length === 2 || this.cellIndex === this.state.cellArr.length - 1){
            this.setState({isHideBtnDelCol: true});
        }
    }


    render(){
        return(
            <div className="st" onMouseLeave={this.hideBtns.bind(this,true)}>
                <button
                    className="st__btn st__btn-del st__btn-del_row st__btn_position-left"
                    style={{marginTop: this.state.btnDelRowMarginTop}}
                    hidden={this.state.isHideBtnDelRow}
                    onClick={this.delRow.bind(this)}
                />
                <button
                    className="st__btn st__btn-del st__btn-del_col st__btn_position-top"
                    style={{marginLeft: this.state.btnDelColMarginLeft}}
                    hidden={this.state.isHideBtnDelCol}
                    onClick={this.delCol.bind(this)}
                />

                <table
                    className="st__table"
                    onMouseOver={(e) => this.moveBtns(e.target)}
                    onMouseEnter={this.hideBtns.bind(this,false)}
                >
                    <tbody>
                    {this.state.rowArr.map((val) =>
                        <tr key={val} >
                            {this.state.cellArr.map((val) =>
                                <td key={val} className="st__cell" />
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>

                <button
                    className="st__btn st__btn-add st__btn-add_row st__btn_position-bottom"
                    onClick={this.addRow.bind(this)}
                />
                <button
                    className="st__btn st__btn-add st__btn-add_col st__btn_position-right"
                    onClick={this.addCol.bind(this)}
                />
            </div>
        )
    }
}

Supertable.defaultProps = {
    colsNum: 4,
    rowsNum: 4
};

export default Supertable;
