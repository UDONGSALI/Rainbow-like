function ApplyDateCell(params) {
    const applyDate = params.row.applyDate;
    return applyDate.replace("T", " ");
}

export default ApplyDateCell;