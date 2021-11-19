import {observer} from 'mobx-react-lite'
import { Field, Formik } from 'formik';
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import React from 'react';
import authService from "../../services/authService";

const Signup= observer(() => {

    const history = useHistory();

    const validator = yup.object().shape({
        email: yup.string().email('Не корректно введений email').required('Необхідне поле'),
        password: yup.string().required('Необхідне поле'),
        userName: yup.string().required('Необхідне поле'),
        groupName: yup.string().required('Необхідне поле')
    });

    const registerHandler = async (data) => {
        await authService.register(data, history);
    }

    return(
        <div className="signup w-screen h-screen bg-yellow-200">
            <Formik initialValues={{
                email: '',
                userName: '',
                password: '',
                groupName: 'КН-41'
            }} validateOnBlur validationSchema={validator} onSubmit={async (values) => await registerHandler(values)}
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
                    <div className="pt-64">
                        <div className="w-25 mx-auto bg-yellow-300 p-5 rounded">
                            <h3 className="text-2xl mb-4">Реєстрація</h3>
                            {touched.email && errors.email && <p className="text-sm-left text-red-500 mb-2">{errors.email}</p>}
                            <p>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </p>
                            {touched.userName && errors.userName && <p className="text-sm-left text-red-500 mb-2">{errors.userName}</p>}
                            <p>
                                <input
                                    placeholder="ПІП"
                                    type="text"
                                    name="userName"
                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userName}
                                />
                            </p>
                            <p>
                                <Field className="mb-2 p-2 font-medium bg-gray-200" as="select" name="groupName">
                                    <option value="КН-41">КН-41</option>
                                    <option value="КН-42">КН-42</option>
                                    <option value="АП-41">АП-41</option>
                                    <option value="АП-42">АП-42</option>
                                </Field>
                            </p>
                            {touched.password && errors.password && <p className="text-sm-left text-red-500 mb-2">{errors.password}</p>}
                            <p>
                                <input
                                    placeholder="Пароль"
                                    type="password"
                                    name="password"
                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </p>
                            <button className="bg-yellow-500 text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Зареєструватися</button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
})

export default Signup;