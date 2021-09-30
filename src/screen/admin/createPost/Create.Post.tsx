import React, { useState } from 'react'
import 'dotenv/config'
import { Redirect } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import { agents, maps, agentInterface } from '../../../data/data-valorant'
import * as uuid from 'uuid';
import { InputValue } from '../../../components/inputValue'
import { inputSelectedComponent } from '../../../components/inputSelected'


type actionType = "top" | "bottom"
interface imgInterface {
  title: string,
  img: string,
  _id: string
}

export const CreatePostScreen = () => {
  const [ redirect, setRedirect ] = useState<boolean>(false)

  const [ imgAdded, setImgAdded ] = useState<imgInterface[]>([])

  const [ descriptionImg, setDescriptionImg ] = useState<string>("")
  const [ linkImg, setLinkImg ] = useState<string>("")

  const [ formTitle, setFormTitle ] = useState<string>("")
  const [ formDescription, setFormDescription ] = useState<string>("")
  const [ formTagMoment, setFormTagMoment ] = useState<string>("")
  const [ formTagDifficult, setFormTagDifficult ] = useState<string>("")
  const [ formTagAbility, setFormTagAbility ] = useState<string>("")
  const [ formTagSide, setFormTagSide ] = useState<string>("")
  const [ formTagMap, setFormTagMap ] = useState<string>("")
  const [ formTagMapPosition, setFormTagMapPosition ] = useState<string>("")
  const [ formTagAgent, setFormTagAgent ] = useState<string>("")


  async function handleSubmit() {
    let request = {
      title: formTitle,
      description: formDescription,
      user: '',
      tags: {
        moment: formTagMoment,
        difficult: formTagDifficult,
        ability: formTagAbility,
        side: formTagSide,
        map: formTagMap,
        mapPosition: formTagMapPosition,
        agent: formTagAgent
      },
      imgs: imgAdded
    }

    try {
      await api.post('/post', {...request})
      setRedirect(true)
    } catch(error) {
      console.log(error)
    }
  }

  function loadImage(event:any) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    // Envia a imagem para o backend e coleta o retorno
    api.post(`/postLoadFile`, formData).then((res) => {
      let urlImg = `${process.env.REACT_APP_API_HOST}/images/posts/${res.data.filename}`
      setLinkImg(urlImg)
    })
  }
  function deleteStep(_id: string) {
    setImgAdded(imgAdded.filter(item => item._id !== _id))
  }


  function putPosition(_id: string, action: actionType) {
    console.log(_id, action)
    // Obter a posição do item que será trocado
    let positionPut = imgAdded.findIndex(item => item._id === _id)
    console.log(positionPut)

    // Copia o item que será trocado
    let copyListDelete = imgAdded[positionPut]

    // Cria uma cópia do imgAdded ( não pode ser alterado )
    let copyImgAdded = JSON.parse(JSON.stringify(imgAdded))

    let increment = 0

    // Se for para decrementar e for maior que 0
    if(action === 'bottom' && positionPut > 0)  {
      increment = -1
    } else if(action === 'top' && positionPut < imgAdded.length)  {
      increment = 1
    } else {
      return null
    }

    // Deleta o item que será trocadao
    copyImgAdded.splice(positionPut, 1)

    // Inserir o item na posição anterior
    copyImgAdded.splice(positionPut + increment, 0, copyListDelete)

    // Atualiza no state
    setImgAdded(copyImgAdded)
  }

  function renderSteps() {
    return imgAdded.map(instruction => (
      <div key={instruction._id}>
        <hr /><br />
        <hr /><br />
        <button onClick={() => putPosition(instruction._id, 'bottom')} >Subir</button>

        <img src={instruction.img} alt={instruction.title} style={{width: '100%'}} /> <br />
        <p>{instruction.title}</p>
        <button onClick={() => deleteStep(instruction._id)}>Delete</button>

        <button onClick={() => putPosition(instruction._id, 'top')} >Descer</button>
        <hr />
     </div>
    ))
  }

  function addItem() {
    setImgAdded([...imgAdded, {title: descriptionImg, img: linkImg, _id: uuid.v4()}])
    setDescriptionImg('')
    setLinkImg('')
  }
  function renderAgent() {
    return agents().map(agent => {
      return <option value={agent.name} key={agent.id} >{agent.name}</option>
    })
  }

  function renderMaps() {
    return maps().map(map => {
      return <option value={map.name} key={map.id} >{map.name}</option>
    })
  }

  function renderHabilits() {
    let filterAbilities: agentInterface = agents().filter(agent => agent.name === formTagAgent)?.[0]
    return filterAbilities?.habilits.map(ability => {
      return <option value={ability.name} key={ability.name}>{ability.keyboard} - {ability.name}</option>
    })
  }

  return (
    <div className="containerAdmin">
      <div>
        {redirect ? <Redirect to="/ViewPosts" /> : null }
        <NavbarComponent selected={navbarEnum.PostCreate} />

        <h1>Criar um post</h1>

        <div className="form">

        <InputValue text="Titulo" value={formTitle} setValue={setFormTitle}/>
        <InputValue text="Descrição" value={formDescription} setValue={setFormDescription}/>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Agente</label>
              <select value={formTagAgent} onChange={(e) => setFormTagAgent(e.target.value)} >
              <option value=""></option>
                {renderAgent()}
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Mapa</label>
              <select value={formTagMap} onChange={(e) => setFormTagMap(e.target.value)} >
                <option value=""></option>
                {renderMaps()}
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Habilidade</label>
              <select value={formTagAbility} onChange={(e) => setFormTagAbility(e.target.value)}>
                <option value=""></option>
                {renderHabilits()}
              </select>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Posição</label>
              <select value={formTagMapPosition} onChange={(e) => setFormTagMapPosition(e.target.value)}>
                <option value="Qualquer">Qualquer</option>
                <option value="Meio">Meio</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Momento</label>
              <select value={formTagMoment} onChange={(e) => setFormTagMoment(e.target.value)}>
                <option value=""></option>
                <option value="QualquerMomento">QualquerMomento</option>
                <option value="DepoisDoPlant">DepoisDoPlant</option>
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Dificuldade</label>
              <select value={formTagDifficult} onChange={(e) => setFormTagDifficult(e.target.value)} >
                <option value=""></option>
                <option value="Facil">Facil</option>
                <option value="medio">medio</option>
                <option value="hardcore">hardcore</option>
              </select>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Lado</label>
              <select value={formTagSide} onChange={(e) => setFormTagSide(e.target.value)} >
                <option value=""></option>
                <option value="Defensores">Defensores</option>
                <option value="Atacantes">Atacantes</option>
              </select>
            </div>
          </div>

          {renderSteps()}

          <hr /><br />

          a fazer
          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-new-step">Novo Passo</button> <br />
            </div>
          </div>

          <hr />

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-save">Publicar Dica</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
