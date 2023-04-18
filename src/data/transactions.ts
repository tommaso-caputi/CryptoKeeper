import { getWalletsStorage } from "./storage"

export const sendTransaction = async (toAddress: string, value: number) => {
    let storageData = getWalletsStorage()
    let fromAddress = storageData[storageData['logged']['email']]['address']
    value = value * 100000000

    let unsigned_tx = await createTransaction(fromAddress, toAddress, value)
    if (unsigned_tx['errors']) {
        return 'Error.' + unsigned_tx['errors'][0]['error'] + ', please try again'
    } else {
        let tosign = unsigned_tx['tosign'][0]
        let changed_tx = setupTxJson(unsigned_tx['tx'])
        console.log(changed_tx)
        let a = await (await saveUnsignedtoDB(storageData['logged']['email'], changed_tx, tosign, fromAddress, toAddress, storageData[storageData['logged']['email']]['private_key']))
        if (a === 'Success') {
            return 'Success.Transazione creata con successo, attendere per la conferma(controlla la lista delle transazioni)'
        } else {
            return 'Error. Qualcosa é andato storto, prova di nuovo'
        }
    }
}

const createTransaction = async (fromAddress: string, toAddress: string, value: number) => {
    console.log(fromAddress, toAddress, value)
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
                    toAddress
                ],
                "value": value
            }
        ]
    });
    console.log(JSON.parse(raw));
    let result = await (await fetch("https://api.blockcypher.com/v1/bcy/test/txs/new", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })).json()
    return result
}

export const saveUnsignedtoDB = async (email: string, tx: string, tosign: string, fromAddress: string, toAddress: string, privKey: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "action": "addTransaction",
        "email": email,
        "tx": tx,
        "tosing": tosign,
        "fromAddress": fromAddress,
        "toAddress": toAddress,
        "privKey": privKey
    });
    let result = await (await fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }))
    return result.text();
}

const setupTxJson = (tx: JSON) => {
    let tx_string = JSON.stringify(tx)
    let tx_changed = tx_string.replace(/\"/g, "`")
    return tx_changed
}