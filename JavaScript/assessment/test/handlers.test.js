const jwt = require('jsonwebtoken')
const jwtKey = 'assessmentProject';
const jwtExpirySeconds = 60*60*2; // 2 hours 10 sec as test
const { signIn, welcome, refresh, storeJWT, testPOST, start, checkToken } = require('../handlers');

const mockReq = () => {
    const req = {
        body: {
            userName: "testUsr",
            password: "testPwd",
            token: ""
        }
    };
    return req;
};

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

test('sign in status using correct credencials', () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const token = jwt.sign({ userName: mockedReq.body.userName }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
      })
    const nextMockedRes = {
        data: {
            redirect: "assessment.html",
            token: token
        }
    };

    const result = signIn(mockedReq, mockedRes, mockedNext);
    
    expect(mockedRes.json).toBeCalledWith(nextMockedRes.data);
    expect(result).toBe(true);
});

test('sign in status using incorrect credencials', () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    mockedReq.body.userName = "testAdmin";
    const mockedRes = mockRes();

    const result = signIn(mockedReq, mockedRes, mockedNext);
    
    expect(mockedRes.redirect).toBeCalledWith("/register.html");
    expect(result).toBe(false);
});

test('token check using correct token', () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const token = jwt.sign({ userName: mockedReq.body.userName }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });
    mockedReq.body.token = token;
    const nextMockedRes = {
        data: {
            status: "1"
        }
    };

    const result = checkToken(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.json).toBeCalledWith(nextMockedRes.data);
});

test('token check using incorrect token', () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const token = jwt.sign({ userName: mockedReq.body.userName }, "another Key", {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });
    mockedReq.body.token = token;
    const nextMockedRes = {
        data: {
            status: "0"
        }
    };

    const result = checkToken(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.json).toBeCalledWith(nextMockedRes.data);
});