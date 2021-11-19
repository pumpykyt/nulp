import {observer} from "mobx-react-lite";
import {DatePicker, Table} from "antd";
import subjectStore from "../../stores/subjectStore";
import React, {useEffect, useState} from "react";
import subjectService from "../../services/subjectService";
import lessonService from "../../services/lessonService";
import lessonStore from "../../stores/lessonStore";
import {Field, Formik} from "formik";
import * as yup from "yup";
import markService from "../../services/markService";
import markStore from "../../stores/markStore";
import authStore from "../../stores/authStore";
import userService from "../../services/userService";

const TeacherPanel = observer(() => {

    useEffect(() => {
        subjectService.getSubjects();
        lessonService.getAllLessons();
        markService.getMarks();
        userService.getUsers();
    }, []);

    const [date, setDate] = useState('')

    function convertUTCDateToLocalDate(data) {
        return data.replace('T',' ').replace('Z', '').slice(0, -10);
    }

    const onOk = value => {
        var date = new Date(value._d);
        setDate(date.getFullYear() + '-' + date.getUTCMonth() +
            '-' + date.getUTCDate() + "T" + date.getHours() + ':' + date.getUTCMinutes() + ':00');
    }

    const lessonValidator = yup.object().shape({
        subjectId: yup.number().required('Необхідне поле'),
        url: yup.string().required('Необхідне поле'),
        groupName: yup.string().required('Необхідне поле')
    });

    const markValidator = yup.object().shape({
        subjectId: yup.number().required('Необхідне поле'),
        userId: yup.string().required('Необхідне поле'),
        value: yup.number().required('Необхідне поле')
    });

    const subjectColumns = [
        {
            title: 'Предмет',
            dataIndex: 'name',
            key: 'subjectName',
        },
        {
            title: 'Вчитель',
            dataIndex: 'teacherName',
            key: 'subjectTeacherName'
        }
    ];

    const lessonsColumns = [
        {
            title: 'Урок',
            dataIndex: 'subjectName',
            key: 'lessonSubjectName',
        },
        {
            title: 'Вчитель',
            dataIndex: 'teacherName',
            key: 'lessonTeacherName'
        },
        {
            title: 'Дата й час',
            dataIndex: 'dateTime',
            key: 'lessonDateTime',
            render: (text, record) => <div className="text-black m-o self-center">{convertUTCDateToLocalDate(record.dateTime)}</div>
        }
    ];

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
        },
        {
            title: 'Студент',
            dataIndex: 'userName',
            key: 'as12r1t',
            render: (text, record) => <div className="text-black m-o self-center">{record.userName.split(' ')[0] +
                                        ' ' + record.userName.split(' ')[1]}</div>
        }
    ];

    const handleLessonForm = async(data) => {
        await lessonService.addLesson({
            ...data,
            dateTime: date
        });
    }

    const handleMarkForm = async(data) => {
        await markService.addMark(data);
    }

    return(
        <div className="teacher-panel w-screen min-h-screen bg-blue-400">
            <div className="container pt-20">
                <div className="w-full bg-blue-500 grid grid-cols-6 gap-5 p-5 rounded-2xl">
                    <div className="col-span-2">
                        <div className="text-white font-bold text-lg mb-2">Предмети:</div>
                        <Table pagination={{ pageSize: 3}} columns={subjectColumns} dataSource={[...subjectStore.subjects]}/>
                    </div>
                    <div className="col-span-2">
                        <div className="text-white font-bold text-lg mb-2">Уроки:</div>
                        <Table pagination={{ pageSize: 3}} columns={lessonsColumns} dataSource={[...lessonStore.lessonsGlobal]}/>
                        <div>
                            <Formik initialValues={{
                                url: '',
                                subjectId: 1,
                                groupName: 'КН-41'
                            }} validateOnBlur validationSchema={lessonValidator} onSubmit={async(values) => await handleLessonForm(values)}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      isValid,
                                      handleSubmit,
                                      dirty
                                  }) => (
                                    <div className="mt-16 bg-blue-400 rounded-lg p-3">
                                        <div>
                                            <h3 className="text-2xl mb-4 text-white">Добавити урок</h3>
                                            <p>
                                                <Field className="mb-2 p-2 font-medium bg-gray-200" as="select" name="groupName">
                                                    <option value="КН-41">КН-41</option>
                                                    <option value="КН-42">КН-42</option>
                                                    <option value="АП-41">АП-41</option>
                                                    <option value="АП-42">АП-42</option>
                                                </Field>
                                            </p>
                                            <p>
                                                <Field className="mb-2 p-2 font-medium bg-gray-200" as="select" name="subjectId">
                                                    {
                                                        subjectStore.subjects.map((subject) => (
                                                            <option value={subject.id}>{subject.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </p>
                                            <p>
                                                <DatePicker format="YYYY-MM-DD HH:mm:ss" name="dateTime" showTime onOk={onOk}/>
                                            </p>
                                            {touched.url && errors.url && <p className="text-sm-left text-red-500 mb-2">{errors.url}</p>}
                                            <p>
                                                <input
                                                    placeholder="Посилання"
                                                    type="text"
                                                    name="url"
                                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.url}
                                                />
                                            </p>
                                            <button className="bg-yellow-500 text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Добавити</button>
                                        </div>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-white font-bold text-lg mb-2">Оцінки:</div>
                        <Table pagination={{ pageSize: 3}} columns={marksColumns} dataSource={[...markStore.marksGlobal]}/>
                        <Formik initialValues={{
                            userId: '',
                            subjectId: 1,
                            value: 0,
                        }} validateOnBlur validationSchema={markValidator} onSubmit={async(values) => await handleMarkForm(values)}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  isValid,
                                  handleSubmit,
                                  dirty
                              }) => (
                                <div className="mt-16 bg-blue-400 rounded-lg p-3">
                                    <div>
                                        <h3 className="text-2xl mb-4 text-white">Добавити оцінку</h3>
                                        <p>
                                            <Field className="mb-2 p-2 font-medium bg-gray-200" as="select" name="userId">
                                                {
                                                    authStore.users.map((user) => (
                                                        <option key={user.id + user.userName} value={user.id}>{user.userName}</option>
                                                    ))
                                                }
                                            </Field>
                                        </p>
                                        <p>
                                            <Field className="mb-2 p-2 font-medium bg-gray-200" as="select" name="subjectId">
                                                {
                                                    subjectStore.subjects.map((subject) => (
                                                        <option key={subject.id + subject.name} value={subject.id}>{subject.name}</option>
                                                    ))
                                                }
                                            </Field>
                                        </p>
                                        {touched.value && errors.value && <p className="text-sm-left text-red-500 mb-2">{errors.value}</p>}
                                        <p>
                                            <input
                                                placeholder="Оцінка"
                                                type="number"
                                                name="value"
                                                className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.value}
                                            />
                                        </p>
                                        <button className="bg-yellow-500 text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Добавити</button>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default TeacherPanel;