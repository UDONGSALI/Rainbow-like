import React,{useState,useEffect} from "react";
import { SERVER_URL } from '../../constants';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


function Space(){
    const[spaces, setSpaces] =useState('');

    useEffect(() => {
        fetch(SERVER_URL+'api/spaces')
            .then(response=> response.json())
            .then(data=>setSpaces(data._embedded.spaces))
            .catch(error=>console.error(err));
            }, []);

    return (
        <div>

        </div>
    )
}

export default Space;