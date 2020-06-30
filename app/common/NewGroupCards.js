import React from 'react';
import '../../style/component/NewGroupCards.css';


const NewGroupCards = () => {
    return (
        <section id="bs-pricing-six" className="bs-pricing-four roomy-50  fix">
            {/* <div className="container"> */}
            <div className="row">
                <div className="col-md-3">
                    <div className="bs bs-pricing bg-danger">
                        <div className="cotent">
                            <h3 className="category">Basic</h3>
                            <h1 className="bs-caption"><small></small>FREE</h1>
                            <ul>
                                <li><b>1 /</b> Month</li>
                                <li><b>40 </b> Members</li>
                                {/* <li><b>24/7</b> Tech Support</li>
                                    <li><b>Auto</b> Backup</li>
                                    <li>Monthly Backups</li>
                                    <li>8 CPU Core</li> */}
                            </ul>
                            <a href={null} className="btn btn-white">Selected</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bs bs-pricing">
                        <div className="cotent">
                            <h3 className="category">Intermediate</h3>
                            <h1 className="bs-caption"><small>$</small>1.99</h1>
                            <ul>
                                <li><b>1 /</b> Month</li>
                                <li><b>100</b> Members</li>
                                {/* <li><b>24/7</b> Tech Support</li>
                                    <li><b>Auto</b> Backup</li>
                                    <li>Monthly Backups</li>
                                    <li>8 CPU Core</li> */}
                            </ul>
                            {/* {document.getElementById("123456aa").disabled = true} */}
                            <a href={null} id="123456aa" className="btn btn-danger" disabled>Buy Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bs bs-pricing" >
                        <div className="cotent">
                            <h3 className="category">Large</h3>
                            <h1 className="bs-caption"><small>$</small>3.99</h1>
                            <ul>
                                <li><b>1 /</b> Month</li>
                                <li><b>500</b> Members</li>
                                {/* <li><b>24/7</b> Tech Support</li>
                                    <li><b>Auto</b> Backup</li>
                                    <li>Monthly Backups</li>
                                    <li>8 CPU Core</li> */}
                            </ul>
                            <a href={null} className="btn btn-danger" disabled>Buy Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bs bs-pricing">
                        <div className="cotent">
                            <h3 className="category">Enterprise</h3>
                            <h1 className="bs-caption"><small>$</small>11.99</h1>
                            <ul>
                                <li><b>1 /</b> Month</li>
                                <li><b>200</b> Members</li>
                                {/*<li><b>24/7</b> Tech Support</li>
                                    <li><b>Auto</b> Backup</li>
                                    <li>Monthly Backups</li>
                                    <li>8 CPU Core</li> */}
                            </ul>
                            <a href={null} className="btn btn-danger" disabled>Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    )
}
export default NewGroupCards;
