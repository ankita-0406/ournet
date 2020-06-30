import React, { Component } from 'react';
import { Link } from 'react-router-dom';



const CheckMail = () => {

    return (
        <div class="content">
            <Link to='/'>
                <img  src="/img/design/OURNET-Logo-white.png" alt="OurNet" />
            </Link>
            <h2>
                Please check your email
            </h2>
            <h4>
                A confirmation link has been sent to your email. Please confirm within the next 48 hours
            </h4>
        </div>
    )
}

export default CheckMail;

// class CheckMail extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div class="login">
//                 <div class="content">
//                     <LogoLogin />
//                     <h2>
//                         <FormattedMessage id="registration.check-email" />
//                     </h2>
//                     <h4>
//                         <FormattedMessage id="registration.expiration-message" />
//                     </h4>
//                 </div>
//             </div>
//         )
//     }
// }

