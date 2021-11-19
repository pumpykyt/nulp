import {observer} from "mobx-react-lite";
import svg from "./../../assets/edu.svg";

const Home = observer(() => {

    return (
        <div className="home w-screen h-screen bg-blue-400">
            <div className="container h-screen grid grid-cols-2 gap-x-36">
                <div className="self-center">
                    <h2 className="text-white text-5xl font-bold">Особистий кабінет для навчання</h2>
                    <p className="text-white text-lg font-regular text-justify">
                        Це комунікаційна платформа для школи, яку вчителі,
                        учні та батьки використовують для дистанційного
                        навчання у школі.
                    </p>
                </div>
                <img className="self-center justify-self-end" src={svg} alt=""/>
            </div>
        </div>
    )
});

export default Home;