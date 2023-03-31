import { getWalletsStorage } from "./storage"

export const sendTransaction = async (toAddress: string, value: number) => {
    let storageData = getWalletsStorage()
    let fromAddress = storageData[storageData['logged']['email']]['address']

    
    let unsigned_tx = await createTransaction(fromAddress, toAddress, value)
    if (unsigned_tx['errors']) {
        return 'Error.' + unsigned_tx['errors'][0]['error'] + ', please try again'
    } else {
        console.log(setupTxJson(unsigned_tx))
        return 'Success.Transaction created successfully, wait for signature and broadcast(check transaction list)'
    }
}

const createTransaction = async (fromAddress: string, toAddress: string, value: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "inputs": [
            {
                "addresses": [
                    fromAddress
                ]
            }
        ],
        "outputs": [
            {
                "addresses": [
                    'as'
                    //toAddress
                ],
                "value": value
            }
        ]
    });
    let result = await (await fetch("https://api.blockcypher.com/v1/bcy/test/txs/new", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })).json()
    return result
}

const saveUnsignedtoDB = async (email: string, tx: string, tosign: string, fromAddress: string, toAddress: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "action": "addTransaction",
        "email": email,
        "tx": tx,
        "tosing": tosign,
        "fromAddress": fromAddress,
        "toAddress": toAddress
    });
    fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const setupTxJson = (tx: JSON) => {

}