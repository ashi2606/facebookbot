
const axios = require('axios');
const fs = require('fs')

async function getProductlist() {
    try {
        const productList = await axios({
            method: "get",
            url: "https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json",
            responseType: "stream"
        });
        productList.data.pipe(fs.createWriteStream("files/product.json"))
    } catch (error) {
        console.log(error)
    }

}

getProductlist();