import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import {selectPages} from "./posts/postsSlice";

const Navbar: FC = () => {
    const pages: string[] = useAppSelector(selectPages);

    return (
        <div className="navbar">
            {pages.map((page, i) => {
                return (
                    <span key={i}>
                        <Link className="navbar_links" to={"/" + page.split(':')[0] + "/" + i}>
                            {page.split(':')[1]}
                        </Link>
                    </span>
                )
            })
            }
            <div style={{float: 'right', paddingRight:'30px'}}>
                <img src="/irand_logo.png" alt="irand" width="200px"/>
            </div>
        </div>
    )
}

export default Navbar