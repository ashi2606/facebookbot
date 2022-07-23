const transactions = require("../../files/transactions.json")

function findDuplicateTransactions(transactions = []) {
    let result = [];
    let transactionsDetails = transactions.reduce((category, categoryObj) => {
        const key = categoryObj['category'];
        if (!category[key]) category[key] = [];
        category[key].push(categoryObj);
        category[key].sort((a, b) => a.time.localeCompare(b.time))
        return category
    }, []);

    for (const key in transactionsDetails) {
        if (Object.hasOwnProperty.call(transactionsDetails, key)) {
            result.push(transactionsDetails[key]);
        }
    }
    return result;
}

const resultData = findDuplicateTransactions(transactions);
console.log(resultData);


