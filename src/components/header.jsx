import React from "react";
import { Fade, Rotate, JackInTheBox} from "react-awesome-reveal";

class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <JackInTheBox>
                    <img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"/>
                </JackInTheBox>
            </div>
        )
    }
}

export default Header;