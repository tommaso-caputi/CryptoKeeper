import sha256 from "fast-sha256";
import { addWalletStorage, setTrueLoggedStorage } from "./storage";

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
                            setTrueLoggedStorage(email)
                            resolve("Success.Loggato con successo");
                        } else {
                            resolve("Failed.Dovresti importare i dati del portafoglio");
                        }
                    } else {
                        resolve("Failed.L' email non é stata confermata");
                    }
                } else {
                    resolve("Failed.Email o password sono incorretti");
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
                        resolve("Success.Accesso avvenuto con successo." + data[2])
                    } else {
                        resolve("Failed.L' email non é stata confermata")
                    }
                } else {
                    resolve("Failed.La password non é corretta")
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
                resolve("Alert.Le password non coincidono")
            } else {
                //go ahead
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    resolve("Alert.L' email non é valida")
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
                                resolve("Failed.Questa email ha giá un' account")
                            }
                        });
                    });
                }
            }
        } else {
            resolve("Alert.La password é troppo corta")
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
        const resultDataAddress = await (await fetch("https://api.blockcypher.com/v1/bcy/test/addrs", { method: 'POST', redirect: 'follow' })).json()

        //add funds
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        await (await fetch("https://api.blockcypher.com/v1/bcy/test/faucet?token=1f4af807461e464d9aec36fed62ba29f",
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    "address": resultDataAddress.address,
                    "amount": 100000
                }),
                redirect: 'follow'
            })).json()

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
            addWalletStorage(email, resultDataAddress.address, resultDataAddress.public, resultDataAddress.private, resultDataAddress.wif)
            resolve("Success.Account creato con successo."
                + resultDataAddress.private + "."
                + resultDataAddress.public + "."
                + resultDataAddress.address + "."
                + resultDataAddress.wif
            )
        } else {
            resolve("Failed.Qualcosa é andato storto, prova di nuovo")
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
            addWalletStorage(email, public_key, address, private_key, wif)
            resolve("Success.Account creato con successo")
        } else {
            resolve("Failed.Qualcosa é andato storto, prova di nuovo")
        }
    });
}