import React, { useState, useEffect } from 'react';
import ImgPostList from "../../component/Post/ImgPostList";
import Footer from "../../layout/Footer/footer";
import {useParams} from "react-router-dom";
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";
import Header from "../../layout/Header/Header";


function SjNewsPage() {
    const { boardNum } = useParams();



    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'세종시 단체 및 소식'}/>
            <ImgPostList boardNum={boardNum} />
            <Footer />
        </div>
    );
}

export default SjNewsPage;