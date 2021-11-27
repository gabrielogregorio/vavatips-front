import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbComponent } from '../components/widgets/breadcrumb';
import { ErrorMsg } from '../components/base/errorMsg';
import { FooterComponent } from '../components/layout/footer';
import { Img } from '../components/base/img';
import { LoaderComponent } from '../components/base/loader';
import {
  NavbarComponentPublic,
  navbarEnumPublic,
} from '../components/layout/navbar_public';
import { maps } from '../core/data/data-valorant';
import api from '../core/services/api';
import { LINKS } from '../core/data/links';

const breadcrumbs = [LINKS.Home, LINKS.Maps];

export const MapScreen = () => {
  const [mapsApi, setMapsApi] = useState<string[]>([]);
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    api
      .get('/maps')
      .then((maps) => {
        setMapsApi(maps.data.maps);
        setActiveLoader(false);
      })
      .catch(() => {
        setErrorMsg('Erro desconhecido no servidor');
        setActiveLoader(false);
      });
  }, []);

  function renderMap() {
    if (mapsApi.length === 0) {
      return null;
    }

    return maps().map((map) => {
      return mapsApi.includes(map.name) ? (
        <Link to={`/Agents?map=${map.name}`} className="grid" key={map.id}>
          <Img src={map.img} alt={map.name} />
          <p>{map.name}</p>
        </Link>
      ) : null;
    });
  }

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <h1>Escolha um mapa ai parça </h1>
        <ErrorMsg msg={errorMsg} />
        {activeLoader ? <p>Buscando Mapas...</p> : ''}
        <LoaderComponent active={activeLoader} />
        <div className="gridFull">{renderMap()}</div>
      </div>
      <FooterComponent color="primary" />
    </div>
  );
};
