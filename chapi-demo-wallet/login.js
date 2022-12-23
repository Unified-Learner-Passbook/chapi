const inputAadhar = document.getElementById("inputAadhar");
const aadharSubmit = document.getElementById("aadharSubmit");
const otpSubmit = document.getElementById("otpSubmit");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const loginSubmit = document.getElementById("loginSubmit");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

async function postData(url = "", data = {}, fusionAuthApiKey) {
    let headers = {
        "Content-Type": "application/json",
    };
    if (fusionAuthApiKey) {
        headers = {
            "Content-Type": "application/json",
            "Authorization": fusionAuthApiKey,
        };
    }
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers,
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
    return localStorage.getItem(key);
};

aadharSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(inputAadhar.value);
    postData("http://localhost:3001/kyc/triggerKyc", {
        aadhaar: inputAadhar.value,
    })
        .then((data) => {
            alert("Check your mail for the OTP"); // JSON data parsed by `data.json()` call
            setLocalStorage("aadhar", inputAadhar.value);
        })
        .catch((err) => {
            alert("Error: " + err);
        });
    console.log("aadharSubmit clicked");
});

otpSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(getLocalStorage("aadhaar"));
    postData("http://localhost:3001/kyc/register", {
        otp: inputOtp.value,
        aadhaar: getLocalStorage("aadhaar"),
        username: inputUsername.value,
        password: inputPassword.value,
    })
        .then((data) => {
            console.log({ data });
            alert("User is registered with following credentials"); // JSON data parsed by `data.json()` call
        })
        .catch((err) => {
            alert("Error: " + err);
        });
});

loginSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    postData("https://auth.konnect.samagra.io/api/login", {
        loginId: loginUsername.value,
        password: loginPassword.value,
        applicationId: "a789504e-06e5-4213-b326-e6c75a7489e8",
    }, "kO_ehNNYDrHxu9TrpTEE57GvtfOomP14g1Dd85-POZE_Zcawjpf5k20_")
        .then((data) => {
            console.log({ data });
            alert("You are logged in"); // JSON data parsed by `data.json()` call
            saveCurrentUser(loginUsername.value); 
            console.log(refreshUserArea);
            refreshUserArea();
        })
        .catch((err) => {
            alert("Error: " + err);
        });
});
