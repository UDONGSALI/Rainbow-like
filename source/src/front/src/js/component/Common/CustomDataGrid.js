import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomDataGrid = (props) => {
    const {components, ...otherProps} = props;

    const CustomFooter = () => (
        <div style={{background: '#ffffff', textAlign: 'center', padding : '5%', height : '80px',display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2}>
                <Pagination style={{alignItems:'center'}}
                            count={5}
                            color="secondary" />

            </Stack>

        </div>
    );

    return <DataGrid components={{...components, footer: CustomFooter}} {...otherProps} />;
};

export default CustomDataGrid;