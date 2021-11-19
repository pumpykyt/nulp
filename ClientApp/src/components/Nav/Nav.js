import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import authStore from "../../stores/authStore";

const Nav = observer(() => {

    return (
        <div className="nav w-screen h-auto fixed">
            <div className="container mx-auto grid grid-cols-6">
                <Link to="/" className="text-2xl font-bold py-2 text-white self-center">Онлайн школа</Link>
                <span className="col-span-3"/>
                { !authStore.isLoggedIn && <Link className="text-md font-regular text-white self-center justify-self-end" to="/login">
                    Вхід
                </Link> }
                { !authStore.isLoggedIn && <Link className="text-md font-regular text-white self-center justify-self-end" to="/register">
                    Реєстрація
                </Link> }
                { authStore.isAdmin && <Link className="text-md font-regular text-white self-center justify-self-end" to="/teacher/panel">
                    Адмін панель
                </Link>}
                { !authStore.isAdmin && authStore.isLoggedIn && <Link className="text-md font-regular text-white self-center justify-self-end" to="/student/panel">
                    Панель студента
                </Link>}
                { authStore.isLoggedIn &&
                <Link className="text-md font-regular text-white self-center justify-self-end"
                      to="/" onClick={() => authStore.logout()}>
                    Вихід
                </Link>}
            </div>
        </div>
    )
})

export default Nav;