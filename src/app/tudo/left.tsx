import { type } from "os"

export type colors={
    color:string,
    img:string,
    peso:string
    texto:number[]
    total?:number
}
export const valores:colors[] = [
    {color:'#97a2ad',img:'down.png',peso:'Magreza',texto:[0,18.5]},
    {color:'#00ac64',img:'up.png',peso:'Normal',texto:[18.6,24.8 ]},
    {color:'#ce9d19',img:'down.png',peso:'Magreza',texto:[24.9,29.0]},
    {color:'#b73d3a',img:'down.png',peso:'Magreza',texto:[30,99.0]},
]
export const valoresimc = (peso:number,altura:number)=>{
    const imc = (peso /(altura*altura));
    for(let a in valores){
      if(imc>=valores[a].texto[0] && imc <=valores[a].texto[1]){
        valores[a].total=imc
        return valores[a]
      }
    }
    return  null
}
