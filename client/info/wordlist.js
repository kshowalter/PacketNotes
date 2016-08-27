import rawString from 'raw!./google-10000-english.txt';

export default function(){
  var words = rawString.split('\n');
  words.splice(-1,1);
  //console.log(words.length);

  return {
    top: words,
    random: _.shuffle(words)
  };
}
