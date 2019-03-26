// labels = ['Action', 'Animation', 'Comedy', 'Drama', 
// 'Family', 'Fantasy', 'Horror','Romance', 'Thriller'];

const labels = ['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Thriller'];

function getPredictions() {

    var input = document.getElementById('movie_title_input').value;

    $.getJSON("/js/word-index.json", function(json) {
    function getFeatures(json, movieName){
		
		movieName = movieName.replace(/[\W_]+/g," ");
		console.log(movieName);
        const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
        let words = movieName.toLowerCase().trim().split(/\s+/);
        let i = arr.length-words.length;
        if(i < 0) i = 0;
        for (var j = 0; j < words.length; j++){
            arr[i] = json['word_index'][words[j]];
            if (arr[i] == null) arr[i] = 0; 
            i++;
        }
		console.log(arr);
        return [arr];
    }

    function prediction_to_probabilities(prediction){
        var label_pred = new Object();
        for (var i = 0; i < prediction.length; i++){
            label_pred[prediction[i]] = labels[i];
        }
        return label_pred;
    }

    async function processModel(){
        const model = await tf.loadLayersModel('/js/model.json');
        //model.summary();
        var output = model.predict(tf.stack(getFeatures(json, input)));
        var prediction = Array.from(output.dataSync());
        var probs = prediction_to_probabilities(prediction);
        prediction = prediction.sort().reverse();
        
		var text = document.createTextNode("I think your movie has the genres: " 
        + probs[prediction[0]] 
        + ", " + probs[prediction[1]]
        + ", " + probs[prediction[2]]);
        var para = document.createElement("p");
		
        para.appendChild(text);
        var predArea = document.getElementById('prediction');
        while (predArea.firstChild) {
            predArea.removeChild(predArea.firstChild);
        }
        predArea.appendChild(para);
    }
    processModel();
    });
}

