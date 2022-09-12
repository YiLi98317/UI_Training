function checkToken(goodTarget, badTarget) {
    const token = localStorage.getItem("token");
    if(!token) {
        console.log("client side, no token");
        return false;
    }

    axios.post('./check-token', {
        token: token
    })
    .then(function(res) {
        const data = res.data;
        console.log("client side, response data: ", data);
        if(data.status == "1") window.location = "assessment.html";
        else {
            localStorage.removeItem("token");
            window.location = "login.html";
        }
    })
};

export {
    checkToken
};

// console.log("checkToken: ", checkToken.call(this));