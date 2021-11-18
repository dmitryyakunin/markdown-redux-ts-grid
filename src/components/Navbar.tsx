import React, {FC} from "react";
import {Link} from "react-router-dom";

const Navbar: FC = () => (
    <div className="navbar">
        <Link className="navbar_links" to="/home/0">Главная</Link>
        <Link className="navbar_links" to="/it-dept/1">Отдел ИТ</Link>
        <Link className="navbar_links" to="/hr-dept/2">Отдел кадров</Link>
    </div>
)

export default Navbar