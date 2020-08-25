
import consts from '../../consts';
import axios from 'axios';


export const Get_Cities = 'Get_Cities';

export const Get_Debartmets = 'Get_Departments';


export const getCititis = (lang) => {
    return (dispatch) => {
        axios.get(`${consts.url}cities`, {
            lang: lang,
        }).then((response) => {

            dispatch({ type: Get_Cities, payload: response.data });

        }).catch(err => {
            console.log('err', err);
        });
    }
};

export const GetDepartment = (lang) => {
    return (dispatch) => {
        axios.get(`${consts.url}categories`, {
            lang: lang,
        }).then((response) => {

            dispatch({ type: Get_Debartmets, payload: response.data });

        }).catch(err => {
            console.log('err Departments', err);
        });
    }
};