import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";
import ErrorMessage from "../error";
import PropTypes from 'prop-types'
import gotService from "../../services/gotService";

class ItemList extends Component {

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return(
                <li
                    key={id}
                    className="list-group-item"
                    onClick={ () =>this.props.onItemSelected(id)}>>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {data}  = this.props;
        const items = this.renderItems(data);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

const withData =(View) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        };
        componentDidMount() {
            const {getData} = this.props;

            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
                .catch(() => {
                    this.setState({
                        error:true
                    })
                })
        }

        render(){
            const {data} = this.state;
            if(!data && this.state.error === false){
                return <Spinner />;
            }else if(!data && this.state.error === true)
            {
                return(
                    <ul className="item-list list-group">
                        <ErrorMessage/>
                    </ul>
                )
            }
            return <View {...this.props}  data={data}/>
        }
    }
}
const {getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);