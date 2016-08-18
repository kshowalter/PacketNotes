import moment from 'moment';

//module.exports = {
export default {
  updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),


  filter: {
    tags: {},
    selectedTags: [],
    searchString: '',
    searchWords: []
  },

  notes: [],
  LastNoteId: 0,
  displayedNotes: [],
  words: [],

  focus: 'topNote'

};
