import React from 'react';

function PayStatusCell(params) {
    switch (params.value) {
        case 'WAIT':
            return '대기';
        case 'COMPLETE':
            return '완료';
        default:
            return params.value;
    }
}

export default PayStatusCell;