export const initWalletsStorage = () => {
    const exists = localStorage.getItem('wallets')
    if (!exists) {
        //localStorage.setItem('wallets', JSON.stringify({ logged: { 'bool': false, 'email': '' } }))
        /* localStorage.setItem("wallets", JSON.stringify({
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
        })); */
        localStorage.setItem("wallets", JSON.stringify({
            'deb@deb.com': {
                'address': 'C7FEhqdB9pJqr2BTgS4gEJfNKezZZupTkv',
                'wif': 'BresNKt7kfwvqxs5QFgNm1Jy2BT9UVe7zcAJJKMDtqUo9WQRH7rq',
                'public_key': '03ed43d6ba03151737a515f785d8cbb2873c17a1aa9160f269f3375ad2c667a123',
                'private_key': '63341222711063c3befbf1dd046d25219b1454bb110d8cc1ce385b6e6bf44594'
            },
            'logged': {
                'bool': true,
                'email': 'deb@deb.com'
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