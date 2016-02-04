//module.exports = {
export default {
  count: 0,
  updateTime: '0000-00-00 00:00:00',

  filter: {
    tags: {
      '#test': {
        selected: false
      },
      '#second_chance': {
        selected: true
      }
    },
    selectedTags: [],
    searchString: '',
    searchWords: []
  },

  notes: [
    {
      text: 'this is a #test',
      words: ['this','is','a','#test'],
      tags: ['#test']

    },
    {
      text: 'this is also #test #second_chance',
      words: ['this','is','also','#test', '#second_chance'],
      tags: ['#test', '#second_chance']

    },
    {
      text: 'this is note a test',
      words: ['this','is','note','a','test'],
      tags: []

    }


  ],
  displayedNotes: []

};
