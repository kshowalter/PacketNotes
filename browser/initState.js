//module.exports = {
export default {
  //test: false,
  count: 1,
  UI: {
    selectedShip: 0,
    time: {
      day: 0,
      hour: 0,
      minute: 0,
      tick: 0
    },
    count: 1,
    display: {
      title: '',
      subComponents: []
    }
  },
  universe: {
    time: {
      day: 0,
      hour: 0,
      minute: 0,
      tick: 0
    },
    shipsInSystem: [
      {
        name: 'KIT Explorer',
        class: 'Explorer',
        subComponents: {
          generator: {
            type: 'power',
            status: 'off',
            power_output: 10000
          },
          engine: {
            type: 'engine',
            status: 'off',
            power_max: 10000
          }
        }
      }
    ]
  }

};
