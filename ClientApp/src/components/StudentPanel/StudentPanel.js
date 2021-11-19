import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import userService from "../../services/userService";
import authStore from "../../stores/authStore";
import lessonService from "../../services/lessonService";
import lessonStore from "../../stores/lessonStore";
import markStore from "../../stores/markStore";
import {Link} from "react-router-dom";
import markService from "../../services/markService";
import authService from "../../services/authService";
import jwtDecode from "jwt-decode";

const StudentPanel = observer(() => {
    const [base64, setBase64] = useState('')

    useEffect(() => {
        userService.getCurrentUser();
    }, []);

    useEffect(() => {
        lessonService.getLessons(jwtDecode(localStorage.getItem('groupName')));
        userService.getUserStats();
        markService.getUserMarks();
        var image = document.getElementById("user-image");
        if(authStore.currentUser.imagePath !== null && authStore.currentUser.imagePath !== undefined){
            image.src = authStore.currentUser.imagePath;
        }else{
            image.src = 'https://pmdoc.ru/wp-content/uploads/default-avatar.png';
        }
    }, [])

    function convertUTCDateToLocalDate(data) {
        return data.replace('T',' ').replace('Z', '').slice(0, -10);
    }

    const marksColumns = [
        {
            title: 'Оцінка',
            dataIndex: 'value',
            key: '1y3h2hg',
        },
        {
            title: 'Вчитель',
            dataIndex: 'teacherName',
            key: '4h4h3h'
        },
        {
            title: 'Предмет',
            dataIndex: 'subjectName',
            key: '123131313131313'
        }
    ];

    const lessonsColumns = [
        {
            title: 'Предмет',
            dataIndex: 'subjectName',
            key: '24g24g',
        },
        {
            title: 'Вчитель',
            dataIndex: 'teacherName',
            key: '23g23g23g'
        },
        {
            title: 'Посилання',
            dataIndex: 'url',
            key: 'sdg24g24h',
            render: (text, record) => <Link to={{ pathname: record.url }} target="_blank">Zoom конференція</Link>
        },
        {
            title: 'Дата',
            dataIndex: 'dateTime',
            key: 'as12r1h24b24t',
            render: (text, record) => <div className="text-black m-o self-center">{convertUTCDateToLocalDate(record.dateTime)}</div>
        }
    ];

    const getBase64 = e => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            console.log(reader.result);
            setBase64(reader.result);
            var image = document.getElementById("user-image");
            image.src = base64;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const uploadUserImage = async() => {
        await userService.uploadUserImage({base64});
    }

    return(
        <div className="student-panel w-screen h-screen bg-blue-500">
            <div className="container grid h-screen">
                <div className="h-5/6 bg-gray-200 self-center rounded-2xl p-5 grid grid-cols-4">
                    <div className="text-center media grid grid-cols-1 gap-3 bg-gray-300 p-3 rounded-l-2xl">
                        <h2 className="text-xl font-regular m-0">ПІП:</h2>
                        <h3 className="text-lg text-black font-light">{authStore.currentUser.userName}</h3>
                        <h2 className="text-xl font-regular m-0">Мій аватар:</h2>
                        <img
                            id="user-image"
                            src={'https://localhost:5001/wwwroot/' + authStore.currentUser.imagePath}
                            className="block w-64 h-64 mx-auto"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = base64;
                            }}
                        />
                        <input className="mx-auto" name="file" type="file" onChange={getBase64}/>
                        <button onClick={async() => await uploadUserImage()} className="bg-blue-500 text-white font-regular py-2 rounded-lg">Зберегти</button>
                    </div>
                    <div className="data bg-gray-500 rounded-r-2xl col-span-3 p-3">
                        <h2 className="text-xl text-white font-regular mb-2">Мої уроки:</h2>
                        <Table pagination={{ pageSize: 6}} columns={lessonsColumns} dataSource={[...lessonStore.lessons]}/>
                        <h2 className="text-xl text-white font-regular mb-2">Мої оцінки:</h2>
                        <Table pagination={{ pageSize: 6}} columns={marksColumns} dataSource={[...markStore.marks]}/>
                        <div className="user-stats ">
                            <h2 className="text-xl text-white font-regular mb-2">Статистика:</h2>
                            <h3 className="text-lg text-white font-light">Середній бал: {authStore.currentUserStats.averageMark}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default StudentPanel;