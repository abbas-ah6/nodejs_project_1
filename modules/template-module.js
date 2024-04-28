module.exports = (temp, item) => {
    let outPut = temp.replace(/{%PRODUCTNAME%}/g, item.productName);
    outPut = outPut.replace(/{%IMAGE%}/g, item.image);
    outPut = outPut.replace(/{%FROM%}/g, item.from);
    outPut = outPut.replace(/{%PRICE%}/g, item.price);
    outPut = outPut.replace(/{%NUTRIENTS%}/g, item.nutrients);
    outPut = outPut.replace(/{%QUANTITY%}/g, item.quantity);
    outPut = outPut.replace(/{%DESCRIPTION%}/g, item.description);
    outPut = outPut.replace(/{%ID%}/g, item.id);
    if (!item.organic) outPut = outPut.replace(/{%NOTORGANIC%}/g, 'not-organic');
    return outPut;
}