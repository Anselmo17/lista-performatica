
// processa os dados e post a message
onmessage = function (e) {
    const result  = this.processItens(e.data);
    const sizeChunk = 5000;

    // loop chunk 
    for (let index = 0; index < result.length; index+=sizeChunk) {
        this.postMessage({
            type:'chunk',
            data: result.slice(index, index+ sizeChunk)
        });
    }
    this.postMessage({ type:'end'});
}


function processItens(itensFinal){
    let itens = '';
    itensFinal.forEach((item)=>{
        itens+= `<li class='line'>${item.name}</li>`
    })
    return itens;
}