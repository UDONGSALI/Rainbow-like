import React, { useState } from 'react';
import PostNoticeList from "../component/Post/PostNoticeList";



const BoardNum = 1;
function NoticePage() {

    return (
        <div>
            <PostNoticeList boardNum={BoardNum} />
        </div>
    );
}

export default NoticePage;
