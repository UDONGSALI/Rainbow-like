import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

export function useToken() {
    checkTokenStatus();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (token) {
            const decodedToken = decodeToken(token);
            if (!decodedToken) {
                alert("로그아웃 되었습니다!");
                const jti = sessionStorage.getItem('jti');
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

                const expirationDate = new Date(decodedToken.exp * 1000);
                const oneHourFromNow = new Date().getTime() + 60 * 60 * 1000;
                if (expirationDate.getTime() <= oneHourFromNow) {
                    refreshToken();
                }
            }
            checkTokenStatus();
        }
    }, [navigate]);

    function getToken(credentials) {
        return fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken) {
                    sessionStorage.setItem('jwt', jwtToken);
                    decodeToken(jwtToken); // Decode and set token info in session storage
                    return { success: true, token: jwtToken };
                } else {
                    return { success: false };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    }

    function refreshToken() {
        const currentToken = sessionStorage.getItem('jwt');
        return fetch(`${SERVER_URL}token/refresh`, {
            method: 'GET',
            headers: {
                'Authorization': currentToken
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('jwt', data.token);
                    decodeToken(data.token);
                    return { success: true, token: data.token };
                } else {
                    return { success: false };
                }
            })
            .catch(err => {
                console.error(err);
                return { success: false, error: err };
            });
    }

    function checkTokenStatus() {
        const jti = sessionStorage.getItem('jti');
        if(jti) {
            fetch(`${SERVER_URL}token/${jti}`)
                .then(res => res.text())
                .then(data => {
                    if (data === "Y") {
                        alert("다른 곳에서 로그인 되었습니다!");
                        deleteTokenFromServer(jti);
                        sessionStorage.clear();
                        navigate("/login");
                    }
                    else if (!data){
                        alert("서버에서 로그아웃 되었습니다. 관리자에게 문의 하세요.");
                        sessionStorage.clear()
                        navigate("/login");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

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

    return { decodeToken, deleteTokenFromServer, getToken };
}
