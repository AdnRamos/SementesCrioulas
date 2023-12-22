import React, { useState } from "react";
import Input from "../FormPattern/Input";
import GreenButton from "../FormPattern/GreenButton";
import styles from "./Index.module.css";

export default function SocialDataFarmer(){
    const [socialData, setSocialData] = useState({
        renda: '',
        pessoasFamilia: '',
        usoOcupacao: '',
        areaPropriedade: '',
        infraestruturaHidrica: '',
        infraestruturaComunidade: '',
        
    });

    function handleSocialOnChange(event){
        const {name, value} = event.target;
        setSocialData({ ...socialData, [name]: value });
    }

    async function handleSubmit(event){
        event.preventDefault();
    }

    return(
        <div className={styles.boxForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.twoSidedForm}>
                <div className={styles.smallerFormSize}>
                    <Input
                        type="text"
                        text="Renda Familiar"
                        name="renda"
                        placeholder="Insira a sua renda familiar"
                        value={socialData.renda}
                        onChange={handleSocialOnChange}/>
                    </div>
                    <div className={styles.smallerFormSize}>
                    <Input
                        type="text"
                        text="Número de Pessoas na Família"
                        name="pessoasFamilia"
                        placeholder="Insira a quantidade de pessoas na família"
                        value={socialData.pessoasFamilia}
                        onChange={handleSocialOnChange}/>
                    </div>
                </div>
                <div>
                    <div className={styles.biggerFormSize}>
                    <Input
                        type="text"
                        text="Forma de Uso e Ocupação da Terra"
                        name="usoOcupacao"
                        placeholder="Insira a sua renda familiar"
                        value={socialData.renda}
                        onChange={handleSocialOnChange}/>
                    </div>
                    <div className={styles.biggerFormSize}>
                    <Input
                        type="text"
                        text="Área da Propriedade em Tarrefas"
                        name="areaPropriedade"
                        placeholder="Insira a área da propriedade em tarrefas"
                        value={socialData.areaPropriedade}
                        onChange={handleSocialOnChange}/>
                    </div>
                </div>
                <div>
                    <h1>Inserir um option para a Infraestrutura Hidrica</h1>
                </div>
                <div>
                    <h1>Inserir um option para a Infraestrutura Hidrica</h1>
                </div>
                <div className={styles.buttonForm}>
                    <GreenButton
                        text="Continuar"/>
                </div>
            </form>
        </div>
    );
}