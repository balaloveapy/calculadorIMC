'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import Styles from './App.module.css';
import z from 'zod'
import { colors, valores, valoresimc } from './left';
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod'
export default function Page(){
    const [valor2,setvalor2]=useState<colors|null>(null)
    const types = z.object({
        peso:z.number().min(10,{message:'digite um valor valido'}).max(400,{message:'digite um valor valido'}),
        altura:z.number().min(0.7,{message:'digite um valor valido'}).max(3,{message:'digite um valor valido'})
    })
    const {register,handleSubmit,formState:{errors}}=useForm<z.infer<typeof types>>({
        resolver:zodResolver(types)
    }
    )
    const enviar:SubmitHandler<z.infer<typeof types>>=(data)=>{
        setvalor2(valoresimc(data.peso,data.altura))
        console.log(valor2)
        
    }
    function resetar(){
        setvalor2(null)
        console.log(valor2)
    }
    return(
        
        <div>
            <div className={Styles.primera_vez} ><img className={Styles.imagem_logo} src="/powered.png" alt="" /></div>
            <div className={Styles.primera_vez}>
                <div className={Styles.grid}>
                   
                    <div>
                    <div>
                        <h1>Calcule seu IMC</h1>
                        <p>IMC  é a sigla para indica de Massa corpórea parâmetro adotado pela Organização Mundial de saúdde para calcular o peso ideal de cada pessoa.</p>
                    </div>
                    <form onSubmit={handleSubmit(enviar)}>
                        <input type="number" placeholder='digite o seu peso exemplo(63,10)' className={Styles.inputs} {...register('peso',{valueAsNumber:true})} step='0.01' disabled={valor2===null?false:true}/>
                        <input type="number" placeholder='digite a sua altura exemplo(1,64)' className={Styles.inputs} {...register('altura',{valueAsNumber:true})} step='0.01' disabled={valor2===null?false:true}/>
                        <button disabled={valor2===null?false:true} className={Styles.butao}>Enviar</button>
                    </form>
                    </div>
                    <div className={Styles.meio}>
                        {!valor2&&
                              <div className={Styles.grida}>
                              {valores.map((a,b)=>(
                                <div key={b} className={Styles.pai} style={{backgroundColor:a.color}}>
                                    <div className={Styles.up}><img className={Styles.img} src={a.img} alt="" /></div>
                                    <p>o seu IMC esta entre {a.texto[0]} a {a.texto[1]}</p>
                                </div>
                            ))}
                        </div>
                        }
                        {
                            valor2&&
                            <div className={Styles.pequeno} style={{backgroundColor:valor2.color}}>
                            <div className={Styles.up}><img className={Styles.img} src={valor2.img} alt="" /></div>
                            <div>o seu imc e {valor2.total?.toFixed(2)}</div>
                            <p>o seu IMC esta entre{valor2 .texto[0]} a {valor2.texto[1]}</p>
                            <div onClick={resetar} className={Styles.voltar}>
                                <img className={Styles.obj} src="leftarrow.png" alt="voltar" />
                            </div>
                            </div>
                        }
                    </div>
                   
                </div>
              
            </div>
        </div>
    )
}