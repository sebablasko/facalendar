import isaImg from '@/assets/isa.jpeg';
import rozasImg from '@/assets/rozas.jpeg';
import maxImg from '@/assets/halty.jpeg';
import ronnaImg from '@/assets/ronna.jpeg';
import valeImg from '@/assets/vale.jpeg';
import agueroImg from '@/assets/aguero.jpeg';
import nicoImg from '@/assets/nico.jpeg';
import sebaImg from '@/assets/seba.jpeg';
import seba3Img from '@/assets/seba3.jpeg';
import matiImg from '@/assets/mati.jpeg';
import carlosImg from '@/assets/charlie.jpeg';
import charlesImg from '@/assets/charles.jpeg';
import mauroImg from '@/assets/mauro.jpeg';
import joseImg from '@/assets/jose.jpeg';
import gerardoImg from '@/assets/gerardo.jpeg';

export default {
  members: [
    { id: 'max', name: 'Max', img: maxImg, birthday: '08/11' },
    { id: 'blasco', name: 'Seba B', img: sebaImg, birthday: '08/02' },
    { id: 'rozas', name: 'Seba R', img: rozasImg, birthday: '21/11' },
    { id: 'charlie', name: 'Carlos', img: carlosImg, birthday: '02/09' },
    { id: 'awero', name: 'Andrés', img: agueroImg, birthday: '06/03' },
    { id: 'isa', name: 'Isa', img: isaImg, birthday: '05/04' },
    { id: 'gallardo', name: 'Seba G', img: seba3Img, birthday: '09/08' },
    { id: 'nico', name: 'Nico', img: nicoImg, birthday: '26/05' },
    { id: 'vale', name: 'Vale', img: valeImg, birthday: '01/05' },
    { id: 'ronna', name: 'Ronna', img: ronnaImg, birthday: '05/06' },
    { id: 'mati', name: 'Mati', img: matiImg, birthday: '16/10' },
    { id: 'charles', name: 'Charles', img: charlesImg, birthday: '10/11' },
    { id: 'mauro', name: 'Mauro', img: mauroImg, birthday: '10/11' },
    { id: 'jose', name: 'Jose', img: joseImg, birthday: '14/02' },
    { id: 'gerardo', name: 'Gerardo', img: gerardoImg, birthday: '11/10' },
  ],
  teams: [
    {
      id: 'principal',
      name: 'Principal Advice',
      ceremonies: [
        {
          name: 'Daily',
          participants: ['max', 'blasco', 'rozas', 'mati', 'charles', 'mauro', 'gerardo'],
          periodicity: 'DAYS_AT_WEEK',
          periodicity_payload: [0, 1, 2, 3, 4],
        },
        {
          name: 'Refinamiento',
          participants: ['max', 'blasco', 'mati', 'mauro'],
          periodicity: 'DAYS_AT_WEEK',
          periodicity_payload: [2],
        },
      ],
    },
    {
      id: 'cuprum',
      name: 'Cuprum Advice',
      ceremonies: [
        {
          name: 'Daily',
          participants: ['charlie', 'awero', 'isa', 'gallardo', 'vale'],
          periodicity: 'DAYS_AT_WEEK',
          periodicity_payload: [0, 1, 2, 3, 4],
        },
      ],
    },
  ],
  globalCeremonies: [
    {
      name: 'Engineering Chapter',
      participants: ['max', 'blasco', 'charlie', 'mati', 'gallardo', 'mauro', 'vale', 'mati'],
      periodicity: 'DAYS_AT_WEEK',
      periodicity_payload: [1],
    },
    {
      name: 'Continous Improvement',
      participants: ['max', 'blasco', 'charlie', 'mati', 'gallardo', 'mauro', 'vale', 'mati'],
      periodicity: 'DAYS_AT_WEEK',
      periodicity_payload: [3],
    },
  ],
};
