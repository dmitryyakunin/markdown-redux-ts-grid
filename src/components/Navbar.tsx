import React, {FC} from "react";
import {Link} from "react-router-dom";

const Navbar: FC = () => (
    <div className="navbar">
        <Link className="navbar_links" to="/">Главная</Link>
        <Link className="navbar_links" to="/it">Отдел ИТ</Link>
    </div>
)

export default Navbar