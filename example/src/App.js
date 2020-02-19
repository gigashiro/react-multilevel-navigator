import React, { Component } from 'react'

import Navigator from 'react-multilevel-navigator'

const data = [
  {
    id: '1',
    label: 'Informação 1',
    action: 'sdfghjk',
  },
  {
    id: '2',
    label: <React.Fragment>
      <p><b>Plant Lifecicle</b></p>
      <p>Ciclo de vida das plantas</p>
    </React.Fragment>,
    subitems: [
      {
        id: '10',
        label: '-Informação 10',
        subitems: [
          { id: '100', label: '--Informação 100', },
          {
            id: '200',
            label: '--Informação 200',
            subitems: [
              {
                id: '1000',
                label: '--Informação 1000',
                subitems: [
                  {
                    action: 'SHIROLIRO',
                    id: '10000',
                    label: '--Informação 10000',
                  },
                  { id: '20000', label: '--Informação 20000', },
                  { id: '30000', label: '--Informação 30000', },
                ]
              },
              { id: '2000', label: '--Informação 2000', },
              { id: '3000', label: '--Informação 3000', },
            ]
          },
          { id: '300', label: '--Informação 300', },
        ]
      },
      { id: '20', label: '-Informação 20', },
      { id: '30', label: '-Aqui vai o nome da categoria 30', },
      { id: '40', label: '-Informação 40', },
      { id: '50', label: '-Informação 50', },
    ]
  },
  { id: '3', label: 'Informação 3', },
  { id: '4', label: 'Informação 4', },
  { id: '5', label: 'Informação 5', },
]

export default class App extends Component {
  render () {
    return (
      <Navigator
        data={data}
      />
    )
  }
}
