export const initWalletsStorage = () => {
    const exists = localStorage.getItem('wallets')
    if (!exists) {
        //localStorage.setItem('wallets', JSON.stringify({ logged: { 'bool': false, 'email': '' } }))
        localStorage.setItem("wallets", JSON.stringify({
            't@t.com': {
                'address': 'mtWyWxCmVjay1jkZedHfM9SPqA2SaGXgnc',
                'wif': 'cMvWu5rZjbiCdfHE7U6RszhV8rvyVZk1YUu64AZ5efpxoWow1KsW',
                'public_key': '03c4286e83e9da89a9491864718d58f967e84c0f74f4836aeae084642e15c0a7a4',
                'private_key': '0a318361d63ba7eec141bc62552f5678f4a3b43e4cac4628a7bb10f49e6e5a68'
            },
            'logged': {
                'bool': true,
                'email': 't@t.com'
            }
        }));
    }
}

export const getWalletsStorage = () => {
    return JSON.parse(localStorage.getItem('wallets')!)
}

export const addWalletStorage = (email: string, address: string, public_key: string, private_key: string, wif: string) => {
    let json = { 'address': address, 'public_key': public_key, 'private_key': private_key, 'wif': wif };
    let d = getWalletsStorage()
    d[email] = json
    localStorage.setItem('wallets', JSON.stringify(d))
}

export const setTrueLoggedStorage = (email: string) => {
    let d = getWalletsStorage()
    d['logged'] = { bool: true, email: email }
    localStorage.setItem('wallets', JSON.stringify(d))
}

export const setFalseLoggedStorage = () => {
    let d = getWalletsStorage()
    d['logged'] = { bool: false, email: '' }
    localStorage.setItem('wallets', JSON.stringify(d))
}