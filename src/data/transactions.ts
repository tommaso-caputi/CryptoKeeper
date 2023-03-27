import { getWalletsStorage } from "./storage";

/* Retuns:
    Success.transactionhash
    Failed.Something went wrong, please try again
*/
export const sendTransaction = (to: string, value: any) => {
    return new Promise(async function (resolve) {
        let a = getWalletsStorage()
        let from = a[a['logged']['email']]['address']
        to = 'C36fr59PPnzyjDZmxRYwyEbPSo95KtxtqB';
        value = '121213'
        value = parseInt(value, 10);

        //create transaction to sign
        let temp = await getTxToSign(from, to, value);
        let json = JSON.parse(temp)

        //need to sign 
        let signature = sign(json.tosign[0], a[a['logged']['email']]['private_key'])

        //create final transaction
        transaction(json.tx, json.tosign[0], a[a['logged']['email']]['public_key'], signature)
    });
}

const getTxToSign = (from: string, to: string, value: number) => {
    return new Promise<string>(async function (resolve) {
        fetch("https://api.blockcypher.com/v1/bcy/test/txs/new", {
            method: 'POST',
            body: JSON.stringify({
                "inputs": [
                    {
                        "addresses": [
                            "C7FEhqdB9pJqr2BTgS4gEJfNKezZZupTkv"
                        ]
                    }
                ],
                "outputs": [
                    {
                        "addresses": [
                            to
                        ],
                        "value": value
                    }
                ]
            }),
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => console.log('error', error));
    });
}

const transaction = (tx: JSON, tosign: string, publicKey: string, signature: string) => {
    return new Promise(async function (resolve) {
        fetch("https://api.blockcypher.com/v1/bcy/test/txs/send?token=1f4af807461e464d9aec36fed62ba29f", {
            method: 'POST',
            body: JSON.stringify({
                "tx": tx,
                "tosign": [
                    tosign
                ],
                "signatures": [
                    signature
                ],
                "pubkeys": [
                    publicKey
                ]
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => console.log('error', error));
    });
}

const sign = (tosign: string, private_key: string) => {
    return 'prova'
}