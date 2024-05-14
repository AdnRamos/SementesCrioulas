import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import style from './detalhamentoBanco.module.scss';
import styles from "../ListBancoSementes/list.module.scss";

import HeaderNavegacao from '../HeaderNavegacao';
import DadosBanco from './DadosBanco';
import DadosEndereco from './DadosEndereco';
import DadosObjetosBanco from './ObjetosBanco';
import ImagensBanco from './ImagensBanco';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { putBancoId } from '@/api/bancoSementes/putBancoId';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getStorageItem } from '@/utils/localStore';
import HeaderDetalhamento from '../HeaderDetalhamento';
import ListAgricultoresBanco from '../ListAgricultoresBanco';
import ListSementesBanco from "@/components/ListSementesBanco";
import ListTransacoes from '../ListTransacoes';

const DetalhamentoBanco = ({ diretorioAnterior, diretorioAtual, hrefAnterior, banco, usuario, backDetalhamento }) => {
  const [role, setRole] = useState(getStorageItem("userRole"));
  const [agricultoresBanco, setAgricultoresBanco] = useState(null);
  const [sementesBanco, setSementesBanco] = useState(null);
  const [doacoesBanco, setDoacoesBanco] = useState(null);
  const [retiradasBanco, setRetiradasBanco] = useState(null);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    comunidade: '',
    anoFundacao: '',
    historiaBanco: '',
    variedadesTrabalhadas: '',
    endereco: {
      logradouro: '',
      referencia: '',
      complemento: '',
      cidade: '',
      estado: '',
      cep: '',
      numero: '',
      bairro: ''
    },
    objetos: {
      bombona: '',
      peneiraSelecao: '',
      balanca: '',
      armario: '',
      plantadeira: '',
      lona: '',
      batedeiraCereal: ''
    }
  });
  useEffect(() => {
    if (banco) {
      setFormData({
        nome: banco.nome || '',
        comunidade: banco.comunidade || '',
        anoFundacao: banco.anoFundacao || '',
        historiaBanco: banco.historiaBanco || '',
        variedadesTrabalhadas: banco.variedadesTrabalhadas || '',
        endereco: banco.endereco || {},
        objetos: banco.objetos || {}
      });
    }
  }, [banco]);
  const handleBackToBank = () => {
    setAgricultoresBanco(null);
    setSementesBanco(null);
    setRetiradasBanco(null);
    setDoacoesBanco(null);
  };

  const mutation = useMutation(newData => putBancoId(newData, banco.id), {
    onSuccess: () => {
      console.log('Dados atualizados com sucesso');
      setEditar(false)
      backDetalhamento();
    },
    onError: (error) => {
      console.error('Erro ao tentar atualizar os dados:', error);
    }
  });
  if (agricultoresBanco) {
    return (
      <ListAgricultoresBanco
        diretorioAnterior={`Home / Bancos Sementes / `}
        diretorioAtual="Agricultores"
        hrefAnterior="/bancoSementes"
        table1="Nome"
        table2="Função"
        table3="Ação"
        agricultoresBanco={handleBackToBank}
        bancoId={banco.id}
      />
    )
  }
  if (sementesBanco) {
    return (
      <ListSementesBanco
        diretorioAnterior={`Home / Bancos Sementes / `}
        diretorioAtual="Sementes"
        hrefAnterior={`/bancoSementes`}
        table1="Imagem"
        table2="Cultura"
        table3="Nome da Cultivar"
        table4="Ação"
        table5="Safra"
        sementesBanco={handleBackToBank}
        bancoId={banco.id}
      />
    )
  }
  if (doacoesBanco) {
    return (
      <ListTransacoes
        diretorioAnterior="Home /"
        diretorioAtual="Doações"
        hrefAnterior="/"
        hrefAtual="/doacoes"
        table1="Data"
        table2="Agricultor"
        table3="Semente"
        table4="Variedade"
        table5="Ações"
        DoacoesBanco={handleBackToBank}
        bancoId={banco.id}
      />
    )
  }
  if (retiradasBanco) {
    return (
      <ListTransacoes
        diretorioAnterior="Home /"
        diretorioAtual="Retiradas"
        hrefAnterior="/"
        hrefAtual="/retiradas"
        table1="Data"
        table2="Agricultor"
        table3="Semente"
        table4="Variedade"
        table5="Ações"
        retiradasBanco={handleBackToBank}
        bancoId={banco.id}
      />
    )
  }
  return (
    <div id="header">
      {usuario === "coordenador" || usuario === "agricultor" ? (
        <HeaderNavegacao
          diretorioAnterior={diretorioAnterior}
          diretorioAtual={diretorioAtual}
          hrefAnterior={hrefAnterior}
        />
      ) : (

        <HeaderDetalhamento
          hrefAnterior={backDetalhamento}
          diretorioAnterior="Home / Bancos de Sementes / "
          diretorioAtual="Detalhes"

        />
      )
      }
      {role === "ROLE_COPPABCS" && (
        <>
          <div className={styles.header}>
            <div className={styles.header__container}>
              <button>
                <h1>
                  Adicionar Responsável
                </h1>
              </button>
              <div className={styles.header__container_buttons}>
              </div>
            </div>
          </div>

        </>
      )}
      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values);
            setSubmitting(false);
          }}
        >

          {formik => (
            <Form className={style.container__ContainerForm_form}>
              <div className={style.container__profile}>
                <div className={style.container__profile_img}>
                  <Image src="/assets/bancoteste.png" alt="Foto do usuário" width={72} height={72} />
                  <h1>{banco?.nome}</h1>
                </div>

                <div className={style.container__header_containerButton}>
                  {role === "ROLE_COPPABACS" && (
                    <>
                      <button className={style.container__header_containerButton_button} onClick={() => setAgricultoresBanco(true)}>
                        <Image src="/assets/iconAssociates.svg" alt="Agricultores" width={27} height={26} />
                        <span className={style.container__header_containerButton_button_text}>Agricultores</span>
                        <span className={style.container__header_containerButton_button_shorttext}>Agric.</span>
                      </button>
                      <button className={style.container__header_containerButton_button} onClick={() => { setSementesBanco(true) }}>
                        <Image src="/assets/iconSeedGreen.svg" alt="Seed" width={27} height={26} />
                        <span className={style.container__header_containerButton_button_text}>Sementes</span>
                        <span className={style.container__header_containerButton_button_shorttext}>Sem.</span>
                      </button>
                      <button className={style.container__header_containerButton_button} onClick={() => { setDoacoesBanco(true) }}>
                        <Image src="/assets/iconAssociates.svg" alt="Agricultores" width={27} height={26} />
                        <span className={style.container__header_containerButton_button_text}>Doações</span>
                        <span className={style.container__header_containerButton_button_shorttext}>Doa..</span>
                      </button>
                      <button className={style.container__header_containerButton_button} onClick={() => { setRetiradasBanco(true) }}>
                        <Image src="/assets/iconAssociates.svg" alt="Agricultores" width={27} height={26} />
                        <span className={style.container__header_containerButton_button_text}>Retiradas</span>
                        <span className={style.container__header_containerButton_button_shorttext}>Ret.</span>
                      </button>
                    </>
                  )}
                </div>

              </div>
              <DadosBanco formik={formik} editar={editar} />
              <DadosEndereco formik={formik} editar={editar} />
              <DadosObjetosBanco formik={formik} editar={editar} />
              <ImagensBanco />
              {
                (usuario === "coordenador" || usuario === "admin") && (
                  <div>
                    {editar ? (
                      // Bloco quando 'editar' é true
                      <div className={style.container__profile_containerButton}>
                        <button
                          type="button"
                          onClick={() => setEditar(false)}
                          className={style.container__profile_buttonDesativar}>
                          <span>Cancelar</span>
                        </button>
                        <button
                          type="submit"
                          className={style.container__profile_button}>
                          <span>Salvar</span>
                        </button>
                      </div>
                    ) : (
                      // Bloco quando 'editar' é false
                      <div className={style.container__profile_containerButton}>
                        <button
                          type="button"
                          onClick={() => setEditar(true)}
                          className={style.container__profile_button}>
                          <span>Editar</span>
                          <Image src="/assets/iconLapis.svg" alt="editar perfil" width={15} height={15} />
                        </button>

                        <button
                          className={style.container__profile_buttonDesativar}>
                          <span>Desativar Banco</span>
                        </button>
                      </div>
                    )}
                  </div>
                )
              }

            </Form>
          )}
        </Formik>
      </div>
    </div >
  );
}

export default DetalhamentoBanco;
