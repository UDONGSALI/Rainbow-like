import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

export function useToken() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (token) {
            const decodedToken = decodeToken(token);
            if (!decodedToken) {
                alert("로그아웃 되었습니다!");
                const jti = sessionStorage.getItem('jti'); // 세션 스토리지에서 jti를 가져옴
                console.log(jti)
                deleteTokenFromServer(jti);
                sessionStorage.clear()
                navigate("/login");
            } else {
                // 유형을 세션 스토리지에 저장
                sessionStorage.setItem("role", decodedToken.role);
                // 멤넙을 세션 스토리지에 저장
                sessionStorage.setItem("memNum", decodedToken.memNum);
                // username을 세션 스토리지에 저장
                sessionStorage.setItem("memId", decodedToken.sub);
                // 여기에 재발급 로직 추가 가능
                sessionStorage.setItem("jti", decodedToken.jti);
                // 여기에 재발급 로직 추가 가능
            }
        }
    }, [navigate]);

    function decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const decoded = JSON.parse(jsonPayload);
            if (decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000);
                const currentDate = new Date();
                if (expirationDate <= currentDate) {
                    return null;  // 만료된 경우 null 반환
                }
            }

            // if (decoded.jti) {
            //     sessionStorage.setItem("jti", decoded.jti); // 세션 스토리지에 jti 저장
            // }

            return decoded;
        } catch (error) {
            console.error('토큰 디코딩 중 오류 발생:', error);
            return null;
        }
    }


    function deleteTokenFromServer(jti) {
        fetch(`${SERVER_URL}token?jti=${jti}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error deleting token");
                }
            });
    }

    return { decodeToken, deleteTokenFromServer };
}