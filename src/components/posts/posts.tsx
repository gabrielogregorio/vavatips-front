import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatImage } from "../../services/formatEnvieroment";
import styles from './post.module.css'
type typeType = 'next' | 'prev'

// Componente post
interface PropsPostInterface {
  post: postsProps,
  postActions: {
    save: [{_id: string}],
    tested: [{_id: string}]
  },
  toggleSave: (_id: string) => void
  toggleTested: (_id: string) => void
  showModalReport: (post: postsProps) => void
  showModalSuggestion: (post: postsProps) => void
  viewAdmin?: boolean
}


export const PostComponent = (props: PropsPostInterface) => {
  const [ idImage, setIdImage ] = useState<number>(0)

  function nextImage(type: typeType, length: number) {
    if (type === 'next' && idImage < length -1 ) {
      setIdImage(idImage + 1)
    } else if (type === 'prev' && idImage > 0 ) {
      setIdImage(idImage - 1)
    }
  }

  return (
    <div className={styles.posts}>
      <div className={styles.profile}>

        { props.post.user.image ?
          (
            <img src={formatImage(props.post.user.image)} alt="Foto de perfil do Autor da postagem" />
          )
          :(
            <img src={'/images/users/profile.webp'} alt="Foto de perfil do Autor da postagem" />
           )
        }

        <p>{props.post.user.username ?? 'Ademir Maluco'}</p>

        { !props.viewAdmin ? (
          <button onClick={() => props.showModalReport(props.post)}>Reportar</button>
        ): null }

        { props.viewAdmin ? (
          <Link to={`PostEdit?id=${props.post._id}`}>Editar Post</Link>
        ): null }

      </div>

      <h3>{props.post.title}</h3>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={formatImage(props.post.imgs?.[idImage]?.image)} alt={props.post.imgs?.[idImage]?.description} />
          { idImage > 0 ? (
            <div className={styles.previus} onClick={() => nextImage('prev', props.post.imgs.length)}>
              <i className="fas fa-angle-left"></i>
            </div>
          ) : null }
          { idImage < props.post.imgs.length -1 ? (
            <div className={styles.next} onClick={() => nextImage('next', props.post.imgs.length)}>
              <i className="fas fa-angle-right"></i>
            </div>
          ) : null }
          <div className={styles.descriptionImage}>
            <p>{idImage + 1} - {props.post.imgs?.[idImage]?.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.descriptionAndTags}>
        <p className={styles.description}>{props.post.description}</p>
        <p className={styles.tags}>
          <span> #{props.post.tags.map}</span> <span> #{props.post.tags.agent}</span> <span> #{props.post.tags.ability}</span> <span> #{props.post.tags.moment}</span> <span> #{props.post.tags.difficult}</span> <span> #{props.post.tags.side}</span> <span> #{props.post.tags.mapPosition}</span>
        </p>
      </div>



      { !props.viewAdmin ? (
        <div className={styles.actions}>
        {
          props.postActions.tested.filter(post => post._id === props.post._id).length === 0
          ? <button onClick={() => props.toggleTested(props.post._id)} >A testar</button>
          : <button className={styles.actionsActive} onClick={() => props.toggleTested(props.post._id)}>A testar</button>
        }

        {
          props.postActions.save.filter(post => post._id === props.post._id).length === 0
          ? <button onClick={() => props.toggleSave(props.post._id)} >Salvar</button>
          : <button className={styles.actionsActive} onClick={() => props.toggleSave(props.post._id)}> Salvo</button>
        }

        <button onClick={() => props.showModalSuggestion(props.post)}>Sugerir</button>
      </div>

      ) : null }

    </div>
  )
}
