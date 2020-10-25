const RED = '#ffbcbc'
const GREEN = '#95d895'

const $ = function (selector, element) {
    return (element || document).querySelector(selector)
}

function create(left, right) {
    const template = $('body > template').content.cloneNode(true).children[0];

    $('.left', template).value = left;
    $('.right', template).value = right;

    const resultInput = $('.result', template);
    const btn = $('.checkButton', template)

    const expectedValue = expected(left, right);

    const check = () => {
        if (resultInput.value.trim() == '') {
            resultInput.focus()
            return
        }
        resultInput.style.background = (resultInput.value == expectedValue) ? GREEN : RED
        resultInput.readonly = 'readonly'
        btn.style.visibility = 'hidden'
        const nextRow = btn.parentElement.nextElementSibling
        if (nextRow) {
            $('.result', nextRow).focus()
        }
    };

    btn.addEventListener('click', check);
    resultInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            check()
        }
    });
    $('#list').appendChild(template);
}

function rand(min, max) {
    return Math.ceil(Math.random() * (max - min) + min) - 1;
}

function generate() {
    $('#list').innerHTML = null

    const min = parseInt(document.getElementById('min').value)
    const max = parseInt(document.getElementById('max').value) + 1
    const count = parseInt(document.getElementById('count').value)

    const results = []
    let attempt = 0
    while (results.length < count && attempt < 1000) {
        attempt++//highly unlikely but good to have a limit

        const left = rand(min, max);
        const right = rand(min, max);

        const key = left + '_' + right
        if (results.indexOf(key) === -1) {
            results.push(key)
            create(left, right)
        }
    }
}
