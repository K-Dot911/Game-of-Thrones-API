import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage from "../pages/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import './app.css';
import gotService from "../../services/gotService";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksItem from "../pages/booksItem"


export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error:false
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };



    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/Houses" component={HousesPage}/>
                        <Route path="/books" exact component={BooksPage}/>
                        <Route path="/books/:id" render={({match})=> {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>}}/>
                        }}/>
                    </Container>
                </div>
            </Router>
        );
    }
};