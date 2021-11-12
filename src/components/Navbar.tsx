//import {Container, Dropdown, Menu} from "semantic-ui-react";
import React, {FC} from "react";
import {Link} from "react-router-dom";

const Navbar: FC = () => (
    <div className="navbar">
        <Link className="navbar_links" to="/">Главная</Link>
        <Link className="navbar_links" to="/it">Отдел ИТ</Link>
    </div>
)

export default Navbar

/*
export function Navbar() {

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    Project Name
                </Menu.Item>
                <Menu.Item as={ Link } name='home' to='/'>Главная</Menu.Item>

                <Menu.Item as={ Link } name='it' to='/it'>Отдел ИТ</Menu.Item>

                <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon'/>
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    )
}
*/