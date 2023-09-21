import React, { useState } from 'react';
import SjNewsList from "../../component/Post/SjNewsList";

const BoardNum = 3;
function SjNewsPage() {

    return (
        <div>
            <SjNewsList boardNum={BoardNum} />
        </div>
    );
}

export default SjNewsPage;
