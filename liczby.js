function create(x, y) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true).children[0];
    clon.getElementsByClassName('x')[0].value = x;
    clon.getElementsByClassName('y')[0].value = y;
    clon.getElementsByClassName('z')[0].result = expected(x, y);
    clon.getElementsByClassName('z')[0].addEventListener('blur', (event) => {
      if( event.target.value != event.target.result ){
        event.target.style.background = '#ffbcbc';
      } else {
        event.target.style.background = '#95d895';
      }
    });
    clon.getElementsByClassName('z')[0].addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          var nextRow = document.activeElement.parentElement.nextElementSibling
          nextRow ? nextRow.getElementsByClassName('z')[0].focus() : event.target.blur()
        }
    });
    document.getElementById('list').appendChild(clon);
  }

  function rand(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)-1;
  }

  function generate(){
    var min = parseInt(document.getElementById('min').value)
    var max = parseInt(document.getElementById('max').value)
    var count = parseInt(document.getElementById('count').value)

    for(i=0; i<count; i++){
      create(rand(min, max), rand(min, max))
    }
  }
