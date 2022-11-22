import Swal from 'sweetalert2'
import "./style.css";

const searchButton = document.querySelector('.searchButton');
const inputValue = document.querySelector('#inputCoin');
const appendList = document.querySelector('.cotation');


function fetchApi(upperCaseValue) {
    const urlAPI = `https://api.exchangerate.host/latest?base=${upperCaseValue}`;
    return fetch(urlAPI)
        .then((response) => response.json())
        .then((data) => {
            if (data.base !== upperCaseValue) {
                throw new Error('Moeda Inválida')
            } else return data.rates
        })
}

function createLi(coins) {
    Object.entries(coins).forEach((item) => {

        const [coinName, coinValue] = item;
        const makeLi = document.createElement('li');
        makeLi.textContent = `${coinName} - ${coinValue}`
        appendList.appendChild(makeLi)
    })
}


function searchCoin() {
    const upperCaseValue = inputValue.value.toUpperCase();

    if (!upperCaseValue) {
        return Swal.fire({
            title: 'Erro!',
            text: 'Uma moeda deverá ser passada!',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    } return fetchApi(upperCaseValue)
        .then(createLi)
        .catch((error) => {
            return Swal.fire({
                title: 'Erro!',
                text: `${error.message}`,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        })






}


searchButton.addEventListener('click', searchCoin);
