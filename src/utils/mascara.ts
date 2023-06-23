
/**
 * aplica uma máscara nos inputs - CPF - CEP -TELEFONE
 * 
*/
export function usarMascara(tipo: any, valor: string): string {
    let valorFormatado = valor;
    let ultimoDigito = valorFormatado[valorFormatado.length - 1]
    
    if(tipo==="CPF"){
         // Impede a escrita de letras
        if(ultimoDigito !== "1" && ultimoDigito !== "2" && ultimoDigito !== "3" && ultimoDigito !== "4" && ultimoDigito !== "5" && ultimoDigito !== "6" && ultimoDigito !== "7" && ultimoDigito !== "8" && ultimoDigito !== "9" && ultimoDigito !== "0"){
            valorFormatado = valorFormatado.slice(0, valorFormatado.length - 1);
        }

        let parte1 = "";
        let parte2 = "";
        let parte3 = "";
        let parte4 = "";

        //Separa a string de acordo com a presença de . e -
        parte1 = valorFormatado.substring(0, 3);

        if(valorFormatado.split(".").length < 2){
            parte2 = valorFormatado.substring(3, 6);
        }else{
            parte2 = valorFormatado.substring(4, 7);
        }
        if(valorFormatado.split(".").length < 3){
            parte3 = valorFormatado.substring(7, 10);
        }else{
            parte3 = valorFormatado.substring(8, 11);
        }
        if(valorFormatado.split("-").length < 2){
            parte4 = valorFormatado.substring(11, 13);
        }else{
            parte4 = valorFormatado.substring(12, 14);
        }

        if(parte1!=="" && parte2==="" && parte3==="" && parte4===""){
            valorFormatado = parte1
        }
        if(parte1!=="" && parte2!=="" && parte3==="" && parte4===""){
            valorFormatado = parte1+"."+parte2
        }
        if(parte1!=="" && parte2!=="" && parte3!=="" && parte4===""){
            valorFormatado = parte1+"."+parte2+"."+parte3
        }
        if(parte1!=="" && parte2!=="" && parte3!=="" && parte4!==""){
            valorFormatado = parte1+"."+parte2+"."+parte3+"-"+parte4
        }            
    }
    if(tipo === "CEP"){
        // Impede a escrita de letras
        
        if("0123456789".includes(ultimoDigito) == false){
            valorFormatado = valorFormatado.slice(0, valorFormatado.length - 1);
        }

        let parte1 = "";
        let parte2 = "";

        //Separa a string de acordo com a presença de -
        parte1 = valorFormatado.substring(0, 5);

        if(valorFormatado.split("-").length < 2){
            parte2 = valorFormatado.substring(5, 8);
        }else{
            parte2 = valorFormatado.substring(6, 9);
        }
        
        if(parte2 !== ""){
            valorFormatado = parte1+"-"+parte2
        }else{
            valorFormatado = parte1
        }
    }
    if(tipo === "TELEFONE"){
         // Impede a escrita de letras
        if(ultimoDigito !== "1" && ultimoDigito !== "2" && ultimoDigito !== "3" && ultimoDigito !== "4" && ultimoDigito !== "5" && ultimoDigito !== "6" && ultimoDigito !== "7" && ultimoDigito !== "8" && ultimoDigito !== "9" && ultimoDigito !== "0"){
            valorFormatado = valorFormatado.slice(0, valorFormatado.length - 1);
        }


        let stringProcessada = "";
        if(valorFormatado.includes("(") === false){
            if(valorFormatado.substring(0, 1)!==""){
                if(stringProcessada.length < 3){
                    stringProcessada = "("+valorFormatado.substring(0, 3);  
                }
            }
        }else{
            stringProcessada = valorFormatado;
            if(valorFormatado.length === 5 && valorFormatado.substring(4, 5)!==" "){
                stringProcessada = valorFormatado.substring(0, 3)+") "+valorFormatado.substring(3, 4)+" "+valorFormatado.substring(4, 5);  
            };
            if(valorFormatado.length === 7){
                stringProcessada = valorFormatado.substring(0, 6)+" "+ valorFormatado.substring(7, 8);
            }
            if(valorFormatado.length === 12 && valorFormatado.substring(11, 12)!=="-"){
                stringProcessada = valorFormatado.substring(0, 11)+"-"+ valorFormatado.substring(11, 12);
            }
        }
        valorFormatado = stringProcessada;
    }
    return valorFormatado;
};