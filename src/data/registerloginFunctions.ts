import sha256 from "fast-sha256";

//login

/* returns :
    Success.Logged successfully
    Failed.Should be imported address data
    Failed.Email is not confirmed
    Failed.Email or password are incorrect
 */
export function loginEmailPassword(email: string, password: string) {
    return new Promise(function (resolve) {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                email: email,
                password: passwordHash,
            }),
        }).then((response) => {
            response.text().then(async (response) => {
                let data = response.split(".");
                if (data[3] === "True") {
                    if (data[1] === "1") {
                        let d = JSON.parse(localStorage.getItem('wallets')!)
                        if (d[email] !== undefined) { //check if wallet should be imported
                            resolve("Success.Logged successfully");
                        } else {
                            resolve("Failed.Should be imported address data");
                        }
                    } else {
                        resolve("Failed.Email is not confirmed");
                    }
                } else {
                    resolve("Failed.Email or password are incorrect");
                }
            });
        });
    });
};

/* returns :
    Success.Logged successfully.data[2](fullname)
    Failed.Email is not confirmed
    Failed.Password is incorrect
 */
export const loginPassword = (email: string, password: string) => {
    return new Promise(function (resolve) {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                email: email,
                password: passwordHash,
            }),
        }).then((response) => {
            response.text().then((response) => {
                let data = response.split(".");
                if (data[3] === "True") {
                    if (data[1] === "1") {
                        resolve("Success.Logged successfully." + data[2])
                    } else {
                        resolve("Failed.Email is not confirmed")
                    }
                } else {
                    resolve("Failed.Password is incorrect")
                }
            });
        });
    });
};


//register


/* Returns:
    1 -> Alert: Passwords are differents
    2 -> Alert: Password too short
    3 -> Alert: Email is not valid
    4 -> Failed: This email has already an account
    5 -> Success
*/
const checks = (email: string, password: string, confirmpassword: string) => {
    return new Promise(function (resolve) {
        if (password.length > 0) {
            if (password !== confirmpassword) {
                resolve(1)
            } else {
                //go ahead
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    resolve(3)
                } else {
                    //go ahead
                    fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
                        method: "POST",
                        body: JSON.stringify({
                            action: "checkUserEmail",
                            email: email,
                        }),
                    }).then((response) => {
                        response.text().then((response) => {
                            if (response !== "True") {
                                // go ahead
                                resolve(5)
                                //registration(email, password)
                            } else {
                                resolve(4)
                            }
                        });
                    });
                }
            }
        } else {
            resolve(2)
        }
    });
};

/* Returns:

*/
async function registration(email: string, password: string) {
    const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    const resultDataAddress = await (await fetch("https://api.blockcypher.com/v1/btc/test3/addrs", { method: 'POST', redirect: 'follow' })).json()
    const resultRegistration = await (await fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
        method: "POST",
        body: JSON.stringify({
            action: "registration",
            email: email,
            password: passwordHash,
            address: resultDataAddress.address,
        }),
    })).text()
    if (resultRegistration === "Success") {
        fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: "POST",
            body: JSON.stringify({
                action: "sendConfirmEmail",
                email: email
            }),
        })
        let json = { 'address': resultDataAddress.address, 'public_key': resultDataAddress.public, 'private_key': resultDataAddress.private, 'wif': resultDataAddress.wif };
        let d = JSON.parse(localStorage.getItem('wallets')!)
        d[email] = json
        localStorage.setItem('wallets', JSON.stringify(d))
        /* presentAlert({
            header: "Success",
            subHeader: "Account successfully created",
            buttons: [{
                text: 'OK'
            },]
        }); */
        /* history.push("/remember", {
            private_key: resultDataAddress.private,
            public_key: resultDataAddress.public,
            address: resultDataAddress.address,
            wif: resultDataAddress.wif,
            email: email,
        }); */
    }
}


export function fullRegistration() {

}