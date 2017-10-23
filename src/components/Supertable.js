import React from 'react';
import './Supertable.css';

class Supertable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            btnDelColMarginLeft: 0,
            btnDelRowMarginTop: 0,
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

        this.setState({rowArr,cellArr});
    }

    cellIndex = 0;
    rowIndex = 0;

    moveBtns(element){
        if(element.className !== 'cell') return;
        this.setState({
            btnDelColMarginLeft: element.offsetLeft,
            btnDelRowMarginTop: element.offsetTop,
        });
        this.cellIndex = element.cellIndex;
        this.rowIndex = element.parentNode.rowIndex;

    }

    hideBtns(val){
        this.setState((prevState)=>({
            //Проверяем, если строка или столбец остались в 1 екземпляре - не отображаем кнопку
            isHideBtnDelCol: !Boolean(prevState.cellArr.length - 1)||val,
            isHideBtnDelRow: !Boolean(prevState.rowArr.length - 1)||val,
        }))
    }

    addRow = () => {
        let newEl = this.state.rowArr[this.state.rowArr.length - 1] + 1;
        this.setState((prevSt)=>({rowArr: [...prevSt.rowArr,newEl]}));
    };

    addCol = () => {
        let newEl = this.state.cellArr[this.state.cellArr.length - 1] + 1;
        this.setState((prevSt)=>({cellArr: [...prevSt.cellArr,newEl]}));
    };

    delRow = () => {
        this.setState((prevSt)=>({rowArr: [...prevSt.rowArr.slice(0,this.rowIndex),...prevSt.rowArr.slice(this.rowIndex + 1)]}));
        if(this.state.rowArr.length === 2 || this.rowIndex === this.state.rowArr.length - 1){
            this.setState({isHideBtnDelRow: true})
        }
    };

    delCol = () => {
        this.setState((prevSt)=>({cellArr: [...prevSt.cellArr.slice(0,this.cellIndex),...prevSt.cellArr.slice(this.cellIndex + 1)]}));
        if(this.state.cellArr.length === 2 || this.cellIndex === this.state.cellArr.length - 1){
            this.setState({isHideBtnDelCol: true});
        }
    };


    render(){
        const {
            rowArr,
            cellArr,
            btnDelColMarginLeft,
            btnDelRowMarginTop ,
            isHideBtnDelRow,
            isHideBtnDelCol,
        } = this.state;
        return(
            <div className="Supertable" onMouseLeave={this.hideBtns.bind(this,true)}>
                <button
                    className="btn btn-del btn-del_row btn_position-left"
                    style={{marginTop: btnDelRowMarginTop}}
                    hidden={isHideBtnDelRow}
                    onClick={this.delRow}
                />
                <button
                    className="btn btn-del btn-del_col btn_position-top"
                    style={{marginLeft: btnDelColMarginLeft}}
                    hidden={isHideBtnDelCol}
                    onClick={this.delCol}
                />

                <table
                    className="table"
                    onMouseOver={(e) => this.moveBtns(e.target)}
                    onMouseEnter={this.hideBtns.bind(this,false)}
                >
                    <tbody>
                    {rowArr.map((val) =>
                        <tr key={val} >
                            {cellArr.map((val) =>
                                <td key={val} className="cell" />
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>

                <button
                    className="btn btn-add btn-add_row btn_position-bottom"
                    onClick={this.addRow}
                />
                <button
                    className="btn btn-add btn-add_col btn_position-right"
                    onClick={this.addCol}
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