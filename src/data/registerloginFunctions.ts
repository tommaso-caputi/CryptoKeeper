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
                            let d = JSON.parse(localStorage.getItem('wallets')!)
                            console.log(d)
                            d['logged'] = { bool: true, email: email }
                            localStorage.setItem('wallets', JSON.stringify(d))
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
    Alert.Passwords are differents
    Alert.Password too short
    Alert.Email is not valid
    Failed.This email has already an account
    Success
*/
export const checks = (email: string, password: string, confirmpassword: string) => {
    return new Promise(function (resolve) {
        if (password.length > 0) {
            if (password !== confirmpassword) {
                resolve("Alert.Passwords are differents")
            } else {
                //go ahead
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    resolve("Alert.Email is not valid")
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
                                resolve("Success")
                            } else {
                                resolve("Failed.This email has already an account")
                            }
                        });
                    });
                }
            }
        } else {
            resolve("Alert.Password too short")
        }
    });
};

/* Returns:
    Success.Account successfully created.il resto
    Failed.Something went wrong, please try again
*/
export async function registration(email: string, password: string) {
    return new Promise(async function (resolve) {
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
            resolve("Success.Account successfully created."
                + resultDataAddress.private + "."
                + resultDataAddress.public + "."
                + resultDataAddress.address + "."
                + resultDataAddress.wif
            )
        } else {
            resolve("Failed.Something went wrong, please try again")
        }
    });
}

/* Returns:
    Success.Account successfully created
    Failed.Something went wrong, please try again
*/
export async function importRegistration(email: string, password: string, address: string, public_key: string, private_key: string, wif: string) {
    return new Promise(async function (resolve) {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        //const resultDataAddress = await (await fetch("https://api.blockcypher.com/v1/btc/test3/addrs", { method: 'POST', redirect: 'follow' })).json()
        const resultRegistration = await (await fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: "POST",
            body: JSON.stringify({
                action: "registration",
                email: email,
                password: passwordHash,
                address: address,
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
            let json = { 'address': address, 'public_key': public_key, 'private_key': private_key, 'wif': wif };
            let d = JSON.parse(localStorage.getItem('wallets')!)
            d[email] = json
            localStorage.setItem('wallets', JSON.stringify(d))
            resolve("Success.Account successfully created")
        } else {
            resolve("Failed.Something went wrong, please try again")
        }
    });
}