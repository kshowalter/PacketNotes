//module.exports = {
export default {
  count: 0,
  updateTime: '0000-00-00 00:00:00',
  selectedTags: [],

  searchParams: {
    text: [],
    textWords: [],
    searchString: '',
    tags: [],
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

    }


  ],
  displayedNotes: []

};
