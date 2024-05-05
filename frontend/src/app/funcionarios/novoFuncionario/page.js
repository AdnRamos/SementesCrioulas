import React from "react";
import styles from "@/app/agricultores/novoAgricultor/index.module.scss"
import FuncionarioForm from "@/components/FuncionarioForm";

export default function NewRegisterFarmer() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContainer__content}>
                <FuncionarioForm
                    diretorioAnterior="Home / Funcionários /"
                    diretorioAtual="Novo Funcionário"
                    hrefAnterior="/funcionarios" />
            </div>
        </div>
    );
}