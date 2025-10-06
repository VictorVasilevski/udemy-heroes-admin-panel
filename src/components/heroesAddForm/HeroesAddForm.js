import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './heroesAddForm.scss';
import { heroAdded } from '../heroesList/heroesSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const FormErrMsg = ({name}) => {
    return (
        <ErrorMessage name={name}>{msg => {
            return (
                <div className="validation-error">
                    {msg}
                </div>
            )
        }}
        </ErrorMessage>
    )
}

const HeroesAddForm = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const [addError, setAddError] = useState(false);

    const addHero = ({name, text, element}) => {
        const body = {
            name: name.charAt(0).toUpperCase() + name.slice(1), 
            element, 
            description: text, 
            id: uuidv4()}
        setAddError(false);
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(body))
            .then(() => dispatch(heroAdded(body)))
            .catch(() => setAddError(true))
    }

    const handleSubmit = (values, {resetForm}) => {
        addHero(values);
        resetForm();
    }

    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: 'Я владею элементом...',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                text: Yup
                    .string()
                    .min(10)
                    .required("Please provide some description for your hero"),
                element: Yup
                    .string()
                    .required("Select hero's element")
                    .notOneOf(['Я владею элементом...'], "Select hero's element")
            })}
            onSubmit={handleSubmit}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <FormErrMsg name="name"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        // required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"/>
                    <FormErrMsg name="text"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        // required
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                    <FormErrMsg name={"element"}/>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
                {addError ? <div className="validation-error">Failed to add hero.</div> : null}
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;