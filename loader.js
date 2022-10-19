function loadJS(file){
    
    var main = document.getElementsByClassName('main')[0]
    var canvas = document.getElementById('myCanvas')
    var scriptElement = document.getElementById('loadedScript')
    main.removeChild(canvas)
    if(scriptElement !== null){ 
    main.removeChild(scriptElement)
    }
    var newCanvas = document.createElement('canvas')
    var newScriptElement = document.createElement('script')
    newScriptElement.id = 'loadedScript'
    newScriptElement.type = 'text/javascript'
    newScriptElement.src = file
    newCanvas.id = 'myCanvas'
    newCanvas.width = 900
    newCanvas.height = 570
    newCanvas.style = {
        'margin-left': '5%',
        'margin-top' : '2%',
        'border' : '1px solid lightgray'
    }
    main.appendChild(newCanvas)
    main.appendChild(newScriptElement)
}