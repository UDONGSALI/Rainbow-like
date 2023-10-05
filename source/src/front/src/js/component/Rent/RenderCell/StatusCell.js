import React from 'react';

function StatusCell({ handleStatusChange, params }) {
    const handleChange = (event) => {
        handleStatusChange(params.row.rentHistNum, event.target.value);
    };

    return (
        <select
            defaultValue={params.value}
            onChange={handleChange}
        >
            <option value="WAIT">대기</option>
            <option value="APPROVE">승인</option>
            <option value="REJECT">거부</option>
        </select>
    );
}

export default StatusCell;
