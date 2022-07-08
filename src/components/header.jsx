import React from "react";
import { Fade, Rotate, JackInTheBox} from "react-awesome-reveal";

export const Header = () => {

    return (
        <div className="header">
            <JackInTheBox>
                <img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"/>
            </JackInTheBox>
        </div>
    )
}