import React from "react";
import { Link } from "react-router-dom";

const ResultPage = ({ match, location }) => {
    const {
        params: { activeUser }
    } = match;
    const {
        props: { howMany, counter }
    } = location;
    return (
        <>
            <section className="result">
                <div>
                    <p>To było ostatnie pytanie!</p>
                    <p>Odpowiedziałeś dobrze na  {counter} pytań z {howMany}</p>
                    <p>Dzięki za udział w quizie, {activeUser}</p>
                    <p>Zapisaliśmy Twój wynik w rankingu</p>
                    <Link to='/'><p>Zagraj jeszcze raz</p></Link>
                </div>

            </section>
        </>
    );
};

export default ResultPage;