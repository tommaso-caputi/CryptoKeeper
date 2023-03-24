/* Retuns:
    Success.transactionhash
    Failed.Something went wrong, please try again
*/
export const sendTransaction = (to: string, value: any) => {
    return new Promise(async function (resolve) {
        to = 'moFjCowuS15XR5oCvnpoYzAT4sBZfoS58k';
        value = '121213'
        value = parseInt(value, 10);
        createTransaction(to, value);
    });
}

const createTransaction = (to: string, value: number) => {
    console.log(to, value)
}   