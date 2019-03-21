labels = ['Action', 'Animation', 'Comedy', 'Drama', 
'Family', 'Fantasy', 'Horror','Romance', 'Thriller'];

const tokenier = tf.preprocessing.text.tokenizer_from_json('js/tokenizer.json');

async function processModel(movieName){
    const model = await tf.loadLayersModel('js/model.json');
    //model.predict();
}
//processModel();