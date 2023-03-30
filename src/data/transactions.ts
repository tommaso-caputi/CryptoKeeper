export const sendTransaction = async () => {
    let fromAddress = "C7FEhqdB9pJqr2BTgS4gEJfNKezZZupTkv"
    let toAddress = "C36fr59PPnzyjDZmxRYwyEbPSo95KtxtqB"
    let value = 12412

    //createTransaction(fromAddress, toAddress, value)
    signTransaction()
}

const signTransaction = () => {
    let tosign = "97bd508700922670c0b2f596d152d93086ae95787a2215b2509497f5c6b86424"
    let hexPrivateKey = "63341222711063c3befbf1dd046d25219b1454bb110d8cc1ce385b6e6bf44594"

    
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
                    toAddress
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
    console.log(result);
}