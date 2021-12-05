import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/pagination.style.module.css';

type urlBase = 'ViewPosts' | 'Posts' | 'Save' | 'Tested';

interface propsInterface {
  initial: number;
  finish: number;
  selected: number;
  map: string;
  agent: string;
  urlBase: urlBase;
}

interface interfacePagination {
  id: number;
}

export const PaginationComponent = (props: propsInterface) => {
  const [pagination, setPagination] = useState<interfacePagination[]>([]);

  useEffect(() => {
    const paginationTemp: interfacePagination[] = [];
    for (let i = 1; i <= props.finish; i++) {
      paginationTemp.push({ id: i });
    }
    setPagination(paginationTemp);
  }, [props]);

  function generateUrl(page: number): string {
    return `/${props.urlBase}?map=${props.map}&agent=${props.agent}&page=${page}`;
  }

  function renderProps() {
    return pagination.map((pag) => {
      if (pag.id === props.selected) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link
              aria-label={`Navega para a página ${pag.id}`}
              to={generateUrl(pag.id)}
              className={styles.active}>
              {pag.id}
            </Link>
          </li>
        );
      } else if (pag.id >= props.selected - 2 && pag.id <= props.selected + 2) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link
              aria-label={`Navega para a página ${pag.id}`}
              to={generateUrl(pag.id)}>
              {pag.id}
            </Link>
          </li>
        );
      } else if (pag.id === props.finish) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link
              aria-label={`Navega para a página ${pag.id}`}
              to={generateUrl(pag.id)}>
              {pag.id}
            </Link>
          </li>
        );
      } else if (pag.id === props.selected + 3) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link aria-hidden to="#">
              ...
            </Link>
          </li>
        );
      } else if (pag.id === 1) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link
              aria-label={`Navega para a página ${pag.id}`}
              to={generateUrl(pag.id)}>
              {pag.id}
            </Link>
          </li>
        );
      } else if (pag.id === props.selected - 3) {
        return (
          <li className={styles.selectedButton} key={pag.id}>
            <Link aria-hidden to="#">
              ...
            </Link>
          </li>
        );
      }

      return null;
    });
  }

  return (
    <nav aria-label="Sistema de paginação" className={styles.pagination}>
      <ul className={styles.paginationItems}>{renderProps()}</ul>
    </nav>
  );
};
