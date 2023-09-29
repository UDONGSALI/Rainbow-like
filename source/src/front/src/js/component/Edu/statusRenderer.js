import React from "react";

export function renderStatusCell(params) {
    const currentDate = new Date();
    const recuStdt = new Date(params.row.edu?.recuStdt);
    const recuEddt = new Date(params.row.edu?.recuEddt);
    const eduStdt = new Date(params.row.edu?.eduStdt);
    const eduEddt = new Date(params.row.edu?.eduEddt);
    const recuPerson = params.row.edu?.recuPerson;
    const capacity = params.row.edu?.capacity;

    let eduStatusText;
    let eduStatusClass = "eduStatusCell";

    if (currentDate < recuStdt) {
        eduStatusText = '접수 대기';
        eduStatusClass += ' WAITING';
    } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
        if (recuPerson >= capacity) {
            eduStatusText = '접수 마감';
            eduStatusClass += ' REGISTRATION_CLOSED';
        } else {
            eduStatusText = '접수 중';
            eduStatusClass += ' REGISTRATION_OPEN';
        }
    } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
        eduStatusText = '교육 중';
        eduStatusClass += ' PROCESSING';
    } else if (currentDate > recuEddt && currentDate < eduEddt) {
        eduStatusText = '교육 대기';
        eduStatusClass += ' WAITING';
    } else if (currentDate >= eduEddt) {
        eduStatusText = '교육 종료';
        eduStatusClass += ' ENDED';
    } else {
        eduStatusText = '기타 상태';
    }

    return (
        <div className={eduStatusClass}>
            {eduStatusText}
        </div>
    );
}