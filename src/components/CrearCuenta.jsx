import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Helmet } from 'react-helmet';
import Crearcuenta from '../images/agregar-usuario.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CrearCuenta = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    //const expresionRegular = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

    const handleSubmit = async (values) =>{
        try{
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            navigate('/')
        }catch(error){
            message.open({
                type: 'error',
                content: 'Ya existe una cuenta con ese correo electrónico'
            });
        }
    }

    return (
        <Contenedor>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>
            <ContenedorFormulario>
                <Form form={form} name='registrarse' scrollToFirstError className='login-form' onFinish={handleSubmit} size='large'>
                    <Form.Item>
                        <Imagen>
                            <img src={Crearcuenta} width="35%" alt="" styled="justify-content: center"/>
                        </Imagen>        
                    </Form.Item>
                    <Form.Item name='email' rules={[
                        { type: 'email', message: 'Introduzca un correo válido',},
                        { required: true, message: 'Introduzca un correo electrónico' },
                    ]}>
                        <Input prefix={<FontAwesomeIcon icon={faAt} />} placeholder="Correo electrónico" type='email'/>
                    </Form.Item>
                    <Form.Item name='password' hasFeedback rules={[
                        { required: true, message: 'Introduzca una contraseña' },
                        { min: 6, message: 'Mínimo seis caracteres' },
                    ]}>
                        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Contraseña'/>
                    </Form.Item>
                    <Form.Item name='confirm' dependencies={['password']} hasFeedback rules={[
                        { required: true, message: 'Por favor, confirme su contraseña'},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(!value || getFieldValue('password') === value){
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('La contraseña no es igual'));
                            },
                        }),
                    ]}>
                        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Confirmar contraseña'/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}} shape="round">
                            Crear Cuenta
                        </Button><br /> <br />
                        O <Button type='link' onClick={() => navigate("/iniciar-sesion")} size='Default'>Iniciar Sesión</Button>
                    </Form.Item>
                </Form>
            </ContenedorFormulario>
        </Contenedor>
    );
}

const Contenedor = styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 55px);
    justify-content: center;
    align-items: center;
`;

const ContenedorFormulario = styled.div`
    width: 19rem;
    height: auto;
    border: 1px solid;
    border-radius: 16px;
    padding: 1.5rem;
    background-color: #fff;
`;
 
const Imagen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`;
 
export default CrearCuenta;