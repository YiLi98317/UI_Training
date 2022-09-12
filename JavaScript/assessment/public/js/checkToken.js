function checkToken(goodTarget, badTarget) {
    const token = localStorage.getItem("token");
    const currPath = window.location.pathname;
    if(!token) {
        console.log("client side, no token");
        if(currPath === '/' + badTarget) return;
        else window.location = badTarget;
    }

    axios.post('./check-token', {
        token: token
    })
    .then(function(res) {
        const data = res.data;
        console.log("client side, response data: ", data);
        if(data.status == "1") {
            if(currPath === '/' + goodTarget) return;
            else window.location = goodTarget;
        } else {
            localStorage.removeItem("token");
            window.location = badTarget;
        }
    })
};

// export {
//     checkToken
// };

checkToken(window.location.pathname === '/result.html' ? "result.html" : "assessment.html", "login.html");